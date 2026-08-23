# Áurea — LP imersiva para clínicas de estética

Landing page demonstrativa (marca fictícia, white-label) para prospecção de clínicas de estética.
Direção visual "luz de ateliê": base clara editorial com um ato central escuro controlado pelo scroll.

## Stack
Vite · React · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger

## Comandos
- `npm run dev` — desenvolvimento (porta 5173)
- `npm run build` — typecheck + build de produção
- `npm run preview` — serve o build

## Planejamento
Todo o planejamento vive em [`docs/`](docs/): brief, research, sitemap, wireframe,
direção visual, manifesto de assets (Higgsfield), plano de animação e orçamento de performance.

## White-label
Nome, cidade, WhatsApp, endereço e labels de asset ficam em [`src/brand.ts`](src/brand.ts).
Cores e fontes ficam nos tokens de [`src/index.css`](src/index.css). Re-skin por cliente = editar esses dois arquivos.

## Assets
Imagens e vídeos serão gerados no Higgsfield conforme [`docs/asset-manifest.md`](docs/asset-manifest.md).
Enquanto isso, a página usa placeholders de "estudo de luz" em CSS, com o slot de cada asset identificado.
