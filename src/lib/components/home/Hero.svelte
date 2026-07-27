<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { hero, stats } from '$lib/content/home';
	import Button from '$lib/components/ui/Button.svelte';
	import Stats from '$lib/components/ui/Stats.svelte';
	import PortraitFrame from './PortraitFrame.svelte';
	import HeroBackground from '$lib/components/motion/HeroBackground.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';
</script>

<!--
	Sequência de entrada (cada peça é independente e degrada sozinha):
	eyebrow → título por linha → texto → botões → retrato → autoridade.
	Tudo é renderizado no servidor e permanece visível sem JavaScript.
-->
<section
	class="relative isolate overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
	aria-labelledby="hero-title"
>
	<HeroBackground />

	<div class="container-editorial">
		<div class="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
			<!-- Coluna de texto (primeira no DOM → primeira no mobile) -->
			<div class="max-w-xl">
				<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6, delay: 0.1, start: 'top bottom' }}>
					{hero.eyebrow}
				</p>

				<h1
					id="hero-title"
					class="text-display text-ink mt-5"
					use:revealLines={{ delay: 0.25, duration: 1.05, stagger: 0.1 }}
				>
					{hero.title}
				</h1>

				<p
					class="text-lead text-ink-soft mt-7"
					use:reveal={{ y: 18, delay: 0.55, start: 'top bottom' }}
				>
					{hero.lead}
				</p>

				<div
					class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
					use:reveal={{ y: 16, delay: 0.7, start: 'top bottom' }}
				>
					<Button href={hero.primaryCta.href} magnetic>
						{hero.primaryCta.label}
						<ArrowRight
							class="size-4 transition-transform duration-300 group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</Button>
					<Button href={hero.secondaryCta.href} variant="secondary">
						{hero.secondaryCta.label}
					</Button>
				</div>
			</div>

			<!-- Retrato -->
			<div class="relative" use:reveal={{ y: 0, scale: 1, delay: 0.3, start: 'top bottom' }}>
				<PortraitFrame src={hero.portrait} alt={hero.portraitAlt} priority animate />

				<!-- Detalhe editorial discreto (acento teal — cor do slogan da marca) -->
				<p
					class="font-accent-italic text-teal-deep mt-6 flex items-center gap-3 text-sm lg:absolute
						lg:bottom-6 lg:-left-6 lg:mt-0 lg:origin-bottom-left lg:-rotate-90"
				>
					<span class="bg-teal/50 hidden h-px w-8 lg:block" aria-hidden="true"></span>
					celebro onde o amor chamar
				</p>
			</div>
		</div>

		<!-- Autoridade: entra por último -->
		<div
			class="border-border mt-16 border-t pt-10 lg:mt-24"
			use:reveal={{ y: 20, delay: 0.9, start: 'top bottom' }}
		>
			<Stats {stats} />
		</div>
	</div>
</section>
