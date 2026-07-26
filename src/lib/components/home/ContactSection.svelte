<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
	import { site } from '$lib/content/site';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import WhatsAppCTA from '$lib/components/contact/WhatsAppCTA.svelte';
	import { reveal } from '$lib/animations/reveal';
	import { revealLines } from '$lib/animations/text';

	let { form } = $props();
</script>

<section class="bg-surface py-24 lg:py-32" aria-labelledby="contact-title">
	<div class="container-editorial">
		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-4">
				<p class="eyebrow" use:reveal={{ y: 12, duration: 0.6 }}>Vamos conversar</p>
				<h2 id="contact-title" class="text-h2 text-ink mt-5" use:revealLines={{ onScroll: true }}>
					Nada melhor que um bate-papo
				</h2>
				<p class="text-lead text-ink-soft mt-6" use:reveal={{ y: 18, delay: 0.1 }}>
					Me conta um pouco da história de vocês. Respondo pessoalmente, sempre.
				</p>

				<ul class="text-ink-soft mt-9 flex flex-col gap-4" use:reveal={{ stagger: 'li', y: 14 }}>
					<li>
						<a href="mailto:{site.email}" class="hover:text-clay inline-flex items-center gap-3">
							<Mail class="text-clay size-4 shrink-0" aria-hidden="true" />
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

				<div class="mt-8">
					<WhatsAppCTA variant="inline" />
				</div>
			</div>

			<div class="lg:col-span-7 lg:col-start-6" use:reveal={{ y: 24 }}>
				<ContactForm {form} />
			</div>
		</div>
	</div>
</section>
