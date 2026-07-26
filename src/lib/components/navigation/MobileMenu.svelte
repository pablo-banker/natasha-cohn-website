<script lang="ts">
	import { X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { primaryNav, site, whatsappLink } from '$lib/content/site';
	import { scrollTopIfSamePage, smoothScrollToId } from '$lib/utils/nav';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	type Props = {
		open: boolean;
		onclose: () => void;
	};

	let { open, onclose }: Props = $props();

	let panel = $state<HTMLElement | null>(null);
	let previouslyFocused: HTMLElement | null = null;

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	/**
	 * Âncora dentro de um submenu (ex.: /cerimonias#corporativo). Se aponta para
	 * a página atual, fecha o menu e só então rola suavemente — o overlay trava
	 * a rolagem do body enquanto está aberto, então esperamos dois frames para o
	 * overflow ser restaurado antes de chamar o scroll. Para outras páginas,
	 * deixa a navegação normal seguir.
	 */
	function handleAnchor(event: MouseEvent, href: string) {
		const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
		const [path, hash] = href.split('#');
		const sameAnchor = !modified && hash && (path || '/') === page.url.pathname;

		if (sameAnchor) event.preventDefault();
		onclose();

		if (sameAnchor) {
			requestAnimationFrame(() =>
				requestAnimationFrame(() => {
					if (smoothScrollToId(hash)) history.pushState(null, '', `#${hash}`);
				})
			);
		}
	}

	function focusableItems(): HTMLElement[] {
		if (!panel) return [];
		return Array.from(
			panel.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => el.offsetParent !== null);
	}

	function onKeydown(event: KeyboardEvent) {
		if (!open) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			onclose();
			return;
		}

		// Focus trap: Tab circula apenas dentro do painel.
		if (event.key === 'Tab') {
			const items = focusableItems();
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			const active = document.activeElement as HTMLElement | null;

			if (event.shiftKey && (active === first || !panel?.contains(active))) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	// Bloqueia a rolagem do fundo, move o foco para o painel e o devolve ao fechar.
	$effect(() => {
		if (!open) return;

		previouslyFocused = document.activeElement as HTMLElement | null;
		const { overflow } = document.body.style;
		document.body.style.overflow = 'hidden';

		const id = requestAnimationFrame(() => focusableItems()[0]?.focus());

		return () => {
			document.body.style.overflow = overflow;
			cancelAnimationFrame(id);
			previouslyFocused?.focus();
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div
		class="bg-paper fixed inset-0 z-[var(--z-overlay)] lg:hidden"
		role="dialog"
		aria-modal="true"
		aria-label="Menu de navegação"
		bind:this={panel}
	>
		<div class="flex h-dvh flex-col overflow-y-auto">
			<div class="container-editorial flex h-20 shrink-0 items-center justify-between">
				<LanguageSwitcher />
				<button
					type="button"
					onclick={onclose}
					class="text-ink hover:text-clay -mr-2 inline-flex size-11 items-center justify-center transition-colors"
				>
					<X class="size-6" aria-hidden="true" />
					<span class="sr-only">Fechar menu</span>
				</button>
			</div>

			<nav class="container-editorial flex flex-1 flex-col justify-center py-8">
				<ul class="flex flex-col gap-1">
					{#each primaryNav as item, index (item.href)}
						<li class="border-border-soft border-b last:border-0">
							<a
								href={item.href}
								onclick={(e) => {
									scrollTopIfSamePage(e, item.href, page.url.pathname);
									onclose();
								}}
								aria-current={isActive(item.href) ? 'page' : undefined}
								class="font-display text-ink hover:text-clay aria-[current=page]:text-clay flex items-baseline gap-4
									py-4 text-[1.75rem] transition-colors"
							>
								<span class="eyebrow text-ink-mute w-6 text-[0.625rem]" aria-hidden="true">
									{String(index + 1).padStart(2, '0')}
								</span>
								{item.label}
							</a>

							{#if item.children}
								<ul class="mb-4 flex flex-col gap-2 pl-10">
									{#each item.children as child (child.href)}
										<li>
											<a
												href={child.href}
												onclick={(e) => handleAnchor(e, child.href)}
												class="text-ink-soft hover:text-clay text-[0.9375rem] transition-colors"
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

			<div class="container-editorial border-border-soft shrink-0 space-y-4 border-t py-7">
				<a
					href={whatsappLink()}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-clay text-paper hover:bg-clay-deep inline-flex min-h-11 items-center justify-center
						px-7 py-3.5 text-[0.9375rem] font-medium transition-colors"
				>
					Falar no WhatsApp
				</a>
				<p class="text-ink-soft text-sm">
					<a href="mailto:{site.email}" class="link-underline">{site.email}</a>
				</p>
			</div>
		</div>
	</div>
{/if}
