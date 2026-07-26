<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
	import Seo from '$lib/seo/Seo.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import { site } from '$lib/content/site';
	import { socialLinks } from '$lib/content/social';
	import { professionalServiceSchema, breadcrumbSchema } from '$lib/seo/structuredData';
	import { reveal } from '$lib/animations/reveal';

	let { form } = $props();

	const breadcrumbs = [
		{ name: 'Início', path: '/' },
		{ name: 'Contato', path: '/contato' }
	];
</script>

<Seo
	seo={{
		title: 'Vamos conversar',
		description:
			'Conte a história de vocês para Natasha Cohn. Nada melhor que um bate-papo para esclarecer todas as dúvidas — respondo pessoalmente.',
		path: '/contato',
		structuredData: [professionalServiceSchema(), breadcrumbSchema(breadcrumbs)]
	}}
/>

<PageHeader
	eyebrow="Vamos conversar?"
	title="Me contem: como vocês se encontraram?"
	lead="Nada melhor que um bate-papo para esclarecer todas as dúvidas. Preencham o formulário abaixo ou me chamem no WhatsApp — obrigada por ter vindo até aqui."
	{breadcrumbs}
/>

<section class="py-20 lg:py-28" aria-label="Formulário de contato">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<!-- Formulário -->
			<div class="lg:col-span-7" use:reveal={{ y: 24 }}>
				<ContactForm {form} />
			</div>

			<!-- Contatos diretos -->
			<aside class="lg:col-span-4 lg:col-start-9">
				<div class="border-border bg-surface border p-8" use:reveal={{ y: 22, delay: 0.1 }}>
					<h2 class="font-display text-h4 text-ink">Prefere falar direto?</h2>
					<p class="text-ink-soft mt-3">Respondo pessoalmente todas as mensagens.</p>

					<div class="mt-7">
						<WhatsAppCTA variant="inline" class="w-full justify-center" />
					</div>

					<ul class="border-border text-ink-soft mt-8 flex flex-col gap-4 border-t pt-7">
						<li>
							<a href="mailto:{site.email}" class="hover:text-clay inline-flex items-start gap-3">
								<Mail class="text-clay mt-1 size-4 shrink-0" aria-hidden="true" />
								<span class="link-underline break-all">{site.email}</span>
							</a>
						</li>
						{#each site.phones as phone (phone.href)}
							<li>
								<a href={phone.href} class="hover:text-clay inline-flex items-center gap-3">
									<Phone class="text-clay size-4 shrink-0" aria-hidden="true" />
									<span class="link-underline">{phone.label}</span>
								</a>
							</li>
						{/each}
					</ul>

					<div class="border-border mt-8 border-t pt-7">
						<h3 class="eyebrow text-ink-mute">Acompanhe</h3>
						<ul class="mt-4 flex items-center gap-2">
							{#each socialLinks as social (social.href)}
								<li>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										class="border-border text-ink-soft hover:border-clay hover:bg-clay hover:text-paper inline-flex
											size-11 items-center justify-center border transition-colors"
									>
										<SocialIcon name={social.icon} />
										<span class="sr-only">{social.label}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>

					<p class="border-border text-ink-mute mt-8 border-t pt-6 text-sm">
						Celebro em {site.languages.join(', ').toLowerCase()} — e onde o amor chamar.
					</p>
				</div>
			</aside>
		</div>
	</div>
</section>
