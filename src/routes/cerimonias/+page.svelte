<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ProcessTimeline from '$lib/components/home/ProcessTimeline.svelte';
	import { ceremonies } from '$lib/content/ceremonies';
	import { sections } from '$lib/content/home';
	import { professionalServiceSchema, breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Cerimônias', path: '/cerimonias' }
	];
</script>

<Seo
	seo={{
		title: 'Cerimônias',
		description:
			'Casamentos, cerimônias bilíngues, apadrinhamento, celebrações de amor, mentoria para celebrantes e eventos corporativos — sempre com texto autoral escrito sob medida.',
		path: '/cerimonias',
		structuredData: [professionalServiceSchema(), breadcrumbSchema(breadcrumbs)]
	}}
/>

<PageHeader
	eyebrow={sections.ceremonies.eyebrow}
	title={sections.ceremonies.title}
	lead={sections.ceremonies.lead}
	{breadcrumbs}
/>

<!-- Cada serviço como uma faixa editorial, com âncora própria -->
{#each ceremonies as ceremony, index (ceremony.slug)}
	<section
		id={ceremony.slug}
		class="border-border border-b py-20 lg:py-28 {index % 2 === 1 ? 'bg-surface' : ''}"
		aria-labelledby="{ceremony.slug}-title"
	>
		<div class="container-editorial">
			<div
				class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 {index % 2 === 1
					? 'lg:[&>*:first-child]:order-2'
					: ''}"
			>
				<div class="lg:col-span-6">
					<p class="eyebrow text-ink-mute" use:reveal={{ y: 12, duration: 0.6 }}>
						{ceremony.number}
					</p>
					<h2 id="{ceremony.slug}-title" class="text-h2 text-ink mt-4" use:reveal={{ y: 22 }}>
						{ceremony.title}
					</h2>
					<p
						class="font-accent-italic text-lead text-teal-deep mt-4"
						use:reveal={{ y: 18, delay: 0.05 }}
					>
						{ceremony.summary}
					</p>
					<p class="prose-measure text-ink-soft mt-6" use:reveal={{ y: 18, delay: 0.1 }}>
						{ceremony.description}
					</p>
					<div class="mt-9" use:reveal={{ y: 14, delay: 0.15 }}>
						<Button href="/contato" variant="secondary">Falar sobre esta cerimônia</Button>
					</div>
				</div>

				<div class="lg:col-span-5 {index % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-8'}">
					<ImageFrame
						src={ceremony.image}
						alt={ceremony.imageAlt}
						ratio="aspect-[4/5]"
						sizes="(max-width: 1024px) 90vw, 40vw"
					/>
				</div>
			</div>
		</div>
	</section>
{/each}

<!-- Processo -->
<section class="py-24 lg:py-32" aria-labelledby="processo-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5">
				<div class="lg:sticky lg:top-32">
					<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>{sections.process.eyebrow}</p>
					<h2 id="processo-title" class="text-h2 text-ink mt-5" use:reveal={{ y: 22 }}>
						{sections.process.title}
					</h2>
					<p class="text-lead text-ink-soft mt-6" use:reveal={{ y: 18, delay: 0.1 }}>
						{sections.process.lead}
					</p>
				</div>
			</div>
			<div class="lg:col-span-6 lg:col-start-7">
				<ProcessTimeline />
			</div>
		</div>
	</div>
</section>
