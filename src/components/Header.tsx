import { useEffect, useState } from "react";
import { brand, waLink } from "../brand";

const links = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#espaco", label: "Espaço" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > last && y > 160);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-porcelain/85 backdrop-blur-md [body.in-dark_&]:bg-night/80"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-4">
        <a href="#page" className="flex items-baseline gap-2.5" aria-label={`${brand.name} — início`}>
          <span className="font-display text-[1.7rem] leading-none font-normal [body.in-dark_&]:text-cream">
            {brand.name}
          </span>
          <span className="eyebrow hidden pb-0.5 sm:inline">{brand.descriptor}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções da página">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-ink [body.in-dark_&]:text-cream/70 [body.in-dark_&]:hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary px-5 py-2.5 text-[0.85rem]">
          Agendar avaliação
        </a>
      </div>
    </header>
  );
}
