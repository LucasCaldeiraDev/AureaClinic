import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY } from "../lib/gsapSetup";
import MediaPlaceholder from "./MediaPlaceholder";

const credentials = [
  "Responsável técnica pela clínica (registro profissional placeholder)",
  "Formação e pós-graduações exibidas aqui, com verificação",
  "Educação continuada: congressos e certificações recentes",
];

export default function Team() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.from(".team-item", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 72%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="equipe" ref={ref} className="bg-sand/60 py-24 md:py-32">
      <div className="container-x grid items-center gap-10 md:grid-cols-12">
        <div className="team-item md:col-span-6">
          <p className="eyebrow">Corpo clínico</p>
          <h2 className="display mt-5 text-[clamp(2rem,4vw,3.2rem)]">
            Quem responde <em className="text-bronze italic">pelo seu rosto</em>.
          </h2>
          <p className="mt-6 font-display text-2xl font-normal">Dra. Helena Vasconcelos</p>
          <p className="mt-1 text-sm tracking-wide text-ink-soft">
            Responsável técnica · CRM 00.000 <span className="text-ink-soft/60">(nome e registro ilustrativos)</span>
          </p>
          <ul className="mt-7 space-y-3.5">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-4 text-[0.95rem] leading-relaxed text-ink-soft">
                <span className="rule mt-3 w-6 shrink-0" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-9 max-w-[42ch] font-display text-xl font-light italic">
            “Minha régua é simples: se parece feito, refazemos o plano.”
          </p>
        </div>
        <div className="team-item md:col-span-5 md:col-start-8">
          <div className="aspect-[4/5] overflow-hidden rounded-[3px]">
            <MediaPlaceholder
              assetId="I8"
              label="retrato da responsável técnica"
              variant="skin"
              className="h-full w-full"
              alt="Espaço reservado para o retrato da responsável técnica"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
