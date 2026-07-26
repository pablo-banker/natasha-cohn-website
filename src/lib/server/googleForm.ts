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
		if (entryId && value != null && String(value).trim() !== '') {
			body.append(entryId, String(value));
		}
	}
	return body;
}
