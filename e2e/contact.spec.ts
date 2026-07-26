import { test, expect } from '@playwright/test';

test.describe('formulário de contato', () => {
	test('todos os campos têm rótulo visível associado', async ({ page }) => {
		await page.goto('/contato');

		for (const label of [
			'Nome de vocês',
			'E-mail',
			'WhatsApp',
			'Data da cerimônia',
			'Cidade e local',
			'Tipo de celebração',
			'Convidados (aprox.)',
			'Idioma desejado',
			'Como me conheceram?',
			'Contem a história de vocês'
		]) {
			await expect(page.getByLabel(new RegExp(label.replace(/[.()?]/g, '\\$&')))).toBeVisible();
		}
	});

	test('mostra erros de validação do servidor sem perder o que foi digitado', async ({ page }) => {
		await page.goto('/contato');

		await page.getByLabel(/Nome de vocês/).fill('A');
		await page.getByLabel(/^E-mail/).fill('nao-e-email');
		await page.getByLabel(/WhatsApp/).fill('123');
		await page.getByLabel(/Contem a história/).fill('oi');
		await page.getByLabel(/Concordo que meus dados/).check();

		await page.getByRole('button', { name: /Enviar mensagem/ }).click();

		await expect(page.getByText('Conte o nome de vocês.')).toBeVisible();
		await expect(page.getByText(/parece estar incompleto/)).toBeVisible();
		await expect(page.getByText('Informe um WhatsApp com DDD.')).toBeVisible();

		// O que foi digitado continua lá
		await expect(page.getByLabel(/Nome de vocês/)).toHaveValue('A');
	});

	test('campos inválidos são marcados para leitores de tela', async ({ page }) => {
		await page.goto('/contato');

		await page.getByLabel(/Nome de vocês/).fill('A');
		await page.getByLabel(/^E-mail/).fill('x');
		await page.getByLabel(/WhatsApp/).fill('219999999999');
		await page.getByLabel(/Contem a história/).fill('mensagem suficientemente longa aqui');
		await page.getByLabel(/Concordo que meus dados/).check();
		await page.getByRole('button', { name: /Enviar mensagem/ }).click();

		const email = page.getByLabel(/^E-mail/);
		await expect(email).toHaveAttribute('aria-invalid', 'true');
		await expect(email).toHaveAttribute('aria-describedby', 'email-error');
	});

	test('envio válido mostra o estado de sucesso', async ({ page }) => {
		await page.goto('/contato');

		await page.getByLabel(/Nome de vocês/).fill('Ana e Marcos');
		await page.getByLabel(/^E-mail/).fill('ana@exemplo.com');
		await page.getByLabel(/WhatsApp/).fill('(21) 90000-0000');
		await page
			.getByLabel(/Contem a história/)
			.fill('Nos conhecemos numa fila de cinema em 2019 e queremos algo leve.');
		await page.getByLabel(/Concordo que meus dados/).check();

		await page.getByRole('button', { name: /Enviar mensagem/ }).click();

		await expect(page.getByText('Recebi a mensagem de vocês.')).toBeVisible();
	});

	test('o consentimento LGPD é obrigatório e aponta para a política', async ({ page }) => {
		await page.goto('/contato');
		const consent = page.getByLabel(/Concordo que meus dados/);
		await expect(consent).toHaveAttribute('required', '');

		await page.getByRole('link', { name: 'política de privacidade' }).first().click();
		await expect(page).toHaveURL(/politica-de-privacidade/);
	});

	test('o WhatsApp abre com mensagem pré-preenchida', async ({ page }) => {
		await page.goto('/contato');
		const link = page.getByRole('link', { name: /Falar no WhatsApp/ }).first();
		const href = await link.getAttribute('href');
		expect(href).toContain('wa.me/');
		expect(href).toContain('text=');
	});
});
