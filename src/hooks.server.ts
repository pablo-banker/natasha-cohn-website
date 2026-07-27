import { redirect, type Handle } from '@sveltejs/kit';

/**
 * Redirects 301 das URLs do Wix para a nova estrutura.
 * O SEO acumulado é preservado. Ver docs/MIGRATION.md para o mapa completo.
 *
 * As chaves são comparadas já decodificadas (as URLs antigas de posts têm
 * acentos percent-encoded).
 */
const permanentRedirects: Record<string, string> = {
	// Páginas
	'/services-4': '/cerimonias',
	'/vamos-conversar': '/contato',
	'/videos': '/#videos',
	'/inicio': '/',
	'/home': '/',

	// Artigos do blog (slugs antigos, com acentos, → slugs limpos)
	'/post/os-ritos-de-uma-cerimônia-de-casamento-simbolismo-além-da-religião':
		'/blog/os-ritos-de-uma-cerimonia-de-casamento',
	'/post/os-regimes-de-casamento-entendendo-as-escolhas-e-implicações-legais':
		'/blog/os-regimes-de-casamento'
};

/** Cabeçalhos de segurança aplicados a todas as respostas. */
const securityHeaders: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Frame-Options': 'SAMEORIGIN',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

export const handle: Handle = async ({ event, resolve }) => {
	// Normaliza: decodifica acentos e remove a barra final (exceto na raiz).
	let pathname = decodeURIComponent(event.url.pathname);
	if (pathname.length > 1 && pathname.endsWith('/')) {
		pathname = pathname.slice(0, -1);
	}

	const target = permanentRedirects[pathname] ?? permanentRedirects[pathname.toLowerCase()];
	if (target) {
		redirect(301, target);
	}

	// Qualquer outro /post/* antigo cai na listagem do blog.
	if (pathname.startsWith('/post/')) {
		redirect(301, '/blog');
	}

	const response = await resolve(event);

	for (const [header, value] of Object.entries(securityHeaders)) {
		response.headers.set(header, value);
	}

	// Links-fantasma de proposta: reforça o noindex também no header (a meta
	// tag SSR já cobre; isto é defesa em profundidade contra indexação/cache).
	if (pathname.startsWith('/proposta-')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	return response;
};
