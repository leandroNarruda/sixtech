---
name: figma-implementation
description: Implement Figma designs using existing pure CSS classes and project tokens. Use when the user asks to implement a design from Figma, provides a Figma URL, or mentions Figma integration.
---

# Figma Implementation

## Quick Start

When implementing a component or layout from Figma:

1. **Use Pure CSS Only**: All styling must be done using pure CSS (e.g., scoped `<style>` in Astro or dedicated CSS files). Do NOT use Tailwind CSS classes.
2. **Reuse Existing Classes**: Whenever a matching component exists, use its global class. For example, if the design has a blue button, use the `.btn-blue` class.
3. **Use Project Tokens**: Search for existing CSS variables in `src/styles/global.css` before hardcoding values. Prefer variables like `var(--bg-dark)`, `var(--text-main)`, `var(--accent-blue)`.

## CSS Guidelines

- **No Tailwind**: Convert any Tailwind classes provided by Figma or context to pure CSS.
- **Layout & Spacing**: 
  - Use the `.container` class to limit content width and center it.
  - Use `var(--container-max)` and `var(--page-gutter)` for layout spacing.
  - Use `var(--section-padding-y-mobile)` for vertical spacing between sections.
- **Typography**: Use font size tokens like `var(--fs-xs)` to `var(--fs-2xl)`.
- **Buttons**: 
  - Blue button: `<a href="#" class="btn btn-blue">` or `<button class="btn btn-blue">`
  - Primary button: `.btn-primary`
  - Ghost button: `.btn-ghost`

## Example: Implementing a Section from Figma

**Input**: User provides a Figma node with a dark background, white text, and a primary blue button.

**Output**:
```astro
---
// MyComponent.astro
---
<section class="my-section container">
  <h2 class="title">Título da Seção</h2>
  <p class="description">Texto descritivo do figma.</p>
  <a href="#" class="btn btn-blue">Saiba mais</a>
</section>

<style>
  .my-section {
    background-color: var(--bg-dark);
    padding-block: var(--section-padding-y-mobile);
  }
  
  .title {
    color: var(--text-main);
    font-size: var(--fs-xl);
  }
  
  .description {
    color: var(--text-muted);
  }
</style>
```

## Validation Checklist

- [ ] All Tailwind classes have been removed or replaced with pure CSS.
- [ ] Existing project tokens (`var(--...)`) are used for colors, fonts, and spacing.
- [ ] Global utility classes (`.btn-blue`, `.container`) are used where applicable instead of rewriting styles.