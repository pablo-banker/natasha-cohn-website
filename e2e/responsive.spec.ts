import { test, expect } from '@playwright/test';

const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
const paths = ['/', '/a-celebrante', '/cerimonias', '/ritos', '/depoimentos', '/blog', '/contato'];

test.describe('responsividade', () => {
	// Estes testes controlam o viewport manualmente.
	test.skip(({ isMobile }) => isMobile, 'roda uma vez, no projeto desktop');

	for (const width of widths) {
		test(`sem rolagem horizontal em ${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });

			for (const path of paths) {
				await page.goto(path);
				await page.waitForLoadState('networkidle');

				const overflow = await page.evaluate(() => {
					const doc = document.documentElement;
					return {
						scrollWidth: doc.scrollWidth,
						clientWidth: doc.clientWidth
					};
				});

				expect(
					overflow.scrollWidth,
					`${path} tem rolagem horizontal em ${width}px`
				).toBeLessThanOrEqual(overflow.clientWidth + 1);
			}
		});
	}

	test('os controles principais têm alvo de toque confortável (44px)', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');

		// Controles primários miram 44px (nível AAA de conforto).
		const primary = [
			page.getByRole('button', { name: 'Abrir menu' }),
			page.getByRole('link', { name: /Falar no WhatsApp/ }).first()
		];
		for (const control of primary) {
			const box = await control.boundingBox();
			expect(box, 'controle primário deve estar visível').not.toBeNull();
			expect(box!.height).toBeGreaterThanOrEqual(44);
		}

		// Abre o menu e confere os itens de navegação.
		await page.getByRole('button', { name: 'Abrir menu' }).click();
		const navLink = page.getByRole('dialog').getByRole('link', { name: 'Ritos', exact: true });
		const navBox = await navLink.boundingBox();
		expect(navBox!.height).toBeGreaterThanOrEqual(44);
	});

	test('os controles do carrossel cumprem o alvo mínimo WCAG 2.2 AA (24px)', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		// O carrossel de depoimentos vive na home; a página /depoimentos usa
		// uma galeria estática.
		await page.goto('/');
		await page.getByRole('button', { name: 'Próximo depoimento' }).scrollIntoViewIfNeeded();

		// Setas do carrossel: 44px.
		const next = page.getByRole('button', { name: 'Próximo depoimento' });
		const nextBox = await next.boundingBox();
		expect(nextBox!.height).toBeGreaterThanOrEqual(44);

		// Pontos de navegação: mínimo AA de 24px, com espaçamento entre eles.
		const dot = page.getByRole('button', { name: /Ir para o depoimento 2/ });
		const dotBox = await dot.boundingBox();
		expect(dotBox!.height).toBeGreaterThanOrEqual(24);
		expect(dotBox!.width).toBeGreaterThanOrEqual(24);
	});
});
