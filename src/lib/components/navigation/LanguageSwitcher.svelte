<script lang="ts">
	import { locales } from '$lib/content/site';
	import { locale, setLocale } from '$lib/stores/locale.svelte';

	/**
	 * A arquitetura bilíngue está pronta, mas o seletor só aparece quando
	 * houver mais de um idioma efetivamente disponível — evitamos publicar
	 * páginas incompletas em inglês (ver docs/MIGRATION.md, seção i18n).
	 */
	const available = locales.filter((l) => l.available);
	const enabled = available.length > 1;
</script>

{#if enabled}
	<div class="flex items-center gap-1" role="group" aria-label="Selecionar idioma">
		{#each available as option (option.code)}
			<button
				type="button"
				onclick={() => setLocale(option.code)}
				aria-current={locale.current === option.code ? 'true' : undefined}
				class="aria-[current=true]:text-clay text-ink-mute hover:text-ink min-h-11 px-2 text-xs font-medium
					tracking-[0.14em] uppercase transition-colors"
			>
				<span class="sr-only">{option.name}</span>
				<span aria-hidden="true">{option.label}</span>
			</button>
		{/each}
	</div>
{/if}
