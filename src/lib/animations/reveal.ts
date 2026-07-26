import type { Action } from 'svelte/action';
import { loadGsap } from './gsap';
import { prefersReducedMotion } from '$lib/utils/motion';

export type RevealParams = {
	/** Deslocamento vertical inicial, em px. */
	y?: number;
	/** Deslocamento horizontal inicial, em px. */
	x?: number;
	/** Escala inicial (para imagens). */
	scale?: number;
	duration?: number;
	delay?: number;
	/** Seletor de filhos para animar em cascata. Se ausente, anima o próprio nó. */
	stagger?: string;
	/** Intervalo entre os filhos, em segundos. */
	staggerAmount?: number;
	/** Posição de disparo do ScrollTrigger. */
	start?: string;
};

/**
 * Revela um elemento (ou seus filhos, em cascata) quando entra na viewport.
 *
 * Progressive enhancement: o estado inicial oculto é aplicado de forma
 * SÍNCRONA via style inline — evitando qualquer piscada — e há um fallback
 * que torna o elemento visível caso o GSAP não carregue. Se o JavaScript
 * falhar por completo, a action nunca roda e o conteúdo permanece visível.
 * Com prefers-reduced-motion, nada é escondido nem animado.
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	const opts: Required<Omit<RevealParams, 'stagger'>> & { stagger?: string } = {
		y: params?.y ?? 24,
		x: params?.x ?? 0,
		scale: params?.scale ?? 1,
		duration: params?.duration ?? 0.9,
		delay: params?.delay ?? 0,
		staggerAmount: params?.staggerAmount ?? 0.09,
		start: params?.start ?? 'top 85%',
		stagger: params?.stagger
	};

	// Usuário pediu menos movimento: não escondemos nem animamos nada.
	if (prefersReducedMotion()) return {};

	const targets: HTMLElement[] = opts.stagger
		? Array.from(node.querySelectorAll<HTMLElement>(opts.stagger))
		: [node];

	if (targets.length === 0) return {};

	// Estado inicial síncrono — sem piscada entre a hidratação e o GSAP.
	for (const el of targets) {
		el.style.opacity = '0';
		el.style.willChange = 'transform, opacity';
	}

	// Rede de segurança: se o GSAP não carregar, o conteúdo aparece assim mesmo.
	const fallback = setTimeout(() => {
		for (const el of targets) {
			el.style.opacity = '';
			el.style.willChange = '';
		}
	}, 2500);

	let cleanup: (() => void) | undefined;
	let cancelled = false;

	loadGsap()
		.then(({ gsap }) => {
			if (cancelled) return;
			clearTimeout(fallback);

			const ctx = gsap.context(() => {
				gsap.set(targets, { opacity: 0, y: opts.y, x: opts.x, scale: opts.scale });
				gsap.to(targets, {
					opacity: 1,
					y: 0,
					x: 0,
					scale: 1,
					duration: opts.duration,
					delay: opts.delay,
					ease: 'power3.out',
					stagger: opts.stagger ? opts.staggerAmount : 0,
					scrollTrigger: {
						trigger: node,
						start: opts.start,
						// Regride ao rolar de volta para cima e refaz ao descer.
						toggleActions: 'play none none reverse'
					}
				});
			}, node);

			cleanup = () => ctx.revert();
		})
		.catch(() => {
			// Falha ao carregar o GSAP: garante a visibilidade do conteúdo.
			clearTimeout(fallback);
			for (const el of targets) {
				el.style.opacity = '';
				el.style.willChange = '';
			}
		});

	return {
		destroy() {
			cancelled = true;
			clearTimeout(fallback);
			cleanup?.();
		}
	};
};
