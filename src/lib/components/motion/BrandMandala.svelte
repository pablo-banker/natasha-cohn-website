<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/animations/gsap';

	/**
	 * Mandala da marca (PNG original) usada como elemento decorativo de fundo.
	 * Conforme a rolagem: gira sutilmente (8–20°), desliza um pouco, muda de
	 * escala e aparece gradualmente. Baixa opacidade, nunca sobre texto/rosto.
	 *
	 * A seção que a hospeda precisa de `relative isolate overflow-hidden`.
	 */
	type Props = {
		/** Classes de posição (ex.: '-top-24 -right-24'). */
		class?: string;
		/** Largura do elemento (CSS). */
		size?: string;
		/** Opacidade final. */
		opacity?: number;
		/** Rotação total no scroll (graus, 8–20). */
		rotate?: number;
		/** Deslocamento vertical no scroll (px). */
		drift?: number;
		/** Aparecer gradualmente (fade-in) no scroll. Desligue para elementos no
		 *  topo da página, que já estão visíveis no carregamento. */
		fade?: boolean;
	};
	let {
		class: className = '',
		size = '20rem',
		opacity = 0.1,
		rotate = 14,
		drift = 40,
		fade = true
	}: Props = $props();

	let el = $state<HTMLDivElement | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let ctx: any = null;

	onMount(() => {
		if (!el) return;
		const node = el;
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
						if (c.reduce) {
							// reduced-motion: aparece na posição final, sem movimento contínuo.
							gsap.set(node, { opacity });
							return;
						}
						const rot = c.mobile ? rotate * 0.5 : rotate;
						const dy = c.mobile ? drift * 0.5 : drift;
						// `fade` acrescenta a aparição gradual (opacity 0 → final); sem ele,
						// a mandala já entra visível (para elementos no topo da página).
						gsap.fromTo(
							node,
							{ ...(fade ? { opacity: 0 } : {}), rotation: -rot / 2, y: dy, scale: 0.96 },
							{
								...(fade ? { opacity } : {}),
								rotation: rot / 2,
								y: -dy,
								scale: 1.04,
								ease: 'none',
								scrollTrigger: {
									trigger: node.parentElement,
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
	bind:this={el}
	class="pointer-events-none absolute -z-10 will-change-transform select-none {className}"
	style="width: {size}; opacity: {fade ? 0 : opacity};"
	aria-hidden="true"
>
	<img
		src="/brand/mandala.png"
		alt=""
		width="256"
		height="256"
		class="h-auto w-full"
		decoding="async"
		loading="lazy"
	/>
</div>
