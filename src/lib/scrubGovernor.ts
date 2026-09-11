import { gsap } from "./gsapSetup";

// Segundos de vídeo por segundo real — teto de velocidade do scrub (docs/animation-plan.md).
// Sem isso, um scroll brusco pede ao vídeo um salto maior do que o navegador
// conseguiu decodificar, e a tela trava ou pisca.
export const MAX_SEEK_RATE = 5;

/**
 * Conecta video.currentTime a um alvo (scrubState.t, dirigido por um tween do
 * GSAP/ScrollTrigger) sem nunca deixar o seek avançar mais rápido que
 * MAX_SEEK_RATE. Roda em todo frame do ticker do GSAP — não dentro do onUpdate
 * de um tween específico — porque um tween "parado" (scroll parado) deixaria de
 * chamar onUpdate e o vídeo ficaria preso no meio do caminho, sem nunca
 * alcançar o alvo real. Retorna a função de limpeza (remover do ticker).
 */
export function attachScrubGovernor(
  video: HTMLVideoElement,
  scrubState: { t: number },
  fallbackDuration: number,
): () => void {
  let lastTick = performance.now();
  const tick = () => {
    if (video.readyState < 1) return;
    const max = video.duration || fallbackDuration;
    const target = Math.min(Math.max(scrubState.t, 0), max - 0.05);

    const now = performance.now();
    const dt = Math.min((now - lastTick) / 1000, 0.1);
    lastTick = now;

    const maxStep = MAX_SEEK_RATE * dt;
    const delta = target - video.currentTime;
    const clampedDelta = Math.max(-maxStep, Math.min(maxStep, delta));
    if (Math.abs(clampedDelta) > 0.0005) {
      video.currentTime += clampedDelta;
    }
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}
