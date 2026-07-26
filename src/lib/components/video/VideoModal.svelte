<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { VideoItem } from '$lib/types';

	type Props = {
		video: VideoItem | null;
		onclose: () => void;
	};

	let { video, onclose }: Props = $props();
	let dialog = $state<HTMLDialogElement | null>(null);

	/**
	 * Usamos o <dialog> nativo: ele já entrega focus trap, fechamento com
	 * Escape e devolução do foco ao elemento que abriu — sem reimplementar
	 * acessibilidade à mão.
	 */
	$effect(() => {
		if (!dialog) return;
		if (video && !dialog.open) dialog.showModal();
		if (!video && dialog.open) dialog.close();
	});

	// O iframe só é criado quando há um vídeo ativo, então nenhum script do
	// YouTube é baixado antes da interação da pessoa.
	const embedUrl = $derived(
		video?.youtubeId
			? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`
			: null
	);
</script>

<dialog
	bind:this={dialog}
	{onclose}
	aria-label={video ? `Vídeo: ${video.title}` : 'Vídeo'}
	class="backdrop:bg-night/85 m-auto w-[min(64rem,92vw)] bg-transparent p-0 backdrop:backdrop-blur-sm"
>
	{#if video}
		<div class="bg-night text-paper shadow-lift relative">
			<button
				type="button"
				onclick={onclose}
				class="text-paper hover:text-blush absolute -top-12 right-0 inline-flex size-11
					items-center justify-center transition-colors"
			>
				<X class="size-6" aria-hidden="true" />
				<span class="sr-only">Fechar vídeo</span>
			</button>

			<div class="aspect-video w-full">
				{#if embedUrl}
					<iframe
						src={embedUrl}
						title={video.title}
						class="h-full w-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
						allowfullscreen
						referrerpolicy="strict-origin-when-cross-origin"
					></iframe>
				{:else if video.src}
					<!-- svelte-ignore a11y_media_has_caption -->
					<video
						src={video.src}
						controls
						autoplay
						class="h-full w-full"
						poster={video.poster ?? undefined}
					></video>
				{/if}
			</div>

			<div class="p-6">
				<h2 class="font-display text-h4">{video.title}</h2>
				{#if video.description}
					<p class="text-paper/70 mt-2 text-sm">{video.description}</p>
				{/if}
			</div>
		</div>
	{/if}
</dialog>
