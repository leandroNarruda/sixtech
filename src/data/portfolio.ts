/**
 * Cards da seção de portfólio (abaixo do hero).
 * Gradientes alinhados ao frame Figma (node 152:742+).
 * Imagens: usar assets em /public/images/portfolio/ quando disponíveis;
 * hoje reutilizamos imagens de serviços como placeholder visual.
 */
import type { Lang } from '../i18n/ui';

export type PortfolioCardGradient = {
	from: string;
	to: string;
};

export type PortfolioCardData = {
	id: string;
	title: string;
	description: string;
	/** Caminho público da imagem de capa */
	imageSrc: string;
	imageAlt: string;
	gradient: PortfolioCardGradient;
	variant?: 'default' | 'green';
};

type CardBase = Pick<PortfolioCardData, 'id' | 'imageSrc' | 'gradient'> & { variant?: 'default' | 'green' };

const cardsBase: CardBase[] = [
	{ id: 'agronegocio-1', imageSrc: '/images/services/sistemas-sob-medida.jpg', gradient: { from: '#11384f', to: '#2780b5' } },
	{ id: 'app-varejo', imageSrc: '/images/services/apps-mobile.jpg', gradient: { from: '#e45226', to: '#7e2d15' } },
	{ id: 'integracao-multinacional', imageSrc: '/images/services/integracoes-ia.jpg', gradient: { from: '#facd45', to: '#947929' } },
	{ id: 'agronegocio-2', imageSrc: '/images/services/consultoria-ti.jpg', gradient: { from: '#11384f', to: '#2780b5' } },
	{ id: 'app-varejo-2', imageSrc: '/images/services/apps-mobile.jpg', gradient: { from: '#e45226', to: '#7e2d15' } },
	{ id: 'integracao-multinacional-2', imageSrc: '/images/services/integracoes-ia.jpg', gradient: { from: '#facd45', to: '#947929' } },
	{ id: 'agronegocio-3', imageSrc: '/images/services/sistemas-sob-medida.jpg', gradient: { from: '#11384f', to: '#2780b5' } },
	{ id: 'agronegocio-green', imageSrc: '/images/services/consultoria-ti.jpg', gradient: { from: '#17d86a', to: '#0c7238' }, variant: 'green' },
];

type CardTranslation = Pick<PortfolioCardData, 'title' | 'description' | 'imageAlt'>;

const cardsTranslations: Record<Lang, CardTranslation[]> = {
	pt: [
		{
			title: 'Sistema de Gestão para Agronegócio',
			description: 'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais. Tecnologias: IA, IoT, Web/Mobile',
			imageAlt: 'Interface do sistema de gestão para agronegócio',
		},
		{
			title: 'App Mobile para Varejo',
			description: 'App híbrido para gestão de estoque e vendas. Tecnologias: Android/iOS, integrações API.',
			imageAlt: 'Aplicativo mobile para varejo',
		},
		{
			title: 'Integração de Sistemas para Multinacional',
			description: 'Conexão de ERPs com IA para automação',
			imageAlt: 'Integração de sistemas corporativos',
		},
		{
			title: 'Sistema de Gestão para Agronegócio 2',
			description: 'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais.',
			imageAlt: 'Painel do sistema de gestão para agronegócio',
		},
		{
			title: 'App Mobile para Varejo 2',
			description: 'App híbrido para gestão de estoque e vendas. Tecnologias: Android/iOS, integrações API.',
			imageAlt: 'Aplicativo mobile para varejo',
		},
		{
			title: 'Integração de Sistemas 2',
			description: 'Conexão de ERPs com IA para automação e melhoria de performance.',
			imageAlt: 'Integração de sistemas corporativos',
		},
		{
			title: 'Sistema de Gestão 3',
			description: 'Plataforma com IA para predição de processos.',
			imageAlt: 'Painel do sistema',
		},
		{
			title: 'Sistema de Gestão para Agronegócio',
			description: 'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais. Tecnologias: IA, IoT, Web/Mobile',
			imageAlt: 'Painel do sistema de gestão para agronegócio',
		},
	],
	en: [
		{
			title: 'Agricultural Management System',
			description: 'AI-powered platform for process prediction, integrating climate and operational data. Technologies: AI, IoT, Web/Mobile',
			imageAlt: 'Agricultural management system interface',
		},
		{
			title: 'Retail Mobile App',
			description: 'Hybrid app for inventory and sales management. Technologies: Android/iOS, API integrations.',
			imageAlt: 'Retail mobile application',
		},
		{
			title: 'System Integration for Multinational',
			description: 'ERP connection with AI for automation',
			imageAlt: 'Corporate system integration',
		},
		{
			title: 'Agricultural Management System 2',
			description: 'AI-powered platform for process prediction, integrating climate and operational data.',
			imageAlt: 'Agricultural management system dashboard',
		},
		{
			title: 'Retail Mobile App 2',
			description: 'Hybrid app for inventory and sales management. Technologies: Android/iOS, API integrations.',
			imageAlt: 'Retail mobile application',
		},
		{
			title: 'System Integration 2',
			description: 'ERP connection with AI for automation and performance improvement.',
			imageAlt: 'Corporate system integration',
		},
		{
			title: 'Management System 3',
			description: 'AI-powered platform for process prediction.',
			imageAlt: 'System dashboard',
		},
		{
			title: 'Agricultural Management System',
			description: 'AI-powered platform for process prediction, integrating climate and operational data. Technologies: AI, IoT, Web/Mobile',
			imageAlt: 'Agricultural management system dashboard',
		},
	],
};

export function getPortfolioCards(lang: Lang = 'pt'): PortfolioCardData[] {
	const translations = cardsTranslations[lang];
	return cardsBase.map((base, i) => ({
		...base,
		...translations[i],
	}));
}

/** Backward compat — export PT como default */
export const portfolioCards: PortfolioCardData[] = getPortfolioCards('pt');
