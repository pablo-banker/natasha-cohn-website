import { env } from '$env/dynamic/private';
import type { ContactInput } from '$lib/schemas/contact';
import { buildGoogleFormBody, type ContactField } from './googleForm';

/**
 * Envio do formulário de contato.
 *
 * O site mantém o seu próprio formulário; por baixo dos panos, as respostas
 * são postadas em um **Google Form** (caem na planilha do Google Forms).
 * Nenhuma credencial fica no front-end.
 *
 * Configuração (ver .env.example):
 *   GOOGLE_FORM_URL     → endpoint .../formResponse do seu Google Form
 *   GOOGLE_FORM_ENTRIES → JSON mapeando nossos campos para os entry.XXXX
 *
 * Sem essas variáveis (desenvolvimento/testes), nada é enviado: apenas
 * registramos um aviso e confirmamos o recebimento.
 */

export type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendContactMessage(data: ContactInput): Promise<SendResult> {
	const url = env.GOOGLE_FORM_URL;
	const entriesRaw = env.GOOGLE_FORM_ENTRIES;

	// Sem configuração (desenvolvimento/testes): não envia, só confirma.
	if (!url || !entriesRaw) {
		console.warn(
			'[contato] Google Form não configurado (GOOGLE_FORM_URL / GOOGLE_FORM_ENTRIES). ' +
				'Nada foi enviado.'
		);
		return { ok: true };
	}

	let entries: Partial<Record<ContactField, string>>;
	try {
		entries = JSON.parse(entriesRaw);
	} catch {
		return { ok: false, reason: 'bad-config' };
	}

	try {
		const body = buildGoogleFormBody(data, entries);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				// O endpoint do Google responde melhor com um UA de navegador.
				'User-Agent': 'Mozilla/5.0'
			},
			body: body.toString()
		});

		// O Google Forms responde 200 na confirmação de envio.
		if (!response.ok) return { ok: false, reason: `provider-${response.status}` };
		return { ok: true };
	} catch {
		// Nunca expor detalhes internos nem registrar o conteúdo da mensagem.
		return { ok: false, reason: 'network' };
	}
}
