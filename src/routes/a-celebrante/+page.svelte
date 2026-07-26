<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Stats from '$lib/components/ui/Stats.svelte';
	import { about } from '$lib/content/about';
	import { stats } from '$lib/content/home';
	import { site } from '$lib/content/site';
	import { personSchema, breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';
	import { parallax } from '$lib/animations/parallax';

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'A celebrante', path: '/a-celebrante' }
	];
</script>

<Seo
	seo={{
		title: 'A celebrante — Natasha Cohn',
		description:
			'Celebrante desde 2018 e mais de 380 cerimônias exclusivas. Conheça a história de Natasha Cohn, seu jeito de escutar e de escrever cerimônias autorais em português, inglês e espanhol.',
		path: '/a-celebrante',
		type: 'profile',
		structuredData: [personSchema(), breadcrumbSchema(breadcrumbs)]
	}}
/>

<PageHeader eyebrow={about.eyebrow} title={about.title} lead={about.intro} {breadcrumbs} />

<!-- História -->
<section class="py-20 lg:py-28" aria-labelledby="historia-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5">
				<div use:parallax={{ distance: 30 }}>
					<ImageFrame
						src={about.portrait}
						alt={about.portraitAlt}
						focus={about.portraitFocus}
						ratio="aspect-[4/5]"
						sizes="(max-width: 1024px) 90vw, 40vw"
						priority
					/>
				</div>

				<p
					class="border-teal/50 text-teal-deep mt-6 flex items-start gap-3 border-l pl-4 text-sm"
					use:reveal={{ y: 14 }}
				>
					<span class="font-accent-italic">{about.badge}</span>
				</p>
			</div>

			<div class="lg:col-span-6 lg:col-start-7">
				<h2 id="historia-title" class="sr-only">A história de Natasha</h2>
				<div class="flex flex-col gap-6" use:reveal={{ stagger: 'p', y: 22 }}>
					{#each about.story as paragraph, i (i)}
						<p class="text-lead text-ink-soft">{paragraph}</p>
					{/each}
				</div>

				<div class="border-border mt-12 border-t pt-10">
					<Stats {stats} />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Valores -->
<section class="bg-surface py-20 lg:py-28" aria-labelledby="valores-title">
	<div class="container-editorial">
		<h2 id="valores-title" class="text-h2 text-ink max-w-2xl" use:reveal={{ y: 22 }}>
			O que me guia
		</h2>

		<dl
			class="mt-12 grid gap-10 sm:grid-cols-3 lg:gap-14"
			use:reveal={{ stagger: '.value-item', y: 22, staggerAmount: 0.1 }}
		>
			{#each about.values as value (value.title)}
				<div class="value-item border-clay/30 border-t pt-6">
					<dt class="font-display text-h4 text-ink">{value.title}</dt>
					<dd class="text-ink-soft mt-3">{value.text}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- Idiomas e regiões -->
<section class="py-20 lg:py-28" aria-labelledby="alcance-title">
	<div class="container-editorial">
		<h2 id="alcance-title" class="sr-only">Idiomas e regiões atendidas</h2>
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
			<div use:reveal={{ y: 22 }}>
				<h3 class="font-display text-h3 text-ink">{about.languages.title}</h3>
				<p class="prose-measure text-lead text-ink-soft mt-4">{about.languages.text}</p>
				<ul class="mt-6 flex flex-wrap gap-2">
					{#each site.languages as language (language)}
						<li class="border-border text-ink-soft border px-4 py-2 text-sm">{language}</li>
					{/each}
				</ul>
			</div>

			<div use:reveal={{ y: 22, delay: 0.1 }}>
				<h3 class="font-display text-h3 text-ink">{about.regions.title}</h3>
				<p class="prose-measure text-lead text-ink-soft mt-4">{about.regions.text}</p>
			</div>
		</div>

		<div class="mt-14" use:reveal={{ y: 16 }}>
			<Button href={about.cta.href} magnetic>{about.cta.label}</Button>
		</div>
	</div>
</section>
