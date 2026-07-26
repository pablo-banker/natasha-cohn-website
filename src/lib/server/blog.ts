import { marked } from 'marked';
import type { BlogPost, BlogPostMeta } from '$lib/types';
import { blogMetaBySlug, blogPostsByDate } from '$lib/content/blog-index';
import { readingMinutes } from '$lib/utils/format';

// Corpo dos artigos em Markdown, carregado em tempo de build.
const rawFiles = import.meta.glob('../content/blog/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Mapeia slug (nome do arquivo sem extensão) → markdown bruto.
const rawBySlug: Record<string, string> = {};
for (const [path, raw] of Object.entries(rawFiles)) {
	const slug = path.split('/').pop()?.replace(/\.md$/, '');
	if (slug) rawBySlug[slug] = raw;
}

marked.setOptions({ gfm: true, breaks: false });

/** Retorna o artigo completo (meta + HTML renderizado) ou null. */
export function getPost(slug: string): BlogPost | null {
	const meta = blogMetaBySlug(slug);
	const raw = rawBySlug[slug];
	if (!meta || !raw) return null;

	const html = marked.parse(raw) as string;
	return {
		...meta,
		html,
		readingMinutes: readingMinutes(raw)
	};
}

/** Slugs existentes — usado para prerender / entries(). */
export function getPostSlugs(): string[] {
	return Object.keys(rawBySlug);
}

/** Metadados de todos os artigos com tempo de leitura, do mais recente ao mais antigo. */
export function getAllPosts(): (BlogPostMeta & { readingMinutes: number })[] {
	return blogPostsByDate
		.filter((meta) => rawBySlug[meta.slug])
		.map((meta) => ({
			...meta,
			readingMinutes: readingMinutes(rawBySlug[meta.slug])
		}));
}
