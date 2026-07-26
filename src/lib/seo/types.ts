export type SeoImage = {
	url: string;
	alt: string;
	width?: number;
	height?: number;
};

export type SeoInput = {
	/** Título único da página (sem o sufixo da marca) */
	title: string;
	description: string;
	/** Caminho canônico relativo, ex.: "/cerimonias" */
	path: string;
	image?: SeoImage;
	/** article para posts do blog, website para o resto */
	type?: 'website' | 'article' | 'profile';
	/** Impede indexação (ex.: páginas de erro) */
	noindex?: boolean;
	/** JSON-LD já serializável (objeto) — injetado como <script type="application/ld+json"> */
	structuredData?: Record<string, unknown> | Record<string, unknown>[];
	/** Metadados específicos de artigos */
	article?: {
		publishedTime?: string;
		modifiedTime?: string;
		author?: string;
		section?: string;
		tags?: string[];
	};
};
