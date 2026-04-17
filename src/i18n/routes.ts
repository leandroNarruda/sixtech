export type PageSlug = 'home' | 'quem-somos' | 'servicos' | 'portfolio' | 'contato';

/** Mapa de slug PT → slug EN (sem prefixo de idioma) */
export const routeMap: Record<PageSlug, string> = {
	'home': '',
	'quem-somos': 'about',
	'servicos': 'services',
	'portfolio': 'portfolio',
	'contato': 'contact',
};

/** Mapa inverso: slug EN → slug PT */
export const routeMapInverse: Record<string, PageSlug> = {
	'': 'home',
	'about': 'quem-somos',
	'services': 'servicos',
	'portfolio': 'portfolio',
	'contact': 'contato',
};

/**
 * Dado o pathname atual e o idioma alvo, retorna a URL equivalente.
 * pathname: string vinda de Astro.url.pathname (ex: "/quem-somos", "/en/about")
 */
export function getAlternateUrl(pathname: string, targetLang: 'pt' | 'en'): string {
	// Remove trailing slash, exceto raiz
	const clean = pathname.endsWith('/') && pathname.length > 1
		? pathname.slice(0, -1)
		: pathname;

	// Determina se a URL atual é EN (tem prefixo /en/)
	const isCurrentlyEn = clean === '/en' || clean.startsWith('/en/');
	const currentSlugRaw = isCurrentlyEn
		? clean.replace(/^\/en\/?/, '')
		: clean.replace(/^\//, '');

	// Resolve para slug PT
	const ptSlug: PageSlug = isCurrentlyEn
		? (routeMapInverse[currentSlugRaw] ?? 'home')
		: ((currentSlugRaw as PageSlug) || 'home');

	if (targetLang === 'pt') {
		return ptSlug === 'home' ? '/' : `/${ptSlug}`;
	} else {
		const enSlug = routeMap[ptSlug];
		return enSlug === '' ? '/en' : `/en/${enSlug}`;
	}
}
