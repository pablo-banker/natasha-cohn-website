<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { VideoItem } from '$lib/types';
	import { sections } from '$lib/content/home';
	import { playableVideos, videoChannelUrl } from '$lib/content/videos';
	import VideoCard from '$lib/components/video/VideoCard.svelte';
	import VideoModal from '$lib/components/video/VideoModal.svelte';
	import { reveal } from '$lib/animations/reveal';

	let activeVideo = $state<VideoItem | null>(null);

	const featured = $derived(playableVideos.find((v) => v.featured) ?? playableVideos[0]);
	const rest = $derived(playableVideos.filter((v) => v !== featured));
</script>

<!-- id="videos": alvo do redirect 301 da antiga página /videos do Wix -->
<section id="videos" class="bg-night text-paper py-24 lg:py-32" aria-labelledby="videos-title">
	<div class="container-editorial">
		<div class="max-w-3xl">
			<p class="eyebrow text-blush" use:reveal={{ y: 12, duration: 0.6 }}>
				{sections.videos.eyebrow}
			</p>
			<h2 id="videos-title" class="text-h2 text-paper mt-5" use:reveal={{ y: 22 }}>
				{sections.videos.title}
			</h2>
			<p class="text-lead text-paper/70 mt-5" use:reveal={{ y: 18, delay: 0.1 }}>
				{sections.videos.lead}
			</p>
		</div>

		{#if playableVideos.length > 0}
			<!-- Composição: um vídeo principal em destaque (centralizado, com
			     moldura que recorta as bordas laterais) e os demais abaixo -->
			<div class="mt-14">
				<div class="video-frame mx-auto lg:max-w-[68%]" use:reveal={{ y: 24 }}>
					<VideoCard video={featured} size="feature" onplay={(v) => (activeVideo = v)} />
				</div>
				{#if rest.length > 0}
					<div
						class="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
						use:reveal={{ stagger: '.video-item', y: 22, staggerAmount: 0.08 }}
					>
						{#each rest.slice(0, 3) as video (video.title)}
							<div class="video-item">
								<VideoCard {video} onplay={(v) => (activeVideo = v)} />
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!--
				Nenhum vídeo com ID confirmado ainda (ver src/lib/content/videos.ts).
				Em vez de inventar vídeos, convidamos para o canal — exatamente como
				o site atual faz. Assim que os IDs forem preenchidos, o grid de
				players com modal aparece automaticamente aqui.
			-->
			<div class="border-paper/15 mt-14 border-t pt-10" use:reveal={{ y: 20 }}>
				<p class="font-accent-italic text-h3 text-paper max-w-2xl">
					Assista às histórias no canal do YouTube.
				</p>
				<a
					href={videoChannelUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="group bg-clay text-paper hover:bg-clay-deep mt-8 inline-flex min-h-11 items-center gap-2.5
						px-7 py-3.5 text-[0.9375rem] font-medium transition-colors"
				>
					Ver cerimônias no YouTube
					<ArrowUpRight
						class="size-4 transition-transform duration-300 group-hover:translate-x-0.5
							group-hover:-translate-y-0.5"
						aria-hidden="true"
					/>
				</a>
			</div>
		{/if}
	</div>
</section>

<VideoModal video={activeVideo} onclose={() => (activeVideo = null)} />

<style>
	/*
		Moldura do vídeo em destaque: uma borda fina com um respiro interno
		(matte) sobre o fundo escuro. O respiro cobre as bordas laterais do
		vídeo, dando um enquadramento limpo e centralizado.
	*/
	.video-frame {
		padding: 0.625rem;
		border: 1px solid rgba(244, 238, 228, 0.16);
		background-color: rgba(244, 238, 228, 0.03);
		box-shadow: var(--shadow-lift);
	}
</style>
