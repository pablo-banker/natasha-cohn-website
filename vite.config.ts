import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		projects: [
			{
				// Lógica pura: schemas, utilitários, conteúdo.
				extends: './vite.config.ts',
				test: {
					name: 'unit',
					environment: 'node',
					globals: true,
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			},
			{
				// Componentes Svelte renderizados no jsdom.
				extends: './vite.config.ts',
				test: {
					name: 'component',
					environment: 'jsdom',
					globals: true,
					setupFiles: ['./vitest-setup.ts'],
					include: ['src/**/*.svelte.{test,spec}.{js,ts}']
				},
				// Sem isto o Vite entrega a build de servidor do Svelte e
				// `mount()` falha com "not available on the server".
				resolve: { conditions: ['browser'] }
			}
		]
	}
});
