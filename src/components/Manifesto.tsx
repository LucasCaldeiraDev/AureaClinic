import { useRef } from "react";
import { gsap, useGSAP, MQ_MOTION_ANY } from "../lib/gsapSetup";

const SENTENCE =
  "A beleza que procuramos não se inventa: ela já existe em você. Nosso trabalho é revelá-la — com ciência, medida e escuta.";

export default function Manifesto() {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_MOTION_ANY, () => {
        gsap.fromTo(
          ".mw",
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.055,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 72%",
              end: "center 42%",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="container-x py-[18vh] md:py-[24vh]">
      <div className="rule" aria-hidden="true" />
      <p className="eyebrow mt-5">Manifesto</p>
      <p className="display mt-8 max-w-[26ch] text-[clamp(1.8rem,4.2vw,3.4rem)]">
        {SENTENCE.split(" ").map((w, i) => (
          <span key={i} className="mw">
            {w === "revelá-la" ? <em className="text-bronze italic">{w}</em> : w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
