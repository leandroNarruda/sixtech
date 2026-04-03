export type FeatureCard =
	| {
			title: string;
			iconSrc: string;
			desc: string;
	  }
	| {
			title: string;
			iconSrc: string;
			intro: string;
			bullets: string[];
			closing: string;
	  };

/** Copy único para home e Quem somos (Figma Home 48:111) */
export const whyChooseSixTechFeatures: FeatureCard[] = [
	{
		title: "Atendimento próximo e personalizado",
		desc: "Você fala diretamente com quem entende do assunto. Nossa liderança acompanha cada projeto de ponta a ponta, garantindo agilidade, clareza e parceria de verdade.",
		iconSrc: "/icons/aperto_de_mao.svg",
	},
	{
		title: "30 anos de experiência",
		desc: "Desde 1996, entregamos soluções tecnológicas para empresas de todos os portes — de startups a multinacionais. Nosso histórico é sólido, com projetos complexos e resultados consistentes.",
		iconSrc: "/icons/medalha.svg",
	},
	{
		title: "Resultados que fazem diferença",
		intro: "Nossas soluções geram impacto mensurável:",
		bullets: [
			"mais eficiência",
			"redução de custos",
			"processos mais inteligentes",
			"decisões baseadas em dados",
		],
		closing: "Transformamos desafios em oportunidades de crescimento.",
		iconSrc: "/icons/cifrao_com_check.svg",
	},
];
