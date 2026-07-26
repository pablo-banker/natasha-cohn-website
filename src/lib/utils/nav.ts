import { prefersReducedMotion } from './motion';

function hasModifier(event: MouseEvent) {
	return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/**
 * Ao clicar num link que aponta para a página em que já estamos (sem âncora),
 * o SvelteKit não faz nada — a URL não muda. Este handler intercepta esse
 * caso e rola suavemente até o topo (ex.: clicar em "Início" já na home, ou
 * no logotipo). Links com âncora (#) e para outras páginas seguem normais.
 */
export function scrollTopIfSamePage(event: MouseEvent, href: string, currentPath: string) {
	// Deixa o comportamento padrão para cliques com modificador (nova aba etc.).
	if (hasModifier(event)) return;

	const [path, hash] = href.split('#');
	const target = path || '/';
	if (!hash && target === currentPath) {
		event.preventDefault();
		window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}
}

/**
 * Rola suavemente até um elemento por id, respeitando o offset do cabeçalho
 * fixo (via scroll-margin-top das seções) e a preferência de movimento.
 */
export function smoothScrollToId(id: string): boolean {
	const el = document.getElementById(id);
	if (!el) return false;
	el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
	return true;
}

/**
 * Links de âncora (ex.: /cerimonias#corporativo). Se a âncora está na página
 * atual, faz a rolagem suave via JS (o `scroll-behavior: smooth` global foi
 * removido porque quebrava o reset de scroll ao trocar de página) e atualiza
 * a URL. Se for para outra página, deixa a navegação normal seguir.
 */
export function smoothAnchorIfSamePage(event: MouseEvent, href: string, currentPath: string) {
	if (hasModifier(event)) return;

	const [path, hash] = href.split('#');
	if (!hash) return;
	if ((path || '/') !== currentPath) return; // outra página → navegação normal

	if (smoothScrollToId(hash)) {
		event.preventDefault();
		// Mantém a URL compartilhável e o botão "voltar" funcionando.
		history.pushState(null, '', `#${hash}`);
	}
}
