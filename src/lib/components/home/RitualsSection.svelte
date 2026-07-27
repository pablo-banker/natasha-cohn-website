<script lang="ts">
	import { sections } from '$lib/content/home';
	import { rituals } from '$lib/content/rituals';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import RitualCard from '$lib/components/rituals/RitualCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';
	import BrandMandala from '$lib/components/motion/BrandMandala.svelte';
	import ScrollGlow from '$lib/components/motion/ScrollGlow.svelte';

	const preview = rituals.slice(0, 3);
</script>

<section class="relative isolate overflow-hidden py-24 lg:py-32" aria-labelledby="rituals-title">
	<!-- Halo de luz atravessando + mandala próxima aos ritos (baixa opacidade). -->
	<ScrollGlow class="top-0 -right-1/4 h-full w-2/3" color="rgba(220,150,90,0.12)" />
	<BrandMandala class="-top-28 -left-40" size="30rem" opacity={0.06} rotate={16} />

	<div class="container-editorial">
		<div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
			<SectionIntro
				eyebrow={sections.rituals.eyebrow}
				title={sections.rituals.title}
				lead={sections.rituals.lead}
				id="rituals-title"
			/>
			<div class="shrink-0" use:reveal={{ y: 14 }}>
				<Button href="/ritos" variant="ghost">Conhecer todos os ritos</Button>
			</div>
		</div>

		<div
			class="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12"
			use:reveal={{ stagger: '.ritual-item', y: 26, staggerAmount: 0.1 }}
		>
			{#each preview as ritual, index (ritual.slug)}
				<div class="ritual-item {index === 1 ? 'sm:pt-12' : ''}">
					<RitualCard {ritual} {index} />
				</div>
			{/each}
		</div>
	</div>
</section>
