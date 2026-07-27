<script lang="ts">
	import { Check, Heart } from '@lucide/svelte';
	import type { ProposalContent, ProposalBudget } from '$lib/content/proposals';
	import { site } from '$lib/content/site';
	import { socialLinks } from '$lib/content/social';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import ImageFrame from '$lib/components/ui/ImageFrame.svelte';
	import Quote from '$lib/components/ui/Quote.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import BrandMandala from '$lib/components/motion/BrandMandala.svelte';
	import ScrollGlow from '$lib/components/motion/ScrollGlow.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';

	let { content, budget }: { content: ProposalContent; budget: ProposalBudget } = $props();

	// Cores da bandeira (mesma paleta usada no rodapé do site).
	const prideColors = ['#e14b4b', '#e59637', '#e6c94a', '#46a85f', '#3f78c9', '#8a53c9'];

	const whatsappMessage = `Olá, Natasha! Recebi a proposta e gostaria de seguir com a nossa cerimônia.`;
</script>

<!-- ░░ Capa ░░ -->
<section class="relative isolate overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
	<!-- Toque sutil da marca na abertura da proposta. -->
	<BrandMandala class="-top-28 -right-28" size="26rem" opacity={0.05} rotate={12} fade={false} />

	<div class="container-editorial">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div use:reveal={{ x: -24 }}>
				<ImageFrame
					src={content.images.hero}
					alt="Cerimônia ao ar livre celebrada por Natasha Cohn"
					ratio="aspect-[3/2]"
					priority
					sizes="(max-width: 1024px) 90vw, 45vw"
				/>
			</div>
			<div class="flex flex-col gap-6">
				<p class="eyebrow text-clay" use:reveal={{ y: 12, duration: 0.6 }}>
					{content.cover.eyebrow}
				</p>
				<h1 class="text-h1 font-display text-ink" use:revealLines={{ onScroll: false }}>
					{content.cover.title}
				</h1>
				<p class="font-accent-italic text-lead text-ink-soft" use:reveal={{ y: 18, delay: 0.1 }}>
					{content.cover.tagline}
				</p>
				<span
					class="mt-2 block h-[3px] w-16 rounded-full"
					style="background: var(--gradient-pride);"
					aria-hidden="true"
					use:reveal={{ y: 10, delay: 0.2 }}
				></span>
			</div>
		</div>
	</div>
</section>

<!-- ░░ Sobre mim ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-7">
				<p class="eyebrow text-ink-mute" use:reveal={{ y: 12, duration: 0.6 }}>
					{content.about.label}
				</p>
				<h2 class="text-h2 font-display text-ink mt-4" use:revealLines={{ onScroll: true }}>
					{content.about.title}
				</h2>
				<div class="prose-measure text-ink-soft mt-7 flex flex-col gap-4" use:reveal={{ y: 20 }}>
					{#each content.about.paragraphs as paragraph, i (i)}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>
			<div class="lg:col-span-5 lg:col-start-8" use:reveal={{ y: 24, delay: 0.1 }}>
				<ImageFrame
					src={content.images.about}
					alt="Retrato de Natasha Cohn"
					ratio="aspect-[2/3]"
					sizes="(max-width: 1024px) 88vw, 40vw"
				/>
			</div>
		</div>
	</div>
</section>

<!-- ░░ O que me torna única + Tipos de cerimônia ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial flex flex-col gap-16">
		<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5">
				<SectionIntro title={content.differentials.title} />
				<ul class="mt-8 flex flex-col gap-4" use:reveal={{ stagger: 'li', y: 14 }}>
					{#each content.differentials.items as item (item)}
						<li class="text-ink-soft flex items-start gap-3">
							<Check class="text-teal mt-1 size-5 shrink-0" aria-hidden="true" />
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="lg:col-span-7">
				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
					{#each content.images.differentials as img, i (i)}
						<ImageFrame
							src={img}
							alt="Momento de cerimônia celebrada por Natasha"
							ratio="aspect-[4/3]"
							sizes="(max-width: 640px) 45vw, 22vw"
						/>
					{/each}
				</div>
			</div>
		</div>

		<div class="border-border border-t pt-14">
			<SectionIntro title={content.ceremonyTypes.title} />
			<ul class="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2" use:reveal={{ stagger: 'li', y: 14 }}>
				{#each content.ceremonyTypes.items as item (item)}
					<li class="text-ink-soft border-border-soft flex items-center gap-3 border-b pb-4">
						<span class="bg-clay size-1.5 shrink-0 rounded-full" aria-hidden="true"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- ░░ Convidados envolvidos (mosaico) ░░ -->
<section class="bg-night overflow-hidden py-4">
	<div class="grid grid-cols-2 gap-1 lg:grid-cols-3">
		{#each Array(9) as _, i (i)}
			{#if i === 4}
				<div
					class="bg-night flex items-center justify-center p-6 text-center"
					use:reveal={{ scale: 0.96 }}
				>
					<h2 class="text-h3 font-display text-clay-soft">{content.guests.title}</h2>
				</div>
			{:else}
				<ImageFrame
					src={content.images.guests[i < 4 ? i : i - 1]}
					alt="Convidados emocionados durante a cerimônia"
					ratio="aspect-[4/3]"
					sizes="(max-width: 1024px) 50vw, 33vw"
				/>
			{/if}
		{/each}
	</div>
</section>

<!-- ░░ Todas as formas de amar ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial">
		<div class="flex items-center justify-center gap-1.5" use:reveal={{ y: 12 }}>
			{#each prideColors as color (color)}
				<Heart class="size-7 sm:size-9" style="color: {color}; fill: {color};" aria-hidden="true" />
			{/each}
		</div>

		<div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
			{#each content.images.inclusivity as img, i (i)}
				<ImageFrame
					src={img}
					alt="Casais celebrando o amor em sua diversidade"
					ratio="aspect-[4/5]"
					sizes="(max-width: 640px) 45vw, 30vw"
				/>
			{/each}
		</div>

		<div class="mx-auto mt-12 max-w-2xl text-center">
			<h2 class="text-h2 font-display text-ink" use:revealLines={{ onScroll: true }}>
				{content.inclusivity.title}
			</h2>
			<p class="font-accent-italic text-lead text-teal mt-4" use:reveal={{ y: 16, delay: 0.1 }}>
				{content.inclusivity.highlight}
			</p>
		</div>
	</div>
</section>

<!-- ░░ Simbologias ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial">
		<SectionIntro
			title={content.symbologies.title}
			lead={content.symbologies.description}
			class="max-w-2xl"
		/>

		<!-- Uma foto por simbologia, com o nome em destaque sobre a imagem. -->
		<ul class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
			{#each content.symbologies.items as sym (sym.name)}
				<li class="relative overflow-hidden">
					<ImageFrame
						src={sym.image}
						alt={sym.name}
						ratio="aspect-[4/5]"
						sizes="(max-width: 640px) 45vw, 30vw"
					/>
					{#if sym.image}
						<span
							class="text-ink bg-paper/90 shadow-soft absolute bottom-0 left-0 m-3 rounded-full px-3.5
								py-1.5 text-[0.8125rem] font-medium backdrop-blur-sm"
						>
							{sym.name}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ░░ Nossa vivência (processo) ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial">
		<SectionIntro
			eyebrow="Nossa vivência"
			title={content.process.lead}
			align="center"
			class="mx-auto text-center"
		/>
		<ol class="mx-auto mt-14 flex max-w-3xl flex-col gap-8">
			{#each content.process.steps as step, i (i)}
				<li class="flex items-start gap-5" use:reveal={{ x: -20, delay: i * 0.05 }}>
					<span
						class="border-teal text-clay font-display flex size-11 shrink-0 items-center
							justify-center rounded-full border text-lg"
						aria-hidden="true"
					>
						{i + 1}
					</span>
					<p class="text-ink mt-1.5 text-[1.0625rem]">{step.title}</p>
				</li>
			{/each}
		</ol>
		<p
			class="font-accent-italic text-lead text-ink-soft mx-auto mt-12 max-w-2xl text-center"
			use:reveal={{ y: 18 }}
		>
			{content.process.closing}
		</p>
	</div>
</section>

<!-- ░░ Depoimentos ░░ -->
<section class="bg-surface py-20 lg:py-28">
	<div class="container-editorial">
		<SectionIntro eyebrow="Palavras de quem viveu" title={content.testimonials.title} />
		<div class="mt-12 grid gap-x-12 gap-y-14 sm:grid-cols-2">
			{#each content.testimonials.items as item, i (i)}
				<div use:reveal={{ y: 22, delay: (i % 2) * 0.08 }}>
					<Quote quote={item.quote} author={item.author} context={item.context} />
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ░░ Cerimônia exclusiva (orçamento dinâmico) ░░ -->
<section class="py-20 lg:py-28">
	<div class="container-editorial">
		<div class="mx-auto max-w-4xl">
			<SectionIntro
				eyebrow="Sua proposta"
				title={budget.title}
				align="center"
				class="mx-auto text-center"
			/>

			<dl
				class="border-border bg-surface mt-12 flex flex-col divide-y divide-[var(--color-border-soft)] border"
				use:reveal={{ y: 24 }}
			>
				<div
					class="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:p-8"
				>
					<dt class="eyebrow text-ink-mute">Casal</dt>
					<dd class="font-display text-h4 text-ink sm:text-right">{budget.couple}</dd>
				</div>
				<div
					class="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:p-8"
				>
					<dt class="eyebrow text-ink-mute">Data</dt>
					<dd class="text-ink text-lg sm:text-right">{budget.date}</dd>
				</div>
				<div
					class="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:p-8"
				>
					<dt class="eyebrow text-ink-mute">Local</dt>
					<dd class="text-ink text-lg sm:text-right">{budget.venue}</dd>
				</div>
				<div
					class="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:p-8"
				>
					<dt class="eyebrow text-ink-mute">{budget.investmentLabel}</dt>
					<dd class="text-clay font-display text-h4 sm:max-w-[62%] sm:text-right">
						{budget.investmentValue}
					</dd>
				</div>
				<div class="flex flex-col gap-1 p-6 sm:p-8">
					<dt class="eyebrow text-ink-mute">Forma de pagamento</dt>
					<dd class="text-ink-soft mt-1">{budget.payment}</dd>
				</div>
				{#if budget.notes}
					<div class="flex flex-col gap-1 p-6 sm:p-8">
						<dt class="eyebrow text-ink-mute">Observação</dt>
						<dd class="text-ink-soft mt-1 whitespace-pre-line">{budget.notes}</dd>
					</div>
				{/if}
			</dl>

			<p class="text-ink-mute mt-6 text-center text-sm">{budget.validity}</p>

			<div class="mt-10 flex justify-center">
				<WhatsAppCTA
					variant="inline"
					message={whatsappMessage}
					label="Quero seguir com a proposta"
				/>
			</div>
		</div>
	</div>
</section>

<!-- ░░ CTA final ░░ -->
<section class="bg-night text-paper relative isolate overflow-hidden py-24 lg:py-32">
	<!-- Halo quente atravessando o fundo escuro do fechamento. -->
	<ScrollGlow
		class="top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2"
		color="rgba(220,150,90,0.16)"
		drift={110}
	/>

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
