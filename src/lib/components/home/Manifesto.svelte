<script lang="ts">
	import { manifesto } from '$lib/content/home';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';
	import { parallax } from '$lib/animations/parallax';
</script>

<!--
	Manifesto: composição assimétrica, muito espaço em branco, uma
	fotografia documental e uma frase de destaque em itálico.
-->
<section class="relative py-24 lg:py-36" aria-labelledby="manifesto-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-7 lg:col-start-1">
				<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>{manifesto.eyebrow}</p>

				<h2 id="manifesto-title" class="text-h2 text-ink mt-6" use:revealLines={{ onScroll: true }}>
					{manifesto.title}
				</h2>

				<div class="prose-measure mt-9 flex flex-col gap-6" use:reveal={{ stagger: 'p', y: 20 }}>
					{#each manifesto.body as paragraph, i (i)}
						<p class="text-lead text-ink-soft">{paragraph}</p>
					{/each}
				</div>
			</div>

			<!-- Fotografia documental, levemente deslocada -->
			<div class="lg:col-span-4 lg:col-start-9 lg:pt-24">
				<div use:parallax={{ distance: 40 }}>
					<ImageFrame
						src={manifesto.image}
						alt={manifesto.imageAlt}
						ratio="aspect-[3/4]"
						sizes="(max-width: 1024px) 90vw, 30vw"
					/>
				</div>
			</div>
		</div>

		<!-- Frase de destaque, em fonte de acento -->
		<figure
			class="relative mt-20 max-w-4xl lg:mt-28 lg:pl-[8%]"
			use:reveal={{ y: 24, duration: 1 }}
		>
			<span class="bg-teal/60 mb-7 block h-px w-16" aria-hidden="true"></span>
			<blockquote>
				<p class="font-accent-italic text-h2 text-teal-deep leading-[1.15]">
					{manifesto.pullQuote}
				</p>
			</blockquote>
		</figure>
	</div>
</section>
