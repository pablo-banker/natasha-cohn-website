/**
 * Carregamento preguiçoso e centralizado do GSAP.
 * GSAP roda apenas no cliente e é dividido em seu próprio chunk (dynamic
 * import), então nunca entra no bundle de SSR nem bloqueia o carregamento
 * inicial. Registramos o ScrollTrigger uma única vez.
 */
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export type GsapBundle = {
	gsap: typeof GsapType;
	ScrollTrigger: typeof ScrollTriggerType;
};

let bundle: Promise<GsapBundle> | null = null;

/** O GSAP já foi solicitado? Permite pular trabalho (ex.: refresh do
 *  ScrollTrigger em cada navegação) sem forçar o carregamento do chunk. */
export function isGsapLoaded(): boolean {
	return bundle !== null;
}

export function loadGsap(): Promise<GsapBundle> {
	if (!bundle) {
		bundle = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
			([gsapMod, stMod]) => {
				const gsap = gsapMod.gsap ?? gsapMod.default;
				const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
				gsap.registerPlugin(ScrollTrigger);
				return { gsap, ScrollTrigger };
			}
		);
	}
	return bundle;
}
