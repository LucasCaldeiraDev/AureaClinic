import { useState } from "react";
import MediaPlaceholder from "./MediaPlaceholder";

// Slot deliberadamente sem imagem: antes/depois clínico não se inventa (norma dos
// conselhos + honestidade da demo). Cada clínica cliente pluga aqui seus casos
// reais e autorizados; o slider já fica pronto e funcional.
function SlotHint({ side }: { side: "antes" | "depois" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 flex w-1/2 flex-col items-center justify-center gap-3.5 px-4 text-center ${
        side === "antes" ? "left-0" : "left-1/2"
      }`}
      aria-hidden="true"
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-bronze/45 text-bronze">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="1.5" y="4" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10" cy="10.5" r="3.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6.5 4 8 1.8h4L13.5 4" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
      <span className="text-[0.62rem] font-medium tracking-[0.2em] text-bronze uppercase">
        caso real da clínica
      </span>
      <span className="font-display text-sm text-ink-soft italic">
        foto “{side}” entra aqui
      </span>
    </div>
  );
}

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] select-none">
      <MediaPlaceholder
        assetId="caso real"
        variant="linen"
        hideLabel
        className="absolute inset-0 h-full w-full"
        alt="Espaço reservado para a foto de antes do tratamento"
      />
      <SlotHint side="antes" />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <MediaPlaceholder
          assetId="caso real"
          variant="skin"
          hideLabel
          className="h-full w-full"
          alt="Espaço reservado para a foto de depois do tratamento"
        />
        <SlotHint side="depois" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-cream"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-md">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M4 1 1 5l3 4M10 1l3 4-3 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>

      <span className="absolute top-3 left-3 rounded-full bg-night/60 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-cream uppercase">
        antes
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-night/60 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-cream uppercase">
        depois
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar antes e depois"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
