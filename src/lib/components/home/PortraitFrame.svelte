<script lang="ts">
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import { parallax } from '$lib/animations/parallax';

	type Props = {
		src: string | null;
		alt: string;
		priority?: boolean;
		/** Desliga o parallax onde a moldura já se move com a seção. */
		animate?: boolean;
		class?: string;
		/** Foco do recorte (object-position). */
		focus?: string;
	};

	let {
		src,
		alt,
		priority = false,
		animate = true,
		class: className = '',
		focus = 'center'
	}: Props = $props();
</script>

<!--
	Retrato em arco: a fotografia atravessa uma moldura orgânica, com um
	traço deslocado atrás (::before) e uma mancha de cor (::after) criando
	profundidade. Nenhum elemento HTML vazio é usado para decoração.
-->
<div class="portrait {className}">
	<div class="portrait__arch" use:parallax={animate ? { distance: 34 } : { distance: 0 }}>
		<ImageFrame
			{src}
			{alt}
			{priority}
			{focus}
			ratio="aspect-[4/5]"
			sizes="(max-width: 1024px) 88vw, 44vw"
			class="portrait__image"
			animate={!priority}
		/>
	</div>
</div>

<style>
	.portrait {
		position: relative;
		isolation: isolate;
	}

	/* Traço editorial deslocado atrás da fotografia (teal — par da marca) */
	.portrait::before {
		content: '';
		position: absolute;
		inset: 8% -5% -6% 7%;
		border: 1px solid var(--color-teal);
		opacity: 0.5;
		border-radius: 50% 50% var(--radius-sm) var(--radius-sm) / 32% 32% var(--radius-sm)
			var(--radius-sm);
		z-index: -2;
		pointer-events: none;
	}

	/* Mancha quente de profundidade */
	.portrait::after {
		content: '';
		position: absolute;
		width: 42%;
		aspect-ratio: 1;
		right: -6%;
		bottom: -4%;
		background: radial-gradient(circle, var(--color-blush) 0%, transparent 70%);
		opacity: 0.55;
		z-index: -3;
		pointer-events: none;
	}

	.portrait__arch {
		position: relative;
		overflow: hidden;
		box-shadow: var(--shadow-portrait);
		/* Arco: topo em curva ampla, base praticamente reta */
		border-radius: 50% 50% var(--radius-sm) var(--radius-sm) / 32% 32% var(--radius-sm)
			var(--radius-sm);
	}

	.portrait__arch :global(.portrait__image) {
		width: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.portrait__arch {
			transform: none !important;
		}
	}
</style>
