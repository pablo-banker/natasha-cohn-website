import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$content: 'src/lib/content',
			$components: 'src/lib/components'
		},
		/**
		 * Content Security Policy compatível com os serviços realmente usados:
		 * fontes auto-hospedadas, miniaturas e player (youtube-nocookie) do
		 * YouTube. 'unsafe-inline' em style-src é necessário porque o Svelte e o
		 * GSAP aplicam estilos inline nos elementos.
		 */
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', 'https://i.ytimg.com'],
				'font-src': ['self', 'data:'],
				'connect-src': ['self'],
				'frame-src': ['https://www.youtube-nocookie.com', 'https://www.youtube.com'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'frame-ancestors': ['self']
			}
		}
	}
};

export default config;
