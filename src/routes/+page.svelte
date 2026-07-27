<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { site } from '$lib/content/site';
	import { hero } from '$lib/content/home';
	import { personSchema, professionalServiceSchema, webSiteSchema } from '$lib/seo/structuredData';
	import { loadGsap } from '$lib/animations/gsap';
	import { prefersReducedMotion } from '$lib/utils/motion';

	import BrandIntro from '$lib/components/intro/BrandIntro.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Manifesto from '$lib/components/home/Manifesto.svelte';
	import CeremoniesSection from '$lib/components/home/CeremoniesSection.svelte';
	import ProcessSection from '$lib/components/home/ProcessSection.svelte';
	import VideoSection from '$lib/components/home/VideoSection.svelte';
	import RitualsSection from '$lib/components/home/RitualsSection.svelte';
	import TestimonialsSection from '$lib/components/home/TestimonialsSection.svelte';
	import AboutSection from '$lib/components/home/AboutSection.svelte';
	import BlogSection from '$lib/components/home/BlogSection.svelte';
	import FinalCta from '$lib/components/home/FinalCta.svelte';
	import ContactSection from '$lib/components/home/ContactSection.svelte';

	let { form } = $props();

	let contentEl = $state<HTMLDivElement | null>(null);

	/**
	 * A abertura (BrandIntro) avisa quando o overlay começa a sair; então a home
	 * entra com um fade suave e leve subida — simultâneo ao fade-out do overlay.
	 * Em acessos posteriores a abertura não roda e a home já está visível.
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
		title: 'Celebrante de casamentos',
		description: site.description,
		path: '/',
		preloadImage: hero.portrait,
		structuredData: [webSiteSchema(), personSchema(), professionalServiceSchema()]
	}}
/>

<!-- Abertura animada (apenas 1ª visita, apenas na home). -->
<BrandIntro onreveal={handleReveal} />

<div bind:this={contentEl}>
	<Hero />
	<Manifesto />
	<CeremoniesSection />
	<ProcessSection />
	<VideoSection />
	<RitualsSection />
	<TestimonialsSection />
	<AboutSection />
	<BlogSection />
	<FinalCta />
	<ContactSection {form} />
</div>
