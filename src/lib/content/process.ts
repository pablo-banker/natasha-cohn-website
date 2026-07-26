import type { ProcessStep } from '$lib/types';

/**
 * Como nasce uma cerimônia. Etapas escritas a partir do método descrito
 * pela Natasha ("imersão na história", "escrita a seis mãos"). Revisar os
 * detalhes com ela antes da publicação (ver docs/CONTENT_MAP.md).
 */
export const processSteps: ProcessStep[] = [
	{
		number: '01',
		title: 'O primeiro encontro',
		description:
			'A gente se conhece, sem pressa. Vocês me contam como se encontraram e eu explico como trabalho. É aqui que a confiança começa.'
	},
	{
		number: '02',
		title: 'A escuta',
		description:
			'Entrevistas com vocês — e, se fizer sentido, com quem ama vocês. Perguntas que trazem à tona as histórias que ninguém mais saberia contar.'
	},
	{
		number: '03',
		title: 'A imersão',
		description:
			'Mergulho no que ouvi. Procuro os fios que ligam a história de vocês: as coincidências, os detalhes pequenos, o que faz esse amor ser só de vocês.'
	},
	{
		number: '04',
		title: 'A escrita autoral',
		description:
			'Escrevo a cerimônia do zero, a seis mãos: as minhas e as de vocês. Vocês leem, ajustam, sugerem. Nada é obrigatório — tudo é escolha.'
	},
	{
		number: '05',
		title: 'Os detalhes',
		description:
			'Escolhemos juntos os ritos, os momentos, quem entra, quem fala. O roteiro ganha corpo e cada gesto encontra o seu lugar.'
	},
	{
		number: '06',
		title: 'A celebração',
		description:
			'O grande dia. Eu conduzo com verdade e leveza, e a história de vocês finalmente vira palavra dita em voz alta — do riso às lágrimas.'
	}
];
