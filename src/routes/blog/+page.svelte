<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	let { data } = $props();

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Blog', path: '/blog' }
	];
</script>

<Seo
	seo={{
		title: 'Blog',
		description:
			'Textos sobre ritos, escolhas e os detalhes que fazem um casamento ser de verdade — escritos por Natasha Cohn.',
		path: '/blog',
		structuredData: breadcrumbSchema(breadcrumbs)
	}}
/>

<PageHeader
	eyebrow="Do meu caderno"
	title="Textos para quem está começando a sonhar"
	lead="Reflexões sobre ritos, escolhas e os detalhes que fazem uma cerimônia ser verdadeiramente de vocês."
	{breadcrumbs}
/>

<section class="py-20 lg:py-28" aria-label="Lista de artigos">
	<div class="container-editorial">
		{#if data.posts.length > 0}
			<div
				class="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
				use:reveal={{ stagger: '.blog-item', y: 26, staggerAmount: 0.1 }}
			>
				{#each data.posts as post (post.slug)}
					<div class="blog-item">
						<BlogCard {post} readingMinutes={post.readingMinutes} />
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-lead text-ink-soft">Em breve, novos textos por aqui.</p>
		{/if}

		<div class="border-border mt-20 border-t pt-12" use:reveal={{ y: 18 }}>
			<p class="font-accent-italic text-h3 text-teal-deep max-w-2xl">
				Ficou com alguma dúvida sobre a cerimônia de vocês?
			</p>
			<div class="mt-8">
				<Button href="/contato" variant="secondary">Vamos conversar</Button>
			</div>
		</div>
	</div>
</section>
