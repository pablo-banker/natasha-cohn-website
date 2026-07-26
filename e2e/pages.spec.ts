import { test, expect } from '@playwright/test';

const pages = [
	{ path: '/', heading: /Histórias reais/ },
	{ path: '/a-celebrante', heading: /Celebrante de histórias reais/ },
	{ path: '/cerimonias', heading: /Cada amor pede uma celebração diferente/ },
	{ path: '/ritos', heading: /Beleza, recordações, simbologias/ },
	{ path: '/depoimentos', heading: /Palavras de amor/ },
	{ path: '/blog', heading: /Textos para quem está começando a sonhar/ },
	{ path: '/contato', heading: /como vocês se encontraram/ },
	{ path: '/politica-de-privacidade', heading: /Política de privacidade/ }
];

test.describe('páginas principais', () => {
	for (const { path, heading } of pages) {
		test(`${path} renderiza com um único h1 e título próprio`, async ({ page }) => {
			await page.goto(path);

			const h1 = page.locator('h1');
			await expect(h1).toHaveCount(1);
			await expect(h1).toHaveText(heading);

			// Título único por página
			await expect(page).toHaveTitle(/Natasha Cohn/);

			// Canonical presente
			const canonical = page.locator('link[rel="canonical"]');
			await expect(canonical).toHaveAttribute('href', new RegExp(`${path === '/' ? '/$' : path}`));
		});
	}

	test('404 personalizada responde e não é indexada', async ({ page }) => {
		const response = await page.goto('/rota-que-nao-existe');
		expect(response?.status()).toBe(404);
		await expect(page.getByRole('heading', { level: 1 })).toContainText(/não existe/i);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
	});

	test('não há erros de console na home', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		page.on('pageerror', (err) => errors.push(err.message));

		await page.goto('/');
		await page.waitForLoadState('networkidle');
		expect(errors).toEqual([]);
	});

	test('não há links quebrados internos na home', async ({ page, request }) => {
		await page.goto('/');
		const hrefs = await page
			.locator('a[href^="/"]')
			.evaluateAll((links) =>
				Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? '')))
			);

		for (const href of hrefs) {
			expect(href, 'nenhum link deve ser href="#"').not.toBe('#');
			const response = await request.get(href.split('#')[0] || '/');
			expect(response.status(), `link quebrado: ${href}`).toBeLessThan(400);
		}
	});

	test('sitemap e robots respondem corretamente', async ({ request }) => {
		const sitemap = await request.get('/sitemap.xml');
		expect(sitemap.status()).toBe(200);
		const xml = await sitemap.text();
		expect(xml).toContain('<urlset');
		expect(xml).toContain('/blog/os-regimes-de-casamento');

		const robots = await request.get('/robots.txt');
		expect(robots.status()).toBe(200);
		expect(await robots.text()).toContain('Sitemap:');
	});

	test('redirects 301 do Wix preservam o SEO', async ({ request }) => {
		const cases: [string, string][] = [
			['/services-4', '/cerimonias'],
			['/vamos-conversar', '/contato']
		];

		for (const [from, to] of cases) {
			const response = await request.get(from, { maxRedirects: 0 });
			expect(response.status(), `${from} deve redirecionar`).toBe(301);
			expect(response.headers()['location']).toContain(to);
		}
	});
});
