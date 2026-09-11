import { useEffect, useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_DESKTOP } from "../lib/gsapSetup";
import { useMediaQuery } from "../lib/useMediaQuery";
import { EXPERIENCE_VIDEO, MEDIA } from "../media";
import MediaPlaceholder from "./MediaPlaceholder";

const steps = [
  {
    num: "01",
    title: "Avaliação",
    copy: "Uma hora dedicada a entender rosto, pele, histórico e expectativa. Nenhuma indicação antes disso.",
    frame: "V2-f1",
    variant: "dark-door" as const,
  },
  {
    num: "02",
    title: "Plano",
    copy: "Um protocolo por pessoa: etapas, prazos e investimento apresentados com clareza, por escrito.",
    frame: "V2-f2",
    variant: "dark-hall" as const,
  },
  {
    num: "03",
    title: "Tratamento",
    copy: "Sessões conduzidas pela equipe clínica, em salas preparadas para o seu conforto — e para o seu tempo.",
    frame: "V2-f3",
    variant: "dark-room" as const,
  },
  {
    num: "04",
    title: "Acompanhamento",
    copy: "Retornos marcados para medir a evolução, ajustar o plano e sustentar o resultado.",
    frame: "V2-f4",
    variant: "dark" as const,
  },
];

const VIDEO_DURATION = 8;
// Governador do scrub: mesmo que o scroll salte muito rápido, o vídeo nunca busca
// mais que isso (segundos de vídeo por segundo real) — evita seek além do que o
// navegador conseguiu decodificar, que é o que causa gap/travada na tela.
const MAX_SEEK_RATE = 5;

// Ato imersivo: em desktop (sem prefers-reduced-motion) a seção é pinada e o scroll
// controla o tempo do vídeo V2 (docs/animation-plan.md). Mobile/PRM: stepper estático.
export default function Experience() {
  const pinned = useMediaQuery(MQ_MOTION_DESKTOP);
  return pinned ? <PinnedExperience /> : <StaticExperience />;
}

function PinnedExperience() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_DESKTOP, () => {
        const stepEls = gsap.utils.toArray<HTMLElement>(".exp-step");
        const video = videoRef.current;
        // #page é ancestral — fora do scope do useGSAP, então precisa de referência
        // direta (seletor string seria buscado só dentro da seção).
        const pageEl = document.getElementById("page");
        gsap.set(stepEls.slice(1), { opacity: 0.35 });

        // Entrada: "apagar as luzes" enquanto a seção se aproxima (todo o range fica
        // antes do pin — nenhuma medição cruza o espaçador do pin).
        if (pageEl) {
          gsap.fromTo(
            pageEl,
            { backgroundColor: "#faf7f2" },
            {
              backgroundColor: "#12100d",
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 8%", scrub: true },
            },
          );
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onToggle: (self) => document.body.classList.toggle("in-dark", self.isActive),
          },
        });

        // scrubState.t é só o "alvo": o valor para onde o vídeo deveria estar,
        // segundo a posição do scroll. Quem realmente busca no vídeo é o
        // governador abaixo — nenhum onUpdate aqui.
        const scrubState = { t: 0 };
        if (video) {
          video.pause();
          tl.to(scrubState, { t: VIDEO_DURATION, ease: "none", duration: 3.9 }, 0);
        }

        tl.to(".exp-progress-fill", { scaleX: 1, ease: "none", duration: 3.9 }, 0);
        steps.forEach((_, i) => {
          if (i === 0) return;
          tl.to(stepEls[i - 1], { opacity: 0.35, duration: 0.45 }, i)
            .to(stepEls[i], { opacity: 1, duration: 0.45 }, i);
        });
        // Saída ainda pinada: o palco se despede enquanto as luzes voltam.
        tl.to(".exp-stage", { opacity: 0, duration: 0.45 }, 3.9);
        if (pageEl) {
          tl.to(pageEl, { backgroundColor: "#faf7f2", ease: "none", duration: 0.5 }, 3.95);
        }

        // Governador do scrub: roda em TODO frame do ticker do GSAP — não só
        // enquanto o tween acima está "ativo" — e nunca deixa video.currentTime
        // avançar mais rápido que MAX_SEEK_RATE (segundos de vídeo por segundo
        // real). Sem isso, um scroll brusco pede um salto de vários segundos
        // num único frame, o navegador não tem esse trecho decodificado ainda,
        // e a tela trava/pisca. Rodar no ticker (em vez de dentro do onUpdate do
        // tween) evita dois bugs: o vídeo ficar preso no meio do caminho quando
        // o tween "termina" antes do governador alcançar o alvo, e um dt
        // desatualizado inflar o primeiro passo depois de um período parado.
        let governor: (() => void) | null = null;
        if (video) {
          let lastTick = performance.now();
          governor = () => {
            if (video.readyState < 1) return;
            const max = video.duration || VIDEO_DURATION;
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
          gsap.ticker.add(governor);
        }

        return () => {
          if (governor) gsap.ticker.remove(governor);
        };
      });
    },
    { scope: ref },
  );

  return (
    <section id="experiencia" ref={ref} className="dark-act text-cream">
      <div className="flex min-h-svh items-center py-20">
        <div className="exp-stage container-x grid w-full items-center gap-14 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">A experiência</p>
            <h2 className="display mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)]">
              Do primeiro olá ao resultado, <em className="text-champagne italic">sem pressa</em>.
            </h2>
            <ol className="mt-10 space-y-7">
              {steps.map((s) => (
                <li key={s.num} className="exp-step flex items-baseline gap-5">
                  <span className="font-display text-lg text-champagne/85 italic" aria-hidden="true">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] font-normal">{s.title}</h3>
                    <p className="mt-1.5 max-w-[44ch] text-[0.95rem] leading-relaxed text-cream/65">
                      {s.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-11 h-px w-full max-w-sm bg-cream/15" aria-hidden="true">
              <div className="exp-progress-fill h-full origin-left scale-x-0 bg-champagne" />
            </div>
          </div>

          <figure className="relative m-0">
            <div className="relative aspect-video overflow-hidden rounded-[3px] ring-1 ring-cream/12">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                poster={MEDIA["V2-f1"].webp}
                aria-hidden="true"
              >
                <source src={EXPERIENCE_VIDEO.src} type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-4 text-[0.8rem] tracking-wide text-cream/45">
              A jornada dentro da clínica — o vídeo avança com o seu scroll.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function StaticExperience() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle("in-dark", entry.isIntersecting),
      { rootMargin: "-15% 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.classList.remove("in-dark");
    };
  }, []);

  return (
    <section id="experiencia" ref={ref} className="dark-act scroll-mt-24 bg-night py-24 text-cream">
      <div className="container-x">
        <p className="eyebrow">A experiência</p>
        <h2 className="display mt-5 max-w-[20ch] text-[clamp(1.9rem,6vw,2.9rem)]">
          Do primeiro olá ao resultado, <em className="text-champagne italic">sem pressa</em>.
        </h2>
        <ol className="mt-12 space-y-14">
          {steps.map((s, i) => (
            <li key={s.num}>
              <div className="aspect-video overflow-hidden rounded-[3px] ring-1 ring-cream/12">
                <MediaPlaceholder
                  assetId={s.frame}
                  label={`quadro ${i + 1}`}
                  variant={s.variant}
                  className="h-full w-full"
                  alt=""
                />
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-display text-lg text-champagne/85 italic" aria-hidden="true">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-normal">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-cream/65">{s.copy}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
