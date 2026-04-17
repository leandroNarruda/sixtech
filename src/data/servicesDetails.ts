/**
 * Detalhes dos serviços — alinhado ao Figma (node 152:646).
 * Imagens em /public/images/services/
 */
import type { Lang } from '../i18n/ui';

export type ServiceDetailBg = "transparent" | "surface" | "card";

export interface ServiceDetailItem {
	title: string;
	/** Use \n para quebras de linha no título (ex.: "Desenvolvimento de\nsistemas sob medida") */
	description: string;
	badgeText: string;
	buttonText: string;
	buttonHref?: string;
	imageSrc: string;
	imageAlt: string;
	/** true = imagem à direita, texto à esquerda */
	reverse: boolean;
	bgColor: ServiceDetailBg;
}

type ServiceBase = Pick<ServiceDetailItem, 'imageSrc' | 'reverse' | 'bgColor'> & { buttonHref: string };

const servicesBase: ServiceBase[] = [
	{ imageSrc: "/images/services/sistemas-sob-medida.jpg", reverse: false, bgColor: "transparent", buttonHref: "#contato" },
	{ imageSrc: "/images/services/apps-mobile.jpg", reverse: true, bgColor: "surface", buttonHref: "#contato" },
	{ imageSrc: "/images/services/integracoes-ia.jpg", reverse: false, bgColor: "transparent", buttonHref: "#contato" },
	{ imageSrc: "/images/services/consultoria-ti.jpg", reverse: true, bgColor: "card", buttonHref: "#contato" },
];

type ServiceTranslation = Pick<ServiceDetailItem, 'title' | 'description' | 'badgeText' | 'buttonText' | 'imageAlt'>;

const servicesTranslations: Record<Lang, ServiceTranslation[]> = {
	pt: [
		{
			title: "Desenvolvimento de\nsistemas sob medida",
			description: "Criamos sistemas que corrigem fluxos de trabalho, melhorando produtividade.",
			badgeText: "Integrações entre sistemas e IA.",
			buttonText: "Solicite proposta",
			imageAlt: "Equipe desenvolvendo sistemas sob medida em ambiente corporativo",
		},
		{
			title: "Desenvolvimento de\naplicativos mobile",
			description: "Apps para Android/iOS, adaptados ao seu negócio.",
			badgeText: "Acesso móvel, usabilidade intuitiva.",
			buttonText: "Solicite proposta",
			imageAlt: "Desenvolvimento de aplicativos mobile para Android e iOS",
		},
		{
			title: "Integrações e IA",
			description: "Conectamos sistemas existentes e implementamos IA para insights inteligentes.",
			badgeText: "Otimização de dados, predições avançadas",
			buttonText: "Solicite proposta",
			imageAlt: "Integração de sistemas e inteligência artificial",
		},
		{
			title: "Consultoria em TI",
			description: "Ajudamos sua empresa a escolher tecnologias, arquiteturas e estratégias com segurança.",
			badgeText: "Decisões assertivas, redução de riscos.",
			buttonText: "Solicite proposta",
			imageAlt: "Consultoria em tecnologia da informação",
		},
	],
	en: [
		{
			title: "Custom\nsystems development",
			description: "We build systems that fix workflow bottlenecks, improving productivity.",
			badgeText: "System and AI integrations.",
			buttonText: "Request proposal",
			imageAlt: "Team developing custom systems in a corporate environment",
		},
		{
			title: "Mobile app\ndevelopment",
			description: "Apps for Android/iOS, tailored to your business.",
			badgeText: "Mobile access, intuitive usability.",
			buttonText: "Request proposal",
			imageAlt: "Mobile app development for Android and iOS",
		},
		{
			title: "Integrations & AI",
			description: "We connect existing systems and implement AI for intelligent insights.",
			badgeText: "Data optimization, advanced predictions",
			buttonText: "Request proposal",
			imageAlt: "System integration and artificial intelligence",
		},
		{
			title: "IT Consulting",
			description: "We help your company choose technologies, architectures, and strategies with confidence.",
			badgeText: "Assertive decisions, risk reduction.",
			buttonText: "Request proposal",
			imageAlt: "Information technology consulting",
		},
	],
};

export function getServicesDetails(lang: Lang = 'pt'): ServiceDetailItem[] {
	const translations = servicesTranslations[lang];
	return servicesBase.map((base, i) => ({
		...base,
		...translations[i],
	}));
}

/** Backward compat — export PT como default */
export const servicesDetails: ServiceDetailItem[] = getServicesDetails('pt');
