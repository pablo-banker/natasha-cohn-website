import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost } from '$lib/server/blog';
import { relatedPosts } from '$lib/content/blog-index';

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
