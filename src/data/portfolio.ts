/**
 * Cards da seção de portfólio (abaixo do hero).
 * Gradientes alinhados ao frame Figma (node 152:742+).
 * Imagens: usar assets em /public/images/portfolio/ quando disponíveis;
 * hoje reutilizamos imagens de serviços como placeholder visual.
 */
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

export const portfolioCards: PortfolioCardData[] = [
	{
		id: 'agronegocio-1',
		title: 'Sistema de Gestão para Agronegócio',
		description:
			'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais. Tecnologias: IA, IoT, Web/Mobile',
		imageSrc: '/images/services/sistemas-sob-medida.jpg',
		imageAlt: 'Interface do sistema de gestão para agronegócio',
		gradient: { from: '#11384f', to: '#2780b5' },
	},
	{
		id: 'app-varejo',
		title: 'App Mobile para Varejo',
		description:
			'App híbrido para gestão de estoque e vendas. Tecnologias: Android/iOS, integrações API.',
		imageSrc: '/images/services/apps-mobile.jpg',
		imageAlt: 'Aplicativo mobile para varejo',
		gradient: { from: '#e45226', to: '#7e2d15' },
	},
	{
		id: 'integracao-multinacional',
		title: 'Integração de Sistemas para Multinacional',
		description: 'Conexão de ERPs com IA para automação',
		imageSrc: '/images/services/integracoes-ia.jpg',
		imageAlt: 'Integração de sistemas corporativos',
		gradient: { from: '#facd45', to: '#947929' },
	},
	{
		id: 'agronegocio-2',
		title: 'Sistema de Gestão para Agronegócio 2',
		description:
			'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais.',
		imageSrc: '/images/services/consultoria-ti.jpg',
		imageAlt: 'Painel do sistema de gestão para agronegócio',
		gradient: { from: '#11384f', to: '#2780b5' },
	},
	{
		id: 'app-varejo-2',
		title: 'App Mobile para Varejo 2',
		description:
			'App híbrido para gestão de estoque e vendas. Tecnologias: Android/iOS, integrações API.',
		imageSrc: '/images/services/apps-mobile.jpg',
		imageAlt: 'Aplicativo mobile para varejo',
		gradient: { from: '#e45226', to: '#7e2d15' },
	},
	{
		id: 'integracao-multinacional-2',
		title: 'Integração de Sistemas 2',
		description: 'Conexão de ERPs com IA para automação e melhoria de performance.',
		imageSrc: '/images/services/integracoes-ia.jpg',
		imageAlt: 'Integração de sistemas corporativos',
		gradient: { from: '#facd45', to: '#947929' },
	},
	{
		id: 'agronegocio-3',
		title: 'Sistema de Gestão 3',
		description:
			'Plataforma com IA para predição de processos.',
		imageSrc: '/images/services/sistemas-sob-medida.jpg',
		imageAlt: 'Painel do sistema',
		gradient: { from: '#11384f', to: '#2780b5' },
	},
	{
		id: 'agronegocio-green',
		title: 'Sistema de Gestão para Agronegócio',
		description:
			'Plataforma com IA para predição de processos, integrando dados climáticos e operacionais. Tecnologias: IA, IoT, Web/Mobile',
		imageSrc: '/images/services/consultoria-ti.jpg',
		imageAlt: 'Painel do sistema de gestão para agronegócio',
		gradient: { from: '#17d86a', to: '#0c7238' },
		variant: 'green',
	},
];
