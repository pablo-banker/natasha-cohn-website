import { test, expect } from '@playwright/test';

const KEY = 'natasha-intro-seen';

test.describe('abertura da marca — primeira visita', () => {
	// Ignora o storageState global (que marca a abertura como já vista).
	test.use({ storageState: { cookies: [], origins: [] } });

	test('escreve a assinatura, revela a home e grava a chave', async ({ page }) => {
		await page.goto('/');

		const intro = page.locator('.intro');
		await expect(intro).toBeVisible();
		// Durante a abertura o scroll do body fica travado.
		expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

		// A abertura conclui sozinha (~4s) e sai do DOM.
		await expect(intro).toBeHidden({ timeout: 9000 });

		// Chave gravada, scroll restaurado, home visível e interativa.
		expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('1');
		expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('prefers-reduced-motion: abertura curta, sem escrita longa', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		// Aparece brevemente e some rápido (sem a animação longa de escrita).
		await expect(page.locator('.intro')).toBeHidden({ timeout: 4000 });
		expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe('1');
	});
});

test('acessos posteriores não exibem a abertura (sem flash)', async ({ page }) => {
	// Usa o storageState global (chave já presente) → visitante recorrente.
	await page.goto('/');
	// Nenhum overlay deve surgir em nenhum momento.
	for (let i = 0; i < 6; i++) {
		await expect(page.locator('.intro')).toHaveCount(0);
		await page.waitForTimeout(80);
	}
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
