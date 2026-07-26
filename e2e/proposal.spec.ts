import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:4173';

// Semeia as chaves de abertura (home + proposta) para a página aparecer direto.
test.use({
	storageState: {
		cookies: [],
		origins: [
			{
				origin: ORIGIN,
				localStorage: [
					{ name: 'natasha-intro-seen', value: '1' },
					{ name: 'natasha-intro-prop-hetero-seen', value: '1' }
				]
			}
		]
	}
});

test.describe('proposta hetero (link-fantasma)', () => {
	test('renderiza o documento e o orçamento dinâmico do casal', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));

		await page.goto('/proposta-realizar/123456');

		// Capa + seções-chave.
		await expect(page.getByText('Celebrante de histórias reais')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Cerimônia exclusiva' })).toBeVisible();
		// Parte dinâmica (placeholder por enquanto).
		await expect(page.getByText('Manoela e Ângelo')).toBeVisible();

		expect(errors).toEqual([]);
	});

	test('é uma página não indexável (noindex)', async ({ page }) => {
		await page.goto('/proposta-realizar/123456');
		const robots = page.locator('head meta[name="robots"]');
		await expect(robots).toHaveAttribute('content', /noindex/);
	});
});
