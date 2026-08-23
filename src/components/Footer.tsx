import { brand } from "../brand";

export default function Footer() {
  return (
    <footer className="bg-night py-14 text-cream/75">
      <div className="container-x">
        <div className="flex flex-wrap items-baseline justify-between gap-8">
          <div>
            <p className="font-display text-2xl text-cream">{brand.name}</p>
            <p className="eyebrow mt-1.5">{brand.descriptor}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm" aria-label="Rodapé">
            <a className="transition-colors hover:text-cream" href="#tratamentos">Tratamentos</a>
            <a className="transition-colors hover:text-cream" href="#experiencia">Experiência</a>
            <a className="transition-colors hover:text-cream" href="#espaco">Espaço</a>
            <a
              className="transition-colors hover:text-cream"
              href={`https://instagram.com/${brand.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </nav>
        </div>
        <div className="mt-12 border-t border-cream/12 pt-7 text-[0.8rem] leading-relaxed text-cream/45">
          <p>{brand.address}</p>
          <p className="mt-3">
            © 2026 {brand.name} — marca fictícia. Site demonstrativo: imagens e vídeos gerados com
            IA (Higgsfield); textos, valores e credenciais são ilustrativos.
          </p>
          <p className="mt-1.5">Design e desenvolvimento: Lucas Caldeira Pires.</p>
        </div>
      </div>
    </footer>
  );
}
