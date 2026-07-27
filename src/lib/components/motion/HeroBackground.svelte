<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/animations/gsap';

	/**
	 * Fundo vivo da hero: um brilho difuso (dois blobs radiais em cores da
	 * marca, baixa opacidade — luz natural, não neon) mais a mandala da marca
	 * grande e cortada no canto. Conforme a rolagem, o brilho desliza de um
	 * lado ao outro e muda escala/opacidade; a mandala gira e desliza de leve.
	 *
	 * Em desktop com `pointer: fine`, brilho e mandala reagem sutilmente ao
	 * cursor via `gsap.quickTo`. Em touch/mobile o efeito é reduzido; em
	 * `prefers-reduced-motion` fica estático. Tudo decorativo (atrás de tudo).
	 *
	 * Cada elemento animado vive dentro de um wrapper de posição, para que o
	 * transform do GSAP não conflite com a centralização feita pelo Tailwind.
	 *
	 * A section hospedeira já é `relative overflow-hidden`; só recebe `isolate`.
	 */
	let root = $state<HTMLDivElement | null>(null);
	let glow = $state<HTMLDivElement | null>(null);
	let mandala = $state<HTMLDivElement | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let ctx: any = null;

	onMount(() => {
		if (!root || !glow || !mandala) return;
		const rootEl = root;
		const glowEl = glow;
		const mandalaEl = mandala;

		loadGsap().then(({ gsap }) => {
			ctx = gsap.context(() => {
				gsap.matchMedia().add(
					{
						reduce: '(prefers-reduced-motion: reduce)',
						mobile: '(max-width: 767px)',
						fine: '(min-width: 768px) and (pointer: fine)'
					},
					(context) => {
						const c = context.conditions as Record<string, boolean>;
						if (c.reduce) return; // estático: fica na posição de repouso

						// Parallax no scroll: brilho desliza + escala/opacidade,
						// mandala gira + desliza. Um ScrollTrigger por elemento.
						gsap.to(glowEl, {
							xPercent: c.mobile ? -6 : -12,
							yPercent: c.mobile ? 5 : 10,
							scale: 1.1,
							opacity: 0.7,
							ease: 'none',
							scrollTrigger: { trigger: rootEl, start: 'top top', end: 'bottom top', scrub: 1 }
						});
						gsap.to(mandalaEl, {
							rotation: c.mobile ? 8 : 16,
							yPercent: c.mobile ? 6 : 12,
							ease: 'none',
							scrollTrigger: { trigger: rootEl, start: 'top top', end: 'bottom top', scrub: 1 }
						});

						// Reação ao cursor — só desktop com ponteiro fino.
						if (c.fine) {
							const gx = gsap.quickTo(glowEl, 'x', { duration: 0.9, ease: 'power3' });
							const gy = gsap.quickTo(glowEl, 'y', { duration: 0.9, ease: 'power3' });
							const mx = gsap.quickTo(mandalaEl, 'x', { duration: 1.1, ease: 'power3' });
							const my = gsap.quickTo(mandalaEl, 'y', { duration: 1.1, ease: 'power3' });
							const onMove = (e: PointerEvent) => {
								const nx = e.clientX / window.innerWidth - 0.5;
								const ny = e.clientY / window.innerHeight - 0.5;
								gx(nx * 44);
								gy(ny * 44);
								mx(nx * -26);
								my(ny * -26);
							};
							window.addEventListener('pointermove', onMove, { passive: true });
							return () => window.removeEventListener('pointermove', onMove);
						}
					}
				);
			}, rootEl);
		});

		return () => ctx?.revert();
	});
</script>

<div
	bind:this={root}
	class="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
	aria-hidden="true"
>
	<!-- Brilho difuso quente (clay-soft): wrapper centraliza, filho é animado. -->
	<div class="absolute -top-1/4 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2">
		<div
			bind:this={glow}
			class="h-full w-full will-change-transform"
			style="background: radial-gradient(closest-side, rgba(220,150,90,0.22), rgba(220,150,90,0.06) 55%, transparent 72%);"
		></div>
	</div>
	<!-- Halo frio (teal) mais discreto, estático, para dar profundidade. -->
	<div
		class="absolute top-1/3 -left-24 h-[30rem] w-[30rem]"
		style="background: radial-gradient(closest-side, rgba(79,158,158,0.10), transparent 70%);"
	></div>
	<!-- Mandala da marca, grande e cortada no canto superior direito. -->
	<div class="absolute -top-40 -right-40 w-[32rem] opacity-[0.07] sm:w-[40rem]">
		<div bind:this={mandala} class="will-change-transform">
			<img
				src="/brand/mandala.png"
				alt=""
				width="256"
				height="256"
				class="h-auto w-full"
				decoding="async"
			/>
		</div>
	</div>
</div>
