import type { VideoItem } from '$lib/types';
import { socialLinks } from './social';

/**
 * Trechos de cerimônias em vídeo (YouTube). Os títulos vêm dos próprios
 * vídeos no canal da Natasha. O player só é carregado após o clique
 * (facade + modal), então nenhum script do YouTube pesa no carregamento
 * inicial. A thumbnail usa a do YouTube quando `poster` é null.
 */
export const videos: VideoItem[] = [
	{
		title: 'Patrícia e Gustavo',
		description: 'Filme de casamento',
		youtubeId: 'FA7Hu8g0zSY',
		poster: null,
		featured: true
	},
	{
		title: 'Rafa e Arthur',
		description: 'Florianópolis',
		youtubeId: 'CsyD1L7RzN0',
		poster: null
	},
	{
		title: 'Mateus e Túlio',
		description: 'Coroação do amor',
		youtubeId: 'l2GEu6HpvsI',
		poster: null
	},
	{
		title: 'Bruna e Renato',
		description: 'Um bilhete de amor',
		youtubeId: '7Lo991dqn0w',
		poster: null
	}
];

export const videoChannelUrl =
	socialLinks.find((s) => s.icon === 'youtube')?.href ??
	'https://www.youtube.com/channel/UC8svGR18KLBz0ovQI88iHaw';

/** Vídeos prontos para exibir (com ID de YouTube confirmado). */
export const playableVideos = videos.filter((v) => v.youtubeId || v.src);
