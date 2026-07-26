import type { Action } from 'svelte/action';
import { loadGsap } from './gsap';
import { prefersReducedMotion } from '$lib/utils/motion';

export type ParallaxParams = {
	/** Deslocamento total em px ao longo da rolagem. Valores baixos = sutil. */
	distance?: number;
	/** Eixo do movimento. */
	axis?: 'y' | 'x';
};

/**
 * Parallax sutil vinculado à rolagem (scrub). Move apenas `transform`,
 * nunca propriedades que causam layout shift. Desativado com
 * prefers-reduced-motion.
 */
export const parallax: Action<HTMLElement, ParallaxParams | undefined> = (node, params) => {
	if (prefersReducedMotion()) return {};

	const distance = params?.distance ?? 60;
	const axis = params?.axis ?? 'y';

	let cleanup: (() => void) | undefined;
	let cancelled = false;

	loadGsap().then(({ gsap }) => {
		if (cancelled) return;
		const ctx = gsap.context(() => {
			gsap.fromTo(
				node,
				{ [axis]: -distance / 2 },
				{
					[axis]: distance / 2,
					ease: 'none',
					scrollTrigger: {
						trigger: node,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		}, node);
		cleanup = () => ctx.revert();
	});

	return {
		destroy() {
			cancelled = true;
			cleanup?.();
		}
	};
};
