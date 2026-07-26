<script lang="ts">
	import { Play } from '@lucide/svelte';
	import type { VideoItem } from '$lib/types';

	type Props = {
		video: VideoItem;
		onplay: (video: VideoItem) => void;
		/** `feature` para o vídeo principal da composição. */
		size?: 'feature' | 'small';
	};

	let { video, onplay, size = 'small' }: Props = $props();

	/**
	 * Thumbnail estática (facade): nenhum script do YouTube é carregado até
	 * a pessoa clicar. Usa a poster otimizada quando existir; senão, a
	 * miniatura do próprio YouTube.
	 */
	const poster = $derived(
		video.poster ??
			(video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : null)
	);

	function handleClick() {
		onplay(video);
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class="group block w-full text-left"
	aria-label="Assistir: {video.title}"
>
	<!-- Sempre 16:9 (object-cover recorta as barras pretas da thumbnail 4:3). -->
	<span class="bg-paper-deep relative block aspect-video overflow-hidden">
		{#if poster}
			<img
				src={poster}
				alt=""
				loading="lazy"
				decoding="async"
				class="ease-editorial h-full w-full object-cover transition-transform duration-700
					group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
			/>
		{/if}

		<span
			class="bg-night/15 group-hover:bg-night/30 absolute inset-0 transition-colors duration-500"
			aria-hidden="true"
		></span>

		<span
			class="bg-paper/92 text-ink shadow-lift ease-editorial absolute top-1/2 left-1/2
				inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center
				rounded-full transition-transform duration-500 group-hover:scale-110
				motion-reduce:transition-none motion-reduce:group-hover:scale-100"
			aria-hidden="true"
		>
			<Play class="size-6 translate-x-0.5 fill-current" />
		</span>
	</span>

	<!-- A seção de vídeos tem fundo escuro: texto claro para contraste. -->
	<span
		class="font-display mt-4 block {size === 'feature'
			? 'text-h4'
			: 'text-lg'} text-paper group-hover:text-clay-soft transition-colors"
	>
		{video.title}
	</span>
	{#if video.description}
		<span class="text-paper/65 mt-1.5 block text-sm">{video.description}</span>
	{/if}
</button>
