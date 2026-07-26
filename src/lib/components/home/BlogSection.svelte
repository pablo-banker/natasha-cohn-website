<script lang="ts">
	import { sections } from '$lib/content/home';
	import { blogPostsByDate } from '$lib/content/blog-index';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { reveal } from '$lib/animations/reveal';

	const recent = blogPostsByDate.slice(0, 3);
</script>

{#if recent.length > 0}
	<section class="bg-paper-deep/45 py-24 lg:py-32" aria-labelledby="blog-title">
		<div class="container-editorial">
			<div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<SectionIntro
					eyebrow={sections.blog.eyebrow}
					title={sections.blog.title}
					lead={sections.blog.lead}
					id="blog-title"
				/>
				<div class="shrink-0" use:reveal={{ y: 14 }}>
					<Button href="/blog" variant="ghost">Ver todos os artigos</Button>
				</div>
			</div>

			<div
				class="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-12"
				use:reveal={{ stagger: '.blog-item', y: 26, staggerAmount: 0.1 }}
			>
				{#each recent as post (post.slug)}
					<div class="blog-item">
						<BlogCard {post} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
