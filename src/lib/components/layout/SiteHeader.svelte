<script lang="ts">
	import { ChevronDown, Menu } from '@lucide/svelte';
	import { page } from '$app/state';
	import { primaryNav } from '$lib/content/site';
	import { scrollTopIfSamePage, smoothAnchorIfSamePage } from '$lib/utils/nav';
	import BrandLogo from '../brand/BrandLogo.svelte';
	import LanguageSwitcher from '../navigation/LanguageSwitcher.svelte';
	import MobileMenu from '../navigation/MobileMenu.svelte';

	// `minimal` (páginas de proposta): apenas a logo, sem navegação nem CTA.
	let { minimal = false }: { minimal?: boolean } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	/**
	 * O submenu abre por hover (mouse) OU por clique/foco (teclado). Manter
	 * os dois estados separados evita o conflito clássico: o hover abre e o
	 * clique seguinte fecharia de novo se fosse um único toggle.
	 */
	let hoveredSubmenu = $state<string | null>(null);
	let pinnedSubmenu = $state<string | null>(null);
	const isSubmenuOpen = (href: string) => hoveredSubmenu === href || pinnedSubmenu === href;
	const closeSubmenu = () => {
		hoveredSubmenu = null;
		pinnedSubmenu = null;
	};

	const submenuId = (href: string) => `submenu-${href.replace(/[^a-z0-9]/gi, '') || 'root'}`;

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href.split('#')[0]);

	// Fundo e sombra aparecem só depois que a página rola.
	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Fecha o submenu ao trocar de página.
	$effect(() => {
		void page.url.pathname;
		closeSubmenu();
	});
</script>

<header
	class="ease-editorial fixed inset-x-0 top-0 z-[var(--z-header)]
		transition-[background-color,box-shadow,border-color] duration-500
		{scrolled
		? 'border-border/70 bg-paper/92 shadow-soft border-b backdrop-blur-md'
		: 'border-b border-transparent bg-transparent'}"
>
	<div class="container-editorial flex h-20 items-center justify-between gap-6">
		{#if minimal}
			<!-- Na proposta a logo é só marca, sem link de navegação. -->
			<span class="shrink-0 py-2">
				<BrandLogo variant="header" />
			</span>
		{:else}
			<a
				href="/"
				class="shrink-0 py-2"
				aria-label="Natasha Cohn — página inicial"
				onclick={(e) => scrollTopIfSamePage(e, '/', page.url.pathname)}
			>
				<BrandLogo variant="header" decorative />
			</a>
		{/if}

		{#if !minimal}
			<nav aria-label="Navegação principal" class="hidden lg:block">
				<ul class="flex items-center gap-7">
					{#each primaryNav as item (item.href)}
						<li
							class="relative"
							onpointerenter={() => item.children && (hoveredSubmenu = item.href)}
							onpointerleave={() => item.children && (hoveredSubmenu = null)}
						>
							<span class="flex items-center gap-1">
								<a
									href={item.href}
									aria-current={isActive(item.href) ? 'page' : undefined}
									onclick={(e) => scrollTopIfSamePage(e, item.href, page.url.pathname)}
									class="link-underline text-ink hover:text-clay aria-[current=page]:text-clay py-2
									text-[0.9375rem] transition-colors"
								>
									{item.label}
								</a>

								{#if item.children}
									<button
										type="button"
										aria-expanded={isSubmenuOpen(item.href)}
										aria-controls={submenuId(item.href)}
										onclick={() => (pinnedSubmenu = pinnedSubmenu === item.href ? null : item.href)}
										class="text-ink-mute hover:text-clay inline-flex size-6 items-center
										justify-center transition-colors"
									>
										<ChevronDown
											class="size-3.5 transition-transform duration-300 {isSubmenuOpen(item.href)
												? 'rotate-180'
												: ''}"
											aria-hidden="true"
										/>
										<span class="sr-only">Abrir submenu de {item.label}</span>
									</button>
								{/if}
							</span>

							{#if item.children && isSubmenuOpen(item.href)}
								<ul
									id={submenuId(item.href)}
									class="border-border bg-surface shadow-lift absolute top-full left-0 min-w-60 border py-2"
								>
									{#each item.children as child (child.href)}
										<li>
											<a
												href={child.href}
												onclick={(e) => {
													smoothAnchorIfSamePage(e, child.href, page.url.pathname);
													closeSubmenu();
												}}
												class="text-ink-soft hover:bg-paper-deep hover:text-clay block px-5 py-2.5
												text-[0.9375rem] transition-colors"
											>
												{child.label}
											</a>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>

			<div class="flex items-center gap-2">
				<LanguageSwitcher />

				<a
					href="/contato"
					class="bg-ink text-paper hover:bg-clay hidden min-h-11 items-center px-6 py-3
					text-[0.875rem] font-medium transition-colors duration-300 lg:inline-flex"
				>
					Vamos conversar
				</a>

				<button
					type="button"
					onclick={() => (menuOpen = true)}
					aria-expanded={menuOpen}
					aria-haspopup="dialog"
					class="text-ink hover:text-clay -mr-2 inline-flex size-11 items-center
					justify-center transition-colors lg:hidden"
				>
					<Menu class="size-6" aria-hidden="true" />
					<span class="sr-only">Abrir menu</span>
				</button>
			</div>
		{/if}
	</div>
</header>

{#if !minimal}
	<MobileMenu open={menuOpen} onclose={() => (menuOpen = false)} />
{/if}

<!-- Fecha o submenu com Escape -->
<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') closeSubmenu();
	}}
/>
