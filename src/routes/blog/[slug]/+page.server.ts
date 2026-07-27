import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost, getAllPosts } from '$lib/server/blog';
import { relatedPosts } from '$lib/content/blog-index';

// Artigos estáticos do repositório — prerenderizados. `entries` enumera os
// slugs para não depender só do crawl a partir de /blog.
export const prerender = true;

export const entries = () => getAllPosts().map((post) => ({ slug: post.slug }));

export const load: PageServerLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) {
		error(404, { message: 'Não encontrei este artigo.' });
	}

	return {
		post,
		related: relatedPosts(params.slug, 2)
	};
};
