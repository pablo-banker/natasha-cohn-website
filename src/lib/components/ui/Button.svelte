<script lang="ts">
	import type { Snippet } from 'svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { magnetic as magneticAction } from '$lib/animations/magnetic';

	type Variant = 'primary' | 'secondary' | 'ghost';

	type Props = {
		children: Snippet;
		/** Renderiza como <a> quando presente; caso contrário <button>. */
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: Variant;
		/** Ativa o deslocamento magnético (só em ponteiro fino). */
		magnetic?: boolean;
		loading?: boolean;
		disabled?: boolean;
		/** Abre em nova aba com rel seguro. */
		external?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		'aria-label'?: string;
	};

	let {
		children,
		href,
		type = 'button',
		variant = 'primary',
		magnetic = false,
		loading = false,
		disabled = false,
		external = false,
		class: className = '',
		onclick,
		...rest
	}: Props = $props();

	const base =
		'group relative inline-flex items-center justify-center gap-2.5 font-body text-[0.9375rem] ' +
		'font-medium tracking-wide rounded-xs px-7 py-3.5 min-h-11 transition-[background-color,color,border-color,box-shadow,transform] ' +
		'duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-55 ' +
		'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay';

	const variants: Record<Variant, string> = {
		primary:
			'bg-clay text-paper shadow-soft hover:bg-clay-deep hover:shadow-lift active:translate-y-px',
		secondary:
			'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper active:translate-y-px',
		ghost: 'px-0 py-1 text-ink link-underline hover:text-clay'
	};

	const classes = $derived(`${base} ${variants[variant]} ${className}`);
	const isDisabled = $derived(disabled || loading);
</script>

{#if href}
	<a
		{href}
		class={classes}
		aria-disabled={isDisabled ? 'true' : undefined}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		use:magneticAction={{ enabled: magnetic, strength: 8 }}
		{onclick}
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		class={classes}
		disabled={isDisabled}
		aria-busy={loading ? 'true' : undefined}
		use:magneticAction={{ enabled: magnetic, strength: 8 }}
		{onclick}
		{...rest}
	>
		{#if loading}
			<LoaderCircle class="size-4 animate-spin" aria-hidden="true" />
		{/if}
		{@render children()}
	</button>
{/if}
