<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { rituals } from '$lib/content/rituals';
	import { breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Ritos', path: '/ritos' }
	];
</script>

<Seo
	seo={{
		title: 'Ritos',
		description:
			'Areias, handfasting, plantio da árvore, filtro dos sonhos, lava-pés e outros ritos cheios de significado. Nada é obrigatório: os ritos são sempre escolha do casal.',
		path: '/ritos',
		structuredData: breadcrumbSchema(breadcrumbs)
	}}
/>

<PageHeader
	eyebrow="Ritos"
	title="Beleza, recordações, simbologias"
	lead="Gestos que dizem aquilo que as palavras começam. Escolha os que fizerem sentido para a história de vocês — nenhum deles é obrigatório."
	{breadcrumbs}
/>

<section class="py-20 lg:py-28" aria-label="Lista de ritos">
	<div class="container-editorial">
		<div class="flex flex-col">
			{#each rituals as ritual, index (ritual.slug)}
				<article
					id={ritual.slug}
					class="border-border grid gap-8 border-b py-14 last:border-0 lg:grid-cols-12
						lg:items-center lg:gap-14 lg:py-18"
					use:reveal={{ y: 26 }}
				>
					<div class="lg:col-span-5 {index % 2 === 1 ? 'lg:order-2 lg:col-start-8' : ''}">
						<ImageFrame
							src={ritual.image}
							alt={ritual.imageAlt}
							ratio="aspect-[19/13]"
							sizes="(max-width: 1024px) 88vw, 40vw"
						/>
					</div>

					<div
						class="lg:col-span-6 {index % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}"
					>
						<p class="eyebrow text-ink-mute">
							{String(index + 1).padStart(2, '0')}
						</p>
						<h2 class="font-display text-h3 text-ink mt-4">{ritual.name}</h2>
						<p class="prose-measure text-lead text-ink-soft mt-4">{ritual.meaning}</p>

						<p class="mt-6 flex items-start gap-3">
							<span class="bg-clay/60 mt-3 h-px w-6 shrink-0" aria-hidden="true"></span>
							<span class="font-accent-italic text-ink-mute">
								<span class="sr-only">Quando faz sentido: </span>{ritual.whenItMakesSense}
							</span>
						</p>
					</div>
				</article>
			{/each}
		</div>

		<div class="border-border mt-16 border-t pt-12" use:reveal={{ y: 18 }}>
			<p class="font-accent-italic text-h3 text-teal-deep max-w-2xl">
				Nada é obrigatório. Tudo é escolha de vocês.
			</p>
			<div class="mt-8">
				<Button href="/contato" magnetic>Conversar sobre os ritos</Button>
			</div>
		</div>
	</div>
</section>
