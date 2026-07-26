import { describe, it, expect } from 'vitest';
import { readingMinutes, formatDatePt } from './format';

describe('readingMinutes', () => {
	it('nunca retorna menos de 1 minuto', () => {
		expect(readingMinutes('Duas palavras')).toBe(1);
		expect(readingMinutes('')).toBe(1);
	});

	it('estima com base em 200 palavras por minuto', () => {
		const text = Array.from({ length: 600 }, () => 'palavra').join(' ');
		expect(readingMinutes(text)).toBe(3);
	});

	it('ignora espaços em excesso', () => {
		const text = Array.from({ length: 400 }, () => 'palavra').join('   \n  ');
		expect(readingMinutes(text)).toBe(2);
	});
});

describe('formatDatePt', () => {
	it('formata datas ISO em português', () => {
		expect(formatDatePt('2023-10-31')).toBe('31 de outubro de 2023');
	});

	it('não desloca o dia por causa de fuso horário', () => {
		// Sem timeZone UTC, "2023-10-15" viraria 14 de outubro no Brasil.
		expect(formatDatePt('2023-10-15')).toBe('15 de outubro de 2023');
	});

	it('devolve a entrada quando a data é inválida', () => {
		expect(formatDatePt('não é data')).toBe('não é data');
	});
});
