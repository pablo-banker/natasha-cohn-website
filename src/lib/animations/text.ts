import type { Action } from 'svelte/action';
import { loadGsap } from './gsap';
import { prefersReducedMotion } from '$lib/utils/motion';

export type RevealLinesParams = {
	delay?: number;
	duration?: number;
	stagger?: number;
	/** Dispara ao entrar na viewport em vez de imediatamente (hero). */
	onScroll?: boolean;
};

/**
 * Revela um título linha a linha, com máscara — a assinatura editorial do
 * site. Usa o SplitText do GSAP (gratuito desde a 3.13) com `aria: 'auto'`,
 * que preserva o texto original para leitores de tela, e `autoSplit`, que
 * refaz a divisão quando a fonte carrega ou a tela é redimensionada.
 *
 * O texto vem renderizado do servidor e permanece legível sem JavaScript.
 */
export const revealLines: Action<HTMLElement, RevealLinesParams | undefined> = (node, params) => {
	if (prefersReducedMotion()) return {};

	// Esconde de forma síncrona para não piscar antes do GSAP carregar.
	node.style.opacity = '0';
	const fallback = setTimeout(() => {
		node.style.opacity = '';
	}, 2500);

	let cancelled = false;
	let cleanup: (() => void) | undefined;

	Promise.all([loadGsap(), import('gsap/SplitText')])
		.then(([{ gsap }, splitMod]) => {
			if (cancelled) return;
			clearTimeout(fallback);

			const SplitText = splitMod.SplitText ?? splitMod.default;
			gsap.registerPlugin(SplitText);
			node.style.opacity = '';

			const ctx = gsap.context(() => {
				const split = SplitText.create(node, {
					type: 'lines',
					mask: 'lines',
					aria: 'auto',
					autoSplit: true,
					onSplit: (self: { lines: Element[] }) =>
						gsap.from(self.lines, {
							yPercent: 110,
							duration: params?.duration ?? 1,
							stagger: params?.stagger ?? 0.09,
							delay: params?.delay ?? 0,
							ease: 'power3.out',
							scrollTrigger: params?.onScroll
								? {
										trigger: node,
										start: 'top 88%',
										// Regride ao rolar de volta para cima.
										toggleActions: 'play none none reverse'
									}
								: undefined
						})
				});

				return () => split.revert();
			}, node);

			cleanup = () => ctx.revert();
		})
		.catch(() => {
			// Sem SplitText o título simplesmente aparece — nada quebra.
			clearTimeout(fallback);
			node.style.opacity = '';
		});

	return {
		destroy() {
			cancelled = true;
			clearTimeout(fallback);
			cleanup?.();
			node.style.opacity = '';
		}
	};
};
