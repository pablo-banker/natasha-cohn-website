<script lang="ts">
	import { finalCta } from '$lib/content/home';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';
</script>

<section class="relative overflow-hidden py-24 lg:py-32" aria-labelledby="final-cta-title">
	<div class="container-editorial">
		<div class="cta-panel relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-12 lg:py-20">
			<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>{finalCta.eyebrow}</p>

			<h2
				id="final-cta-title"
				class="text-h2 text-ink mx-auto mt-6 max-w-2xl"
				use:revealLines={{ onScroll: true }}
			>
				{finalCta.title}
			</h2>

			<p class="text-lead text-ink-soft mx-auto mt-6 max-w-xl" use:reveal={{ y: 18, delay: 0.1 }}>
				{finalCta.body}
			</p>

			<div
				class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
				use:reveal={{ y: 16, delay: 0.15 }}
			>
				<Button href={finalCta.primary.href} magnetic>{finalCta.primary.label}</Button>
				<WhatsAppCTA variant="inline" />
			</div>
		</div>
	</div>
</section>

<style>
	/* Moldura editorial desenhada com pseudo-elementos, sem HTML vazio */
	.cta-panel::before {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid var(--color-border);
		background-color: var(--color-surface);
		z-index: -2;
	}

	.cta-panel::after {
		content: '';
		position: absolute;
		inset: 0.75rem;
		border: 1px solid var(--color-teal);
		opacity: 0.4;
		z-index: -1;
		pointer-events: none;
	}
</style>
