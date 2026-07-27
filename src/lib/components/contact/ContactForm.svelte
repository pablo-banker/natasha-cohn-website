<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import { Check, AlertCircle } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { celebrationTypes, languageOptions, type ContactErrors } from '$lib/schemas/contact';

	type ActionResultData = {
		success?: boolean;
		errors?: ContactErrors;
		values?: Record<string, string>;
		message?: string;
	} | null;

	type Props = { form?: ActionResultData };
	let { form }: Props = $props();

	let submitting = $state(false);

	const errors = $derived(form?.errors ?? {});
	const values = $derived(form?.values ?? {});

	// Idioma escolhido — revela o campo livre "Outro". Captura só o valor
	// inicial ecoado pelo servidor (repovoa no fluxo sem JS, via SSR); depois
	// passa a acompanhar o select via bind:value.
	let selectedLanguage = $state(untrack(() => form?.values?.language ?? ''));
	const fieldClass =
		'mt-2 w-full border border-border bg-surface px-4 py-3 text-ink transition-colors ' +
		'placeholder:text-ink-mute/70 focus:border-clay focus:outline-none ' +
		'aria-[invalid=true]:border-clay-deep';
</script>

{#if form?.success}
	<!-- Estado de sucesso -->
	<div class="border-teal/40 bg-teal/8 border p-8 text-center" role="status">
		<span class="bg-teal/15 mx-auto inline-flex size-12 items-center justify-center rounded-full">
			<Check class="text-teal-deep size-6" aria-hidden="true" />
		</span>
		<h3 class="font-display text-h4 text-ink mt-5">Recebi a mensagem de vocês.</h3>
		<p class="text-ink-soft mx-auto mt-3 max-w-md">
			Obrigada por ter vindo até aqui. Significa que temos algo em comum — respondo pessoalmente, em
			breve.
		</p>
	</div>
{:else}
	<form
		method="POST"
		novalidate
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				submitting = false;
				await update({ reset: false });
			};
		}}
		class="flex flex-col gap-6"
	>
		{#if form?.message}
			<p
				class="border-clay-deep/40 bg-clay/8 text-clay-deep flex items-start gap-3 border p-4 text-sm"
				role="alert"
			>
				<AlertCircle class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
				{form.message}
			</p>
		{/if}

		<!-- Armadilha anti-spam: invisível e fora da ordem de tabulação -->
		<div class="absolute left-[-9999px]" aria-hidden="true">
			<label for="website">Não preencha este campo</label>
			<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<p class="flex flex-col sm:col-span-2">
				<label for="names" class="text-ink text-sm font-medium">
					Nome de vocês <span class="text-clay" aria-hidden="true">*</span>
				</label>
				<input
					id="names"
					name="names"
					type="text"
					required
					autocomplete="name"
					value={values.names ?? ''}
					aria-invalid={errors.names ? 'true' : undefined}
					aria-describedby={errors.names ? 'names-error' : undefined}
					class={fieldClass}
					placeholder="Ana e Marcos"
				/>
				{#if errors.names}
					<span id="names-error" class="text-clay-deep mt-1.5 text-sm">{errors.names}</span>
				{/if}
			</p>

			<p class="flex flex-col">
				<label for="email" class="text-ink text-sm font-medium">
					E-mail <span class="text-clay" aria-hidden="true">*</span>
				</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="email"
					value={values.email ?? ''}
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'email-error' : undefined}
					class={fieldClass}
				/>
				{#if errors.email}
					<span id="email-error" class="text-clay-deep mt-1.5 text-sm">{errors.email}</span>
				{/if}
			</p>

			<p class="flex flex-col">
				<label for="whatsapp" class="text-ink text-sm font-medium">
					WhatsApp <span class="text-clay" aria-hidden="true">*</span>
				</label>
				<input
					id="whatsapp"
					name="whatsapp"
					type="tel"
					required
					autocomplete="tel"
					value={values.whatsapp ?? ''}
					aria-invalid={errors.whatsapp ? 'true' : undefined}
					aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
					class={fieldClass}
					placeholder="(21) 90000-0000"
				/>
				{#if errors.whatsapp}
					<span id="whatsapp-error" class="text-clay-deep mt-1.5 text-sm">{errors.whatsapp}</span>
				{/if}
			</p>

			<p class="flex flex-col">
				<label for="date" class="text-ink text-sm font-medium">Data da cerimônia</label>
				<input id="date" name="date" type="date" value={values.date ?? ''} class={fieldClass} />
			</p>

			<p class="flex flex-col">
				<label for="location" class="text-ink text-sm font-medium">Cidade e local</label>
				<input
					id="location"
					name="location"
					type="text"
					value={values.location ?? ''}
					class={fieldClass}
					placeholder="Petrópolis, RJ"
				/>
			</p>

			<p class="flex flex-col">
				<label for="celebrationType" class="text-ink text-sm font-medium">Tipo de celebração</label>
				<select id="celebrationType" name="celebrationType" class={fieldClass}>
					<option value="">Selecione</option>
					{#each celebrationTypes as type (type)}
						<option value={type} selected={values.celebrationType === type}>{type}</option>
					{/each}
				</select>
			</p>

			<p class="flex flex-col">
				<label for="guests" class="text-ink text-sm font-medium">Convidados (aprox.)</label>
				<input
					id="guests"
					name="guests"
					type="text"
					inputmode="numeric"
					value={values.guests ?? ''}
					aria-invalid={errors.guests ? 'true' : undefined}
					aria-describedby={errors.guests ? 'guests-error' : undefined}
					class={fieldClass}
					placeholder="80"
				/>
				{#if errors.guests}
					<span id="guests-error" class="text-clay-deep mt-1.5 text-sm">{errors.guests}</span>
				{/if}
			</p>

			<p class="flex flex-col">
				<label for="language" class="text-ink text-sm font-medium">Idioma desejado</label>
				<select id="language" name="language" class={fieldClass} bind:value={selectedLanguage}>
					<option value="">Selecione</option>
					{#each languageOptions as option (option)}
						<option value={option}>{option}</option>
					{/each}
				</select>
				{#if selectedLanguage === 'Outro'}
					<input
						id="languageOther"
						name="languageOther"
						type="text"
						maxlength="60"
						value={values.languageOther ?? ''}
						aria-label="Qual idioma?"
						aria-invalid={errors.languageOther ? 'true' : undefined}
						aria-describedby={errors.languageOther ? 'languageOther-error' : undefined}
						class={fieldClass}
						placeholder="Qual idioma?"
					/>
					{#if errors.languageOther}
						<span id="languageOther-error" class="text-clay-deep mt-1.5 text-sm">
							{errors.languageOther}
						</span>
					{/if}
				{/if}
			</p>

			<p class="flex flex-col sm:col-span-2">
				<label for="referral" class="text-ink text-sm font-medium">Como me conheceram?</label>
				<input
					id="referral"
					name="referral"
					type="text"
					value={values.referral ?? ''}
					class={fieldClass}
					placeholder="Instagram, indicação de amigos, um casamento…"
				/>
			</p>

			<p class="flex flex-col sm:col-span-2">
				<label for="message" class="text-ink text-sm font-medium">
					Contem a história de vocês <span class="text-clay" aria-hidden="true">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					rows="6"
					required
					value={values.message ?? ''}
					aria-invalid={errors.message ? 'true' : undefined}
					aria-describedby={errors.message ? 'message-error' : undefined}
					class="{fieldClass} resize-y"
					placeholder="Como vocês se conheceram? O que não pode faltar na cerimônia?"></textarea>
				{#if errors.message}
					<span id="message-error" class="text-clay-deep mt-1.5 text-sm">{errors.message}</span>
				{/if}
			</p>
		</div>

		<!-- Consentimento LGPD -->
		<div class="flex flex-col">
			<label class="text-ink-soft flex cursor-pointer items-start gap-3 text-sm">
				<input
					type="checkbox"
					name="consent"
					required
					class="mt-1 size-4 shrink-0 accent-[var(--color-clay)]"
					aria-invalid={errors.consent ? 'true' : undefined}
					aria-describedby={errors.consent ? 'consent-error' : undefined}
				/>
				<span>
					Concordo que meus dados sejam usados para responder a este contato, conforme a
					<a href="/politica-de-privacidade" class="link-underline text-ink"
						>política de privacidade</a
					>.
				</span>
			</label>
			{#if errors.consent}
				<span id="consent-error" class="text-clay-deep mt-1.5 text-sm">{errors.consent}</span>
			{/if}
		</div>

		<div class="mt-2">
			<Button type="submit" loading={submitting} disabled={submitting}>
				{submitting ? 'Enviando…' : 'Enviar mensagem'}
			</Button>
		</div>
	</form>
{/if}
