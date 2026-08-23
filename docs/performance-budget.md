# Orçamento de performance

## Metas (Lighthouse mobile, rede 4G)
| Métrica | Alvo |
|---|---|
| LCP | ≤ 2.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| Performance score | ≥ 90 mobile |
| A11y / SEO / Best practices | 100 |

## Orçamentos de peso
| Recurso | Orçamento |
|---|---|
| JS total (gzip) | ≤ 200KB (GSAP ~70KB min; code-split da seção 4) |
| CSS (gzip) | ≤ 30KB |
| Fontes | 2 famílias, subset latin, `font-display: swap`, ≤ 160KB total |
| Hero poster (LCP) | AVIF ≤ 120KB, `fetchpriority="high"` |
| Vídeo V1 (hero) | ≤ 2.5MB, `preload="metadata"`, só ≥ 768px |
| Vídeo V2 (scrub) | ≤ 4MB, lazy (carrega quando seção 3 aparece) |
| Imagens I1–I8 | AVIF + WebP fallback, ≤ 150KB cada, `loading="lazy"` abaixo da dobra |
| Página inicial (acima da dobra) | ≤ 1.2MB mobile / ≤ 3MB desktop |

## Estratégia de carregamento
1. HTML + CSS crítico + poster do hero (LCP) — imediato.
2. Fontes com swap; headline usa fallback métrico enquanto carrega.
3. V1 começa a baixar após `load` e só em telas ≥ 768px.
4. GSAP/seção 4 em chunk separado, importado sob demanda.
5. Todo o resto lazy por IntersectionObserver/`loading="lazy"`.

## SEO / metadados
- Title: "Áurea — Estética Avançada | [Cidade placeholder]" (padrão substituível por cliente).
- Meta description focada em avaliação/naturalidade; OG image I9.
- Schema.org: `MedicalClinic`/`LocalBusiness` com dados placeholder claramente marcados.
- `lang="pt-BR"`, headings hierárquicos (1 `h1` no hero), alt text em todas as imagens.
- Aviso: página demonstrativa → `noindex` até virar site de cliente real (decisão do Lucas).

## Acessibilidade mínima
- Contraste AA em todo texto (atenção: champanhe `#C6A15B` NUNCA como texto pequeno sobre claro — usar `--accent-deep`).
- Foco visível custom, navegação completa por teclado, `prefers-reduced-motion` respeitado.
- Vídeos decorativos: `aria-hidden="true"` + conteúdo equivalente em texto.
