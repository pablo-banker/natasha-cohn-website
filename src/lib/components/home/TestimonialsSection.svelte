<script lang="ts">
	import { sections } from '$lib/content/home';
	import { featuredTestimonials } from '$lib/content/testimonials';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import TestimonialCarousel from '$lib/components/testimonials/TestimonialCarousel.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';

	// No carrossel usamos o trecho curto (highlight) de cada depoimento —
	// os textos completos vivem na página /depoimentos.
	const selection = featuredTestimonials.map((t) => ({
		...t,
		quote: t.highlight ?? t.quote
	}));
</script>

<section class="bg-surface py-24 lg:py-32" aria-labelledby="testimonials-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-4">
				<SectionIntro
					eyebrow={sections.testimonials.eyebrow}
					title={sections.testimonials.title}
					lead={sections.testimonials.lead}
					id="testimonials-title"
				/>
				<div class="mt-9" use:reveal={{ y: 14 }}>
					<Button href="/depoimentos" variant="secondary">Ler todos os depoimentos</Button>
				</div>
			</div>

			<div class="lg:col-span-7 lg:col-start-6" use:reveal={{ y: 24 }}>
				<TestimonialCarousel testimonials={selection} />
			</div>
		</div>
	</div>
</section>
