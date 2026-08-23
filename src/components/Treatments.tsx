import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY, MQ_MOTION_DESKTOP } from "../lib/gsapSetup";
import { waLink } from "../brand";
import MediaPlaceholder from "./MediaPlaceholder";

const items = [
  {
    tag: "rosto",
    title: "Harmonização facial",
    copy: "Proporções estudadas rosto a rosto. O objetivo é realçar os seus traços — nunca substituí-los por um padrão.",
    asset: "I1",
    variant: "skin" as const,
  },
  {
    tag: "pele",
    title: "Rejuvenescimento & lasers",
    copy: "Tecnologias que estimulam o que a pele já faz de melhor: renovar-se, no seu próprio ritmo.",
    asset: "I2",
    variant: "amber" as const,
  },
  {
    tag: "corpo",
    title: "Estética corporal",
    copy: "Contorno e firmeza em protocolos combinados, definidos pela sua avaliação — não por pacote pronto.",
    asset: "I3",
    variant: "linen" as const,
  },
  {
    tag: "rotina",
    title: "Skincare clínico",
    copy: "Uma rotina guiada por diagnóstico de pele, revisada a cada retorno e ajustada a cada estação.",
    asset: "I4",
    variant: "gold" as const,
  },
];

export default function Treatments() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.utils.toArray<HTMLElement>(".treat-row").forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 42,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%" },
          });
        });
      });
      mm.add(MQ_MOTION_DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>(".treat-media").forEach((media) => {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="tratamentos" ref={ref} className="container-x scroll-mt-24 pb-16">
      <header className="max-w-[52ch]">
        <p className="eyebrow">Tratamentos</p>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">
          Quatro caminhos. <em className="text-bronze italic">Um método.</em>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Todos começam no mesmo lugar: uma avaliação completa. A partir dela, cada protocolo é
          montado por pessoa — nunca por catálogo.
        </p>
      </header>

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {items.map((item, i) => (
          <article key={item.asset} className="treat-row grid items-center gap-8 md:grid-cols-12 md:gap-0">
            <div
              className={`overflow-hidden rounded-[3px] md:col-span-5 ${
                i % 2 === 1 ? "md:order-2 md:col-start-8" : ""
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <MediaPlaceholder
                  assetId={item.asset}
                  variant={item.variant}
                  className="treat-media h-[112%] w-full"
                  alt={`Espaço reservado para a imagem do tratamento ${item.title}`}
                />
              </div>
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:col-start-2" : "md:col-start-7"}`}>
              <p className="eyebrow">{item.tag}</p>
              <h3 className="display mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">{item.title}</h3>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-soft">{item.copy}</p>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-link mt-7">
                Agendar avaliação
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
