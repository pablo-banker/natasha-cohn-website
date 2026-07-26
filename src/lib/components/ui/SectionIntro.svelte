<script lang="ts">
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';

	type Props = {
		eyebrow?: string;
		title: string;
		lead?: string;
		align?: 'left' | 'center';
		/** Nível semântico do título — mantém a hierarquia correta na página. */
		level?: 'h1' | 'h2' | 'h3';
		class?: string;
		id?: string;
	};

	let {
		eyebrow,
		title,
		lead,
		align = 'left',
		level = 'h2',
		class: className = '',
		id
	}: Props = $props();

	const alignment = $derived(
		align === 'center' ? 'text-center mx-auto items-center' : 'items-start'
	);
	const titleSize = $derived(level === 'h1' ? 'text-h1' : 'text-h2');
</script>

<div class="flex max-w-3xl flex-col gap-5 {alignment} {className}">
	{#if eyebrow}
		<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>
			{eyebrow}
		</p>
	{/if}

	<svelte:element
		this={level}
		{id}
		class="{titleSize} text-ink"
		use:revealLines={{ onScroll: true }}
	>
		{title}
	</svelte:element>

	{#if lead}
		<p class="text-lead prose-measure text-ink-soft" use:reveal={{ y: 18, delay: 0.1 }}>
			{lead}
		</p>
	{/if}
</div>
