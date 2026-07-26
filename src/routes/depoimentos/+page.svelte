<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import Quote from '$lib/components/ui/Quote.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { testimonials } from '$lib/content/testimonials';
	import { breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Depoimentos', path: '/depoimentos' }
	];
</script>

<Seo
	seo={{
		title: 'Depoimentos',
		description:
			'Palavras de amor de casais que confiaram a Natasha Cohn o dia mais importante das suas histórias.',
		path: '/depoimentos',
		structuredData: breadcrumbSchema(breadcrumbs)
	}}
/>

<PageHeader
	eyebrow="Depoimentos"
	title="Palavras de amor"
	lead="Quem viveu conta melhor do que eu. Estes são depoimentos reais de casais — transcritos na íntegra, exatamente como foram escritos."
	{breadcrumbs}
/>

<!--
	Layout em colunas (masonry) para acomodar com elegância depoimentos de
	tamanhos bem diferentes. break-inside-avoid mantém cada card inteiro.
-->
<section class="py-20 lg:py-28" aria-label="Todos os depoimentos">
	<div class="container-editorial">
		<div
			class="columns-1 gap-x-12 sm:columns-2 lg:columns-3"
			use:reveal={{ stagger: '.testimonial-item', y: 24, staggerAmount: 0.06 }}
		>
			{#each testimonials as testimonial (testimonial.author + testimonial.quote)}
				<div class="testimonial-item border-border mb-12 break-inside-avoid border-t pt-8">
					<Quote
						quote={testimonial.quote}
						author={testimonial.author}
						context={testimonial.context}
						image={testimonial.image}
						imageAlt={testimonial.imageAlt}
					/>
				</div>
			{/each}
		</div>

		<div class="border-border mt-16 border-t pt-12 text-center" use:reveal={{ y: 18 }}>
			<p class="font-accent-italic text-h3 text-teal-deep mx-auto max-w-2xl">
				Que tal a história de vocês por aqui?
			</p>
			<div class="mt-8 flex justify-center">
				<Button href="/contato" magnetic>Quero contar nossa história</Button>
			</div>
		</div>
	</div>
</section>
