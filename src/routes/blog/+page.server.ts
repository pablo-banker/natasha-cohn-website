import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/blog';

// Conteúdo estático (posts do repositório) — prerenderizado; o crawler segue
// os links dos cards para prerenderizar cada /blog/[slug].
export const prerender = true;

export const load: PageServerLoad = () => {
	return { posts: getAllPosts() };
};
