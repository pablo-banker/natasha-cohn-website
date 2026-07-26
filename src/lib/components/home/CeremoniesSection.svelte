<script lang="ts">
	import { sections } from '$lib/content/home';
	import { ceremonies } from '$lib/content/ceremonies';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import CeremonyList from '$lib/components/ceremonies/CeremonyList.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';
</script>

<section class="bg-paper-deep/45 py-24 lg:py-32" aria-labelledby="ceremonies-title">
	<div class="container-editorial">
		<SectionIntro
			eyebrow={sections.ceremonies.eyebrow}
			title={sections.ceremonies.title}
			lead={sections.ceremonies.lead}
			id="ceremonies-title"
			class="mb-14 lg:mb-20"
		/>

		<CeremonyList {ceremonies} />

		<div class="mt-12" use:reveal={{ y: 16 }}>
			<Button href="/cerimonias" variant="secondary">Ver todas as cerimônias</Button>
		</div>
	</div>
</section>
