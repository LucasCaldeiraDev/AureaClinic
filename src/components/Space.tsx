import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY, MQ_MOTION_DESKTOP } from "../lib/gsapSetup";
import MediaPlaceholder from "./MediaPlaceholder";

const shots = [
  { asset: "I5", variant: "linen" as const, caption: "Recepção — chegada sem pressa", offset: "" },
  { asset: "I6", variant: "gold" as const, caption: "Sala de tratamento — luz, linho e silêncio", offset: "md:mt-16" },
  { asset: "I7", variant: "amber" as const, caption: "Detalhe — a luz faz parte do projeto", offset: "md:mt-6" },
];

export default function Space() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.from(".space-shot", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      });
      mm.add(MQ_MOTION_DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>(".space-media").forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: i % 2 === 0 ? -4 : -8 },
            {
              yPercent: i % 2 === 0 ? 4 : 8,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="espaco" ref={ref} className="container-x scroll-mt-24 py-24 md:py-32">
      <header className="max-w-[46ch]">
        <p className="eyebrow">O espaço</p>
        <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)]">
          Desenhado para <em className="text-bronze italic">desacelerar</em>.
        </h2>
      </header>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {shots.map((s) => (
          <figure key={s.asset} className={`space-shot m-0 ${s.offset}`}>
            <div className="aspect-[3/4] overflow-hidden rounded-[3px]">
              <MediaPlaceholder
                assetId={s.asset}
                variant={s.variant}
                className="space-media h-[112%] w-full"
                alt={`Espaço reservado para foto: ${s.caption}`}
              />
            </div>
            <figcaption className="mt-3.5 text-sm text-ink-soft">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
