import { test, expect } from '@playwright/test';

test.describe('navegação no desktop', () => {
	test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, 'apenas desktop');

	test('o menu principal leva às páginas', async ({ page }) => {
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'Navegação principal' });

		await nav.getByRole('link', { name: 'Depoimentos' }).click();
		await expect(page).toHaveURL(/\/depoimentos$/);
		await expect(page.getByRole('heading', { level: 1 })).toContainText('Palavras de amor');
	});

	test('o submenu de Cerimônias abre e fecha com Escape', async ({ page }) => {
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'Navegação principal' });
		const toggle = nav.getByRole('button', { name: /Abrir submenu de Cerimônias/ });

		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		// Escopo na navegação: "Apadrinhamento" também aparece na lista de
		// cerimônias da home, então miramos o link do submenu do cabeçalho.
		await expect(nav.getByRole('link', { name: 'Apadrinhamento' })).toBeVisible();

		await page.keyboard.press('Escape');
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
	});

	test('o cabeçalho ganha fundo depois da rolagem', async ({ page }) => {
		await page.goto('/');
		const header = page.locator('header').first();

		const initial = await header.getAttribute('class');
		expect(initial).toContain('bg-transparent');

		await page.mouse.wheel(0, 400);
		await expect(header).toHaveClass(/backdrop-blur-md/);
	});

	test('clicar em "Início" já na home rola até o topo', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		await page.evaluate(() => window.scrollTo(0, 2500));
		expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);

		const nav = page.getByRole('navigation', { name: 'Navegação principal' });
		await nav.getByRole('link', { name: 'Início' }).click();
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
	});

	test('clicar numa âncora do submenu já na página rola até a seção', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/cerimonias');
		expect(await page.evaluate(() => window.scrollY)).toBe(0);

		const nav = page.getByRole('navigation', { name: 'Navegação principal' });
		await nav.getByRole('button', { name: /Abrir submenu de Cerimônias/ }).click();
		// Uma seção do meio (com conteúdo suficiente abaixo) para o offset do
		// cabeçalho fixo (scroll-mt-28 = 112px) valer exatamente.
		await nav.getByRole('link', { name: 'Celebrações de amor' }).click();

		// A URL passa a apontar para a âncora e a página rolou até a seção,
		// que para logo abaixo do cabeçalho fixo (scroll-padding-top =
		// header-height + 1.5rem ≈ 104px).
		await expect(page).toHaveURL(/#celebracoes$/);
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
		const top = await page.locator('#celebracoes').evaluate((el) => el.getBoundingClientRect().top);
		expect(top).toBeGreaterThan(90);
		expect(top).toBeLessThan(120);
	});

	test('o skip link aparece ao focar e leva ao conteúdo', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
		await expect(skip).toBeFocused();
		await skip.press('Enter');
		await expect(page).toHaveURL(/#conteudo$/);
	});
});

test.describe('menu mobile', () => {
	// O projeto "mobile" do playwright.config.ts já usa um Pixel 7.
	test.skip(({ isMobile }) => !isMobile, 'apenas no projeto mobile');

	test('abre, navega e devolve o foco ao fechar', async ({ page }) => {
		await page.goto('/');

		const openButton = page.getByRole('button', { name: 'Abrir menu' });
		await openButton.click();

		const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
		await expect(dialog).toBeVisible();

		// Fecha com Escape e devolve o foco ao botão que abriu
		await page.keyboard.press('Escape');
		await expect(dialog).not.toBeVisible();
		await expect(openButton).toBeFocused();
	});

	test('navega por um item do menu', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Abrir menu' }).click();

		const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
		await dialog.getByRole('link', { name: 'Ritos', exact: true }).click();

		await expect(page).toHaveURL(/\/ritos$/);
		await expect(dialog).not.toBeVisible();
	});

	test('o fundo não rola com o menu aberto', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Abrir menu' }).click();

		const overflow = await page.evaluate(() => document.body.style.overflow);
		expect(overflow).toBe('hidden');
	});

	test('âncora do submenu fecha o menu e rola até a seção', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/cerimonias');
		expect(await page.evaluate(() => window.scrollY)).toBe(0);

		await page.getByRole('button', { name: 'Abrir menu' }).click();
		const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
		await dialog.getByRole('link', { name: 'Celebrações de amor' }).click();

		// O menu fecha (restaura a rolagem) e só então rola suavemente à seção.
		await expect(dialog).not.toBeVisible();
		await expect(page).toHaveURL(/#celebracoes$/);
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
		await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
	});
});
