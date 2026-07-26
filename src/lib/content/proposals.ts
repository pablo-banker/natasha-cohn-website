/**
 * Conteúdo das propostas comerciais (páginas-fantasma, não linkadas no site).
 * O texto institucional é o mesmo do PDF da Natasha. A parte dinâmica — o
 * orçamento de cada casal — é resolvida por ID via `getProposalBudget`, hoje
 * um placeholder a ser ligado a uma fonte real depois.
 */

export type ProposalTestimonial = {
	quote: string;
	author: string;
	context?: string;
};

/** Imagens de cada seção (cada variante de proposta tem o seu conjunto).
 *  `null` renderiza o marcador "fotografia a enviar". */
export type ProposalImages = {
	hero: string | null;
	about: string | null;
	differentials: (string | null)[];
	guests: (string | null)[];
	inclusivity: (string | null)[];
};

export type ProposalContent = {
	/** Capa. */
	cover: {
		eyebrow: string;
		title: string;
		tagline: string;
	};
	about: {
		label: string;
		title: string;
		paragraphs: string[];
	};
	differentials: {
		title: string;
		items: string[];
	};
	ceremonyTypes: {
		title: string;
		items: string[];
	};
	guests: {
		title: string;
	};
	inclusivity: {
		title: string;
		highlight: string;
	};
	symbologies: {
		title: string;
		description: string;
		/** Cada simbologia é uma foto com o nome em destaque (badge). */
		items: { name: string; image: string | null }[];
	};
	process: {
		title: string;
		lead: string;
		steps: { title: string }[];
		closing: string;
	};
	testimonials: {
		title: string;
		items: ProposalTestimonial[];
	};
	cta: {
		title: string;
		lead: string;
	};
	images: ProposalImages;
	/** Orçamento-exemplo (placeholder até a busca por id). */
	budget: ProposalBudget;
};

/** Parte dinâmica: dados de orçamento por casal. */
export type ProposalBudget = {
	title: string;
	couple: string;
	date: string;
	venue: string;
	investmentLabel: string;
	investmentValue: string;
	payment: string;
	validity: string;
};

/** Proposta para casais héteros. */
export const heteroProposal: ProposalContent = {
	cover: {
		eyebrow: 'Celebrante de histórias reais',
		title: 'Natasha Cohn',
		tagline: 'Amor, humor, poesia e alma'
	},
	about: {
		label: 'Sobre mim',
		title: 'O amor é o meu ofício',
		paragraphs: [
			'Celebro escolhas, encontros, conexões.',
			'Celebro o que nasce da verdade, do riso fácil, do olhar que não esconde. Celebro todas as formas de amar. Com alma, escuta, e palavras que contam quem vocês são.',
			'Sou Natasha, esposa, mãe, e uma verdadeira apaixonada por contar histórias de amor. Escrevo cerimônias com o coração, narradas como poesia, sentidas como um abraço.',
			'Desde que me tornei celebrante em 2018, já tive a honra de escrever e celebrar mais de 400 cerimônias exclusivas e estou entre as mais bem avaliadas celebrantes do Brasil.',
			'Aqui, nada é obrigatório e tudo é feito junto com vocês, para que a cerimônia seja a mais incrível do planeta e celebre todas as formas de amar.',
			'E sim, também ofereço cerimônias em inglês e espanhol, onde o amor chamar!'
		]
	},
	differentials: {
		title: 'O que me torna única',
		items: [
			'Não uso textos prontos',
			'Entrego uma cerimônia autoral, escrita especialmente para cada casal',
			'Trabalho com entrevistas e escuta sensível',
			'Atendo com empatia, respeitando crenças, histórias e limites'
		]
	},
	ceremonyTypes: {
		title: 'Tipos de cerimônia',
		items: [
			'Cerimônia de casamento',
			'Cerimônia de casamento inclusivas',
			'Cerimônia de casamento com efeito civil',
			'Elopement Wedding (casamento a dois)',
			'Renovação de votos ou bodas',
			'Cerimônia de Apadrinhamento',
			'Mentoria para amigos celebrarem'
		]
	},
	guests: {
		title: 'Seus convidados ficam completamente envolvidos'
	},
	inclusivity: {
		title: 'Celebramos todas as formas de amar.',
		highlight: 'Aqui a linguagem é a do amor, respeito e acolhimento.'
	},
	symbologies: {
		title: 'Simbologias',
		description:
			'Se fizer sentido para vocês ter alguma simbologia durante a cerimônia, pensaremos juntos nos elementos que serão usados, para que tenham um significado real com a história de vocês. (valores sob consulta)',
		items: [
			{
				name: 'Filtro dos sonhos',
				image: '/images/propostas/simbologia_filtro-dos-sonhos.webp'
			},
			{ name: 'Balões', image: '/images/propostas/simbologia_baloes.webp' },
			{ name: 'Handfasting', image: '/images/propostas/simbologia_handfasting.webp' },
			{
				name: 'Rito das areias',
				image: '/images/propostas/simbologia_rito-das-areias.webp'
			},
			{
				name: 'Vinho ou cálice da união',
				image: '/images/propostas/simbologia_vinho-e-calice.webp'
			},
			{
				name: 'Árvore da vida',
				image: '/images/propostas/simbologia_arvore-da-vida.jpeg'
			},
			{
				name: 'Cápsula do tempo',
				image: '/images/propostas/simbologia_capsula-do-tempo.webp'
			},
			{ name: 'Lava-pés', image: '/images/propostas/simbologia_lava-pes.png' }
		]
	},
	process: {
		title: 'Nossa vivência',
		lead: 'A cerimônia será uma experiência memorável para vocês e seus convidados. Veja como funciona o processo.',
		steps: [
			{ title: 'Envio das entrevistas individuais' },
			{ title: 'Reunião com o casal sobre a análise de perfil e alinhamento' },
			{ title: 'Criação do texto da cerimônia' },
			{ title: 'Reunião de cronograma' },
			{ title: 'Celebração ao vivo do amor de vocês' }
		],
		closing:
			'Espero vocês no altar, onde viverão uma experiência inesquecível e uma cerimônia extraordinária!'
	},
	testimonials: {
		title: 'Depoimentos',
		items: [
			{
				quote:
					'Não existe nada parecido com o que a Natasha entrega. Nossa cerimônia foi escrita com alma, com verdade, e emocionou a todos. Nunca vamos esquecer.',
				author: 'Sabrina & Arthur',
				context: 'Cerimônia toda em espanhol'
			},
			{
				quote:
					'Foi como se ela tivesse traduzido nosso amor em palavras. Todo mundo chorou, riu, sentiu. É mais do que celebração. É poesia viva.',
				author: 'Jéssika & Bruna'
			},
			{
				quote:
					'Natasha nos arrancou inúmeros sorrisos e foi impossível não se emocionar! Lembrou de cada detalhe que pedimos e também dos pequenos detalhes da nossa história... Gratidão por ser esse ser iluminado.',
				author: 'Lucas & Carlos'
			},
			{
				quote:
					'Mesmo sendo em duas línguas, tudo fluiu com perfeição. Os convidados brasileiros e americanos entenderam com o coração.',
				author: 'Hanna & Kevin',
				context: 'Cerimônia bilíngue'
			},
			{
				quote:
					'Naty é uma celebrante que emociona e encanta com suas palavras e sua voz doce. Mesmo em uma cerimônia realizada apenas para mim e meu marido, para nossa renovação de votos de 18 anos de casados, ela conseguiu transformar em um momento mágico cheio de emoção!',
				author: 'Bia & Rafael',
				context: 'Renovação de votos'
			},
			{
				quote:
					'Suas lindas, doces e sábias palavras transformaram nossas vidas. Conseguiu chegar ao coração de muitos, mesmo os que não estavam presentes ali naquele momento. Obrigado por ter nos proporcionado um momento tão mágico, espiritual, encantador, acolhedor e cheio de amor! Viva o amor em todas as suas formas de amar!',
				author: 'Juan & Felipe'
			}
		]
	},
	cta: {
		title: 'Vamos criar juntos?',
		lead: 'Se você busca uma cerimônia leve, poética e absolutamente verdadeira, estou aqui. Com palavras, alma e entrega. Porque amor bonito merece ser contado assim.'
	},
	images: {
		hero: '/images/propostas/realizar/hero.webp',
		about: '/images/propostas/self.jpeg',
		differentials: [
			'/images/propostas/realizar/only_1.webp',
			'/images/propostas/realizar/only_2.webp',
			'/images/propostas/realizar/only_3.webp',
			'/images/propostas/realizar/only_4.webp'
		],
		guests: [
			'/images/propostas/convidados_1.jpeg',
			'/images/propostas/convidados_2.jpeg',
			'/images/propostas/convidados_3.webp',
			'/images/propostas/convidados_4.jpeg',
			'/images/propostas/convidados_5.webp',
			'/images/propostas/convidados_6.webp',
			'/images/propostas/convidados_7.webp',
			'/images/propostas/convidados_8.webp'
		],
		inclusivity: [
			'/images/propostas/lgbt_1.webp',
			'/images/propostas/lgbt_2.webp',
			'/images/propostas/lgbt_3.webp',
			'/images/propostas/lgbt_4.webp',
			'/images/propostas/lgbt_5.webp',
			'/images/propostas/lgbt_6.jpg'
		]
	},
	budget: {
		title: 'Cerimônia exclusiva',
		couple: 'Manoela e Ângelo',
		date: '10/04/2027',
		venue: 'Hotel Antarws — Florianópolis',
		investmentLabel: 'Investimento — cerimônia em português',
		investmentValue: 'R$ 3.300,00 (incluso deslocamento)',
		payment: 'Sinal de 30% e o saldo parcelado no pix até 20 dias antes da cerimônia.',
		validity: 'Proposta válida por 3 dias. Reserva de data somente com contrato e sinal.'
	}
};

/**
 * Proposta para casais lésbicos (path /proposta-sonhar). Reaproveita o
 * conteúdo-base (héteros) e ajusta apenas o que muda. As imagens entram
 * depois — por ora, marcadores "fotografia a enviar".
 */
export const sonharProposal: ProposalContent = {
	...heteroProposal,
	about: {
		label: 'Sobre mim',
		title: 'O amor é o meu ofício',
		paragraphs: [
			'Celebro escolhas, encontros, conexões.',
			'Celebro o que nasce da verdade, do riso fácil, do olhar que não esconde. Celebro todas as formas de amar. Com alma, escuta, e palavras que contam quem vocês são.',
			'Sou Natasha, esposa, mãe, e uma verdadeira apaixonada por contar histórias de amor. Escrevo cerimônias com o coração, narradas como poesia, sentidas como um abraço.',
			'Desde que me tornei celebrante em 2018, já tive a honra de escrever e celebrar mais de 380 cerimônias exclusivas e estou entre as mais bem avaliadas celebrantes do Brasil.',
			'Aqui, nada é obrigatório e tudo é feito junto com vocês, para que a cerimônia seja a mais incrível do planeta e celebre todas as formas de amar.',
			'E sim, também ofereço cerimônias em inglês e espanhol, onde o amor chamar!'
		]
	},
	ceremonyTypes: {
		title: 'Serviços ofertados',
		items: heteroProposal.ceremonyTypes.items
	},
	testimonials: {
		title: 'Depoimentos',
		items: [
			{
				quote:
					'Passando depois de tanto tempo pra te agradecer mais uma vez por tudo. Às vezes a vida está acontecendo normalmente e, de repente, lembro de algum pedaço da cerimônia e me emociono na hora. Não tínhamos dúvida de que seria incrível desde que a Aly nos apresentou você — mas você superou todas as nossas expectativas. Não se fala em outra coisa: todo mundo elogiou o texto e o seu jeito. Mais uma vez, obrigada mesmo!',
				author: 'Isadora e Bruna'
			},
			{
				quote:
					'Foi como se ela tivesse traduzido nosso amor em palavras. Todo mundo chorou, riu, sentiu. É mais do que celebração. É poesia viva.',
				author: 'Jéssika & Bruna'
			},
			{
				quote:
					'Natasha nos arrancou inúmeros sorrisos e foi impossível não se emocionar! Lembrou de cada detalhe que pedimos e também dos pequenos detalhes da nossa história... Gratidão por ser esse ser iluminado.',
				author: 'Lucas & Carlos'
			},
			{
				quote:
					'Aaaah, Natasha! Você foi essencial no nosso dia, contou a nossa história com tanta sensibilidade e carinho. Tenho certeza de que fizemos a escolha certa para o nosso melhor dia. Obrigada por transmitir tudo isso.',
				author: 'Ana e Manu'
			},
			{
				quote:
					'Suas lindas, doces e sábias palavras transformaram nossas vidas. Conseguiu chegar ao coração de muitos, mesmo os que não estavam presentes ali naquele momento. Obrigado por ter nos proporcionado um momento tão mágico, espiritual, encantador, acolhedor e cheio de amor! Viva o amor em todas as suas formas de amar!',
				author: 'Juan & Felipe'
			}
		]
	},
	// Símbolos e imagens compartilhadas herdadas do hetero; só o hero e os
	// "only" (o que me torna única) variam por proposta.
	images: {
		...heteroProposal.images,
		hero: '/images/propostas/sonhar/hero.webp',
		differentials: [
			'/images/propostas/sonhar/only_1.webp',
			'/images/propostas/sonhar/only_2.webp',
			'/images/propostas/sonhar/only_3.webp',
			'/images/propostas/sonhar/only_4.webp'
		]
	},
	budget: {
		title: 'Cerimônia exclusiva',
		couple: 'Jessica e Maria',
		date: '07/07/2027',
		venue: 'Petrópolis',
		investmentLabel: 'Investimento',
		investmentValue:
			'R$ 3.270,00 — despesas de cartório não inclusas (pagas diretamente ao cartório)',
		payment:
			'Sinal de 30% e saldo parcelado no pix até 20 dias antes da cerimônia. Cartão de crédito com acréscimo.',
		validity: 'Proposta válida por 3 dias. Reserva de data somente com contrato e sinal.'
	}
};

/**
 * Proposta para casais gays (path /proposta-amar). Mesmo conteúdo-base; o que
 * muda é o conjunto de fotos (a entrar depois) e o orçamento (via Sheets).
 */
export const amarProposal: ProposalContent = {
	...heteroProposal,
	// Símbolos e imagens compartilhadas herdadas do hetero; só o hero e os
	// "only" (o que me torna única) variam por proposta.
	images: {
		...heteroProposal.images,
		hero: '/images/propostas/amar/hero.webp',
		differentials: [
			'/images/propostas/amar/only_1.webp',
			'/images/propostas/amar/only_2.webp',
			'/images/propostas/amar/only_3.webp',
			'/images/propostas/amar/only_4.webp'
		]
	},
	budget: {
		title: 'Cerimônia exclusiva',
		couple: 'Nomes do casal',
		date: 'Data da cerimônia',
		venue: 'Local',
		investmentLabel: 'Investimento',
		investmentValue: 'Valor sob consulta',
		payment: 'Sinal de 30% e saldo parcelado no pix até 20 dias antes da cerimônia.',
		validity: 'Proposta válida por 3 dias. Reserva de data somente com contrato e sinal.'
	}
};

/**
 * Orçamento por id do casal. PLACEHOLDER: hoje devolve o exemplo da própria
 * proposta. Depois, trocar por uma busca real (ex.: fetch a uma planilha/DB
 * no `+page.server.ts`) mantendo esta mesma forma.
 */
export function getProposalBudget(content: ProposalContent, id: string): ProposalBudget {
	void id; // TODO: usar o id para buscar os dados reais do casal
	return content.budget;
}
