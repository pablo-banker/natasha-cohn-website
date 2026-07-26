/**
 * Proposta de MENTORIA (página-fantasma). Estrutura própria — diferente das
 * propostas de casamento: prepara um amigo/familiar para celebrar a cerimônia.
 * Texto verbatim do PDF da Natasha. Investimento é fixo (não por casal).
 */

export type MentoriaIncludedItem = {
	title: string;
	description: string;
	/** Sub-tópicos (ex.: o que é ensinado na mentoria personalizada). */
	bullets?: string[];
};

export type MentoriaContent = {
	cover: {
		kicker: string;
		title: string;
		name: string;
		/** Foto de fundo da capa (`null` usa fundo da marca). */
		image: string | null;
	};
	intro: {
		label: string;
		name: string;
		paragraphs: string[];
		image: string | null;
	};
	concept: {
		title: string;
		paragraphs: string[];
	};
	included: {
		title: string;
		items: MentoriaIncludedItem[];
		images: (string | null)[];
	};
	notIncluded: {
		title: string;
		items: string[];
	};
	budget: {
		title: string;
		value: string;
		payment: string;
		validity: string;
	};
	cta: {
		title: string;
		lead: string;
	};
};

export const mentoriaProposal: MentoriaContent = {
	cover: {
		kicker: 'Mentoria',
		title: 'Celebre com o coração',
		name: 'Natasha Cohn',
		// Foto de cerimônia da marca (pode ser trocada por uma específica da mentoria).
		image: '/images/propostas/realizar/hero.webp'
	},
	intro: {
		label: 'Olá, meu nome é',
		name: 'Natasha Cohn',
		image: '/images/propostas/self.jpeg',
		paragraphs: [
			'Celebro escolhas, encontros, conexões.',
			'Celebro o que nasce da verdade, do riso fácil, do olhar que não esconde. Celebro todas as formas de amar. Com alma, escuta, e palavras que contam quem vocês são.',
			'Sou Natasha, esposa, mãe, e uma verdadeira apaixonada por contar histórias de amor. Escrevo cerimônias com o coração, narradas como poesia, sentidas como um abraço.',
			'Desde que me tornei celebrante em 2018, já tive a honra de escrever e celebrar mais de 400 cerimônias exclusivas e estou entre as mais bem avaliadas celebrantes do Brasil.',
			'E sim, também ofereço cerimônias em inglês e espanhol, onde o amor chamar!'
		]
	},
	concept: {
		title: 'Uma experiência única',
		paragraphs: [
			'Quando um casal escolhe um amigo ou familiar para celebrar seu casamento, o desejo é viver um momento íntimo e verdadeiro.',
			'Minha mentoria prepara essa pessoa para conduzir a cerimônia com segurança, leveza e emoção, preservando a essência da história de vocês.'
		]
	},
	included: {
		title: 'O que está incluso',
		items: [
			{
				title: 'Entrevista',
				description:
					'Vocês responderão ao meu questionário autoral, desenvolvido para conhecer profundamente a história do casal.'
			},
			{
				title: 'Análise da história',
				description:
					'Farei a leitura completa das respostas, identificando os principais momentos, sentimentos e características que tornarão a cerimônia única.'
			},
			{
				title: 'Mentoria personalizada',
				description: '3 encontros on-line de até 2 horas de duração para ensinar:',
				bullets: [
					'Estrutura de uma cerimônia',
					'Como transformar a história em narrativa',
					'Escrita da cerimônia',
					'Técnicas de comunicação',
					'Postura e condução',
					'Uso do microfone',
					'Controle da emoção'
				]
			},
			{
				title: 'Revisão da cerimônia',
				description:
					'A celebrante escreverá a cerimônia e eu farei uma revisão completa, sugerindo melhorias para garantir fluidez, emoção e naturalidade.'
			},
			{
				title: 'Ensaio',
				description:
					'Realizaremos um ensaio completo on-line para que a celebrante se sinta segura antes do grande dia.'
			},
			{
				title: 'Suporte',
				description:
					'Acompanhamento por WhatsApp até três dias antes do casamento para dúvidas e orientações.'
			}
		],
		images: [
			'/images/propostas/mentoria/incluso_1.webp',
			'/images/propostas/mentoria/incluso_2.webp',
			'/images/propostas/mentoria/incluso_3.jpeg'
		]
	},
	notIncluded: {
		title: 'O que não está incluso',
		items: [
			'Celebração realizada por mim',
			'Presença no casamento',
			'Escrita integral da cerimônia por mim'
		]
	},
	budget: {
		title: 'Investimento',
		value: 'R$ 2.300,00',
		payment: 'Sinal de 50% e saldo parcelado em até 6x no pix ou cartão com acréscimo.',
		validity: 'Proposta válida por 3 dias. Reserva de data somente com contrato e sinal.'
	},
	cta: {
		title: 'Vamos celebrar juntos?',
		lead: 'Se você quer conduzir uma cerimônia com o coração e viver esse momento ao lado de quem ama, eu te preparo para brilhar no altar.'
	}
};
