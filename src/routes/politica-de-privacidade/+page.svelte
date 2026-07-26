<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import { privacy } from '$lib/content/privacy';
	import { formatDatePt } from '$lib/utils/format';
	import { breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Política de privacidade', path: '/politica-de-privacidade' }
	];
</script>

<Seo
	seo={{
		title: privacy.title,
		description:
			'Como os dados enviados pelo site da Celebrante Natasha Cohn são coletados, usados e protegidos, conforme a LGPD.',
		path: '/politica-de-privacidade',
		structuredData: breadcrumbSchema(breadcrumbs)
	}}
/>

<PageHeader title={privacy.title} lead={privacy.intro} {breadcrumbs} />

<section class="py-20 lg:py-28">
	<div class="container-editorial">
		<p class="text-ink-mute text-sm">
			Última atualização: <time datetime={privacy.updatedAt}>{formatDatePt(privacy.updatedAt)}</time
			>
		</p>

		<div class="mt-12 flex max-w-[42rem] flex-col gap-12">
			{#each privacy.sections as section (section.title)}
				<section use:reveal={{ y: 20 }}>
					<h2 class="font-display text-h4 text-ink">{section.title}</h2>
					<div class="mt-4 flex flex-col gap-4">
						{#each section.body as paragraph, i (i)}
							<p class="text-ink-soft leading-relaxed">{paragraph}</p>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</div>
</section>
