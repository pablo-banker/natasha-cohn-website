import type { Action } from 'svelte/action';
import { loadGsap } from './gsap';
import { prefersReducedMotion } from '$lib/utils/motion';

/**
 * Desenha um traço SVG conforme a rolagem — usado na linha do processo
 * de criação. A linha nasce junto com a história.
 */
export const drawLine: Action<
	SVGPathElement | SVGLineElement,
	{ start?: string; end?: string } | undefined
> = (node, params) => {
	if (prefersReducedMotion()) return {};

	let cancelled = false;
	let cleanup: (() => void) | undefined;

	loadGsap().then(({ gsap }) => {
		if (cancelled) return;
		const length = typeof node.getTotalLength === 'function' ? node.getTotalLength() : 0;
		if (!length) return;

		const ctx = gsap.context(() => {
			gsap.set(node, { strokeDasharray: length, strokeDashoffset: length });
			gsap.to(node, {
				strokeDashoffset: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: node,
					start: params?.start ?? 'top 80%',
					end: params?.end ?? 'bottom 55%',
					scrub: 0.6
				}
			});
		});

		cleanup = () => ctx.revert();
	});

	return {
		destroy() {
			cancelled = true;
			cleanup?.();
		}
	};
};

export type CountUpParams = {
	value: number;
	duration?: number;
	prefix?: string;
	suffix?: string;
};

/**
 * Anima um número de 0 até o valor final quando entra na viewport.
 * O valor final já está no HTML (SSR), então continua legível sem JS
 * e para quem prefere menos movimento.
 */
export const countUp: Action<HTMLElement, CountUpParams> = (node, params) => {
	const finalText = node.textContent ?? '';
	if (prefersReducedMotion()) return {};

	let cancelled = false;
	let cleanup: (() => void) | undefined;

	loadGsap().then(({ gsap }) => {
		if (cancelled) return;
		const counter = { n: 0 };
		const ctx = gsap.context(() => {
			gsap.to(counter, {
				n: params.value,
				duration: params.duration ?? 1.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: node, start: 'top 90%', once: true },
				onUpdate: () => {
					node.textContent = `${params.prefix ?? ''}${Math.round(counter.n)}${params.suffix ?? ''}`;
				},
				onComplete: () => {
					node.textContent = finalText;
				}
			});
		}, node);

		cleanup = () => {
			ctx.revert();
			node.textContent = finalText;
		};
	});

	return {
		destroy() {
			cancelled = true;
			cleanup?.();
		}
	};
};

/**
 * Revela uma imagem por máscara (clip-path), de baixo para cima.
 * Usa apenas clip-path + transform — sem layout shift.
 */
export const maskReveal: Action<HTMLElement, { duration?: number; delay?: number } | undefined> = (
	node,
	params
) => {
	if (prefersReducedMotion()) return {};

	let cancelled = false;
	let cleanup: (() => void) | undefined;

	node.style.clipPath = 'inset(0 0 100% 0)';

	const fallback = setTimeout(() => {
		node.style.clipPath = '';
	}, 2500);

	loadGsap()
		.then(({ gsap }) => {
			if (cancelled) return;
			clearTimeout(fallback);
			const ctx = gsap.context(() => {
				gsap.fromTo(
					node,
					{ clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
					{
						clipPath: 'inset(0 0 0% 0)',
						scale: 1,
						duration: params?.duration ?? 1.2,
						delay: params?.delay ?? 0,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: node,
							start: 'top 85%',
							// Regride ao rolar de volta para cima.
							toggleActions: 'play none none reverse'
						}
					}
				);
			}, node);
			cleanup = () => ctx.revert();
		})
		.catch(() => {
			clearTimeout(fallback);
			node.style.clipPath = '';
		});

	return {
		destroy() {
			cancelled = true;
			clearTimeout(fallback);
			cleanup?.();
		}
	};
};
