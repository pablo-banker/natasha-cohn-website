<script lang="ts">
	import { sections } from '$lib/content/home';
	import { rituals } from '$lib/content/rituals';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import RitualCard from '$lib/components/rituals/RitualCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';

	const preview = rituals.slice(0, 3);
</script>

<section class="py-24 lg:py-32" aria-labelledby="rituals-title">
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
