<script lang="ts">
	import { Camera } from '@lucide/svelte';
	import { maskReveal } from '$lib/animations/scroll';

	type Props = {
		/** Caminho da imagem. `null` renderiza um marcador editorial. */
		src: string | null;
		alt: string;
		/** Classe de proporção (evita layout shift). */
		ratio?: string;
		/** Imagem da primeira dobra: carrega com prioridade. */
		priority?: boolean;
		sizes?: string;
		class?: string;
		/** Revela por máscara ao entrar na viewport. */
		animate?: boolean;
		/** Foco do recorte (object-position), ex.: '30% 40%'. Útil para
		 *  enquadrar a celebrante em fotos de cerimônia. */
		focus?: string;
	};

	let {
		src,
		alt,
		ratio = 'aspect-[4/5]',
		priority = false,
		sizes = '(max-width: 768px) 100vw, 50vw',
		class: className = '',
		animate = true,
		focus = 'center'
	}: Props = $props();
</script>

<figure
	class="bg-paper-deep relative overflow-hidden {ratio} {className}"
	use:maskReveal={animate ? undefined : { duration: 0 }}
>
	{#if src}
		<img
			{src}
			{alt}
			{sizes}
			class="h-full w-full object-cover"
			style="object-position: {focus};"
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : undefined}
			decoding={priority ? 'sync' : 'async'}
		/>
	{:else}
		<!-- Marcador de fotografia pendente. Substituir pelo arquivo real em
		     /static/images (ver docs/MIGRATION.md). Tratado como decorativo
		     para não anunciar um marcador a leitores de tela. -->
		<div
			class="border-border-soft flex h-full w-full flex-col items-center justify-center gap-3 border p-6 text-center"
			aria-hidden="true"
		>
			<span class="border-border-soft/70 absolute inset-3 border"></span>
			<Camera class="text-ink-mute/70 size-6" />
			<span class="font-accent-italic text-ink-mute max-w-[26ch] text-sm leading-snug">
				{alt}
			</span>
			<span class="eyebrow text-ink-mute/80 text-[0.6875rem]">fotografia a enviar</span>
		</div>
	{/if}
</figure>
