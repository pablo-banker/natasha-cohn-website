import type { Ritual } from '$lib/types';

/**
 * Ritos confirmados na página /ritos do site atual. Os significados foram
 * escritos a partir do artigo da própria Natasha sobre simbologias — revisar
 * com ela antes da publicação (ver docs/CONTENT_MAP.md). Imagens pendentes.
 * Nada aqui é obrigatório: os ritos são sempre escolha do casal.
 */
export const rituals: Ritual[] = [
	{
		slug: 'areias',
		name: 'Cerimônia das areias',
		meaning:
			'Duas areias de cores diferentes despejadas em um mesmo recipiente. Depois de misturadas, é impossível separá-las — como as duas histórias que agora seguem juntas.',
		whenItMakesSense: 'Para casais e famílias que se unem, inclusive com filhos.',
		image: '/images/ritos/areias.jpg',
		imageAlt: 'Mãos despejando areias coloridas em um vidro durante a cerimônia'
	},
	{
		slug: 'plantio-da-arvore',
		name: 'Plantio da árvore',
		meaning:
			'Plantar juntos uma muda que vai crescer com o passar dos anos — como o amor, que precisa de cuidado, tempo e raiz para florescer.',
		whenItMakesSense: 'Para quem valoriza raízes, natureza e o que se constrói devagar.',
		image: '/images/ritos/plantio-da-arvore.jpg',
		imageAlt: 'Casal plantando uma pequena árvore juntos'
	},
	{
		slug: 'handfasting',
		name: 'Handfasting — cerimônia celta',
		meaning:
			'As mãos do casal são atadas com fitas enquanto os votos são ditos. É a origem da expressão "atar o nó": um compromisso que se vê e se sente.',
		whenItMakesSense: 'Para casais que se conectam com simbologias ancestrais.',
		image: '/images/ritos/handfasting.jpg',
		imageAlt: 'Mãos de um casal atadas com fitas coloridas'
	},
	{
		slug: 'lava-pes',
		name: 'Lava-pés',
		meaning:
			'Um gesto de cuidado e serviço mútuo. Ajoelhar-se diante de quem se ama para lembrar que o amor também é entrega no dia a dia.',
		whenItMakesSense: 'Para casais que querem simbolizar humildade e cuidado.',
		image: '/images/ritos/lava-pes.jpg',
		imageAlt: 'Gesto simbólico de lava-pés durante a cerimônia'
	},
	{
		slug: 'purificacao-das-maos',
		name: 'Purificação das mãos',
		meaning:
			'As mãos que vão construir a vida a dois são lavadas e abençoadas — um recomeço limpo para escrever a próxima página juntos.',
		whenItMakesSense: 'Para começar a nova jornada com leveza e intenção.',
		image: '/images/ritos/purificacao-das-maos.jpg',
		imageAlt: 'Ritual de purificação das mãos do casal'
	},
	{
		slug: 'purificacao-das-aliancas',
		name: 'Purificação das alianças',
		meaning:
			'As alianças passam pelas mãos dos convidados, que as enchem de votos e boas energias antes de voltarem ao casal.',
		whenItMakesSense: 'Para envolver todos os convidados na cerimônia.',
		image: '/images/ritos/purificacao-das-aliancas.jpg',
		imageAlt: 'Alianças sendo passadas entre os convidados'
	},
	{
		slug: 'filtro-dos-sonhos',
		name: 'Filtro dos sonhos',
		meaning:
			'Construir juntos um amuleto que filtra os sonhos — guardando os bons e deixando ir os que não servem mais.',
		whenItMakesSense: 'Para casais ligados a simbologias dos povos originários.',
		image: '/images/ritos/filtro-dos-sonhos.jpg',
		imageAlt: 'Filtro dos sonhos artesanal'
	},
	{
		slug: 'baloes',
		name: 'Deixar ir dos balões',
		meaning:
			'Soltar ao céu desejos e homenagens — um gesto de despedida, gratidão ou esperança que sobe junto com o olhar de todos.',
		whenItMakesSense: 'Para homenagear quem partiu ou lançar votos ao futuro.',
		image: '/images/ritos/baloes.jpg',
		imageAlt: 'Balões biodegradáveis subindo ao céu'
	}
];

export function ritualBySlug(slug: string): Ritual | undefined {
	return rituals.find((r) => r.slug === slug);
}
