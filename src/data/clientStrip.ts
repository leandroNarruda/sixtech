export type ClientEntry = {
	/** Caminho em `public/` (ex.: `/companies/logo.svg`). */
	src: string;
	alt: string;
	/**
	 * Escala CSS no wrapper do slot (ex.: `0.85` se o arquivo tiver muito padding).
	 * Opcional — use quando o slot uniforme ainda deixar um logo desproporcional.
	 */
	scale?: number;
	/** Classes CSS extras no wrapper do slot (largura/altura pontuais). */
	slotClass?: string;
};

/** Todas as imagens em `public/companies/` (ordem alfabética por arquivo). */
export const clients: ClientEntry[] = [
	{ src: "/companies/Intertechne.png", alt: "Intertechne", scale: 1.2 },
	{ src: "/companies/Logo-GERAR-SVG.svg", alt: "Gerar" },
	{ src: "/companies/alldecor.svg", alt: "AllDecor" },
	{ src: "/companies/camargo-schubert.png", alt: "Camargo Schubert", scale: 1.3 },
	{
		src: "/companies/diagnosticosdobrasil.png",
		alt: "Diagnósticos do Brasil",
		scale: 1.4,
	},
	{ src: "/companies/eurotruck.png", alt: "Eurotruck", scale: 1.4 },
	{ src: "/companies/ferrero.svg", alt: "Ferrero" },
	{ src: "/companies/franco_italiano.png", alt: "Franco Italiano", scale: 2 },
	{ src: "/companies/incontrol.png", alt: "Incontrol" },
	{ src: "/companies/logo-volvo-group.svg", alt: "Volvo Group", scale: 1.68 },
	{ src: "/companies/leao_logo.svg", alt: "Logo Leão", scale: 1.4 },
	{ src: "/companies/sbcredito.png", alt: "SB Crédito", scale: 1.2 },
	{ src: "/companies/smx.avif", alt: "SMX", scale: 1.2 },
];
