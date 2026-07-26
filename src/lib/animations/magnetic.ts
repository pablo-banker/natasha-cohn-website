import type { Action } from 'svelte/action';
import { loadGsap } from './gsap';
import { pointerMotionAllowed } from '$lib/utils/motion';

export type MagneticParams = {
	/** Deslocamento máximo em px (mantido baixo de propósito). */
	strength?: number;
	/**
	 * Interruptor explícito. Actions do Svelte não podem ser aplicadas
	 * condicionalmente no markup, então componentes passam `enabled: false`
	 * para desligar o efeito.
	 */
	enabled?: boolean;
};

/**
 * Botão "magnético": o elemento se desloca discretamente na direção do
 * cursor. Só roda em dispositivos com ponteiro fino e sem
 * prefers-reduced-motion — em telas de toque nada é registrado.
 */
export const magnetic: Action<HTMLElement, MagneticParams | undefined> = (node, params) => {
	if (params?.enabled === false) return {};
	if (!pointerMotionAllowed()) return {};

	const strength = params?.strength ?? 10;
	let cancelled = false;
	let cleanup: (() => void) | undefined;

	loadGsap().then(({ gsap }) => {
		if (cancelled) return;

		const moveTo = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' });
		const moveToY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' });

		const onMove = (event: PointerEvent) => {
			const rect = node.getBoundingClientRect();
			const relX = event.clientX - (rect.left + rect.width / 2);
			const relY = event.clientY - (rect.top + rect.height / 2);
			moveTo((relX / rect.width) * strength * 2);
			moveToY((relY / rect.height) * strength * 2);
		};

		const onLeave = () => {
			moveTo(0);
			moveToY(0);
		};

		node.addEventListener('pointermove', onMove);
		node.addEventListener('pointerleave', onLeave);
		// O foco por teclado nunca deve deixar o botão deslocado.
		node.addEventListener('blur', onLeave);

		cleanup = () => {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
			node.removeEventListener('blur', onLeave);
			gsap.set(node, { x: 0, y: 0 });
		};
	});

	return {
		destroy() {
			cancelled = true;
			cleanup?.();
		}
	};
};
