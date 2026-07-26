import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia — provide a lightweight stub so components
// that read prefers-reduced-motion / pointer capabilities can render in tests.
if (typeof window !== 'undefined' && !window.matchMedia) {
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false
	});
}
