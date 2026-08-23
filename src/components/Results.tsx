import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY } from "../lib/gsapSetup";
import BeforeAfter from "./BeforeAfter";

const testimonials = [
  {
    initials: "MC",
    quote:
      "Saí da avaliação entendendo exatamente o que seria feito — e, principalmente, o que não precisava ser feito.",
    name: "M. C.",
    treatment: "harmonização facial",
  },
  {
    initials: "AL",
    quote: "Ninguém percebeu o que mudou. Todo mundo notou que eu estava descansada.",
    name: "A. L.",
    treatment: "rejuvenescimento",
  },
  {
    initials: "RT",
    quote: "O acompanhamento fez a diferença: o plano mudou comigo ao longo do ano.",
    name: "R. T.",
    treatment: "skincare clínico",
  },
];

export default function Results() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.from(".result-card", {
          opacity: 0,
          y: 34,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="resultados" ref={ref} className="container-x scroll-mt-24 py-24 md:py-32">
      <header className="max-w-[50ch]">
        <p className="eyebrow">Resultados</p>
        <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.4rem)]">
          Confiança se constrói <em className="text-bronze italic">com método</em>.
        </h2>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.initials}
            className="result-card flex flex-col justify-between rounded-[3px] border border-ink/8 bg-sand/55 p-7"
          >
            <blockquote className="font-display text-[1.3rem] leading-snug font-light">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-champagne/25 text-[0.8rem] font-medium text-bronze">
                {t.initials}
              </span>
              <span className="text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="block text-ink-soft">{t.treatment}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 text-[0.8rem] text-ink-soft/75 italic">
        Depoimentos ilustrativos desta demonstração — substituídos por avaliações reais da clínica.
      </p>

      <div className="mt-24 grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="display text-[clamp(1.6rem,3vw,2.3rem)]">
            Antes & depois, com responsabilidade.
          </h3>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-ink-soft">
            Este espaço recebe casos reais e autorizados da clínica, fotografados com o mesmo
            enquadramento e a mesma luz — porque comparação honesta se faz em condições iguais.
          </p>
          <p className="mt-4 max-w-[48ch] text-[0.85rem] leading-relaxed text-ink-soft/75">
            Publicação de resultados segue as normas de publicidade dos conselhos profissionais.
          </p>
        </div>
        <BeforeAfter />
      </div>
    </section>
  );
}
