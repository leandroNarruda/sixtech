import type { Lang } from '../i18n/ui';

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

const featuresTranslations: Record<Lang, FeatureCard[]> = {
	pt: [
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
	],
	en: [
		{
			title: "Close and personalized service",
			desc: "You speak directly with someone who understands the subject. Our leadership accompanies each project from start to finish, ensuring agility, clarity, and true partnership.",
			iconSrc: "/icons/aperto_de_mao.svg",
		},
		{
			title: "30 years of experience",
			desc: "Since 1996, we deliver technology solutions for companies of all sizes — from startups to multinationals. Our track record is solid, with complex projects and consistent results.",
			iconSrc: "/icons/medalha.svg",
		},
		{
			title: "Results that make a difference",
			intro: "Our solutions generate measurable impact:",
			bullets: [
				"increased efficiency",
				"cost reduction",
				"smarter processes",
				"data-driven decisions",
			],
			closing: "We transform challenges into growth opportunities.",
			iconSrc: "/icons/cifrao_com_check.svg",
		},
	],
};

export function getWhyChooseFeatures(lang: Lang = 'pt'): FeatureCard[] {
	return featuresTranslations[lang];
}

/** Backward compat — export PT como default */
export const whyChooseSixTechFeatures: FeatureCard[] = getWhyChooseFeatures('pt');
