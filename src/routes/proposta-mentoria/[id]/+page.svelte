<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { loadGsap } from '$lib/animations/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion';
	import BrandIntro from '$lib/components/intro/BrandIntro.svelte';
	import MentoriaDocument from '$lib/components/proposal/MentoriaDocument.svelte';
	import { mentoriaProposal } from '$lib/content/mentoria';

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
		title: 'Mentoria — celebre com o coração',
		description: 'Mentoria de Natasha Cohn para preparar quem vai celebrar uma cerimônia.',
		path: `/proposta-mentoria/${data.id}`,
		noindex: true
	}}
/>

<!-- Mesma abertura animada, com chave própria (só a 1ª visita). -->
<BrandIntro storageKey="natasha-intro-prop-mentoria-seen" onreveal={handleReveal} />

<div bind:this={contentEl}>
	<MentoriaDocument content={mentoriaProposal} />
</div>
