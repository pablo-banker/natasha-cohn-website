import { describe, it, expect } from 'vitest';
import { site, primaryNav, whatsappLink } from './site';
import { stats } from './home';
import { testimonials } from './testimonials';
import { ceremonies } from './ceremonies';
import { rituals } from './rituals';
import { blogPostsByDate, relatedPosts } from './blog-index';
import { socialLinks } from './social';
import {
	personSchema,
	professionalServiceSchema,
	articleSchema,
	breadcrumbSchema
} from '$lib/seo/structuredData';

/**
 * Estes testes protegem os fatos apurados na auditoria do site atual.
 * Se alguém alterar um número ou um depoimento sem conferir a fonte, o
 * teste falha. Ver docs/BRAND_AUDIT.md e docs/CONTENT_MAP.md.
 */

describe('dados de contato reais', () => {
	it('mantém o e-mail e os telefones do site atual', () => {
		expect(site.email).toBe('celebrantenatashacohn@gmail.com');
		expect(site.phones.map((p) => p.label)).toEqual(['(21) 97438-3237', '(24) 98122-8689']);
	});

	it('monta o link do WhatsApp com mensagem pré-preenchida', () => {
		const link = whatsappLink('Olá!');
		expect(link).toBe(`https://wa.me/${site.whatsapp.number}?text=Ol%C3%A1!`);
	});

	it('lista os três idiomas confirmados', () => {
		expect(site.languages).toEqual(['Português', 'Inglês', 'Espanhol']);
	});

	it('aponta as redes sociais reais', () => {
		const hrefs = socialLinks.map((s) => s.href);
		expect(hrefs.some((h) => h.includes('instagram.com/celebrantenatashacohn'))).toBe(true);
		expect(hrefs.some((h) => h.includes('UC8svGR18KLBz0ovQI88iHaw'))).toBe(true);
	});
});

describe('números de autoridade', () => {
	it('usa apenas números confirmados na auditoria (380 cerimônias, desde 2018)', () => {
		const numeric = stats.find((s) => s.value !== null);
		expect(numeric?.value).toBe(380);
		expect(numeric?.prefix).toBe('+');
		expect(stats.some((s) => s.display === '2018')).toBe(true);
	});

	it('nenhum número inventado além dos apurados', () => {
		const numbers = stats.filter((s) => s.value !== null).map((s) => s.value);
		expect(numbers).toEqual([380]);
	});
});

describe('depoimentos', () => {
	it('todos têm autoria identificada', () => {
		for (const t of testimonials) {
			expect(t.author.trim().length).toBeGreaterThan(0);
			expect(t.quote.trim().length).toBeGreaterThan(0);
		}
	});

	it('não contém depoimentos truncados no fim', () => {
		for (const t of testimonials) {
			expect(t.quote.trim()).not.toMatch(/incríve$|\.\.\.$|…$/);
		}
	});

	it('inclui os casais reais da página de depoimentos', () => {
		const authors = testimonials.map((t) => t.author);
		expect(authors).toContain('Amanda e Luan');
		expect(authors).toContain('Luiza e Sergio');
		expect(authors).toContain('Camila e Nero');
		expect(authors).toContain('Mirella e Neto');
	});

	it('os depoimentos em destaque têm um trecho curto (highlight) e foto', () => {
		const featured = testimonials.filter((t) => t.featured);
		expect(featured.length).toBeGreaterThanOrEqual(3);
		for (const t of featured) {
			expect(t.highlight, `${t.author} precisa de highlight`).toBeTruthy();
			// O highlight deve ser um trecho REAL do depoimento (sem inventar).
			const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
			expect(normalize(t.quote)).toContain(normalize(t.highlight!.replace(/[.!?]+$/, '')));
			expect(t.image).toBeTruthy();
		}
	});
});

describe('cerimônias e ritos', () => {
	it('cada cerimônia tem slug único e âncora correspondente', () => {
		const slugs = ceremonies.map((c) => c.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const c of ceremonies) {
			expect(c.href).toBe(`/cerimonias#${c.slug}`);
		}
	});

	it('cada rito tem slug único, significado e quando faz sentido', () => {
		const slugs = rituals.map((r) => r.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const r of rituals) {
			expect(r.meaning.length).toBeGreaterThan(20);
			expect(r.whenItMakesSense.length).toBeGreaterThan(10);
		}
	});

	it('inclui os ritos confirmados na página /ritos do Wix', () => {
		const names = rituals.map((r) => r.slug);
		expect(names).toContain('areias');
		expect(names).toContain('handfasting');
		expect(names).toContain('lava-pes');
		expect(names).toContain('filtro-dos-sonhos');
	});
});

describe('navegação', () => {
	it('não expõe serviços não confirmados', () => {
		const ceremonyNav = primaryNav.find((i) => i.href === '/cerimonias');
		const childSlugs = (ceremonyNav?.children ?? []).map((c) => c.href.split('#')[1]);
		const realSlugs = ceremonies.map((c) => c.slug);
		for (const slug of childSlugs) {
			expect(realSlugs).toContain(slug);
		}
	});

	it('nenhum link vazio ou href="#"', () => {
		const walk = (items: typeof primaryNav): string[] =>
			items.flatMap((i) => [i.href, ...walk(i.children ?? [])]);
		for (const href of walk(primaryNav)) {
			expect(href).not.toBe('#');
			expect(href.length).toBeGreaterThan(0);
		}
	});
});

describe('blog', () => {
	it('ordena os artigos do mais recente para o mais antigo', () => {
		const dates = blogPostsByDate.map((p) => new Date(p.date).getTime());
		expect([...dates].sort((a, b) => b - a)).toEqual(dates);
	});

	it('preserva as datas e a autoria originais do Wix', () => {
		const ritos = blogPostsByDate.find((p) => p.slug === 'os-ritos-de-uma-cerimonia-de-casamento');
		expect(ritos?.date).toBe('2023-10-15');
		expect(ritos?.author).toBe('Natasha Cohn');
	});

	it('sugere relacionados sem repetir o artigo atual', () => {
		const related = relatedPosts('os-regimes-de-casamento');
		expect(related.every((p) => p.slug !== 'os-regimes-de-casamento')).toBe(true);
	});
});

describe('dados estruturados', () => {
	it('não inventa avaliações nem notas', () => {
		const blob = JSON.stringify([
			personSchema(),
			professionalServiceSchema(),
			breadcrumbSchema([{ name: 'Início', path: '/' }]),
			articleSchema(blogPostsByDate[0])
		]);
		expect(blob).not.toContain('aggregateRating');
		expect(blob).not.toContain('ratingValue');
		expect(blob).not.toContain('reviewCount');
		expect(blob).not.toContain('"Review"');
	});

	it('usa URLs absolutas no breadcrumb', () => {
		const schema = breadcrumbSchema([{ name: 'Blog', path: '/blog' }]);
		const item = (schema.itemListElement as { item: string }[])[0].item;
		expect(item.startsWith('https://')).toBe(true);
	});

	it('declara os idiomas reais no schema da pessoa', () => {
		expect(personSchema().knowsLanguage).toEqual(site.languages);
	});
});
