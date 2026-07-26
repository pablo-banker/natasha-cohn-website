<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
	import { page } from '$app/state';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import { primaryNav, site, whatsappLink } from '$lib/content/site';
	import { socialLinks } from '$lib/content/social';
	import { scrollTopIfSamePage } from '$lib/utils/nav';
	import BrandLogo from '../brand/BrandLogo.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-night text-paper relative">
	<div
		class="container-editorial grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10 lg:py-24"
	>
		<div class="max-w-sm">
			<BrandLogo variant="footer" />
			<a
				href={whatsappLink()}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-clay text-paper hover:bg-clay-deep mt-8 inline-flex min-h-11 items-center px-7
					py-3.5 text-[0.9375rem] font-medium transition-colors"
			>
				Falar no WhatsApp
			</a>

			<!-- Assinatura de inclusão -->
			<div class="mt-9">
				<span
					class="block h-[3px] w-14 rounded-full"
					style="background: var(--gradient-pride);"
					aria-hidden="true"
				></span>
				<p class="font-accent-italic text-paper/70 mt-3 text-[0.9375rem]">
					Celebro todas as formas de amor.
				</p>
			</div>
		</div>

		<nav aria-label="Navegação do rodapé">
			<h2 class="eyebrow text-blush">Navegue</h2>
			<ul class="mt-6 flex flex-col gap-3">
				{#each primaryNav as item (item.href)}
					<li>
						<a
							href={item.href}
							onclick={(e) => scrollTopIfSamePage(e, item.href, page.url.pathname)}
							class="link-underline text-paper/80 hover:text-paper text-[0.9375rem]"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div>
			<h2 class="eyebrow text-blush">Contato</h2>
			<ul class="text-paper/80 mt-6 flex flex-col gap-3 text-[0.9375rem]">
				<li>
					<a href="mailto:{site.email}" class="hover:text-paper inline-flex items-center gap-2.5">
						<Mail class="text-blush size-4 shrink-0" aria-hidden="true" />
						<span class="link-underline break-all">{site.email}</span>
					</a>
				</li>
				{#each site.phones as phone (phone.href)}
					<li>
						<a href={phone.href} class="hover:text-paper inline-flex items-center gap-2.5">
							<Phone class="text-blush size-4 shrink-0" aria-hidden="true" />
							<span class="link-underline">{phone.label}</span>
						</a>
					</li>
				{/each}
			</ul>

			<h2 class="eyebrow text-blush mt-9">Redes</h2>
			<ul class="mt-5 flex items-center gap-2">
				{#each socialLinks as social (social.href)}
					<li>
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="border-paper/20 text-paper/80 hover:border-clay hover:bg-clay hover:text-paper inline-flex
								size-11 items-center justify-center border transition-colors"
						>
							<SocialIcon name={social.icon} />
							<span class="sr-only">{social.label}{social.handle ? ` — ${social.handle}` : ''}</span
							>
						</a>
					</li>
				{/each}

				<!-- Bandeirinha: celebro todas as formas de amor (selo, não link) -->
				<li>
					<span
						class="border-paper/20 flex size-11 items-center justify-center border"
						role="img"
						aria-label="Celebro todas as formas de amor"
					>
						<span class="pride-flag block h-4 w-6 rounded-[2px]" aria-hidden="true"></span>
					</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="border-paper/12 border-t">
		<div
			class="container-editorial text-paper/55 flex flex-col gap-3 py-7 text-[0.8125rem]
				sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {site.legalName}. Todos os direitos reservados.</p>
			<p class="flex flex-wrap items-center gap-x-5 gap-y-2">
				<a href="/politica-de-privacidade" class="link-underline hover:text-paper">
					Política de privacidade
				</a>
				<span class="text-paper/40"> Proibida reprodução total ou parcial sem autorização. </span>
			</p>
		</div>
	</div>
</footer>

<style>
	/* Bandeira do arco-íris: 6 faixas com paradas duras (não gradiente). */
	.pride-flag {
		background: linear-gradient(
			180deg,
			#e14b4b 0 16.666%,
			#e59637 16.666% 33.333%,
			#e6c94a 33.333% 50%,
			#46a85f 50% 66.666%,
			#3f78c9 66.666% 83.333%,
			#8a53c9 83.333% 100%
		);
	}
</style>
