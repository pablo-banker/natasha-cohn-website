import { describe, it, expect } from 'vitest';
import { mapSheetBudget } from './proposalSheet';

describe('mapSheetBudget', () => {
	it('mapeia o casal e deriva o rótulo de investimento a partir do idioma', () => {
		// Formato real do endpoint hoje.
		const out = mapSheetBudget({ id: 'abc', casal: 'Jose e Maria', idioma: 'Portugues' });
		expect(out.couple).toBe('Jose e Maria');
		expect(out.investmentLabel).toBe('Investimento — cerimônia em português');
		// Campos ausentes na planilha não são inventados (ficam para o merge).
		expect(out.date).toBeUndefined();
		expect(out.venue).toBeUndefined();
		expect(out.investmentValue).toBeUndefined();
	});

	it('acentua idiomas conhecidos (inglês/espanhol)', () => {
		expect(mapSheetBudget({ idioma: 'Ingles' }).investmentLabel).toBe(
			'Investimento — cerimônia em inglês'
		);
		expect(mapSheetBudget({ idioma: 'Espanhol' }).investmentLabel).toBe(
			'Investimento — cerimônia em espanhol'
		);
	});

	it('mapeia o conjunto completo de colunas em português', () => {
		const out = mapSheetBudget({
			casal: 'Ana e Bia',
			data: '10/04/2027',
			local: 'Hotel Antarws — Florianópolis',
			investimento: 'R$ 3.300,00 (incluso deslocamento)',
			pagamento: 'Sinal de 30% e saldo no pix.',
			validade: 'Proposta válida por 3 dias.',
			titulo: 'Cerimônia exclusiva'
		});
		expect(out).toEqual({
			couple: 'Ana e Bia',
			date: '10/04/2027',
			venue: 'Hotel Antarws — Florianópolis',
			investmentValue: 'R$ 3.300,00 (incluso deslocamento)',
			payment: 'Sinal de 30% e saldo no pix.',
			validity: 'Proposta válida por 3 dias.',
			title: 'Cerimônia exclusiva'
		});
	});

	it('mapeia o payload real do endpoint (chave formaPagamento)', () => {
		// Cópia fiel da resposta do Apps Script.
		const out = mapSheetBudget({
			id: '36a23e192a644d62b1d7220f',
			casal: 'Jose e Maria',
			data: '05/03/2026',
			local: 'Petropolis',
			investimento: 'R$ 4.000,00',
			formaPagamento: 'Sinal de 30% e saldo parcelado no pix até 20 dias antes da cerimônia.',
			idioma: 'Portugues'
		});
		expect(out).toEqual({
			couple: 'Jose e Maria',
			date: '05/03/2026',
			venue: 'Petropolis',
			investmentValue: 'R$ 4.000,00',
			payment: 'Sinal de 30% e saldo parcelado no pix até 20 dias antes da cerimônia.',
			investmentLabel: 'Investimento — cerimônia em português'
		});
	});

	it('mapeia observação (opcional) e a omite quando ausente/vazia', () => {
		expect(mapSheetBudget({ observacao: 'Inclui ensaio pré-wedding.' }).notes).toBe(
			'Inclui ensaio pré-wedding.'
		);
		expect(mapSheetBudget({ casal: 'Ana e Bia' }).notes).toBeUndefined();
		expect(mapSheetBudget({ observacao: '   ' }).notes).toBeUndefined();
	});

	it('um rótulo explícito prevalece sobre o idioma', () => {
		const out = mapSheetBudget({ idioma: 'Portugues', investimentoLabel: 'Investimento total' });
		expect(out.investmentLabel).toBe('Investimento total');
	});

	it('ignora valores vazios/em branco e não retorna campos indefinidos', () => {
		const out = mapSheetBudget({ casal: '  ', data: '', local: '   ' });
		expect(out).toEqual({});
	});

	it('objeto sem chaves conhecidas resulta em Partial vazio', () => {
		expect(mapSheetBudget({ foo: 'bar', id: '123' })).toEqual({});
	});
});
