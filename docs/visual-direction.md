# Direção visual — "Luz de ateliê"

**Direção recomendada:** base clara e editorial (porcelana + champanhe) com **um ato central escuro e cinematográfico** (seção 4). O contraste entre os dois mundos cria ritmo, valoriza o vídeo e evita tanto o "spa genérico" quanto o "dark demais para clínica diurna".

> Alternativas descartadas (registrar por quê): toda clara = imersão fica dependente só de textura, menos wow; toda escura = descola da linguagem do nicho (clínicas vendem luz, dia, limpeza).

## Paleta (design tokens)
| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FAF7F2` | Fundo principal (porcelana) |
| `--bg-alt` | `#F0E9DF` | Blocos alternados (areia) |
| `--ink` | `#211C15` | Texto principal (grafite quente) |
| `--ink-soft` | `#6F6558` | Texto secundário |
| `--accent` | `#C6A15B` | Champanhe — detalhes, linhas, hover |
| `--accent-deep` | `#8A6A33` | Bronze — texto sobre claro quando accent não tem contraste |
| `--dark-bg` | `#12100D` | Fundo do ato imersivo |
| `--dark-ink` | `#F5EFE6` | Texto no ato imersivo |

Regra: accent NUNCA como cor de texto longo; só detalhes. Botão primário = `--ink` com texto claro (elegante, não dourado berrante); dourado aparece em hover/linhas/overlines.

## Tipografia (Google Fonts)
- **Display:** Fraunces — pesos 300–500, eixo óptico alto, itálico pontual em 1 palavra por headline. Personalidade sem cair no Playfair-de-template.
- **Texto/UI:** Instrument Sans — 400/500.
- Escala display: `clamp(2.5rem, 6vw, 5.5rem)`; corpo 1rem–1.125rem; overlines em caps 0.75rem com tracking largo.

## Regras de imagem (guiam os prompts do Higgsfield)
- **Luz:** golden hour suave ou luz de janela difusa; sombras quentes e longas; nunca flash duro nem azul-frio.
- **Pele:** textura real, poros visíveis, zero plástico — naturalidade é o argumento da marca.
- **Composição:** muito espaço negativo nos quadrantes onde haverá texto; fundos limpos nos tons da paleta.
- **Arquitetura:** minimalismo quente — gesso, madeira clara, latão escovado, linho, pedra bege.
- **Hero sem rosto identificável:** macro abstrato (luz sobre pele/seda/água) → mais premium, mais white-label, sem risco de rosto sintético estranho em tela cheia.
- **Proibido:** texto/logotipo dentro da imagem, cara de banco de imagem, saturação alta, verde-turquesa/azul-hospital, equipamentos com marcas reais.

## Personalidade de movimento
- Lento, contínuo, "respirando". Nada elástico/bouncy.
- Easings: `power2.out` / `expo.out`; durações 0.6–1.2s; stagger 0.06–0.1s.
- Câmera nos vídeos: movimentos únicos e previsíveis (dolly lento, varredura de luz), sem cortes.

## O que evitar (anti-template)
- Hero turquesa + mulher sorrindo de banco de imagem.
- Glassmorphism, gradientes chamativos, cards com sombra pesada.
- Ícones genéricos de "estrela/coração" — preferir numeração editorial (01–04) e linhas finas.
