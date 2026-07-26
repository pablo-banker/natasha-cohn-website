<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { BlogPostMeta } from '$lib/types';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import { formatDatePt } from '$lib/utils/format';

	type Props = { post: BlogPostMeta; readingMinutes?: number };
	let { post, readingMinutes }: Props = $props();
</script>

<article class="group flex h-full flex-col">
	<a href="/blog/{post.slug}" class="flex h-full flex-col focus-visible:outline-offset-6">
		<ImageFrame
			src={post.coverImage}
			alt={post.coverAlt}
			ratio="aspect-[3/2]"
			sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 32vw"
		/>

		<div class="flex flex-1 flex-col pt-6">
			<p class="text-ink-mute flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
				{#if post.category}
					<span class="eyebrow text-clay text-[0.6875rem]">{post.category}</span>
					<span aria-hidden="true">·</span>
				{/if}
				<time datetime={post.date}>{formatDatePt(post.date)}</time>
				{#if readingMinutes}
					<span aria-hidden="true">·</span>
					<span>{readingMinutes} min de leitura</span>
				{/if}
			</p>

			<h3
				class="font-display text-h4 text-ink group-hover:text-clay mt-3 transition-colors duration-500"
			>
				{post.title}
			</h3>

			<p class="text-ink-soft mt-3 flex-1 text-[0.9375rem] leading-relaxed">
				{post.description}
			</p>

			<span class="text-ink mt-5 inline-flex items-center gap-2 text-sm font-medium">
				Ler o artigo
				<ArrowUpRight
					class="size-4 transition-transform duration-300 group-hover:translate-x-0.5
						group-hover:-translate-y-0.5"
					aria-hidden="true"
				/>
			</span>
		</div>
	</a>
</article>
