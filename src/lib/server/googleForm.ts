import type { ContactInput } from '$lib/schemas/contact';

/** Nossos campos, mapeados para os `entry.XXXX` de um Google Form. */
export type ContactField =
	| 'names'
	| 'email'
	| 'whatsapp'
	| 'date'
	| 'location'
	| 'celebrationType'
	| 'guests'
	| 'language'
	| 'referral'
	| 'message';

/**
 * Monta o corpo (application/x-www-form-urlencoded) para o endpoint
 * `.../formResponse` do Google Forms, mapeando cada campo do nosso
 * formulário para o `entry.XXXX` correspondente. Campos vazios são omitidos
 * (para não sobrescrever com branco no Forms). Função pura → testável.
 */
export function buildGoogleFormBody(
	data: ContactInput,
	entries: Partial<Record<ContactField, string>>
): URLSearchParams {
	const values: Record<ContactField, string | undefined> = {
		names: data.names,
		email: data.email,
		whatsapp: data.whatsapp,
		date: data.date,
		location: data.location,
		celebrationType: data.celebrationType,
		guests: data.guests,
		language: data.language,
		referral: data.referral,
		message: data.message
	};

	const body = new URLSearchParams();
	for (const [field, entryId] of Object.entries(entries)) {
		const value = values[field as ContactField];
		if (!entryId || value == null || String(value).trim() === '') continue;
		const raw = String(value).trim();

		// Perguntas de DATA no Google Forms esperam três parâmetros
		// (_year/_month/_day), não um valor único. O campo `date` do site é um
		// <input type="date"> → sempre no formato yyyy-mm-dd.
		const date = field === 'date' ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw) : null;
		if (date) {
			body.append(`${entryId}_year`, date[1]);
			body.append(`${entryId}_month`, String(Number(date[2])));
			body.append(`${entryId}_day`, String(Number(date[3])));
		} else if (field === 'language' && raw === 'Outro') {
			// "Outra opção" do Google Forms: valor especial + o texto livre.
			body.append(entryId, '__other_option__');
			const other = data.languageOther?.trim();
			if (other) body.append(`${entryId}.other_option_response`, other);
		} else {
			body.append(entryId, raw);
		}
	}
	return body;
}
