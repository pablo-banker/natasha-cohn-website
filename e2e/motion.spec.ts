import { test, expect } from '@playwright/test';

test.describe('movimento e progressive enhancement', () => {
	test('com prefers-reduced-motion o conteúdo aparece sem animação', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		// Nada pode ficar escondido esperando o GSAP
		const hidden = await page.evaluate(() => {
			const els = Array.from(document.querySelectorAll('h1, h2, p, a'));
			return els
				.filter((el) => {
					const style = getComputedStyle(el);
					const rect = el.getBoundingClientRect();
					// Só nos importam elementos dentro da primeira dobra
					if (rect.top > window.innerHeight || rect.height === 0) return false;
					return style.opacity === '0' || style.visibility === 'hidden';
				})
				.map((el) => el.tagName + ': ' + el.textContent?.slice(0, 40));
		});

		expect(hidden).toEqual([]);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('sem JavaScript o conteúdo continua legível e navegável', async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();

		await page.goto('/');

		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.getByText('+380').first()).toBeVisible();
		await expect(page.getByText('Amanda e Luan').first()).toBeVisible();

		// Navegação funciona por links reais
		await page.getByRole('link', { name: 'Depoimentos' }).first().click();
		await expect(page.getByRole('heading', { level: 1 })).toContainText('Palavras de amor');

		await context.close();
	});

	test('sem JavaScript o formulário de contato envia e confirma', async ({ browser }) => {
		// reducedMotion desliga o scroll-behavior:smooth, deixando a rolagem
		// programática do teste determinística (cenário realista de um usuário
		// sem JS que também prefere menos movimento).
		const context = await browser.newContext({
			javaScriptEnabled: false,
			reducedMotion: 'reduce'
		});
		const page = await context.newPage();

		await page.goto('/contato');
		await page.getByLabel(/Nome de vocês/).fill('Bea e Rafa');
		await page.getByLabel(/^E-mail/).fill('bea@exemplo.com');
		await page.getByLabel(/WhatsApp/).fill('(24) 90000-0000');
		await page
			.getByLabel(/Contem a história/)
			.fill('Queremos uma cerimônia ao ar livre, bem leve.');
		await page.getByLabel(/Concordo que meus dados/).check();
		await page.getByRole('button', { name: /Enviar mensagem/ }).click();

		await expect(page.getByText('Recebi a mensagem de vocês.')).toBeVisible();
		await context.close();
	});

	test('o GSAP não entra no carregamento inicial', async ({ page }) => {
		const initialScripts: string[] = [];
		page.on('request', (request) => {
			if (request.resourceType() === 'script') initialScripts.push(request.url());
		});

		await page.goto('/', { waitUntil: 'domcontentloaded' });

		// O GSAP é carregado sob demanda, em chunk próprio — não no HTML inicial
		const html = await page.content();
		expect(html).not.toContain('ScrollTrigger');
	});
});
