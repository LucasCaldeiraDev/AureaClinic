# Plano de animação

## Divisão de responsabilidade (regra dura)
- **GSAP + ScrollTrigger:** tudo que é dirigido por scroll (reveals, pin, scrub, parallax, troca de tema claro/escuro).
- **Motion:** microinterações pontuais (hover de cards, botões, header aparecer/sumir).
- **Nunca** as duas bibliotecas na mesma propriedade do mesmo elemento.
- **Lenis:** avaliar apenas na fase de build; incluir só se o scrub do V2 ficar visivelmente melhor com ele.

## Por seção
| Seção | Elemento | Gatilho | Efeito | Fallback (PRM*/mobile) |
|---|---|---|---|---|
| 1 Hero | Vídeo V1 | load | autoplay muted loop, poster antes | poster estático |
| 1 Hero | Headline/CTA | load | fade + rise com stagger 0.08s | aparecem sem animação |
| 1→2 | Hero inteiro | scroll | leve scale-down + fade do vídeo ao sair | nada |
| 2 Manifesto | Frase | scroll (scrub suave) | reveal palavra a palavra (opacity 0.15→1) | fade simples do bloco |
| 3 Tratamentos | Painéis | entrar na viewport | fade + rise; imagem com parallax ±6% | fade simples, sem parallax |
| 4 Experiência | Seção | scroll | **pin ~300vh** + scrub do vídeo V2 + etapas sincronizadas | mobile/PRM: stepper com 3 stills + crossfade, sem pin |
| 4 bordas | Fundo da página | scroll | interpolação de cor claro→escuro→claro | troca instantânea por classe |
| 5 Depoimentos | Cards | entrar na viewport | stagger fade | sem animação |
| 7 Espaço | Imagens | scroll | parallax alternado ±8% | estático |
| Header | Barra | direção do scroll | esconde/mostra (Motion, translateY) | sempre visível |
| CTA flutuante | Botão WhatsApp | após seção 3 | fade in | idem |

*PRM = `prefers-reduced-motion: reduce` → desliga scrub, parallax e stagger; tudo vira fade curto ou estático. Vídeos ficam no poster (sem autoplay).

## Regras do scrub (V2) — ver skill `references/scroll-video.md`
- Vídeo com keyframes densos (re-encode com `-g 8` ou similar) para seek suave nos dois sentidos.
- Pin limitado a ~300vh; página é liberada logo após a transformação terminar.
- Scrub com `scrub: 0.5–1` (suavização), nunca seek bruto por evento de scroll.
- Carregamento lazy: o V2 só baixa quando a seção 3 entra na viewport.
- Nada essencial só no vídeo: as 4 etapas existem como texto HTML real.

## Orçamento de movimento
- Máximo 1 seção pinada na página inteira.
- Sem animação infinita fora do hero (loop do V1 é a única).
- 60fps alvo: animar apenas `transform` e `opacity` (exceto o scrub de `currentTime`).
