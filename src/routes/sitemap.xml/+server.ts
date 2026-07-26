import type { RequestHandler } from './$types';
import { site } from '$lib/content/site';
import { blogPostsByDate } from '$lib/content/blog-index';

type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };

const staticPages: Entry[] = [
	{ path: '/', changefreq: 'monthly', priority: '1.0' },
	{ path: '/a-celebrante', changefreq: 'yearly', priority: '0.9' },
	{ path: '/cerimonias', changefreq: 'yearly', priority: '0.9' },
	{ path: '/ritos', changefreq: 'yearly', priority: '0.8' },
	{ path: '/depoimentos', changefreq: 'monthly', priority: '0.8' },
	{ path: '/blog', changefreq: 'monthly', priority: '0.7' },
	{ path: '/contato', changefreq: 'yearly', priority: '0.9' },
	{ path: '/politica-de-privacidade', changefreq: 'yearly', priority: '0.2' }
];

export const GET: RequestHandler = () => {
	const entries: Entry[] = [
		...staticPages,
		...blogPostsByDate.map((post) => ({
			path: `/blog/${post.slug}`,
			changefreq: 'yearly',
			priority: '0.6',
			lastmod: post.updated ?? post.date
		}))
	];

	const urls = entries
		.map(
			(entry) => `	<url>
		<loc>${new URL(entry.path, site.url).toString()}</loc>${entry.lastmod ? `\n\t\t<lastmod>${entry.lastmod}</lastmod>` : ''}
		<changefreq>${entry.changefreq}</changefreq>
		<priority>${entry.priority}</priority>
	</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
