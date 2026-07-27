<script lang="ts">
	import { site } from '$lib/content/site';
	import type { SeoInput } from './types';

	let { seo }: { seo: SeoInput } = $props();

	const canonical = $derived(new URL(seo.path, site.url).toString());
	// Home: nome + o que ela faz (keyword principal). Demais páginas: título
	// da página + marca. O slogan emocional segue na meta description.
	const fullTitle = $derived(
		seo.path === '/' ? `${site.name} — ${seo.title}` : `${seo.title} | ${site.legalName}`
	);
	const image = $derived(seo.image ?? { url: '/og/og-default.jpg', alt: site.legalName });
	const imageUrl = $derived(new URL(image.url, site.url).toString());

	// Serializa JSON-LD escapando "<" para evitar quebra da tag <script>.
	const jsonLd = $derived(
		seo.structuredData ? JSON.stringify(seo.structuredData).replace(/</g, '\\u003c') : null
	);

	// Tipo MIME da imagem de preload (deixa o browser ignorar formatos que não
	// suporta, sem baixar à toa).
	const preloadType = $derived(
		seo.preloadImage?.endsWith('.avif')
			? 'image/avif'
			: seo.preloadImage?.endsWith('.webp')
				? 'image/webp'
				: seo.preloadImage?.match(/\.jpe?g$/)
					? 'image/jpeg'
					: undefined
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={canonical} />

	{#if seo.preloadImage}
		<link
			rel="preload"
			as="image"
			href={seo.preloadImage}
			type={preloadType}
			fetchpriority="high"
		/>
	{/if}

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
