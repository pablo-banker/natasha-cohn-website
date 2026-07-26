<script lang="ts">
	type Props = {
		quote: string;
		author?: string;
		context?: string;
		/** `feature` para o depoimento em destaque, `inline` para a galeria. */
		size?: 'feature' | 'inline';
		/** Foto do casal (quando houver). */
		image?: string | null;
		imageAlt?: string;
		class?: string;
	};

	let {
		quote,
		author,
		context,
		size = 'inline',
		image = null,
		imageAlt = '',
		class: className = ''
	}: Props = $props();

	// Divide em parágrafos (linhas em branco), sem strings vazias — evita
	// chaves duplicadas no {#each}.
	const paragraphs = $derived(
		quote
			.split(/\n+/)
			.map((p) => p.trim())
			.filter(Boolean)
	);
</script>

<!--
	As aspas decorativas são desenhadas com ::before (ver <style>), sem
	elementos HTML vazios e sem serem lidas por leitores de tela.
-->
<figure class="quote quote--{size} {className}">
	<blockquote
		class={size === 'feature'
			? 'text-h3 font-display flex flex-col gap-4'
			: 'flex flex-col gap-3 text-[1.0625rem] leading-relaxed'}
	>
		{#each paragraphs as paragraph, i (i)}
			<p>{paragraph}</p>
		{/each}
	</blockquote>
	{#if author}
		<figcaption class="mt-5 flex items-center gap-3">
			{#if image}
				<img
					src={image}
					alt={imageAlt}
					width="56"
					height="56"
					loading="lazy"
					decoding="async"
					class="size-12 shrink-0 rounded-full object-cover {size === 'feature'
						? 'sm:size-14'
						: ''}"
				/>
			{/if}
			<span class="flex flex-wrap items-baseline gap-x-2">
				<cite class="eyebrow text-clay not-italic">{author}</cite>
				{#if context}
					<span class="text-ink-mute text-sm">· {context}</span>
				{/if}
			</span>
		</figcaption>
	{/if}
</figure>

<style>
	.quote {
		position: relative;
	}

	.quote::before {
		content: '\201C';
		position: absolute;
		font-family: var(--font-display);
		color: var(--color-teal);
		opacity: 0.55;
		line-height: 1;
		pointer-events: none;
		user-select: none;
	}

	.quote--feature::before {
		font-size: clamp(6rem, 4rem + 8vw, 11rem);
		top: -0.32em;
		left: -0.12em;
		z-index: -1;
	}

	.quote--inline::before {
		font-size: 4rem;
		top: -0.35em;
		left: -0.06em;
		opacity: 0.75;
		z-index: -1;
	}

	.quote blockquote {
		position: relative;
		color: var(--color-ink);
		text-wrap: pretty;
	}
</style>
