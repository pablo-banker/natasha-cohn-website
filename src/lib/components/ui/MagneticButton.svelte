<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	/** Açúcar sintático sobre <Button magnetic /> para os CTAs principais. */
	type Props = {
		children: Snippet;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'ghost';
		loading?: boolean;
		disabled?: boolean;
		external?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
	};

	let { children, ...rest }: Props = $props();
</script>

<Button magnetic {...rest}>{@render children()}</Button>
