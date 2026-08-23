import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY, MQ_MOTION_DESKTOP } from "../lib/gsapSetup";
import { useMediaQuery } from "../lib/useMediaQuery";
import { brand, waLink } from "../brand";
import { HERO_MEDIA } from "../media";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  // Vídeo só em telas ≥768px sem prefers-reduced-motion; mobile fica com o poster
  // (docs/performance-budget.md).
  const showVideo = useMediaQuery(MQ_MOTION_DESKTOP);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.from(".hero-item", {
          opacity: 0,
          y: 26,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.15,
        });
        gsap.from(".hero-scene", { scale: 1.06, duration: 2.4, ease: "power2.out" });
        gsap.to(".hero-hint-line", {
          scaleY: 0.25,
          transformOrigin: "top",
          repeat: -1,
          yoyo: true,
          duration: 1.4,
          ease: "power1.inOut",
        });
      });
      mm.add(MQ_MOTION_DESKTOP, () => {
        gsap.to(".hero-content", {
          y: 70,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "bottom 90%", end: "bottom 35%", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-svh items-end overflow-hidden">
      <div className="hero-scene absolute inset-0" aria-hidden="true">
        <picture>
          <source srcSet={HERO_MEDIA.posterAvif} type="image/avif" />
          <img
            src={HERO_MEDIA.posterWebp}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={HERO_MEDIA.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-porcelain via-porcelain/25 to-transparent" />
      </div>

      <div className="hero-content container-x relative pt-44 pb-20 md:pb-24">
        <p className="eyebrow hero-item">
          Clínica de estética avançada · {brand.city}
        </p>
        <h1 className="display hero-item mt-6 max-w-[14ch] text-[clamp(2.7rem,7.2vw,5.6rem)]">
          O seu melhor reflexo, <em className="text-bronze italic">sem exageros</em>.
        </h1>
        <p className="hero-item mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
          Harmonização, rejuvenescimento e skincare clínico em protocolos desenhados a partir de
          uma avaliação que escuta antes de indicar.
        </p>
        <div className="hero-item mt-9 flex flex-wrap items-center gap-6">
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary">
            Agendar avaliação
          </a>
          <a href="#tratamentos" className="btn-link">
            Conhecer tratamentos
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[0.62rem] font-medium tracking-[0.22em] text-ink-soft uppercase">role</span>
        <span className="hero-hint-line block h-9 w-px bg-bronze" />
      </div>
    </section>
  );
}
