# Wireframe — desktop e mobile

Grid base: 12 colunas desktop (max-w ~1280px, gutter 24px) · 4 colunas mobile (padding 20px).

## 1. Hero
- **Desktop:** vídeo V1 fullscreen (100svh) atrás; overlay sutil para legibilidade; headline serif enorme alinhada à esquerda-baixo (2 linhas), overline pequena acima, CTA primário + secundário abaixo; indicador de scroll centralizado no rodapé da dobra.
- **Mobile:** poster estático (mesma cena), headline em 3 linhas, CTAs empilhados full-width.
- Texto essencial NUNCA só dentro do vídeo — sempre HTML real por cima.

## 2. Manifesto
- **Desktop:** bloco central max-w ~800px, muito respiro vertical (~40vh de padding total). Frase em serif ~clamp(1.8–3rem), reveal palavra a palavra no scroll.
- **Mobile:** mesmo bloco, fonte menor, reveal por linha (mais leve).

## 3. Tratamentos
- **Desktop:** lista vertical de 4 painéis full-width alternando imagem/texto (imagem 5 col, texto 6 col, 1 col respiro), imagem 4:5 com leve parallax; título serif + 2 linhas de descrição + link "saber mais" (âncora p/ FAQ ou WhatsApp).
- **Mobile:** cards empilhados, imagem no topo, texto abaixo. Sem parallax.

## 4. A Experiência (ato escuro)
- **Desktop:** seção com fundo `--dark-bg`; pin de ~300vh; vídeo V2 ocupa ~70% da largura centralizado (com moldura fina), scroll faz scrub; à esquerda, 4 etapas textuais que trocam sincronizadas com o progresso (Avaliação → Plano → Tratamento → Acompanhamento).
- **Mobile:** sem pin/scrub. Stepper vertical com 3 stills (frames extraídos do vídeo) e crossfade + as 4 etapas como accordion/lista.
- Entrada e saída da seção: transição de cor de fundo suave (claro → escuro → claro).

## 5. Resultados & Depoimentos
- **Desktop:** 3 depoimentos em cards limpos (sem foto de rosto — iniciais em círculo), nota de rodapé "depoimentos ilustrativos". Slot antes/depois: componente slider pronto porém populado com placeholder neutro + legenda "espaço para casos reais da clínica".
- **Mobile:** carrossel simples por swipe nativo (scroll-snap), sem JS pesado.

## 6. Corpo Clínico
- **Desktop:** retrato I8 (4:5) à direita 5 col; à esquerda nome fictício, CRM/CRO placeholder ("CRM 00.000"), 3 bullets de credencial genérica, frase de assinatura.
- **Mobile:** retrato no topo, texto abaixo.

## 7. O Espaço
- **Desktop:** galeria de 3 imagens (I5–I7) em alturas alternadas com parallax discreto; legenda pequena por imagem.
- **Mobile:** empilhadas, sem parallax, lazy loading.

## 8. Agendamento / FAQ / Rodapé
- **Desktop:** bloco CTA de fechamento (fundo `--bg-alt`): headline curta + botão WhatsApp grande; abaixo, FAQ em accordion (5 itens, `<details>` estilizado); rodapé com endereço placeholder, redes, aviso "site demonstrativo" discreto e crédito do desenvolvedor (link para Lucas — é peça de prospecção).
- **Mobile:** mesmo fluxo empilhado.

## Regras globais
- Nenhuma rolagem horizontal em nenhum breakpoint.
- Toque mínimo 44×44px em elementos interativos.
- Textos sobre imagem sempre com camada de contraste (overlay ou scrim localizado).
