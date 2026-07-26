import type { BlogPostMeta } from '$lib/types';

/**
 * Metadados dos artigos migrados do Wix. Texto integral e capas migrados da
 * própria página oficial (/blog). Os slugs foram simplificados (os originais
 * tinham acentos e eram longos); as URLs antigas recebem redirect 301
 * (ver src/hooks.server.ts e docs/MIGRATION.md).
 */
export const blogPostsMeta: BlogPostMeta[] = [
	{
		slug: 'os-regimes-de-casamento',
		title: 'Os regimes de casamento: entendendo as escolhas e implicações legais',
		description:
			'O casamento é uma união de vidas, valores e, muitas vezes, de patrimônio. Entenda os quatro regimes de bens no Brasil para escolher com clareza.',
		date: '2023-10-31',
		author: 'Natasha Cohn',
		category: 'Casamento na prática',
		coverImage: '/images/blog/os-regimes-de-casamento.jpg',
		coverAlt: 'Roteiros impressos da cerimônia sobre uma mesa de madeira, com taças e microfone'
	},
	{
		slug: 'os-ritos-de-uma-cerimonia-de-casamento',
		title: 'Os ritos de uma cerimônia de casamento: simbolismo além da religião',
		description:
			'Cada vez mais casais escolhem ritos que refletem o próprio simbolismo. Conheça 12 ritos sem raízes religiosas, cheios de significado para o casal.',
		date: '2023-10-15',
		updated: '2023-10-17',
		author: 'Natasha Cohn',
		category: 'Ritos',
		coverImage: '/images/blog/os-ritos-de-uma-cerimonia-de-casamento.jpg',
		coverAlt: 'Casal segurando um recipiente dourado durante um rito na cerimônia'
	}
];

/** Artigos em ordem cronológica decrescente (mais recentes primeiro). */
export const blogPostsByDate = [...blogPostsMeta].sort(
	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function blogMetaBySlug(slug: string): BlogPostMeta | undefined {
	return blogPostsMeta.find((p) => p.slug === slug);
}

/** Sugere artigos relacionados (mesma categoria, excluindo o atual). */
export function relatedPosts(slug: string, limit = 2): BlogPostMeta[] {
	const current = blogMetaBySlug(slug);
	if (!current) return [];
	const sameCategory = blogPostsByDate.filter(
		(p) => p.slug !== slug && p.category === current.category
	);
	const others = blogPostsByDate.filter((p) => p.slug !== slug && p.category !== current.category);
	return [...sameCategory, ...others].slice(0, limit);
}
