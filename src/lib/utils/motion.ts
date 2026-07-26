import { browser } from '$app/environment';

/** true quando o usuário pediu menos movimento (prefers-reduced-motion). */
export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** true apenas em dispositivos com ponteiro fino (mouse/trackpad). */
export function isFinePointer(): boolean {
	if (!browser) return false;
	return window.matchMedia('(pointer: fine)').matches;
}

/**
 * Efeitos de mouse (parallax, magnético, spotlight) só devem rodar quando há
 * ponteiro fino E o usuário não pediu menos movimento.
 */
export function pointerMotionAllowed(): boolean {
	return isFinePointer() && !prefersReducedMotion();
}
