import type { APIRoute } from 'astro';
import { routeMap, type PageSlug } from '../i18n/routes';

export const prerender = true;

const pages: PageSlug[] = ['home', 'quem-somos', 'servicos', 'portfolio', 'contato'];

function toAbsolute(site: URL, path: string) {
	return new URL(path, site).href;
}

function ptPath(slug: PageSlug) {
	return slug === 'home' ? '/' : `/${slug}`;
}

function enPath(slug: PageSlug) {
	const enSlug = routeMap[slug];
	return enSlug === '' ? '/en' : `/en/${enSlug}`;
}

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function urlEntry(site: URL, loc: string, slug: PageSlug) {
	const ptUrl = toAbsolute(site, ptPath(slug));
	const enUrl = toAbsolute(site, enPath(slug));

	return [
		'	<url>',
		`		<loc>${escapeXml(toAbsolute(site, loc))}</loc>`,
		`		<xhtml:link rel="alternate" hreflang="pt-BR" href="${escapeXml(ptUrl)}" />`,
		`		<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />`,
		`		<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(ptUrl)}" />`,
		'	</url>',
	].join('\n');
}

export const GET: APIRoute = ({ site }) => {
	const baseUrl = site ?? new URL('https://sixtech.com.br');
	const entries = pages.flatMap((slug) => [
		urlEntry(baseUrl, ptPath(slug), slug),
		urlEntry(baseUrl, enPath(slug), slug),
	]);
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...entries,
		'</urlset>',
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
