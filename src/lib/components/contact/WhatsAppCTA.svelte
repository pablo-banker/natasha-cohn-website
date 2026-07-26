<script lang="ts">
	import { MessageCircle } from '@lucide/svelte';
	import { whatsappLink } from '$lib/content/site';

	type Props = {
		/** Mensagem pré-preenchida específica da página. */
		message?: string;
		/** `floating` fixa no canto; `inline` usa no fluxo do conteúdo. */
		variant?: 'floating' | 'inline';
		label?: string;
		class?: string;
	};

	let {
		message,
		variant = 'floating',
		label = 'Falar no WhatsApp',
		class: className = ''
	}: Props = $props();

	const href = $derived(message ? whatsappLink(message) : whatsappLink());
</script>

{#if variant === 'floating'}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="bg-clay text-paper shadow-lift ease-editorial hover:bg-clay-deep fixed right-5 bottom-5
			z-40 inline-flex size-14 items-center justify-center
			rounded-full transition-[background-color,transform] duration-300 hover:-translate-y-0.5
			motion-reduce:transition-none motion-reduce:hover:translate-y-0 {className}"
	>
		<MessageCircle class="size-6" aria-hidden="true" />
		<span class="sr-only">{label}</span>
	</a>
{:else}
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="bg-clay text-paper hover:bg-clay-deep inline-flex min-h-11 items-center gap-2.5 px-7
			py-3.5 text-[0.9375rem] font-medium transition-colors duration-300 {className}"
	>
		<MessageCircle class="size-[1.125rem]" aria-hidden="true" />
		{label}
	</a>
{/if}
