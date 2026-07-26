import type { RequestHandler } from './$types';
import { site } from '$lib/content/site';

export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site.url).toString()}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
