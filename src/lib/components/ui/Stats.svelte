<script lang="ts">
	import type { Stat } from '$lib/types';
	import { countUp } from '$lib/animations/scroll';
	import { reveal } from '$lib/animations/reveal';

	type Props = { stats: Stat[]; class?: string };
	let { stats, class: className = '' }: Props = $props();
</script>

<!--
	Área de autoridade. Todos os valores vêm de src/lib/content/home.ts —
	nenhum número é escrito dentro do componente.
	Os números já vêm renderizados do servidor; a contagem é só um enfeite.
-->
<dl
	class="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 {className}"
	use:reveal={{ stagger: '.stat', y: 20, staggerAmount: 0.1 }}
>
	{#each stats as stat (stat.label)}
		<div class="stat relative flex flex-col gap-1.5 pl-5">
			<span class="bg-border absolute top-1 bottom-1 left-0 w-px" aria-hidden="true"></span>
			<dd class="font-display text-h3 text-clay leading-none">
				{#if stat.value !== null}
					<span use:countUp={{ value: stat.value, prefix: stat.prefix, suffix: stat.suffix }}>
						{stat.prefix ?? ''}{stat.value}{stat.suffix ?? ''}
					</span>
				{:else}
					<span class="font-accent-italic">{stat.display}</span>
				{/if}
			</dd>
			<dt class="text-ink-soft text-sm leading-snug">{stat.label}</dt>
		</div>
	{/each}
</dl>
