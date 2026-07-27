import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { mentoriaProposal } from '$lib/content/mentoria';
import { fetchProposalBudget } from '$lib/server/proposalSheet';

// Página dinâmica por pessoa (link-fantasma). Não prerenderiza: o ID é livre.
// A busca é server-side (a URL do Apps Script fica em env, fora do front-end).
export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const sheet = await fetchProposalBudget(fetch, params.id);
	// Sem dados (ID inexistente ou falha na busca) → 404, como nas propostas.
	if (!sheet) error(404, 'Proposta não encontrada');
	setHeaders({ 'cache-control': 's-maxage=300, stale-while-revalidate=3600' });
	return {
		id: params.id,
		// Da planilha usamos SÓ investimento, forma de pagamento e observação;
		// título e validade seguem do conteúdo estático da mentoria.
		budget: {
			...mentoriaProposal.budget,
			...(sheet.investmentValue ? { value: sheet.investmentValue } : {}),
			...(sheet.payment ? { payment: sheet.payment } : {}),
			...(sheet.notes ? { notes: sheet.notes } : {})
		}
	};
};
