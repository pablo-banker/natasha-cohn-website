import type { Action } from 'svelte/action';
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
	/** Posição de disparo, no formato do GSAP (ex.: 'top 85%', 'top bottom'). */
	start?: string;
};

/** Curva equivalente ao `power3.out` do GSAP. */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Converte o `start` do GSAP em `rootMargin` do IntersectionObserver.
 * 'top 85%' → dispara com ~15% do elemento à vista → margem inferior -15%.
 * 'top bottom' (ou não numérico) → dispara assim que entra → margem 0.
 */
function rootMarginFromStart(start: string): string {
	const match = /top\s+(\d+)%/.exec(start);
	return match ? `0px 0px -${100 - Number(match[1])}% 0px` : '0px 0px 0px 0px';
}

/**
 * Revela um elemento (ou seus filhos, em cascata) ao entrar na viewport —
 * com IntersectionObserver + transição CSS, SEM depender do GSAP. Assim o
 * conteúdo aparece assim que a página hidrata (não espera o chunk do GSAP
 * baixar) e o site fica com muito menos ScrollTriggers.
 *
 * Progressive enhancement: sem JavaScript a action nunca roda e o conteúdo
 * renderizado no servidor permanece visível. Com prefers-reduced-motion,
 * nada é escondido nem animado.
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	const y = params?.y ?? 24;
	const x = params?.x ?? 0;
	const scale = params?.scale ?? 1;
	const duration = params?.duration ?? 0.9;
	const delay = params?.delay ?? 0;
	const staggerAmount = params?.staggerAmount ?? 0.09;
	const stagger = params?.stagger;
	const start = params?.start ?? 'top 85%';

	// Usuário pediu menos movimento: não escondemos nem animamos nada.
	if (prefersReducedMotion()) return {};

	const targets: HTMLElement[] = stagger
		? Array.from(node.querySelectorAll<HTMLElement>(stagger))
		: [node];
	if (targets.length === 0) return {};

	// Sem IntersectionObserver (navegadores muito antigos): deixa visível.
	if (typeof IntersectionObserver === 'undefined') return {};

	const hidden = `translate(${x}px, ${y}px) scale(${scale})`;

	// Estado inicial oculto — aplicado de forma síncrona, sem piscada.
	const setHidden = () => {
		targets.forEach((el, i) => {
			const d = delay + (stagger ? i * staggerAmount : 0);
			el.style.opacity = '0';
			el.style.transform = hidden;
			el.style.transition = `opacity ${duration}s ${EASE} ${d}s, transform ${duration}s ${EASE} ${d}s`;
		});
	};
	const show = () => {
		for (const el of targets) {
			el.style.opacity = '1';
			el.style.transform = 'none';
		}
	};
	const clear = () => {
		for (const el of targets) {
			el.style.opacity = '';
			el.style.transform = '';
			el.style.transition = '';
		}
	};

	setHidden();

	// Revela UMA vez e para de observar — o conteúdo já visto permanece
	// visível (não reesconde ao rolar por cima). Menos trabalho e sem jank.
	const io = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				show();
				io.disconnect();
			}
		},
		{ rootMargin: rootMarginFromStart(start) }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
			clear();
		}
	};
};
