import type { Stat } from '$lib/types';

/**
 * Conteúdo editável da página inicial. Textos escritos como ponto de
 * partida — os marcados com `review: true` devem ser revisados pela Natasha
 * antes da publicação (ver docs/CONTENT_MAP.md).
 */

export const hero = {
	eyebrow: 'Celebrante de casamentos',
	title: 'Histórias reais, celebradas com amor, humor, poesia e alma.',
	lead: 'Eu escuto a história de vocês e a transformo em uma cerimônia autoral, escrita a seis mãos. Nada de fórmula pronta: cada palavra nasce de quem vocês são e do jeito que se encontraram.',
	primaryCta: { label: 'Quero contar nossa história', href: '/contato' },
	secondaryCta: { label: 'Conheça as cerimônias', href: '/cerimonias' },
	portrait: '/images/celebracoes/celebracao-1.avif',
	portraitAlt: 'Natasha Cohn conduzindo uma cerimônia de casamento ao ar livre'
};

/** Números de autoridade — todos reais, extraídos do site atual. */
export const stats: Stat[] = [
	{ value: 380, prefix: '+', label: 'cerimônias exclusivas celebradas' },
	{ value: null, display: '2018', label: 'celebrante desde' },
	{ value: null, display: 'PT · EN · ES', label: 'cerimônias em três idiomas' },
	{ value: null, display: 'onde o amor chamar', label: 'celebro' }
];

export const manifesto = {
	eyebrow: 'O que eu acredito',
	title: 'Uma cerimônia não conta uma história qualquer. Conta a de vocês.',
	body: [
		'Existe um instante, no meio da cerimônia, em que todo mundo reconhece o casal ali na frente — não o casal genérico dos roteiros, mas aquele casal, com suas manias, suas piadas internas, o dia em que quase deu tudo errado e mesmo assim deu certo.',
		'É esse instante que eu persigo. Faço uma imersão na história de vocês e escrevo do zero, a seis mãos: as minhas e as de vocês. Nada é obrigatório. Tudo é escolha.'
	],
	pullQuote: 'Sua cerimônia, suas histórias — escritas através do meu olhar.',
	image: '/images/celebracoes/celebracao-2.avif',
	imageAlt: 'Cerimônia ao ar livre em um mirante, com os convidados e as montanhas ao fundo'
};

export const sections = {
	ceremonies: {
		eyebrow: 'O que eu faço',
		title: 'Cada amor pede uma celebração diferente',
		lead: 'Do casamento à renovação de votos, do apadrinhamento à mentoria para quem vai celebrar um amigo — sempre com texto escrito sob medida.'
	},
	process: {
		eyebrow: 'Como nasce uma cerimônia',
		title: 'Da primeira conversa às lágrimas de alegria',
		lead: 'Um caminho feito de escuta. É assim que a história de vocês vira palavra, e a palavra vira o dia mais bonito.'
	},
	videos: {
		eyebrow: 'Pequenos trechos de amor',
		title: 'Um pedacinho de algumas cerimônias',
		lead: 'Do riso às lágrimas em poucos segundos — como costumam dizer por aí.'
	},
	rituals: {
		eyebrow: 'Ritos',
		title: 'Gestos que dizem o que as palavras começam',
		lead: 'Símbolos escolhidos a dedo, cheios de significado. Nunca obrigatórios, sempre de vocês.'
	},
	testimonials: {
		eyebrow: 'Palavras de amor',
		title: 'Quem viveu, conta melhor do que eu',
		lead: 'Depoimentos de casais que confiaram a mim o dia mais importante das suas histórias.'
	},
	about: {
		eyebrow: 'A celebrante',
		title: 'Prazer, eu sou a Natasha',
		body: 'Sou esposa, mãe e apaixonada por histórias de amor. Virei celebrante em 2018 e desde então já celebrei mais de 380 cerimônias — cada uma única, porque cada casal é único. Escuto muito, escrevo com verdade e celebro em português, inglês e espanhol.',
		image: '/images/celebracoes/celebracao-4.avif',
		imageAlt: 'Natasha Cohn conduzindo os votos de um casal',
		imageFocus: '34% 38%',
		cta: { label: 'Conheça minha história', href: '/a-celebrante' }
	},
	blog: {
		eyebrow: 'Do meu caderno',
		title: 'Textos para quem está começando a sonhar',
		lead: 'Reflexões sobre ritos, escolhas e os detalhes que fazem um casamento ser de verdade.'
	}
};

export const finalCta = {
	eyebrow: 'Vamos conversar?',
	title: 'Me conta: como vocês se encontraram?',
	body: 'Nada melhor que um bom papo para tirar todas as dúvidas. Me escreva contando um pouco da história de vocês — eu respondo pessoalmente.',
	primary: { label: 'Contar nossa história', href: '/contato' }
};
