// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Error {
			message: string;
		}
		// interface Locals {}
		interface PageData {
			seo?: import('$lib/seo/types').SeoInput;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
