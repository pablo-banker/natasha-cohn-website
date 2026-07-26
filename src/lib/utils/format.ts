/** Estima o tempo de leitura em minutos a partir do texto (200 ppm). */
export function readingMinutes(text: string): number {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/** Formata uma data ISO para exibição em português (ex.: "31 de outubro de 2023"). */
export function formatDatePt(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date);
}
