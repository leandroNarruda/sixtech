import type { Lang } from '../i18n/ui';

export type PortfolioCardGradient = {
	from: string;
	to: string;
};

export type PortfolioCardData = {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	gradient: PortfolioCardGradient;
	variant?: 'default' | 'green';
};

type CardBase = Pick<PortfolioCardData, 'id' | 'imageSrc' | 'gradient'> & { variant?: 'default' | 'green' };

const cardsBase: CardBase[] = [
	{ id: 'gestao-obras',      imageSrc: '/images/portfolio/incontrol.jpeg',      gradient: { from: '#17d86a', to: '#0c7238' }, variant: 'green' },
	{ id: 'eosolar',           imageSrc: '/images/portfolio/mapa.jpeg',          gradient: { from: '#facd45', to: '#947929' } },
	{ id: 'emergencia',        imageSrc: '/images/portfolio/emergencia.jpeg',    gradient: { from: '#7e1010', to: '#c0392b' } },
	{ id: 'braco-robotico',    imageSrc: '/images/portfolio/braco-robotico.png', gradient: { from: '#11384f', to: '#2780b5' } },
];

type CardTranslation = Pick<PortfolioCardData, 'title' | 'description' | 'imageAlt'>;

const cardsTranslations: Record<Lang, CardTranslation[]> = {
	pt: [
		{
			title: 'Sistema de Gerenciamento de Obras',
			description: 'Plataforma para gerenciar de forma visual (3D) o cronograma físico financeiro de obras.',
			imageAlt: 'Plataforma de gerenciamento visual 3D de obras',
		},
		{
			title: 'Plataforma Eosolar',
			description: 'Atlas Digital Interativo que reúne de forma inédita os estudos e informações sobre o potencial de geração de energia renovável (eólica e solar) do Maranhão.',
			imageAlt: 'Atlas digital interativo de energia renovável do Maranhão',
		},
		{
			title: 'Sistema para Emergências Médicas',
			description: 'Plataforma para atendimento de emergências médicas onde o usuário liga para a central, esta diagnostica o tipo de ocorrência e envia o atendimento adequado.',
			imageAlt: 'Plataforma de atendimento de emergências médicas',
		},
		{
			title: 'Braço Robótico',
			description: 'Interface para controle de braço robótico utilizado para poda de árvores.',
			imageAlt: 'Interface de controle do braço robótico para poda de árvores',
		},
	],
	en: [
		{
			title: 'Construction Management System',
			description: 'Platform for visually managing (3D) the physical and financial schedule of construction projects.',
			imageAlt: 'Visual 3D construction project management platform',
		},
		{
			title: 'Eosolar Platform',
			description: 'Interactive Digital Atlas that uniquely compiles studies and information on the renewable energy generation potential (wind and solar) of Maranhão.',
			imageAlt: 'Interactive digital atlas of renewable energy in Maranhão',
		},
		{
			title: 'Medical Emergency System',
			description: 'Platform for handling medical emergencies where the user calls the center, which diagnoses the type of occurrence and dispatches the appropriate response.',
			imageAlt: 'Medical emergency response platform',
		},
		{
			title: 'Robotic Arm',
			description: 'Interface for controlling a robotic arm used for tree pruning.',
			imageAlt: 'Robotic arm control interface for tree pruning',
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
