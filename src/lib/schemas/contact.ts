import { z } from 'zod';

/**
 * Esquema único de validação, usado no cliente e no servidor.
 * O servidor NUNCA confia na validação do cliente — o mesmo esquema roda
 * novamente em src/routes/contato/+page.server.ts.
 */

export const celebrationTypes = [
	'Casamento',
	'Cerimônia bilíngue',
	'Bodas ou renovação de votos',
	'Apadrinhamento',
	'Celebração de amor (15 anos)',
	'Mentoria para celebrante',
	'Evento corporativo',
	'Ainda não sei'
] as const;

// Devem bater exatamente com as opções da múltipla escolha "Idioma desejado"
// do Google Form (destino do formulário), senão a resposta não é reconhecida.
export const languageOptions = ['Português', 'English', 'Español', 'Outro'] as const;

export const contactSchema = z
	.object({
		// Identificação
		names: z.string().trim().min(2, 'Conte o nome de vocês.').max(120, 'Nome muito longo.'),
		email: z.email('Confira o e-mail: parece estar incompleto.').max(160),
		whatsapp: z
			.string()
			.trim()
			.min(10, 'Informe um WhatsApp com DDD.')
			.max(20, 'Número muito longo.')
			.regex(/^[\d\s()+-]+$/, 'Use apenas números, espaços e os sinais + ( ) -'),

		// Sobre a celebração
		date: z.string().trim().max(30).optional().or(z.literal('')),
		location: z.string().trim().max(160, 'Texto muito longo.').optional().or(z.literal('')),
		celebrationType: z.enum(celebrationTypes).optional().or(z.literal('')),
		guests: z
			.string()
			.trim()
			.max(10)
			.regex(/^\d*$/, 'Use apenas números.')
			.optional()
			.or(z.literal('')),
		language: z.enum(languageOptions).optional().or(z.literal('')),
		// Idioma livre, usado quando `language === 'Outro'`.
		languageOther: z
			.string()
			.trim()
			.max(60, 'Máximo de 60 caracteres.')
			.optional()
			.or(z.literal('')),
		referral: z.string().trim().max(160).optional().or(z.literal('')),

		// Mensagem
		message: z
			.string()
			.trim()
			.min(10, 'Escreva um pouquinho mais — quero conhecer a história de vocês.')
			.max(4000, 'Mensagem muito longa (máximo de 4000 caracteres).'),

		// LGPD
		consent: z
			.union([z.literal('on'), z.literal('true'), z.boolean()])
			.refine((v) => v === 'on' || v === 'true' || v === true, {
				message: 'É preciso concordar com o tratamento dos dados para enviar.'
			}),

		// Armadilha anti-spam: precisa vir vazia (bots preenchem tudo).
		website: z.literal('').optional()
	})
	// Ao escolher "Outro" idioma, é preciso dizer qual.
	.refine((data) => !(data.language === 'Outro' && !data.languageOther?.trim()), {
		message: 'Diga qual idioma.',
		path: ['languageOther']
	});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Converte os erros do Zod em um mapa simples campo → primeira mensagem. */
export function toFieldErrors(error: z.ZodError): ContactErrors {
	const result: ContactErrors = {};
	for (const issue of error.issues) {
		const key = issue.path[0] as keyof ContactInput | undefined;
		if (key && !result[key]) result[key] = issue.message;
	}
	return result;
}
