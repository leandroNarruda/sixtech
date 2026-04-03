export type ClientEntry = {
	/** Caminho em `public/` (ex.: `/companies/logo.svg`). */
	src: string;
	alt: string;
	/**
	 * Sem `brightness-0 invert` — logos coloridos ou com contraste próprio na faixa azul.
	 */
	color?: boolean;
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
	{ src: "/companies/Intertechne.png", alt: "Intertechne", color: true },
	{ src: "/companies/Logo-GERAR-SVG.svg", alt: "Gerar", color: true },
	{ src: "/companies/alldecor.svg", alt: "AllDecor" },
	{ src: "/companies/camargo-schubert.png", alt: "Camargo Schubert", color: true },
	{
		src: "/companies/diagnosticosdobrasil.png",
		alt: "Diagnósticos do Brasil",
		color: true,
		scale: 1.4,
	},
	{ src: "/companies/eurotruck.gif", alt: "Eurotruck", color: true },
	{ src: "/companies/ferrero.svg", alt: "Ferrero", color: true },
	{ src: "/companies/franco_italiano.png", alt: "Franco Italiano", color: true },
	{ src: "/companies/incontrol.png", alt: "Incontrol", color: true },
	{ src: "/companies/logo-volvo-group.svg", alt: "Volvo Group", scale: 1.68 },
	{ src: "/companies/logo.webp", alt: "Logo", color: true, scale: 1.4 },
	{ src: "/companies/sbcredito.png", alt: "SB Crédito", color: true },
	{ src: "/companies/smx.avif", alt: "SMX", color: true },
];
