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

// Os dados do casal vêm de uma planilha externa (mutável) — então não há ID
// estável para testar o render feliz em e2e. Aqui cobrimos o comportamento
// determinístico: ID inexistente ou falha na busca → 404. O mapeamento do
// orçamento é coberto por testes unitários (src/lib/server/proposalSheet.test.ts).
test.describe('proposta (link-fantasma)', () => {
	const MISSING = '/proposta-realizar/id-que-nao-existe-000000000000';

	test('ID inexistente (ou falha na busca) cai na página 404', async ({ page }) => {
		const res = await page.goto(MISSING);
		expect(res?.status()).toBe(404);
		await expect(page.getByRole('heading', { name: /Esta página não existe/i })).toBeVisible();
	});

	test('resposta em rota de proposta não é indexável (noindex)', async ({ page }) => {
		await page.goto(MISSING);
		const robots = page.locator('head meta[name="robots"]');
		await expect(robots).toHaveAttribute('content', /noindex/);
	});
});
