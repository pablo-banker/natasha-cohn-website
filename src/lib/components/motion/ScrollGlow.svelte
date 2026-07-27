<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/animations/gsap';

	/**
	 * Faixa/halo de luz que atravessa lentamente o fundo de uma seção conforme
	 * a rolagem — como luz do sol cruzando o ambiente. Puramente decorativo:
	 * fica atrás do conteúdo (-z-10), sem eventos de ponteiro nem seleção.
	 *
	 * A seção que o hospeda precisa de `relative isolate overflow-hidden` para
	 * que o -z-10 pinte acima do fundo da seção e abaixo do conteúdo.
	 *
	 * Estrutura: um wrapper de posição (recebe `class`, pode centralizar via
	 * translate do Tailwind) e um filho interno animado pelo GSAP — assim o
	 * transform do GSAP nunca briga com a centralização do wrapper.
	 */
	type Props = {
		/** Classes de tamanho/posição do halo (ex.: 'top-0 -left-1/4 h-full w-2/3'). */
		class?: string;
		/** Cor do halo — rgba derivado da paleta da marca. */
		color?: string;
		/** Deslocamento horizontal total no scroll (px). */
		drift?: number;
	};
	let { class: className = '', color = 'rgba(220,150,90,0.14)', drift = 160 }: Props = $props();

	let wrap = $state<HTMLDivElement | null>(null);
	let inner = $state<HTMLDivElement | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let ctx: any = null;

	onMount(() => {
		if (!wrap || !inner) return;
		const node = inner;
		const section = wrap.parentElement;
		loadGsap().then(({ gsap }) => {
			ctx = gsap.context(() => {
				gsap.matchMedia().add(
					{
						reduce: '(prefers-reduced-motion: reduce)',
						ok: '(prefers-reduced-motion: no-preference)',
						mobile: '(max-width: 767px)'
					},
					(context) => {
						const c = context.conditions as Record<string, boolean>;
						if (c.reduce) return; // permanece na posição final (centrado, opacidade cheia)
						const d = c.mobile ? drift * 0.4 : drift;
						gsap.fromTo(
							node,
							{ x: -d, opacity: 0.3 },
							{
								x: d,
								opacity: 1,
								ease: 'none',
								scrollTrigger: {
									trigger: section,
									start: 'top bottom',
									end: 'bottom top',
									scrub: 1
								}
							}
						);
					}
				);
			}, node);
		});
		return () => ctx?.revert();
	});
</script>

<div
	bind:this={wrap}
	class="pointer-events-none absolute -z-10 select-none {className}"
	aria-hidden="true"
>
	<div
		bind:this={inner}
		class="h-full w-full will-change-transform"
		style="background: radial-gradient(60% 55% at 50% 50%, {color}, transparent 72%);"
	></div>
</div>
