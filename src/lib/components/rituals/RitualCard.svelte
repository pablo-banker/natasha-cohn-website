<script lang="ts">
	import type { Ritual } from '$lib/types';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';

	type Props = {
		ritual: Ritual;
		/** `full` exibe também "quando faz sentido" (página de ritos). */
		detail?: 'compact' | 'full';
		/** Índice usado apenas para alternar o grafismo. */
		index?: number;
	};

	let { ritual, detail = 'compact', index = 0 }: Props = $props();
</script>

<article class="ritual group relative flex flex-col" data-motif={index % 3}>
	<a href="/ritos#{ritual.slug}" class="flex flex-1 flex-col focus-visible:outline-offset-6">
		<ImageFrame
			src={ritual.image}
			alt={ritual.imageAlt}
			ratio="aspect-[19/13]"
			sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
		/>

		<div class="relative pt-6">
			<h3
				class="font-display text-h4 text-ink group-hover:text-clay transition-colors duration-500"
			>
				{ritual.name}
			</h3>
			<p class="text-ink-soft mt-3 text-[0.9375rem] leading-relaxed">{ritual.meaning}</p>

			{#if detail === 'full'}
				<p class="text-ink-mute mt-4 flex items-start gap-2.5 text-sm">
					<span class="bg-clay/60 mt-2 h-px w-5 shrink-0" aria-hidden="true"></span>
					<span class="font-accent-italic">{ritual.whenItMakesSense}</span>
				</p>
			{/if}
		</div>
	</a>
</article>

<style>
	/*
		Grafismos delicados desenhados com ::before — fio, círculo e traço.
		Alternam por posição para que a grade nunca pareça blocos iguais.
		Puramente decorativos.
	*/
	.ritual::before {
		content: '';
		position: absolute;
		pointer-events: none;
		opacity: 0;
		transition:
			opacity 600ms var(--ease-editorial),
			transform 600ms var(--ease-editorial);
		z-index: 1;
	}

	/* Círculo fino — gesto de união (teal) */
	.ritual[data-motif='0']::before {
		width: 4.5rem;
		height: 4.5rem;
		top: -1.25rem;
		right: -1rem;
		border: 1px solid var(--color-teal);
		border-radius: 50%;
		transform: scale(0.82);
	}

	/* Fio horizontal — linha que conduz */
	.ritual[data-motif='1']::before {
		width: 3.5rem;
		height: 1px;
		top: -0.75rem;
		right: 0;
		background-color: var(--color-clay);
		transform: scaleX(0.4);
		transform-origin: right;
	}

	/* Arco suave — água, areia, luz */
	.ritual[data-motif='2']::before {
		width: 4rem;
		height: 2rem;
		top: -1rem;
		right: -0.5rem;
		border: 1px solid var(--color-teal);
		border-bottom: 0;
		border-radius: 4rem 4rem 0 0;
		transform: translateY(0.4rem);
	}

	.ritual:hover::before,
	.ritual:focus-within::before {
		opacity: 0.65;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.ritual::before {
			transition: none;
		}
	}
</style>
