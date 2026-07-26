<script lang="ts">
	import { sections } from '$lib/content/home';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import ProcessTimeline from './ProcessTimeline.svelte';
</script>

<section class="py-24 lg:py-32" aria-labelledby="process-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5">
				<SectionIntro
					eyebrow={sections.process.eyebrow}
					title={sections.process.title}
					lead={sections.process.lead}
					id="process-title"
					class="lg:sticky lg:top-32"
				/>
			</div>

			<div class="lg:col-span-6 lg:col-start-7">
				<ProcessTimeline />
			</div>
		</div>
	</div>
</section>
