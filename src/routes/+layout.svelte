<script lang="ts">
	import '../app.css';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import SkipLink from '$lib/components/layout/SkipLink.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import { prefersReducedMotion } from '$lib/utils/motion';

	let { children } = $props();

	// Nas páginas de proposta (links-fantasma), o cabeçalho fica só com a logo
	// e o rodapé sem a navegação — um documento focado.
	const minimalChrome = $derived(page.url.pathname.startsWith('/proposta-'));

	/**
	 * Transição de página com a View Transitions API. Onde não houver
	 * suporte (ou com prefers-reduced-motion), a navegação segue normal e
	 * instantânea — sem tela de carregamento artificial.
	 */
	onNavigate((navigation) => {
		if (!document.startViewTransition || prefersReducedMotion()) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Recalcula as posições do ScrollTrigger depois que a nova página monta.
	afterNavigate(async () => {
		const mod = await import('$lib/animations/gsap');
		const { ScrollTrigger } = await mod.loadGsap();
		ScrollTrigger.refresh();
	});
</script>

<SkipLink />

<!--
	Faixa de inclusão: uma linha fina de arco-íris no topo de todas as
	páginas — a Natasha celebra todas as formas de amor. Puramente decorativa.
-->
<div
	class="fixed inset-x-0 top-0 z-[55] h-[3px]"
	style="background: var(--gradient-pride);"
	aria-hidden="true"
></div>

<SiteHeader minimal={minimalChrome} />

<!--
	Sem padding-top aqui: o header é fixo e transparente sobre a hero.
	Cada página define o próprio respiro superior (a hero passa por baixo
	do header; as páginas internas começam com um cabeçalho editorial).
-->
<main id="conteudo" tabindex="-1">
	{@render children()}
</main>

<SiteFooter minimal={minimalChrome} />
<WhatsAppCTA />

<style>
	/* Transição de página discreta — fade curto, sem deslocamento agressivo. */
	:global(::view-transition-old(root)) {
		animation: fade-out 180ms var(--ease-in-out-soft) forwards;
	}
	:global(::view-transition-new(root)) {
		animation: fade-in 260ms var(--ease-editorial) forwards;
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(::view-transition-old(root)),
		:global(::view-transition-new(root)) {
			animation: none;
		}
	}
</style>
