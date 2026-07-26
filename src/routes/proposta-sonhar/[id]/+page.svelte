<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { loadGsap } from '$lib/animations/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion';
	import BrandIntro from '$lib/components/intro/BrandIntro.svelte';
	import ProposalDocument from '$lib/components/proposal/ProposalDocument.svelte';
	import { sonharProposal } from '$lib/content/proposals';

	let { data } = $props();

	let contentEl = $state<HTMLDivElement | null>(null);

	/**
	 * A abertura da marca avisa quando o overlay começa a sair; então a proposta
	 * entra com um fade suave e leve subida. Chave de localStorage própria.
	 */
	function handleReveal() {
		if (!contentEl || prefersReducedMotion()) return;
		loadGsap().then(({ gsap }) => {
			gsap.fromTo(
				contentEl,
				{ autoAlpha: 0, y: 16 },
				{ autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }
			);
		});
	}
</script>

<Seo
	seo={{
		title: 'Proposta de cerimônia',
		description: 'Proposta de cerimônia autoral feita por Natasha Cohn.',
		path: `/proposta-sonhar/${data.id}`,
		noindex: true
	}}
/>

<!-- Mesma abertura animada da home, com chave própria (só a 1ª visita). -->
<BrandIntro storageKey="natasha-intro-prop-sonhar-seen" onreveal={handleReveal} />

<div bind:this={contentEl}>
	<ProposalDocument content={sonharProposal} budget={data.budget} />
</div>
