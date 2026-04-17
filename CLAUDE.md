# Site Sixtech — Contexto para Claude Code

## Stack

- **Framework**: Astro 6
- **Estilos**: CSS puro (sem Tailwind — ver regra abaixo)
- **Build**: `@tailwindcss/vite` removido do fluxo; apenas variáveis CSS
- **Módulos**: ESM, Node.js ≥ 22.12
- **Idioma**: UI e copy em **pt-BR** (`lang="pt-BR"` no layout)

## Estrutura

| Caminho | Uso |
|---------|-----|
| `src/pages/` | Rotas e páginas Astro |
| `src/layouts/` | Shell HTML (`Layout.astro` importa estilos globais) |
| `src/components/` | Blocos reutilizáveis (`.astro`) |
| `src/styles/` | CSS global e tokens (`global.css`) |
| `public/` | Assets estáticos servidos na raiz (`/logo.svg`, etc.) |

## Comandos

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — pré-visualizar o build

## Regras de estilo (IMPORTANTE)

- **CSS Puro**: Não usar classes Tailwind. Toda estilização em `<style>` escopado no `.astro` ou arquivos CSS dedicados.
- Se encontrar classes Tailwind em componentes existentes, convertê-las para CSS puro.
- **Tokens CSS**: usar variáveis `:root` de `src/styles/global.css` em vez de valores hardcoded:
  - Fundo: `--bg-dark`, `--bg-surface`
  - Texto: `--text-main`, `--text-muted`
  - Destaques: `--accent-cyan`, `--accent-blue`
  - Layout: `--container-max`, `--gutter`, `--header-h`
  - Tipografia: `--fs-*` e variáveis por seção (ex.: `--features-*`, `--testimonials-*`)
- **Largura de conteúdo**: usar a classe `.container` (ou `--container-max` + `--gutter`) para alinhar com o restante do site.
- Novos tokens: adicionar em `:root` no `global.css` e reutilizar nos componentes.

## Padrões Astro

- **Estilos globais**: importar `../styles/global.css` **apenas** em `Layout.astro`, não em cada componente.
- **Páginas novas**: envolver com `Layout` (título, meta); usar `<main>` para o corpo; importar seções de `src/components/`.
- **Componentes**: preferir `.astro` nativo. O projeto não usa React — não adicionar React sem decisão explícita.
- **Props**: tipar com `interface Props` no frontmatter quando fizer sentido.

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---
<Layout title="…">
  <Header />
  <main><!-- seções --></main>
</Layout>
```

## Implementação de Figma

Quando houver URL do Figma (`figma.com/design/...`), usar o MCP Figma: extrair `fileKey` e `node-id` (trocar `-` por `:` no node id) para alinhar implementação ao design.

Ao implementar um componente do Figma:
1. **CSS puro apenas** — sem Tailwind
2. **Reutilizar classes globais** existentes (`.btn-blue`, `.container`, etc.)
3. **Usar tokens do projeto** — buscar em `global.css` antes de hardcodar qualquer valor
4. **Botões**: `.btn.btn-blue`, `.btn.btn-primary`, `.btn.btn-ghost`

## Testes visuais

Não abrir o navegador automaticamente para validar layout/UI — quem testa no browser é o humano no ambiente local. Usar `npm run build` para verificação automática de código.
