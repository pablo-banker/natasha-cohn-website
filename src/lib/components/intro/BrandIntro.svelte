<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { loadGsap } from '$lib/animations/gsap';

	type Props = {
		/** Disparado quando o overlay começa a sair — a home inicia sua entrada. */
		onreveal?: () => void;
		/** Disparado quando a abertura termina (ou é pulada/não executada). */
		oncomplete?: () => void;
		/**
		 * Chave do localStorage que marca a abertura como já vista. Cada contexto
		 * (home, proposta hetero, etc.) usa a sua para animar de forma independente.
		 */
		storageKey?: string;
	};
	let { onreveal, oncomplete, storageKey = 'natasha-intro-seen' }: Props = $props();
	const SVG_URL = '/brand/natasha-cohn-animated.svg';
	const MANDALA_URL = '/brand/mandala.png';
	const SLOGAN_URL = '/brand/natasha-cohn-slogan.svg';
	// Ordem de escrita da assinatura → ids reais (labels do Inkscape):
	// path4 = guide-natasha-main · path5 = guide-natasha-main-t · path6 = guide-cohn-main
	const GUIDE_IDS = ['path4', 'path5', 'path6'] as const;

	// Durações (s) — ajustáveis. Total ≈ 3.7s (logo → assinatura → slogan).
	// Abertura enxuta (~2,3s no total) — encanta sem atrasar o conteúdo.
	const D_MANDALA = 0.4;
	const NAME_START = 0.2; // a assinatura começa enquanto a mandala assenta
	const D_NATASHA = 0.65;
	const D_TCUT = 0.1;
	const D_COHN = 0.5;
	const D_SLOGAN = 0.3;
	const D_PAUSE = 0.1;
	const D_FADE = 0.5;

	let isIntroVisible = $state(false);
	let svgMarkup = $state('');
	let root = $state<HTMLDivElement | null>(null);
	let mandalaEl = $state<HTMLImageElement | null>(null);
	let nameWrap = $state<HTMLDivElement | null>(null);
	let sloganEl = $state<HTMLImageElement | null>(null);

	let finished = false;
	let prevOverflow = '';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- timeline/context do GSAP (dinâmico)
	let timeline: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- gsap.context
	let ctx: any = null;
	let safety: ReturnType<typeof setTimeout> | null = null;

	function lockScroll() {
		prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}
	function unlockScroll() {
		document.body.style.overflow = prevOverflow;
	}

	/** Encerra a abertura: mata timeline/contexto, restaura scroll, grava a chave e remove o overlay. */
	function finish() {
		if (finished) return;
		finished = true;
		if (safety) clearTimeout(safety);
		try {
			timeline?.kill();
		} catch {
			/* noop */
		}
		try {
			ctx?.revert();
		} catch {
			/* noop */
		}
		unlockScroll();
		try {
			localStorage.setItem(storageKey, '1');
		} catch {
			/* localStorage indisponível — segue sem persistir */
		}
		isIntroVisible = false;
		oncomplete?.();
	}

	/**
	 * Monta a máscara de escrita: move o grupo #writing-guides (#layer2, que já
	 * traz o transform correto) para dentro de uma <mask>, pinta os guias de
	 * branco e aplica a máscara ao #lettering preenchido. Conforme os guias são
	 * "desenhados" (stroke-dashoffset → 0), o glifo real vai surgindo. Retorna
	 * os paths na ordem de escrita, ou null se o SVG não tiver a estrutura.
	 */
	function buildReveal(): SVGPathElement[] | null {
		const svg = nameWrap?.querySelector('svg');
		if (!svg) return null;
		const lettering = svg.querySelector('#lettering');
		const guides = svg.querySelector('#layer2');
		const paths = GUIDE_IDS.map((id) => svg.querySelector<SVGPathElement>('#' + id));
		if (!lettering || !guides || paths.some((p) => !p)) return null;

		// Responsivo: o arquivo vem com width/height em mm.
		svg.removeAttribute('width');
		svg.removeAttribute('height');
		(svg as SVGSVGElement).style.width = '100%';
		(svg as SVGSVGElement).style.height = 'auto';
		(svg as SVGSVGElement).style.display = 'block';

		const NS = 'http://www.w3.org/2000/svg';
		let defs = svg.querySelector('defs');
		if (!defs) {
			defs = document.createElementNS(NS, 'defs');
			svg.insertBefore(defs, svg.firstChild);
		}
		const mask = document.createElementNS(NS, 'mask');
		mask.setAttribute('id', 'nc-intro-reveal');
		defs.appendChild(mask);

		// Fundo preto explícito (área oculta) + guias brancos por cima.
		const bg = document.createElementNS(NS, 'rect');
		bg.setAttribute('x', '-9999');
		bg.setAttribute('y', '-9999');
		bg.setAttribute('width', '19998');
		bg.setAttribute('height', '19998');
		bg.setAttribute('fill', '#000');
		mask.appendChild(bg);
		mask.appendChild(guides); // move o grupo (com transform) → some do visível

		for (const p of paths as SVGPathElement[]) {
			p.style.stroke = '#fff';
			p.style.strokeWidth = '3';
			p.style.strokeLinecap = 'round';
			p.style.strokeLinejoin = 'round';
			const len = p.getTotalLength();
			p.style.strokeDasharray = String(len);
			p.style.strokeDashoffset = String(len);
		}
		lettering.setAttribute('mask', 'url(#nc-intro-reveal)');
		return paths as SVGPathElement[];
	}

	onMount(() => {
		// Checagens só no navegador (SSR-safe).
		let seen = false;
		try {
			seen = localStorage.getItem(storageKey) === '1';
		} catch {
			/* trata como primeira visita */
		}
		if (seen) {
			oncomplete?.(); // acessos posteriores: home imediata, sem overlay nem flash
			return;
		}

		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.info(`[intro] para rever a abertura: localStorage.removeItem("${storageKey}")`);
		}

		const reduce =
			typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

		isIntroVisible = true;
		lockScroll();
		// Rede de segurança: a home nunca fica presa.
		safety = setTimeout(finish, 5000);

		(async () => {
			try {
				// SVG e GSAP carregam em paralelo (antes eram em série).
				const [svg, gsapBundle] = await Promise.all([
					fetch(SVG_URL).then((r) => r.text()),
					loadGsap()
				]);
				svgMarkup = svg;
				await tick();
				if (finished || !root) return;

				const { gsap } = gsapBundle;
				ctx = gsap.context(() => {
					const paths = buildReveal();
					// A assinatura (mascarada) só fica visível depois que a máscara é
					// aplicada — evita um flash do nome já preenchido.
					if (nameWrap) nameWrap.style.opacity = '1';

					// Estados iniciais da mandala e do slogan (entram na animação).
					gsap.set(mandalaEl, { autoAlpha: 0, scale: 0.9 });
					gsap.set(sloganEl, { autoAlpha: 0, y: 10 });

					const tl = gsap.timeline({ onComplete: finish });
					timeline = tl;

					// Fallback: SVG sem a estrutura esperada → mostra o lockup e libera.
					if (!paths) {
						gsap.set([mandalaEl, sloganEl], { autoAlpha: 1, scale: 1, y: 0 });
						tl.to({}, { duration: 0.4 })
							.call(() => onreveal?.())
							.to(root, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' });
						return;
					}

					const [natasha, tcut, cohn] = paths;

					if (reduce) {
						// Sem escrita longa: revela o lockup inteiro, breve, e sai.
						gsap.set(paths, { strokeDashoffset: 0 });
						gsap.set([mandalaEl, sloganEl], { autoAlpha: 1, scale: 1, y: 0 });
						tl.to({}, { duration: 0.5 })
							.call(() => onreveal?.())
							.to(root, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' });
						return;
					}

					// 1) Logo (mandala): fade + leve escala.
					tl.to(mandalaEl, { autoAlpha: 1, scale: 1, duration: D_MANDALA, ease: 'power2.out' }, 0)
						// 2) Assinatura escrita: Natasha → corte do "t" → Cohn.
						.to(
							natasha,
							{ strokeDashoffset: 0, duration: D_NATASHA, ease: 'power1.inOut' },
							NAME_START
						)
						.to(tcut, { strokeDashoffset: 0, duration: D_TCUT, ease: 'power1.inOut' }, '>-0.05')
						.to(cohn, { strokeDashoffset: 0, duration: D_COHN, ease: 'power1.inOut' }, '>-0.02')
						// 3) Slogan: fade + leve movimento vertical.
						.to(sloganEl, { autoAlpha: 1, y: 0, duration: D_SLOGAN, ease: 'power2.out' }, '>0.05')
						// 4) Pausa curta.
						.to({}, { duration: D_PAUSE })
						// 5) Overlay sai e a home entra (simultâneos).
						.call(() => onreveal?.())
						.to(root, { autoAlpha: 0, duration: D_FADE, ease: 'power2.inOut' });
				}, root);
			} catch {
				finish(); // GSAP falhou, fetch falhou, id diferente etc. → libera a página
			}
		})();

		return () => {
			// Desmontagem antes do término: limpa tudo e restaura o scroll.
			if (safety) clearTimeout(safety);
			try {
				timeline?.kill();
			} catch {
				/* noop */
			}
			try {
				ctx?.revert();
			} catch {
				/* noop */
			}
			unlockScroll();
		};
	});

	function skip() {
		finish();
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (isIntroVisible && e.key === 'Escape') skip();
	}}
/>

{#if isIntroVisible}
	<div bind:this={root} class="intro" aria-hidden="true">
		<!-- Mesma disposição do cabeçalho: mandala à esquerda, nome + slogan à direita. -->
		<div class="intro__lockup">
			<img
				bind:this={mandalaEl}
				src={MANDALA_URL}
				alt=""
				width="256"
				height="256"
				class="intro__mandala"
				decoding="async"
			/>
			<div class="intro__text">
				<!-- SVG inline (mesma origem) para animar os paths da assinatura. -->
				<div bind:this={nameWrap} class="intro__name">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- SVG próprio da marca -->
					{@html svgMarkup}
				</div>
				<img
					bind:this={sloganEl}
					src={SLOGAN_URL}
					alt=""
					width="259"
					height="12"
					class="intro__slogan"
					decoding="async"
				/>
			</div>
		</div>
		<!-- Toque/clique em qualquer lugar pula a abertura. -->
		<button type="button" class="intro__skip" onclick={skip}><span>Pular</span></button>
	</div>
{/if}

<style>
	.intro {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
	}
	.intro__lockup {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 2.5vw, 1.75rem);
		width: min(calc(100vw - 40px), 640px);
	}
	.intro__mandala {
		width: clamp(66px, 20%, 132px);
		height: auto;
		flex: none;
		opacity: 0; /* entra via GSAP */
		transform-origin: center;
	}
	.intro__text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: clamp(0.35rem, 1vw, 0.7rem);
		min-width: 0;
	}
	.intro__name {
		width: 100%;
		opacity: 0; /* revelado após aplicar a máscara */
	}
	.intro__name :global(svg) {
		width: 100%;
		height: auto;
		display: block;
		overflow: visible;
	}
	.intro__slogan {
		width: 100%;
		height: auto;
		display: block;
		opacity: 0; /* entra via GSAP */
	}
	.intro__skip {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		background: transparent;
		cursor: pointer;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: clamp(1.5rem, 5vh, 3rem);
	}
	.intro__skip span {
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #b6a893;
		transition: color 0.2s;
	}
	.intro__skip:hover span,
	.intro__skip:focus-visible span {
		color: #8a7d6a;
	}
	.intro__skip:focus-visible {
		outline: 2px solid #a56334;
		outline-offset: -4px;
	}
</style>
