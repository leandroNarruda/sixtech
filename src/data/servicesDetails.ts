/**
 * Detalhes dos serviços — alinhado ao Figma (node 152:646).
 * Imagens em /public/images/services/
 */

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

export const servicesDetails: ServiceDetailItem[] = [
	{
		title: "Desenvolvimento de\nsistemas sob medida",
		description:
			"Criamos sistemas que corrigem fluxos de trabalho, melhorando produtividade.",
		badgeText: "Integrações entre sistemas e IA.",
		buttonText: "Solicite proposta",
		buttonHref: "#contato",
		imageSrc: "/images/services/sistemas-sob-medida.jpg",
		imageAlt: "Equipe desenvolvendo sistemas sob medida em ambiente corporativo",
		reverse: false,
		bgColor: "transparent",
	},
	{
		title: "Desenvolvimento de\naplicativos mobile",
		description: "Apps para Android/iOS, adaptados ao seu negócio.",
		badgeText: "Acesso móvel, usabilidade intuitiva.",
		buttonText: "Solicite proposta",
		buttonHref: "#contato",
		imageSrc: "/images/services/apps-mobile.jpg",
		imageAlt: "Desenvolvimento de aplicativos mobile para Android e iOS",
		reverse: true,
		bgColor: "surface",
	},
	{
		title: "Integrações e IA",
		description:
			"Conectamos sistemas existentes e implementamos IA para insights inteligentes.",
		badgeText: "Otimização de dados, predições avançadas",
		buttonText: "Solicite proposta",
		buttonHref: "#contato",
		imageSrc: "/images/services/integracoes-ia.jpg",
		imageAlt: "Integração de sistemas e inteligência artificial",
		reverse: false,
		bgColor: "transparent",
	},
	{
		title: "Consultoria em TI",
		description: "Ajudamos sua empresa a escolher tecnologias, arquiteturas e estratégias com segurança.",
		badgeText: "Decisões assertivas, redução de riscos.",
		buttonText: "Solicite proposta",
		buttonHref: "#contato",
		imageSrc: "/images/services/consultoria-ti.jpg",
		imageAlt: "Consultoria em tecnologia da informação",
		reverse: true,
		bgColor: "card",
	},
];
