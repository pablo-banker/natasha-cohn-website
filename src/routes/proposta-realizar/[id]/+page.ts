import type { PageLoad } from './$types';
import { getProposalBudget, heteroProposal } from '$lib/content/proposals';

// Página dinâmica por casal (link-fantasma). Não prerenderiza: o ID é livre.
export const prerender = false;

export const load: PageLoad = ({ params }) => {
	return {
		id: params.id,
		// TODO: quando houver fonte real (Google Sheets), buscar os dados do casal
		// pelo id aqui. A forma do retorno permanece a mesma.
		budget: getProposalBudget(heteroProposal, params.id)
	};
};
