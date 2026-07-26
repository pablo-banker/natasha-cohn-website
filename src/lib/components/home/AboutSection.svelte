<script lang="ts">
	import { sections } from '$lib/content/home';
	import { about } from '$lib/content/about';
	import { site } from '$lib/content/site';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';
	import { parallax } from '$lib/animations/parallax';
</script>

<section class="py-24 lg:py-32" aria-labelledby="about-title">
	<div class="container-editorial">
		<div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
			<!-- Fotografia mais espontânea -->
			<div class="lg:col-span-5">
				<div use:parallax={{ distance: 30 }}>
					<ImageFrame
						src={sections.about.image}
						alt={sections.about.imageAlt}
						focus={sections.about.imageFocus}
						ratio="aspect-[4/5]"
						sizes="(max-width: 1024px) 90vw, 40vw"
					/>
				</div>
			</div>

			<div class="lg:col-span-6 lg:col-start-7">
				<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>{sections.about.eyebrow}</p>

				<h2 id="about-title" class="text-h2 text-ink mt-5" use:revealLines={{ onScroll: true }}>
					{sections.about.title}
				</h2>

				<p class="text-lead prose-measure text-ink-soft mt-7" use:reveal={{ y: 20, delay: 0.1 }}>
					{sections.about.body}
				</p>

				<!-- Idiomas e regiões -->
				<dl class="mt-9 grid gap-6 sm:grid-cols-2" use:reveal={{ stagger: 'div', y: 18 }}>
					<div class="border-border border-l pl-5">
						<dt class="eyebrow text-ink-mute">Idiomas</dt>
						<dd class="text-ink mt-2">{site.languages.join(', ')}</dd>
					</div>
					<div class="border-border border-l pl-5">
						<dt class="eyebrow text-ink-mute">Onde celebro</dt>
						<dd class="text-ink mt-2">{about.regions.text}</dd>
					</div>
				</dl>

				<div class="mt-10" use:reveal={{ y: 16 }}>
					<Button href={sections.about.cta.href} magnetic>{sections.about.cta.label}</Button>
				</div>
			</div>
		</div>
	</div>
</section>
