import type { Ceremony } from '$lib/types';

/**
 * Serviços da Natasha. Os textos e as imagens de "Celebrações de amor
 * (15 anos)", "Mentoria", "Apadrinhamento" e "Corporativo" foram migrados
 * VERBATIM da página oficial /services-4 ("O que fazemos") — corrigidos
 * apenas deslizes evidentes de digitação. As imagens correspondentes estão
 * em /static/images/cerimonias.
 *
 * "Casamentos" (o serviço central) vem do texto de introdução da mesma
 * página ("cerimônias exclusivas... criação e revisão de votos"). "Cerimônias
 * bilíngues" é um serviço real confirmado em /a-celebrante (PT/EN/ES), mas não
 * possui card próprio em /services-4 — mantido com foto de celebração.
 */
export const ceremonies: Ceremony[] = [
	{
		slug: 'casamentos',
		number: '01',
		title: 'Casamentos',
		summary: 'A cerimônia autoral, escrita a seis mãos.',
		description:
			'Cerimônias exclusivas, escritas a seis mãos para refletir a essência de cada casal. Faço uma imersão na história de vocês e ainda ajudo na criação e revisão dos votos, para que cada palavra esteja perfeita no grande dia.',
		image: '/images/celebracoes/celebracao-3.avif',
		imageAlt: 'Casal se beijando ao fim da cerimônia, entre os aplausos dos convidados',
		href: '/cerimonias#casamentos'
	},
	{
		slug: 'bilingues',
		number: '02',
		title: 'Cerimônias bilíngues',
		summary: 'Para amores que falam mais de uma língua.',
		description:
			'Celebro em português, inglês e espanhol. Quando as famílias vêm de lugares diferentes, a cerimônia acolhe todo mundo — para que ninguém perca uma única palavra da emoção.',
		image: '/images/celebracoes/celebracao-2.avif',
		imageAlt: 'Cerimônia ao ar livre em um mirante, com os convidados reunidos',
		href: '/cerimonias#bilingues'
	},
	{
		slug: 'apadrinhamento',
		number: '03',
		title: 'Cerimônia de apadrinhamento',
		summary: 'Celebrar os laços que a gente escolhe.',
		description:
			'A cerimônia de apadrinhamento é um momento especial que celebra laços afetivos. Com amor e alegria, padrinhos e afilhados se unem em uma experiência significativa. Cada detalhe ressalta a importância dessa relação, marcando o início de uma jornada repleta de carinho e apoio mútuo.',
		image: '/images/cerimonias/apadrinhamento.jpg',
		imageAlt: 'Casal recebendo com carinho uma criança durante a cerimônia de apadrinhamento',
		href: '/cerimonias#apadrinhamento'
	},
	{
		slug: 'celebracoes',
		number: '04',
		title: 'Celebramos o seu amor',
		summary: 'Festas de 15 anos e outros marcos.',
		description:
			'A personalização do texto para uma festa de 15 anos é fundamental para refletir a essência da debutante. Escolher palavras que expressem suas paixões e sonhos torna a mensagem única e memorável. Invista em um conteúdo que encante todos os convidados!',
		image: '/images/cerimonias/celebracoes.jpg',
		imageAlt: 'Debutante em vestido azul ao lado de uma carruagem iluminada numa festa de 15 anos',
		href: '/cerimonias#celebracoes'
	},
	{
		slug: 'mentoria',
		number: '05',
		title: 'Mentoria para amigos celebrarem',
		summary: 'Para o amigo que vai celebrar vocês.',
		description:
			'A mentoria para amigos que escrevem a cerimônia de casamento é uma oportunidade de celebrar o amor. Com orientações simples, eles podem escrever um texto sincero que reflita a essência do casal. Assim, a cerimônia se tornará ainda mais especial, com a participação dos que mais amam o casal.',
		image: '/images/cerimonias/mentoria.jpg',
		imageAlt: 'Roteiros da cerimônia impressos sobre a mesa',
		href: '/cerimonias#mentoria'
	},
	{
		slug: 'corporativo',
		number: '06',
		title: 'Eventos corporativos',
		summary: 'Mestre de cerimônias com carisma.',
		description:
			'Como mestre de cerimônias em eventos corporativos, meu papel é conectar os participantes e garantir uma comunicação clara. Com profissionalismo e carisma, mantenho a energia do evento e interajo com o público, tornando cada ocasião uma experiência memorável.',
		image: '/images/cerimonias/corporativo.jpg',
		imageAlt: 'Natasha Cohn como mestre de cerimônias em um evento corporativo',
		href: '/cerimonias#corporativo'
	}
];

export function ceremonyBySlug(slug: string): Ceremony | undefined {
	return ceremonies.find((c) => c.slug === slug);
}
