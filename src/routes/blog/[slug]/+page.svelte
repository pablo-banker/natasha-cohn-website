<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/seo/Seo.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { formatDatePt } from '$lib/utils/format';
	import { articleSchema, breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	let { data } = $props();

	const post = $derived(data.post);
	const breadcrumbs = $derived([
		{ name: 'Início', path: '/' },
		{ name: 'Blog', path: '/blog' },
		{ name: post.title, path: `/blog/${post.slug}` }
	]);
</script>

<Seo
	seo={{
		title: post.title,
		description: post.description,
		path: `/blog/${post.slug}`,
		type: 'article',
		image: post.coverImage ? { url: post.coverImage, alt: post.coverAlt } : undefined,
		article: {
			publishedTime: post.date,
			modifiedTime: post.updated ?? post.date,
			author: post.author,
			section: post.category
		},
		structuredData: [articleSchema(post), breadcrumbSchema(breadcrumbs)]
	}}
/>

<article class="pt-32 pb-20 lg:pt-40 lg:pb-28">
	<!-- Cabeçalho do artigo -->
	<header class="container-editorial">
		<nav aria-label="Trilha de navegação" class="mb-8">
			<a
				href="/blog"
				class="text-ink-mute hover:text-clay inline-flex items-center gap-2 text-sm transition-colors"
			>
				<ArrowLeft class="size-4" aria-hidden="true" />
				Voltar para o blog
			</a>
		</nav>

		<div class="max-w-3xl">
			<p class="text-ink-mute flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
				{#if post.category}
					<span class="eyebrow text-clay">{post.category}</span>
					<span aria-hidden="true">·</span>
				{/if}
				<time datetime={post.date}>{formatDatePt(post.date)}</time>
				<span aria-hidden="true">·</span>
				<span>{post.readingMinutes} min de leitura</span>
			</p>

			<h1 class="text-h1 text-ink mt-5">{post.title}</h1>

			<p class="text-lead text-ink-soft mt-6">{post.description}</p>

			<p class="border-border text-ink-mute mt-8 border-t pt-6 text-sm">
				por <span class="text-ink font-medium">{post.author}</span>
				{#if post.updated && post.updated !== post.date}
					· atualizado em {formatDatePt(post.updated)}
				{/if}
			</p>
		</div>
	</header>

	{#if post.coverImage}
		<div class="container-editorial mt-12">
			<ImageFrame
				src={post.coverImage}
				alt={post.coverAlt}
				ratio="aspect-[16/9]"
				sizes="(max-width: 1024px) 92vw, 78rem"
				priority
			/>
		</div>
	{/if}

	<!-- Corpo do artigo -->
	<div class="container-editorial mt-14">
		<div class="post-body prose max-w-[42rem]">
			<!-- HTML gerado no servidor a partir do nosso próprio Markdown
			     (src/lib/content/blog), não de entrada de usuário. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html post.html}
		</div>
	</div>
</article>

<!-- Artigos relacionados -->
{#if data.related.length > 0}
	<section class="border-border bg-surface border-t py-20 lg:py-24" aria-labelledby="relacionados">
		<div class="container-editorial">
			<h2 id="relacionados" class="text-h3 font-display text-ink">Continue lendo</h2>
			<div
				class="mt-10 grid gap-x-12 gap-y-14 sm:grid-cols-2"
				use:reveal={{ stagger: '.related-item', y: 24 }}
			>
				{#each data.related as related (related.slug)}
					<div class="related-item">
						<BlogCard post={related} />
					</div>
				{/each}
			</div>

			<div class="border-border mt-16 border-t pt-10">
				<Button href="/contato" variant="secondary">Falar sobre a cerimônia de vocês</Button>
			</div>
		</div>
	</section>
{/if}

<style>
	/*
		Tipografia de leitura. Usamos o plugin @tailwindcss/typography como
		base e ajustamos às cores e fontes da marca.
	*/
	.post-body {
		--tw-prose-body: var(--color-ink-soft);
		--tw-prose-headings: var(--color-ink);
		--tw-prose-links: var(--color-clay);
		--tw-prose-bold: var(--color-ink);
		--tw-prose-quotes: var(--color-ink);
		--tw-prose-quote-borders: var(--color-clay);
		--tw-prose-bullets: var(--color-clay);
		--tw-prose-hr: var(--color-border);
		font-size: 1.0625rem;
		line-height: 1.75;
	}

	.post-body :global(h2) {
		font-family: var(--font-display);
		font-size: var(--text-h3);
		line-height: 1.2;
		margin-top: 2.75rem;
		margin-bottom: 1rem;
	}

	.post-body :global(h3) {
		font-family: var(--font-display);
		font-size: var(--text-h4);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	.post-body :global(p) {
		margin-bottom: 1.35rem;
	}

	.post-body :global(a) {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.post-body :global(blockquote) {
		font-family: var(--font-accent);
		font-style: italic;
		border-left: 2px solid var(--color-clay);
		padding-left: 1.25rem;
	}
</style>
