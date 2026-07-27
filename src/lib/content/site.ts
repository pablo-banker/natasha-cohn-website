import type { NavItem } from '$lib/types';

/**
 * Configuração central do site. Todos os dados de contato e navegação
 * vivem aqui — um único lugar para atualizar.
 *
 * Dados de contato extraídos do site atual (Wix). O número de WhatsApp
 * aparece no site como +5524974383237 — confirmar com Natasha antes da
 * publicação (ver docs/CONTENT_MAP.md).
 */
export const site = {
	name: 'Natasha Cohn',
	role: 'Celebrante de casamentos',
	shortName: 'Natasha Cohn',
	legalName: 'Celebrante Natasha Cohn',
	tagline: 'Amor, humor, poesia e alma.',
	description:
		'Natasha Cohn transforma a história de cada casal em uma cerimônia autoral, escrita a seis mãos — leve, emocionante e fiel a quem vocês são. Celebro onde o amor chamar.',
	/** Domínio de produção — ajustar ao migrar do Wix. */
	url: 'https://www.celebrantenatashacohn.com.br',
	locale: 'pt-BR',
	email: 'celebrantenatashacohn@gmail.com',
	phones: [
		{ label: '(24) 98122-8689', href: 'tel:+5524981228689' },
		{ label: '(21) 97438-3237', href: 'tel:+5521974383237' }
	],
	whatsapp: {
		/** Número em formato internacional apenas com dígitos (para wa.me). */
		number: '5524974383237',
		defaultMessage:
			'Olá, Natasha! Encontrei seu site e gostaria de contar a nossa história para conhecer suas cerimônias.'
	},
	/** Regiões atendidas — base é o interior/estado do RJ; "onde o amor chamar". */
	serviceArea: 'Rio de Janeiro e onde o amor chamar',
	languages: ['Português', 'Inglês', 'Espanhol']
} as const;

export const primaryNav: NavItem[] = [
	{ label: 'Início', href: '/' },
	{ label: 'A celebrante', href: '/a-celebrante' },
	{
		label: 'Cerimônias',
		href: '/cerimonias',
		children: [
			{ label: 'Casamentos', href: '/cerimonias#casamentos' },
			{ label: 'Cerimônias bilíngues', href: '/cerimonias#bilingues' },
			{ label: 'Apadrinhamento', href: '/cerimonias#apadrinhamento' },
			{ label: 'Celebrações de amor', href: '/cerimonias#celebracoes' },
			{ label: 'Mentoria para celebrantes', href: '/cerimonias#mentoria' },
			{ label: 'Eventos corporativos', href: '/cerimonias#corporativo' }
		]
	},
	{ label: 'Ritos', href: '/ritos' },
	{ label: 'Depoimentos', href: '/depoimentos' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contato', href: '/contato' }
];

/** Idiomas suportados pela arquitetura (en fica pronto, mas não publicado). */
export const locales = [
	{ code: 'pt-BR', label: 'PT', name: 'Português', available: true },
	{ code: 'en', label: 'EN', name: 'English', available: false }
] as const;

/** Constrói um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string {
	return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
