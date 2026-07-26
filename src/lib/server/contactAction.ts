import { fail, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { contactSchema, toFieldErrors } from '$lib/schemas/contact';
import { sendContactMessage } from './email';

/** Limite de payload — evita corpos gigantes (bytes). */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Proteção básica contra envios repetidos, em memória.
 * Observação: em ambientes serverless cada instância tem a própria memória,
 * então isto é uma primeira barreira, não uma proteção definitiva. Para
 * produção com muito tráfego, usar um armazenamento compartilhado
 * (ver docs/MIGRATION.md).
 *
 * O limite é configurável por CONTACT_RATE_LIMIT (padrão 3 por 10 minutos)
 * e só conta ENVIOS VÁLIDOS — errar o formulário não gasta a cota.
 */
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(env.CONTACT_RATE_LIMIT ?? 3);

function isRateLimited(key: string): boolean {
	const now = Date.now();
	const recent = (submissions.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_PER_WINDOW) {
		submissions.set(key, recent);
		return true;
	}
	recent.push(now);
	submissions.set(key, recent);
	return false;
}

/** Campos devolvidos ao formulário para não perder o que já foi digitado. */
function collectValues(data: FormData): Record<string, string> {
	const values: Record<string, string> = {};
	for (const [key, value] of data.entries()) {
		// Nunca devolvemos o honeypot nem valores não textuais.
		if (key !== 'website' && typeof value === 'string') values[key] = value;
	}
	return values;
}

export async function handleContact(event: RequestEvent) {
	const contentLength = Number(event.request.headers.get('content-length') ?? 0);
	if (contentLength > MAX_BODY_BYTES) {
		return fail(413, { message: 'Mensagem muito longa. Tente encurtar um pouco.' });
	}

	const data = await event.request.formData();
	const values = collectValues(data);

	// Armadilha anti-spam: bots preenchem campos ocultos. Respondemos como
	// sucesso para não revelar o mecanismo, sem enviar nada.
	if ((data.get('website') as string | null)?.trim()) {
		return { success: true };
	}

	// Valida primeiro: erros de digitação não devem consumir a cota nem
	// bloquear alguém que só está corrigindo o formulário.
	const parsed = contactSchema.safeParse(Object.fromEntries(data));
	if (!parsed.success) {
		return fail(400, {
			values,
			errors: toFieldErrors(parsed.error),
			message: 'Confira os campos destacados abaixo.'
		});
	}

	// Só envios válidos contam para o limite de taxa.
	const clientKey = event.getClientAddress();
	if (isRateLimited(clientKey)) {
		return fail(429, {
			values,
			message: 'Recebi várias mensagens agora há pouco. Tente de novo em alguns minutos.'
		});
	}

	const result = await sendContactMessage(parsed.data);
	if (!result.ok) {
		// Mensagem genérica: nenhum detalhe interno vaza para o cliente.
		return fail(502, {
			values,
			message:
				'Não consegui enviar agora. Tente novamente em instantes ou fale comigo pelo WhatsApp.'
		});
	}

	return { success: true };
}
