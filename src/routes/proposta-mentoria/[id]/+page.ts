import type { PageLoad } from './$types';

// Página dinâmica (link-fantasma). Não prerenderiza: o ID é livre.
// O investimento da mentoria é fixo (vive no conteúdo), então só o id passa.
export const prerender = false;

export const load: PageLoad = ({ params }) => {
	return { id: params.id };
};
