/** Tipos de domínio compartilhados por todo o site. */

export type NavItem = {
	label: string;
	href: string;
	/** Submenu opcional (ex.: Cerimônias) */
	children?: NavItem[];
};

export type SocialLink = {
	label: string;
	href: string;
	/** Nome do ícone do Lucide (@lucide/svelte) */
	icon: 'instagram' | 'facebook' | 'youtube';
	handle?: string;
};

export type Stat = {
	/** Valor numérico (para animação de contagem). Use null quando for texto puro. */
	value: number | null;
	/** Prefixo, ex.: "+" */
	prefix?: string;
	/** Sufixo, ex.: "" */
	suffix?: string;
	/** Rótulo abaixo do número */
	label: string;
	/** Quando não há número, texto exibido no lugar (ex.: "3 idiomas") */
	display?: string;
};

export type Ceremony = {
	slug: string;
	number: string;
	title: string;
	summary: string;
	description: string;
	/** Caminho da imagem em /static ou null enquanto pendente */
	image: string | null;
	imageAlt: string;
	href: string;
};

export type ProcessStep = {
	number: string;
	title: string;
	description: string;
};

export type Ritual = {
	slug: string;
	name: string;
	meaning: string;
	whenItMakesSense: string;
	image: string | null;
	imageAlt: string;
};

export type Testimonial = {
	/** Nome do casal ou fornecedor, exatamente como no material original */
	author: string;
	/** Depoimento real, na íntegra — nunca editar o sentido. Parágrafos
	 *  separados por quebra de linha simples. */
	quote: string;
	/** Trecho curto (frase real extraída do depoimento) para o carrossel da
	 *  home, onde o texto aparece em fonte grande. */
	highlight?: string;
	/** Contexto opcional (ex.: "microwedding", "renovação de votos") */
	context?: string;
	featured?: boolean;
	/** Foto do casal (quando houver autorização). null quando não houver. */
	image?: string | null;
	imageAlt?: string;
};

export type VideoItem = {
	title: string;
	description: string;
	/** ID do vídeo no YouTube. null enquanto pendente de confirmação. */
	youtubeId: string | null;
	/** Caminho de vídeo local opcional, alternativa ao YouTube */
	src?: string;
	/** Thumbnail otimizada em /static; se null usa a do YouTube */
	poster: string | null;
	featured?: boolean;
};

export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	date: string; // ISO 8601
	updated?: string;
	author: string;
	category?: string;
	coverImage: string | null;
	coverAlt: string;
	/** true quando o corpo ainda precisa ser conferido contra o original do Wix */
	needsReview?: boolean;
};

export type BlogPost = BlogPostMeta & {
	html: string;
	readingMinutes: number;
};
