import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY, MQ_DESKTOP } from "../lib/gsapSetup";
import { useMediaQuery } from "../lib/useMediaQuery";
import { attachScrubGovernor } from "../lib/scrubGovernor";
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

// Ato imersivo, três variantes (docs/animation-plan.md):
// - desktop com movimento: seção pinada, scroll controla o tempo do vídeo V2.
// - mobile com movimento: mesmo vídeo real, mas sem pin — usa position:sticky
//   (mais estável que pin no Safari iOS, que recalcula o viewport ao esconder
//   a barra de endereço durante o scroll).
// - prefers-reduced-motion (qualquer largura): stepper 100% estático.
export default function Experience() {
  const motionOk = useMediaQuery(MQ_MOTION_ANY);
  const isDesktop = useMediaQuery(MQ_DESKTOP);

  if (!motionOk) return <StaticExperience />;
  return isDesktop ? <PinnedExperience /> : <MobileScrubExperience />;
}

function PinnedExperience() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
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
      // governador (attachScrubGovernor), não um onUpdate aqui.
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

      const detachGovernor = video ? attachScrubGovernor(video, scrubState, VIDEO_DURATION) : null;
      return () => detachGovernor?.();
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

// Mobile: mesmo vídeo real e scrub por scroll do desktop, mas sem GSAP pin —
// usa position:sticky (nativo, mais previsível que pin no Safari iOS quando a
// barra de endereço aparece/some durante o scroll). O vídeo só é buscado da
// rede quando a seção se aproxima da tela.
function MobileScrubExperience() {
  const ref = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "60% 0px 60% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle("in-dark", entry.isIntersecting),
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.classList.remove("in-dark");
    };
  }, []);

  useGSAP(
    () => {
      const video = videoRef.current;
      const stepEls = gsap.utils.toArray<HTMLElement>(".exp-step-m");
      gsap.set(stepEls.slice(1), { opacity: 0 });

      const scrubState = { t: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      if (video) {
        video.pause();
        tl.to(scrubState, { t: VIDEO_DURATION, ease: "none", duration: 3.9 }, 0);
      }
      tl.to(".exp-progress-fill-m", { scaleX: 1, ease: "none", duration: 3.9 }, 0);
      // As legendas ficam empilhadas no mesmo lugar (não numa lista lado a lado
      // como no desktop), então a saída precisa terminar antes da entrada
      // começar — um crossfade simultâneo aqui embaralharia os dois textos.
      steps.forEach((_, i) => {
        if (i === 0) return;
        tl.to(stepEls[i - 1], { opacity: 0, duration: 0.18 }, i - 0.18).to(
          stepEls[i],
          { opacity: 1, duration: 0.18 },
          i,
        );
      });

      const detachGovernor = video ? attachScrubGovernor(video, scrubState, VIDEO_DURATION) : null;
      return () => detachGovernor?.();
    },
    { scope: ref },
  );

  return (
    <section id="experiencia" ref={ref} className="dark-act bg-night text-cream">
      <div className="container-x pt-20 pb-10">
        <p className="eyebrow">A experiência</p>
        <h2 className="display mt-5 max-w-[18ch] text-[clamp(1.9rem,7vw,2.6rem)]">
          Do primeiro olá ao resultado, <em className="text-champagne italic">sem pressa</em>.
        </h2>
      </div>

      {/* Altura extra = "distância presa" na tela: (altura do wrapper − altura da
          tela) é quanto o usuário rola com o vídeo grudado, tocando o scrub. */}
      <div ref={wrapperRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
            poster={MEDIA["V2-f1"].webp}
            aria-hidden="true"
          >
            {videoReady && <source src={EXPERIENCE_VIDEO.src} type="video/mp4" />}
          </video>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night from-10% via-night/25 via-45% to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-9">
            <div className="grid">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`exp-step-m [grid-area:1/1] ${i === 0 ? "opacity-100" : "opacity-0"}`}
                >
                  <span className="font-display text-base text-champagne/85 italic" aria-hidden="true">
                    {s.num}
                  </span>
                  <h3 className="font-display text-2xl font-normal">{s.title}</h3>
                  <p className="mt-1.5 max-w-[38ch] text-[0.9rem] leading-relaxed text-cream/75">
                    {s.copy}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-px w-full bg-cream/20" aria-hidden="true">
              <div className="exp-progress-fill-m h-full origin-left scale-x-0 bg-champagne" />
            </div>
          </div>
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
