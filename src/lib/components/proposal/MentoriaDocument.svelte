<script lang="ts">
	import { Check, X } from '@lucide/svelte';
	import type { MentoriaContent } from '$lib/content/mentoria';
	import { site } from '$lib/content/site';
	import { socialLinks } from '$lib/content/social';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';

	let { content }: { content: MentoriaContent } = $props();

	const whatsappMessage = 'Olá, Natasha! Tenho interesse na mentoria para celebrar uma cerimônia.';
</script>

<!-- ░░ Capa (full-bleed) ░░ -->
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	{#if content.cover.image}
		<img src={content.cover.image} alt="" class="absolute inset-0 h-full w-full object-cover" />
		<div class="absolute inset-0 bg-[#221f1b]/55"></div>
	{:else}
		<div class="bg-night absolute inset-0"></div>
	{/if}

	<div class="text-paper relative z-10 flex flex-col items-center px-6 text-center">
		<p class="font-accent-italic text-paper/90 text-3xl sm:text-4xl" use:reveal={{ y: 14 }}>
			{content.cover.kicker}
		</p>
		<h1
			class="font-display text-paper mt-4 text-[clamp(3.25rem,12vw,9rem)] leading-[0.92] uppercase"
			use:revealLines={{ onScroll: false }}
		>
			{content.cover.title}
		</h1>
		<span
			class="border-paper/50 text-paper/90 mt-8 inline-block rounded-full border px-7 py-2.5
				text-sm tracking-wide"
			use:reveal={{ y: 12, delay: 0.2 }}
		>
			{content.cover.name}
		</span>
	</div>
</section>

<!-- ░░ Sobre (Olá, meu nome é) ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial">
		<div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5" use:reveal={{ x: -24 }}>
				<ImageFrame
					src={content.intro.image}
					alt="Retrato de Natasha Cohn"
					ratio="aspect-[4/5]"
					sizes="(max-width: 1024px) 88vw, 40vw"
				/>
			</div>
			<div class="lg:col-span-6 lg:col-start-7">
				<p class="eyebrow text-ink-mute" use:reveal={{ y: 12, duration: 0.6 }}>
					{content.intro.label}
				</p>
				<h2 class="text-h2 font-display text-ink mt-3" use:revealLines={{ onScroll: true }}>
					{content.intro.name}
				</h2>
				<div class="prose-measure text-ink-soft mt-7 flex flex-col gap-4" use:reveal={{ y: 20 }}>
					{#each content.intro.paragraphs as paragraph, i (i)}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ░░ Uma experiência única ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial mx-auto max-w-2xl text-center">
		<h2 class="text-h2 font-display text-ink" use:revealLines={{ onScroll: true }}>
			{content.concept.title}
		</h2>
		<div
			class="text-lead text-ink-soft mt-6 flex flex-col gap-4"
			use:reveal={{ y: 18, delay: 0.1 }}
		>
			{#each content.concept.paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
		</div>
	</div>
</section>

<!-- ░░ O que está incluso ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="flex flex-col gap-4 lg:col-span-5">
				{#each content.included.images as img, i (i)}
					<ImageFrame
						src={img}
						alt="Mentoria de celebração com Natasha Cohn"
						ratio="aspect-[4/3]"
						sizes="(max-width: 1024px) 88vw, 40vw"
					/>
				{/each}
			</div>
			<div class="lg:col-span-6 lg:col-start-7">
				<SectionIntro title={content.included.title} />
				<ol class="mt-8 flex flex-col gap-8" use:reveal={{ stagger: 'li', y: 16 }}>
					{#each content.included.items as item, i (item.title)}
						<li class="flex gap-4">
							<span
								class="text-clay/85 font-display w-8 shrink-0 text-[1.9rem] leading-none"
								aria-hidden="true"
							>
								{i + 1}
							</span>
							<div>
								<h3 class="font-display text-h4 text-ink">{item.title}</h3>
								<p class="text-ink-soft mt-2">{item.description}</p>
								{#if item.bullets}
									<ul class="mt-3 flex flex-col gap-1.5">
										{#each item.bullets as bullet (bullet)}
											<li class="text-ink-soft flex items-start gap-2.5 text-[0.9375rem]">
												<Check class="text-teal mt-1 size-4 shrink-0" aria-hidden="true" />
												<span>{bullet}</span>
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</section>

<!-- ░░ O que não está incluso ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial mx-auto max-w-2xl">
		<SectionIntro title={content.notIncluded.title} />
		<ul class="mt-8 flex flex-col gap-4" use:reveal={{ stagger: 'li', y: 14 }}>
			{#each content.notIncluded.items as item (item)}
				<li class="text-ink-soft border-border-soft flex items-start gap-3 border-b pb-4">
					<X class="text-clay mt-1 size-5 shrink-0" aria-hidden="true" />
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ░░ Investimento ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial mx-auto max-w-2xl text-center">
		<p class="eyebrow text-ink-mute" use:reveal={{ y: 12, duration: 0.6 }}>Investimento</p>
		<div class="border-border bg-paper mt-6 border p-10" use:reveal={{ y: 24 }}>
			<p class="font-display text-h1 text-clay">{content.budget.value}</p>
			<p class="text-ink-soft mx-auto mt-6 max-w-md">{content.budget.payment}</p>
		</div>
		<p class="text-ink-mute mt-6 text-sm">{content.budget.validity}</p>
		<div class="mt-10 flex justify-center">
			<WhatsAppCTA variant="inline" message={whatsappMessage} label="Quero fazer a mentoria" />
		</div>
	</div>
</section>

<!-- ░░ CTA final ░░ -->
<section class="bg-night text-paper py-24 lg:py-32">
	<div class="container-editorial text-center">
		<h2 class="text-h2 font-display text-paper" use:revealLines={{ onScroll: true }}>
			{content.cta.title}
		</h2>
		<p
			class="font-accent-italic text-lead text-paper/75 mx-auto mt-6 max-w-2xl"
			use:reveal={{ y: 18, delay: 0.1 }}
		>
			{content.cta.lead}
		</p>

		<ul
			class="text-paper/85 mx-auto mt-10 flex max-w-md flex-col gap-3"
			use:reveal={{ stagger: 'li', y: 12 }}
		>
			{#each site.phones as phone (phone.href)}
				<li><a href={phone.href} class="link-underline hover:text-paper">{phone.label}</a></li>
			{/each}
			<li>
				<a href="mailto:{site.email}" class="link-underline hover:text-paper break-all">
					{site.email}
				</a>
			</li>
		</ul>

		<div class="mt-9 flex justify-center">
			<WhatsAppCTA variant="inline" message={whatsappMessage} />
		</div>

		<ul class="mt-10 flex items-center justify-center gap-2">
			{#each socialLinks as social (social.href)}
				<li>
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						class="border-paper/20 text-paper/80 hover:border-clay hover:bg-clay hover:text-paper
							inline-flex size-11 items-center justify-center border transition-colors"
					>
						<SocialIcon name={social.icon} />
						<span class="sr-only">{social.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
