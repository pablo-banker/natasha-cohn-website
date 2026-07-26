<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';

	type Props = {
		eyebrow?: string;
		title: string;
		lead?: string;
		/** Trilha de navegação — o item atual é o último e não vira link. */
		breadcrumbs?: { name: string; path: string }[];
	};

	let { eyebrow, title, lead, breadcrumbs = [] }: Props = $props();
</script>

<header class="border-border relative overflow-hidden border-b pt-32 pb-16 lg:pt-40 lg:pb-24">
	<div class="container-editorial">
		{#if breadcrumbs.length > 0}
			<nav aria-label="Trilha de navegação" class="mb-8" use:reveal={{ y: 10, duration: 0.5 }}>
				<ol class="text-ink-mute flex flex-wrap items-center gap-1.5 text-xs">
					{#each breadcrumbs as crumb, index (crumb.path)}
						<li class="flex items-center gap-1.5">
							{#if index < breadcrumbs.length - 1}
								<a href={crumb.path} class="link-underline hover:text-ink">{crumb.name}</a>
								<ChevronRight class="size-3 shrink-0" aria-hidden="true" />
							{:else}
								<span aria-current="page" class="text-ink">{crumb.name}</span>
							{/if}
						</li>
					{/each}
				</ol>
			</nav>
		{/if}

		{#if eyebrow}
			<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>{eyebrow}</p>
		{/if}

		<h1 class="text-h1 text-ink mt-5 max-w-4xl" use:revealLines={{ duration: 1 }}>
			{title}
		</h1>

		{#if lead}
			<p class="text-lead prose-measure text-ink-soft mt-7" use:reveal={{ y: 18, delay: 0.25 }}>
				{lead}
			</p>
		{/if}
	</div>
</header>
