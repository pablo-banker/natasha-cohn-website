import { site } from '$lib/content/site';
import { socialLinks } from '$lib/content/social';
import type { BlogPostMeta } from '$lib/types';

/**
 * Construtores de JSON-LD (schema.org).
 *
 * NOTA IMPORTANTE: não emitimos `Review` nem `AggregateRating`. Os
 * depoimentos da Natasha são reais, mas não possuem nota/avaliação
 * numérica — inventar `ratingValue` violaria as diretrizes do schema.org e
 * do Google. Além disso, avaliações auto-hospedadas sobre o próprio negócio
 * não são elegíveis a rich results. Os depoimentos seguem visíveis para
 * pessoas, apenas sem marcação de avaliação.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

export function personSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${site.url}/#natasha`,
		name: site.name,
		jobTitle: site.role,
		description: site.description,
		url: site.url,
		email: `mailto:${site.email}`,
		knowsLanguage: site.languages,
		sameAs: socialLinks.map((s) => s.href)
	};
}

export function professionalServiceSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${site.url}/#business`,
		name: site.legalName,
		description: site.description,
		url: site.url,
		email: `mailto:${site.email}`,
		telephone: site.phones.map((p) => p.href.replace('tel:', '')),
		areaServed: site.serviceArea,
		availableLanguage: site.languages,
		founder: { '@id': `${site.url}/#natasha` },
		sameAs: socialLinks.map((s) => s.href)
	};
}

export function webSiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${site.url}/#website`,
		name: site.legalName,
		url: site.url,
		inLanguage: site.locale,
		publisher: { '@id': `${site.url}/#business` }
	};
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absolute(item.path)
		}))
	};
}

export function articleSchema(post: BlogPostMeta) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		dateModified: post.updated ?? post.date,
		inLanguage: site.locale,
		author: { '@type': 'Person', name: post.author, url: absolute('/a-celebrante') },
		publisher: { '@id': `${site.url}/#business` },
		mainEntityOfPage: absolute(`/blog/${post.slug}`),
		...(post.coverImage ? { image: absolute(post.coverImage) } : {})
	};
}

/** Só emitir quando houver dados reais suficientes (nome, thumbnail, data). */
export function videoSchema(video: {
	name: string;
	description: string;
	thumbnailUrl: string;
	uploadDate: string;
	embedUrl?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.name,
		description: video.description,
		thumbnailUrl: video.thumbnailUrl,
		uploadDate: video.uploadDate,
		...(video.embedUrl ? { embedUrl: video.embedUrl } : {})
	};
}
