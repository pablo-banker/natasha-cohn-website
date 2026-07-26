import { describe, it, expect } from 'vitest';
import { buildGoogleFormBody } from './googleForm';
import type { ContactInput } from '$lib/schemas/contact';

const data: ContactInput = {
	names: 'Ana e Marcos',
	email: 'ana@exemplo.com',
	whatsapp: '(21) 90000-0000',
	date: '2026-05-10',
	location: 'Petrópolis, RJ',
	celebrationType: 'Casamento',
	guests: '80',
	language: 'Português',
	referral: 'Instagram',
	message: 'Nos conhecemos numa fila de cinema.',
	consent: 'on'
};

const entries = {
	names: 'entry.1',
	email: 'entry.2',
	whatsapp: 'entry.3',
	date: 'entry.4',
	location: 'entry.5',
	celebrationType: 'entry.6',
	guests: 'entry.7',
	language: 'entry.8',
	referral: 'entry.9',
	message: 'entry.10'
};

describe('buildGoogleFormBody', () => {
	it('mapeia cada campo para o entry.XXXX correspondente', () => {
		const body = buildGoogleFormBody(data, entries);
		expect(body.get('entry.1')).toBe('Ana e Marcos');
		expect(body.get('entry.2')).toBe('ana@exemplo.com');
		expect(body.get('entry.10')).toBe('Nos conhecemos numa fila de cinema.');
	});

	it('gera um corpo form-urlencoded válido (sem incluir o consentimento)', () => {
		const encoded = buildGoogleFormBody(data, entries).toString();
		expect(encoded).toContain('entry.1=Ana+e+Marcos');
		expect(encoded).not.toContain('consent');
	});

	it('omite campos vazios (não sobrescreve com branco no Forms)', () => {
		const body = buildGoogleFormBody({ ...data, guests: '', location: '' }, entries);
		expect(body.has('entry.7')).toBe(false); // guests vazio
		expect(body.has('entry.5')).toBe(false); // location vazio
		expect(body.get('entry.1')).toBe('Ana e Marcos');
	});

	it('ignora campos sem entry mapeado', () => {
		const body = buildGoogleFormBody(data, { names: 'entry.1' });
		expect(body.get('entry.1')).toBe('Ana e Marcos');
		expect([...body.keys()]).toEqual(['entry.1']);
	});
});
