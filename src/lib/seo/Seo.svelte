<script lang="ts">
	import { site } from '$lib/content/site';
	import type { SeoInput } from './types';

	let { seo }: { seo: SeoInput } = $props();

	const canonical = $derived(new URL(seo.path, site.url).toString());
	const fullTitle = $derived(
		seo.path === '/' ? `${site.legalName} — ${site.tagline}` : `${seo.title} | ${site.legalName}`
	);
	const image = $derived(seo.image ?? { url: '/og/og-default.jpg', alt: site.legalName });
	const imageUrl = $derived(new URL(image.url, site.url).toString());

	// Serializa JSON-LD escapando "<" para evitar quebra da tag <script>.
	const jsonLd = $derived(
		seo.structuredData ? JSON.stringify(seo.structuredData).replace(/</g, '\\u003c') : null
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={canonical} />

	{#if seo.noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<!-- Idiomas: apenas pt-BR publicado. Ao publicar o inglês, adicionar
	     a alternativa correspondente (ver docs/MIGRATION.md). -->
	<link rel="alternate" hreflang="pt-BR" href={canonical} />
	<link rel="alternate" hreflang="x-default" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:site_name" content={site.legalName} />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:type" content={seo.type ?? 'website'} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={image.alt} />

	{#if seo.article}
		{#if seo.article.publishedTime}
			<meta property="article:published_time" content={seo.article.publishedTime} />
		{/if}
		{#if seo.article.modifiedTime}
			<meta property="article:modified_time" content={seo.article.modifiedTime} />
		{/if}
		{#if seo.article.author}
			<meta property="article:author" content={seo.article.author} />
		{/if}
		{#if seo.article.section}
			<meta property="article:section" content={seo.article.section} />
		{/if}
	{/if}

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if jsonLd}
		<!-- JSON-LD é gerado por nós; os "<" já vêm escapados (<) para não
		     quebrar a tag. Não há entrada de usuário aqui. O "<\/script>" é
		     escapado para não confundir o parser do compilador. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
		{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
	{/if}
</svelte:head>
