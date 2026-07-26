<script lang="ts">
	import { ArrowLeft, ArrowRight, Pause, Play } from '@lucide/svelte';
	import type { Testimonial } from '$lib/types';
	import Quote from '$lib/components/ui/Quote.svelte';
	import { prefersReducedMotion } from '$lib/utils/motion';

	type Props = { testimonials: Testimonial[]; intervalMs?: number };
	let { testimonials, intervalMs = 8000 }: Props = $props();

	let index = $state(0);
	let paused = $state(false);
	let userPaused = $state(false);

	const total = $derived(testimonials.length);
	const current = $derived(testimonials[index]);

	function go(next: number) {
		index = (next + total) % total;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			go(index - 1);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			go(index + 1);
		}
	}

	/**
	 * Avanço automático lento, que pausa sozinho durante qualquer interação
	 * (cursor sobre a área, foco por teclado) e nunca roda para quem pediu
	 * menos movimento. Também pode ser pausado manualmente.
	 */
	$effect(() => {
		if (paused || userPaused || total < 2 || prefersReducedMotion()) return;
		const id = setInterval(() => go(index + 1), intervalMs);
		return () => clearInterval(id);
	});
</script>

<!--
	Padrão de carrossel do WAI-ARIA: um contêiner role="group" com
	aria-roledescription="carrossel". Os listeners de ponteiro pausam a
	passagem automática e o de teclado dá navegação por setas quando o foco
	está dentro do carrossel — comportamento exigido para acessibilidade.
	Todos os controles são botões nativos e focáveis.
-->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="relative"
	role="group"
	aria-roledescription="carrossel"
	aria-label="Depoimentos de casais"
	onpointerenter={() => (paused = true)}
	onpointerleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
	onkeydown={onKeydown}
>
	<div aria-live="polite" aria-atomic="true" class="min-h-[13rem]">
		{#key index}
			<div class="testimonial-slide">
				<p class="sr-only">Depoimento {index + 1} de {total}</p>
				<Quote
					quote={current.quote}
					author={current.author}
					context={current.context}
					image={current.image}
					imageAlt={current.imageAlt}
					size="feature"
				/>
			</div>
		{/key}
	</div>

	<div class="mt-10 flex flex-wrap items-center gap-4">
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => go(index - 1)}
				class="border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper inline-flex size-11
					items-center justify-center border transition-colors"
			>
				<ArrowLeft class="size-4" aria-hidden="true" />
				<span class="sr-only">Depoimento anterior</span>
			</button>
			<button
				type="button"
				onclick={() => go(index + 1)}
				class="border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper inline-flex size-11
					items-center justify-center border transition-colors"
			>
				<ArrowRight class="size-4" aria-hidden="true" />
				<span class="sr-only">Próximo depoimento</span>
			</button>
			<button
				type="button"
				onclick={() => (userPaused = !userPaused)}
				class="border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper inline-flex size-11
					items-center justify-center border transition-colors"
			>
				{#if userPaused}
					<Play class="size-4" aria-hidden="true" />
					<span class="sr-only">Retomar a passagem automática</span>
				{:else}
					<Pause class="size-4" aria-hidden="true" />
					<span class="sr-only">Pausar a passagem automática</span>
				{/if}
			</button>
		</div>

		<ul class="flex flex-wrap items-center gap-1.5">
			{#each testimonials as testimonial, i (testimonial.author + i)}
				<li>
					<button
						type="button"
						onclick={() => go(i)}
						aria-current={i === index ? 'true' : undefined}
						class="group inline-flex size-7 items-center justify-center"
					>
						<span
							class="h-1.5 w-1.5 rounded-full transition-[background-color,width] duration-400
								{i === index ? 'bg-clay w-5' : 'bg-border group-hover:bg-ink-mute'}"
							aria-hidden="true"
						></span>
						<span class="sr-only">Ir para o depoimento {i + 1}: {testimonial.author}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.testimonial-slide {
		animation: slide-in 600ms var(--ease-editorial) both;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.testimonial-slide {
			animation: none;
		}
	}
</style>
