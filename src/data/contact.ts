/**
 * Dados de contato institucional (alinhados ao rodapé / Figma Contato).
 */
export const contactInfo = {
	addressLine: "Rua Visconde do Rio Branco, 1488 - Centro, Curitiba-PR",
	phones: [
		{ label: "(41) 3015-2535", href: "tel:+554130152535" },
		{ label: "(41) 9 9973.9575", href: "tel:+5541999739575" },
	],
	email: {
		label: "comercial@sixtech.com.br",
		href: "mailto:comercial@sixtech.com.br",
	},
	/** Link direto para conversa no WhatsApp (mesmo número do rodapé) */
	whatsapp: {
		href: "https://wa.me/5541999739575",
	},
	/** Google Maps — Incorporar mapa (output=embed) */
	googleMapsEmbedSrc:
		"https://www.google.com/maps?q=Rua+Visconde+do+Rio+Branco,+1488,+Centro,+Curitiba+-+PR,+80420-210,+Brasil&output=embed&hl=pt-BR",
} as const;
