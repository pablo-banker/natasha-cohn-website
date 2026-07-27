import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { heteroProposal } from '$lib/content/proposals';
import { fetchProposalBudget } from '$lib/server/proposalSheet';

// Página dinâmica por casal (link-fantasma). Não prerenderiza: o ID é livre.
// A busca é server-side (a URL do Apps Script fica em env, fora do front-end).
export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const sheet = await fetchProposalBudget(fetch, params.id);
	// Sem dados do casal (ID inexistente ou falha na busca) → 404. Nunca
	// mostramos uma proposta com placeholder no lugar de dados reais.
	if (!sheet) error(404, 'Proposta não encontrada');
	// Dados por-id, quase imutáveis no curto prazo: cache de borda + SWR reduz
	// o TTFB (que dependia do fetch ao Apps Script). O 404 acima não é cacheado.
	setHeaders({ 'cache-control': 's-maxage=300, stale-while-revalidate=3600' });
	return {
		id: params.id,
		// A planilha sobrescreve os campos que fornece; título/validade seguem
		// do orçamento-base (a planilha não traz essas colunas).
		budget: { ...heteroProposal.budget, ...sheet }
	};
};
