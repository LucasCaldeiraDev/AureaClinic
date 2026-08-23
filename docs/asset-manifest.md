# Asset manifest — Higgsfield

Total planejado: **2 vídeos + 9 imagens** (~11 gerações finais). Prompts finais serão escritos na fase de geração, a partir deste manifesto e da `visual-direction.md`.

## Log de execução (2026-08-23)

Imagens geradas com **Soul 2.0** (2k), vídeos com **MiniMax H3** (2K, keyframes), quadro final do V2 editado com **Nano Banana Pro**. Aprovação: Lucas aprovou os quadros V1/V2 e o retrato sem jaleco.

Lições que valem para os próximos projetos:
- Soul 2.0 **insiste em inventar texto/rotulagem** (letreiros, bordados, rótulos, telas). Mitigação que funcionou: remover da cena as superfícies que atraem texto (sem jaleco → blusa de seda; sem frascos → creme + gua sha; sem tela → luz na pele) + "Absolutely no text anywhere" no prompt.
- Nunca mencionar "headline/overlay" no prompt — o modelo escreve uma headline na imagem.
- Para mudar o **estado** de uma cena (portas fechadas → abertas) usar modelo de edição (Nano Banana Pro) com a cena como referência; reference no Soul 2.0 apenas reproduz a cena.
- Custos reais: imagem Soul 2.0 ≈ 0,12 crédito; vídeo MiniMax H3 8s ≈ 32 créditos (mais barato que Seedance 1080p, 72).

Desvios aprovados vs. plano original: I2 virou "luz do tratamento na pele" (conceito mais forte e alinhado à marca que a máquina); I4 virou still de creme + gua sha + linho (sem frascos); I8 sem jaleco. Aspect 4:5 → 3:4 (Soul 2.0 não tem 4:5; object-cover absorve).

**Fluxo de economia de créditos (obrigatório):**
1. Gerar e aprovar imagens estáticas primeiro (são mais baratas).
2. Para vídeos: aprovar o **quadro inicial** → gerar o **quadro final** usando o inicial como referência → só então gerar o vídeo.
3. Nenhuma variação sem objetivo definido. Nada de "gerar para ver como fica".

Convenção de arquivos: `public/media/<nome>` · posters em AVIF + fallback WebP · vídeos MP4 (H.264) 1080p.

---

## V1 — Hero loop
- **Objetivo:** primeira impressão sensorial; luz dourada em movimento sobre textura orgânica.
- **Seção:** 1 (Hero) · **Tipo:** vídeo loop autoplay mudo, 6–8s
- **Proporção/res.:** 16:9 · 1920×1080
- **Enquadramento/lente:** macro extremo · 100mm macro, foco raso
- **Iluminação:** golden hour difusa, flare sutil
- **Movimento:** câmera quase estática; feixe de luz varre lentamente da esquerda para a direita
- **Quadro inicial ≈ quadro final** (loop precisa fechar sem salto perceptível)
- **Imutáveis:** paleta porcelana/champanhe; sem rosto identificável
- **Transformáveis:** posição da luz, micro-ondulações da textura
- **Restrições:** sem texto, sem cortes, sem pessoas; espaço negativo no terço esquerdo-inferior (headline por cima)
- **Arquivos:** `hero-loop.mp4` + `hero-poster.avif`
- **Fallback mobile:** apenas o poster (vídeo não carrega < 768px)

## V2 — Scrub "A Experiência"
- **Objetivo:** conduzir o visitante pela jornada da clínica conforme o scroll avança.
- **Seção:** 4 · **Tipo:** vídeo para scrub por scroll (sem áudio), 6–8s, movimento único contínuo
- **Proporção/res.:** 16:9 · 1920×1080
- **Enquadramento/lente:** travelling frontal lento · 35mm
- **Iluminação:** ambiente escuro com luz dourada direcional (ato escuro da página)
- **Movimento:** portas de latão escovado se abrem → avanço pelo corredor → sala de tratamento banhada por luz de janela
- **Quadro inicial:** portas fechadas, luz vazando pelas frestas ← **aprovar primeiro**
- **Quadro final:** sala revelada, maca com linho, luz difusa ← gerar com o inicial como referência
- **Imutáveis entre quadros:** arquitetura, posição de câmera, paleta, quantidade de objetos
- **Restrições:** sem pessoas em close, sem cortes, velocidade constante (scrub fica linear)
- **Arquivos:** `experience-scrub.mp4` + `experience-frame-{01..03}.avif` (stills para mobile)
- **Fallback mobile:** os 3 stills com crossfade em stepper

## I1 — Harmonização facial
- Perfil feminino ~30 anos, luz de janela lateral, pele com textura real, fundo porcelana · 4:5 · 1080×1350 · `treat-harmonizacao.avif` · espaço negativo à direita

## I2 — Rejuvenescimento & lasers
- Detalhe de equipamento estético **genérico e elegante** (sem marca, sem tela legível), luz âmbar, profundidade rasa · 4:5 · 1080×1350 · `treat-laser.avif`

## I3 — Estética corporal
- Silhueta elegante parcialmente coberta por linho, tom editorial (nada explícito), sombras quentes · 4:5 · 1080×1350 · `treat-corporal.avif`

## I4 — Skincare clínico
- Still life: frascos de vidro âmbar **sem rótulo**, textura de creme, mármore bege, luz suave · 4:5 · 1080×1350 · `treat-skincare.avif`

## I5 — Recepção
- Balcão de madeira clara + latão, pé-direito alto, luz natural, sem pessoas · 3:2 · 1620×1080 · `space-recepcao.avif`

## I6 — Sala de tratamento
- Maca impecável com linho, cortina difusa, equipamento discreto ao fundo · 4:5 · 1080×1350 · `space-sala.avif`

## I7 — Detalhe arquitetônico
- Curva de gesso/escada com sombra dourada longa (imagem "de respiro" para parallax) · 4:5 · 1080×1350 · `space-detalhe.avif`

## I8 — Retrato responsável técnica (fictícia)
- Mulher ~40 anos, jaleco fino elegante, expressão serena e confiante, fundo neutro quente, luz de janela · 4:5 · 1080×1350 · `team-responsavel.avif`
- **Atenção:** pessoa fictícia — não usar rosto de pessoa real como referência.

## I9 — Open Graph
- Crop 1200×630 do hero poster com área livre para título · `og-image.jpg` (JPG por compatibilidade)

---

## Checklist de validação antes de gastar créditos
- [ ] Direção visual confirmada pelo Lucas (clara + ato escuro?)
- [ ] Nome da marca confirmado (afeta mood, não afeta prompts — sem texto nas imagens)
- [ ] Layout montado com placeholders → proporções e áreas de texto validadas no site real
- [ ] Prompts revisados contra `visual-direction.md` (luz, materiais, restrições)
- [ ] Para V1/V2: quadro inicial aprovado antes de qualquer vídeo
