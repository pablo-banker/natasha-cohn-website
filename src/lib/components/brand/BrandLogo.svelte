<script lang="ts">
	// Assets da marca vivem em static/brand — atualizar os arquivos lá reflete
	// direto no site (sem reimportar). Servidos como URLs estáticas.
	const mandalaUrl = '/brand/mandala.png';
	const nameUrl = '/brand/natasha-cohn.svg';
	const sloganUrl = '/brand/natasha-cohn-slogan.svg';

	type Props = {
		/** Ajusta escala e disposição para cada contexto. */
		variant?: 'header' | 'footer';
		/**
		 * Quando o logo já está dentro de um elemento com nome acessível
		 * (ex.: o link do cabeçalho com aria-label), marque como decorativo
		 * para não duplicar a leitura por leitores de tela.
		 */
		decorative?: boolean;
		/** Mostra o slogan (no cabeçalho, some em telas pequenas). */
		showSlogan?: boolean;
		class?: string;
	};
	let {
		variant = 'header',
		decorative = false,
		showSlogan = true,
		class: className = ''
	}: Props = $props();

	const label = 'Natasha Cohn — Celebrações com amor, humor, poesia e alma';
	const isFooter = $derived(variant === 'footer');
</script>

<!--
	Marca oficial montada a partir dos SVGs enviados (mandala + wordmark + slogan).
	Proporções preservadas via viewBox nos atributos width/height; o dimensionamento
	é por largura da coluna de texto, então nome e slogan permanecem alinhados.
-->
<div
	class="flex {isFooter
		? 'w-fit flex-col items-center gap-3'
		: 'flex-row items-center gap-2.5'} {className}"
	role={decorative ? undefined : 'img'}
	aria-label={decorative ? undefined : label}
>
	<img
		src={mandalaUrl}
		alt=""
		width="256"
		height="256"
		aria-hidden="true"
		decoding="async"
		loading={isFooter ? 'lazy' : 'eager'}
		class="{isFooter ? 'h-20' : 'h-10'} w-auto shrink-0"
	/>

	<span
		class="flex flex-col {isFooter ? 'w-[210px] gap-2 sm:w-[248px]' : 'w-[150px] lg:w-[184px]'}"
	>
		<img
			src={nameUrl}
			alt={decorative ? '' : 'Natasha Cohn'}
			width="256"
			height="41"
			aria-hidden={decorative ? 'true' : undefined}
			decoding="async"
			loading={isFooter ? 'lazy' : 'eager'}
			class="block h-auto w-full"
		/>
		{#if showSlogan}
			<img
				src={sloganUrl}
				alt={decorative ? '' : 'Celebrações com amor, humor, poesia e alma'}
				width="259"
				height="12"
				aria-hidden={decorative ? 'true' : undefined}
				decoding="async"
				loading={isFooter ? 'lazy' : 'eager'}
				class="block h-auto w-full {isFooter ? '' : 'hidden lg:block'}"
			/>
		{/if}
	</span>
</div>
