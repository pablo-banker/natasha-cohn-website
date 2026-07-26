<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/seo/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { primaryNav } from '$lib/content/site';

	const isNotFound = $derived(page.status === 404);

	const title = $derived(isNotFound ? 'Esta página não existe (ainda)' : 'Algo saiu do roteiro');

	const message = $derived(
		isNotFound
			? 'O endereço que você procurou não está mais aqui — ou nunca esteve. Mas já que você chegou até aqui, aproveite para conhecer o resto.'
			: 'Aconteceu um imprevisto do nosso lado. Tente novamente em instantes, por favor.'
	);
</script>

<Seo
	seo={{
		title: isNotFound ? 'Página não encontrada' : 'Erro',
		description:
			'A página que você procurou não foi encontrada no site da Celebrante Natasha Cohn.',
		path: page.url.pathname,
		noindex: true
	}}
/>

<section class="flex min-h-[70svh] items-center py-32">
	<div class="container-editorial">
		<div class="max-w-2xl">
			<p class="eyebrow">Erro {page.status}</p>
			<h1 class="text-h1 text-ink mt-5">{title}</h1>
			<p class="text-lead text-ink-soft mt-6">{message}</p>

			<div class="mt-10 flex flex-wrap gap-3">
				<Button href="/" magnetic>Voltar ao início</Button>
				<Button href="/contato" variant="secondary">Falar comigo</Button>
			</div>

			<nav class="border-border mt-14 border-t pt-8" aria-label="Páginas do site">
				<h2 class="eyebrow text-ink-mute">Ou vá direto para</h2>
				<ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2">
					{#each primaryNav as item (item.href)}
						<li>
							<a href={item.href} class="link-underline text-ink-soft hover:text-clay">
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</section>
