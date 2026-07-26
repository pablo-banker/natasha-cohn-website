import { browser } from '$app/environment';

const STORAGE_KEY = 'nc:locale';
const DEFAULT_LOCALE = 'pt-BR';

/**
 * Estado do idioma com persistência em localStorage.
 * Hoje só o pt-BR está publicado; a estrutura fica pronta para o inglês.
 */
class LocaleState {
	current = $state<string>(DEFAULT_LOCALE);

	constructor() {
		if (browser) {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) this.current = stored;
		}
	}
}

export const locale = new LocaleState();

export function setLocale(code: string) {
	locale.current = code;
	if (browser) {
		localStorage.setItem(STORAGE_KEY, code);
		document.documentElement.lang = code;
	}
}
