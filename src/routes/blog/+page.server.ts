import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/blog';

export const load: PageServerLoad = () => {
	return { posts: getAllPosts() };
};
