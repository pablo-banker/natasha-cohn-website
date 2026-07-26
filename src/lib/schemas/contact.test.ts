import { describe, it, expect } from 'vitest';
import { contactSchema, toFieldErrors } from './contact';

const valid = {
	names: 'Ana e Marcos',
	email: 'ana@exemplo.com',
	whatsapp: '(21) 90000-0000',
	message: 'Nos conhecemos numa fila de cinema e queremos uma cerimônia leve.',
	consent: 'on'
};

describe('contactSchema', () => {
	it('aceita um envio válido com os campos obrigatórios', () => {
		const result = contactSchema.safeParse(valid);
		expect(result.success).toBe(true);
	});

	it('aceita os campos opcionais vazios', () => {
		const result = contactSchema.safeParse({
			...valid,
			date: '',
			location: '',
			celebrationType: '',
			guests: '',
			language: '',
			referral: ''
		});
		expect(result.success).toBe(true);
	});

	it('recusa e-mail inválido', () => {
		const result = contactSchema.safeParse({ ...valid, email: 'nao-e-email' });
		expect(result.success).toBe(false);
	});

	it('recusa mensagem curta demais', () => {
		const result = contactSchema.safeParse({ ...valid, message: 'oi' });
		expect(result.success).toBe(false);
	});

	it('exige o consentimento LGPD', () => {
		const result = contactSchema.safeParse({ ...valid, consent: undefined });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(toFieldErrors(result.error).consent).toBeTruthy();
		}
	});

	it('recusa WhatsApp com letras', () => {
		const result = contactSchema.safeParse({ ...valid, whatsapp: 'me liga aí' });
		expect(result.success).toBe(false);
	});

	it('recusa número de convidados não numérico', () => {
		const result = contactSchema.safeParse({ ...valid, guests: 'uns cem' });
		expect(result.success).toBe(false);
	});

	it('recusa mensagem acima do limite', () => {
		const result = contactSchema.safeParse({ ...valid, message: 'a'.repeat(4001) });
		expect(result.success).toBe(false);
	});
});

describe('toFieldErrors', () => {
	it('mapeia cada campo para a primeira mensagem, em português', () => {
		const result = contactSchema.safeParse({ names: '', email: 'x', whatsapp: '', message: '' });
		expect(result.success).toBe(false);
		if (result.success) return;

		const errors = toFieldErrors(result.error);
		expect(errors.names).toBeTruthy();
		expect(errors.email).toBeTruthy();
		expect(errors.whatsapp).toBeTruthy();
		expect(errors.message).toBeTruthy();
		// Mensagens escritas para pessoas, não códigos técnicos.
		expect(errors.names).not.toMatch(/invalid|required/i);
	});
});
