<script lang="ts">
	import { processSteps } from '$lib/content/process';
	import { drawLine } from '$lib/animations/scroll';
	import { reveal } from '$lib/animations/reveal';
</script>

<!--
	A linha é um traço SVG desenhado conforme a rolagem (GSAP + ScrollTrigger),
	dando a sensação de uma história se formando. O traço é decorativo: toda a
	informação está no texto, que é lido normalmente sem JavaScript.
-->
<div class="relative">
	<svg
		class="pointer-events-none absolute inset-y-0 left-[0.6875rem] w-6 lg:left-[1.4375rem] lg:w-12"
		viewBox="0 0 40 1000"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<path
			d="M20 0 C 6 120, 34 240, 20 360 S 6 600, 20 720 S 34 900, 20 1000"
			fill="none"
			stroke="var(--color-teal)"
			stroke-width="1.25"
			stroke-linecap="round"
			opacity="0.7"
			vector-effect="non-scaling-stroke"
			use:drawLine={{ start: 'top 75%', end: 'bottom 60%' }}
		/>
	</svg>

	<ol class="relative flex flex-col gap-14 lg:gap-20">
		{#each processSteps as step (step.number)}
			<li class="relative pl-14 lg:pl-28" use:reveal={{ y: 26, duration: 0.9 }}>
				<!-- Marcador sobre a linha -->
				<span
					class="border-teal bg-paper absolute top-2 left-[0.375rem] size-3 rounded-full border
						lg:left-[1.125rem]"
					aria-hidden="true"
				></span>

				<p class="eyebrow text-ink-mute">{step.number}</p>
				<h3 class="font-display text-h3 text-ink mt-3">{step.title}</h3>
				<p class="prose-measure text-ink-soft mt-3">{step.description}</p>
			</li>
		{/each}
	</ol>
</div>
