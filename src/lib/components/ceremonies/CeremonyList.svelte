<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { Ceremony } from '$lib/types';
	import { reveal } from '$lib/animations/reveal';

	type Props = { ceremonies: Ceremony[] };
	let { ceremonies }: Props = $props();
</script>

<!--
	Lista editorial de cerimônias (índice + título + resumo + seta), com um
	fundo que sobe suavemente no hover. Sem imagens aqui — as fotos completas
	de cada serviço ficam na página /cerimonias.
-->
<ul class="border-border border-t" use:reveal={{ stagger: 'li', y: 22, staggerAmount: 0.08 }}>
	{#each ceremonies as ceremony (ceremony.slug)}
		<li class="group border-border border-b">
			<a
				href={ceremony.href}
				class="relative flex flex-col gap-1.5 py-8 transition-colors duration-500 lg:flex-row
					lg:items-baseline lg:gap-10 lg:py-11"
			>
				<!-- Fundo que entra no hover, desenhado com ::before -->
				<span class="ceremony-bg" aria-hidden="true"></span>

				<span
					class="eyebrow text-ink-mute group-hover:text-clay relative shrink-0 pt-1 transition-colors
						duration-500 lg:w-16"
				>
					{ceremony.number}
				</span>

				<span class="relative flex-1">
					<span
						class="ceremony-title font-display text-h3 text-ink group-hover:text-clay inline-block
							transition-colors duration-500"
					>
						{ceremony.title}
					</span>
					<span class="text-ink-soft mt-2 block max-w-md">{ceremony.summary}</span>
				</span>

				<ArrowUpRight
					class="text-ink-mute ease-editorial group-hover:text-clay relative size-5 shrink-0
						transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
					aria-hidden="true"
				/>
			</a>
		</li>
	{/each}
</ul>

<style>
	/*
		Sublinhado que se desenha da esquerda sob o título no hover (em teal —
		acento da marca, formando o par com o cobre do título). Desenhado com
		::after, sem elemento HTML extra.
	*/
	.ceremony-title {
		position: relative;
	}

	.ceremony-title::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.12em;
		width: 100%;
		height: 2px;
		background-color: var(--color-teal);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 500ms var(--ease-editorial);
	}

	:global(.group:hover) .ceremony-title::after,
	:global(.group:focus-within) .ceremony-title::after {
		transform: scaleX(1);
	}

	/* Faixa de fundo que sobe suavemente no hover — sem elemento HTML extra */
	.ceremony-bg {
		position: absolute;
		inset: 0 -1.5rem;
		background-color: var(--color-surface);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 500ms var(--ease-editorial);
		z-index: -1;
		pointer-events: none;
	}

	:global(.group:hover) .ceremony-bg,
	:global(.group:focus-within) .ceremony-bg {
		transform: scaleY(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.ceremony-bg,
		.ceremony-title::after {
			transition: none;
		}
	}
</style>
