<script lang="ts">
	/**
	 * Ícones das redes sociais. O Lucide removeu os ícones de marca e a
	 * regra do projeto é usá-lo apenas para ícones funcionais — então os
	 * glifos abaixo são SVGs próprios, sem dependência adicional.
	 * São puramente decorativos: o rótulo acessível fica no link.
	 */
	type Props = { name: 'instagram' | 'facebook' | 'youtube'; class?: string };
	let { name, class: className = 'size-[1.125rem]' }: Props = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'instagram'}
		<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
		<circle cx="12" cy="12" r="4.2" />
		<circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
	{:else if name === 'facebook'}
		<path
			d="M14.5 8.5V6.9c0-.8.4-1.4 1.4-1.4h1.4V2.6h-2.4c-2.5 0-3.9 1.5-3.9 3.9v2h-2.2v3h2.2v9.9h3.5v-9.9h2.4l.4-3h-2.8Z"
		/>
	{:else}
		<path
			d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8Z"
		/>
		<path d="M10.2 15.1 15.3 12l-5.1-3.1v6.2Z" fill="currentColor" />
	{/if}
</svg>
