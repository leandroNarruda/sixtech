# Sixtech Site - Codex Notes

## Snapshot

- Astro 6 project using ESM and `@astrojs/vercel`.
- UI/copy is bilingual via `src/i18n/ui.ts`; default locale is `pt`, English routes live under `/en`.
- Main layout is `src/layouts/Layout.astro`; it imports `src/styles/global.css` and injects `WhatsAppFloating` + `ContatoModal` globally.
- Pages compose native Astro components from `src/components`; no React usage found.

## Routes

- PT: `/`, `/quem-somos`, `/servicos`, `/portfolio`, `/contato`
- EN: `/en`, `/en/about`, `/en/services`, `/en/portfolio`, `/en/contact`
- Alternate URL helpers live in `src/i18n/routes.ts`.

## Styling

- Global tokens and shared classes live in `src/styles/global.css`.
- Page-level CSS files:
  - `src/styles/quem-somos.css`
  - `src/styles/servicos.css`
  - `src/styles/portfolio.css`
  - `src/styles/contato.css`
- Components mostly use scoped `<style>` blocks and BEM-ish class names.
- Shared layout alignment uses `.container`, `--container-max`, and `--page-gutter`.
- Important project rule: use pure CSS and tokens; avoid Tailwind utility classes.

## Data And Content

- Service cards/details: `src/data/servicesDetails.ts`
- Portfolio cards: `src/data/portfolio.ts`
- Client strip: `src/data/clientStrip.ts`
- Why-choose content: `src/data/whyChooseSixTech.ts`
- Contact info: `src/data/contact.ts`

## Forms And API

- Contact form component: `src/components/contato/ContatoForm.astro`
- Modal form is global via `src/components/ContatoModal.astro`.
- API route: `src/pages/api/contato.ts`
- SMTP env vars expected: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, optional `CONTACT_EMAIL`.

## Notes / Watchouts

- `AGENTS.md` says Tailwind was removed, but current files still include:
  - `@import "tailwindcss";` in `src/styles/global.css`
  - `@tailwindcss/vite` in `astro.config.mjs`
  - `tailwindcss` and `@tailwindcss/vite` in `package.json`
- `npm run build` passes as of 2026-05-29.
- Git currently shows `.codex/` and `AGENTS.md` as untracked; avoid assuming they are committed.
- Per project instruction, use `npm run build` for automated verification and do not open a browser automatically for visual checks.
