import { env } from '$env/dynamic/private';
import type { ProposalBudget } from '$lib/content/proposals';

/**
 * Dados dinâmicos do casal de uma proposta, vindos de um Google Apps Script
 * publicado como web app (a planilha em si não é pública). **Server-side
 * apenas**: a URL vive em env e nunca chega ao front-end; não há chave privada.
 *
 * Contrato do endpoint (GET, responde JSON):
 *   GET <PROPOSAL_SHEET_URL>?id=<id>
 *     → { "success": true,  "data": { "casal": "...", "idioma": "...", ... } }
 *     → { "success": false, "error": "..." }
 *
 * Usa-se o parâmetro de query `?id=`. O formato de path `/exec/{id}` NÃO
 * funciona anônimo — o Google redireciona para a tela de login.
 *
 * Só os campos presentes em `data` são mapeados (retorno Partial); o loader
 * faz o merge com o orçamento-base estático. Assim, conforme novas colunas
 * (data, local, investimento…) forem adicionadas à planilha e devolvidas pelo
 * script, elas passam a sobrescrever o placeholder automaticamente.
 */

type SheetResponse =
	{ success: true; data: Record<string, unknown> } | { success: false; error?: string };

const TIMEOUT_MS = 6000;

/** Idioma da planilha → forma acentuada usada no rótulo do investimento. */
const LANGUAGE_LABEL: Record<string, string> = {
	portugues: 'português',
	ingles: 'inglês',
	espanhol: 'espanhol',
	bilingue: 'formato bilíngue'
};

/** Normaliza texto para comparação (sem acentos, minúsculo). */
function fold(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
}

/** Extrai uma string não vazia de um valor desconhecido. */
function str(value: unknown): string | undefined {
	if (typeof value === 'string') {
		const trimmed = value.trim();
		return trimmed.length ? trimmed : undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) return String(value);
	return undefined;
}

/** Primeiro valor de string encontrado entre as chaves candidatas. */
function pick(data: Record<string, unknown>, keys: string[]): string | undefined {
	for (const key of keys) {
		const found = str(data[key]);
		if (found) return found;
	}
	return undefined;
}

/**
 * Mapeia o objeto `data` do endpoint para os campos de orçamento que ele
 * fornece. Retorna apenas o que existe — o restante permanece no placeholder.
 */
export function mapSheetBudget(data: Record<string, unknown>): Partial<ProposalBudget> {
	const out: Partial<ProposalBudget> = {};

	const couple = pick(data, ['casal', 'couple']);
	if (couple) out.couple = couple;

	const date = pick(data, ['data', 'date']);
	if (date) out.date = date;

	const venue = pick(data, ['local', 'venue', 'cidade']);
	if (venue) out.venue = venue;

	const value = pick(data, ['investimento', 'valor', 'investmentValue']);
	if (value) out.investmentValue = value;

	const payment = pick(data, ['pagamento', 'formaPagamento', 'forma_pagamento', 'payment']);
	if (payment) out.payment = payment;

	const validity = pick(data, ['validade', 'validity']);
	if (validity) out.validity = validity;

	const title = pick(data, ['titulo', 'title']);
	if (title) out.title = title;

	// Observação é opcional — só entra no card quando a planilha a preenche.
	const notes = pick(data, ['observacao', 'observacoes', 'obs', 'notes', 'notas']);
	if (notes) out.notes = notes;

	// Rótulo do investimento: explícito na planilha ou derivado do idioma
	// (ex.: "Portugues" → "Investimento — cerimônia em português").
	const explicitLabel = pick(data, ['investimentoLabel', 'investmentLabel']);
	const language = pick(data, ['idioma', 'language']);
	if (explicitLabel) {
		out.investmentLabel = explicitLabel;
	} else if (language) {
		const label = LANGUAGE_LABEL[fold(language)] ?? language.toLowerCase();
		out.investmentLabel = `Investimento — cerimônia em ${label}`;
	}

	return out;
}

/**
 * Busca o orçamento de uma proposta por id. Devolve só os campos vindos da
 * planilha (Partial) ou `null` se não configurado / não encontrado / falha —
 * cabe ao loader mesclar com o placeholder estático.
 */
export async function fetchProposalBudget(
	fetchFn: typeof fetch,
	id: string
): Promise<Partial<ProposalBudget> | null> {
	const base = env.PROPOSAL_SHEET_URL;
	if (!base) {
		console.warn('[proposta] PROPOSAL_SHEET_URL não configurada — a proposta cairá em 404.');
		return null;
	}
	if (!id) return null;

	const separator = base.includes('?') ? '&' : '?';
	const url = `${base}${separator}id=${encodeURIComponent(id)}`;

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
	try {
		const response = await fetchFn(url, {
			headers: { accept: 'application/json', 'User-Agent': 'Mozilla/5.0' },
			signal: controller.signal
		});
		if (!response.ok) return null;

		const json = (await response.json()) as SheetResponse;
		if (!json || json.success !== true || typeof json.data !== 'object' || json.data === null) {
			return null;
		}

		const mapped = mapSheetBudget(json.data);
		return Object.keys(mapped).length ? mapped : null;
	} catch {
		// Rede/parse/timeout → o loader cai no placeholder estático.
		return null;
	} finally {
		clearTimeout(timer);
	}
}
