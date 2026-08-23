import { brand } from "../brand";
import { MEDIA } from "../media";

type Props = {
  assetId: string;
  variant:
    | "skin"
    | "gold"
    | "linen"
    | "amber"
    | "dark"
    | "dark-door"
    | "dark-hall"
    | "dark-room";
  className?: string;
  label?: string;
  alt: string;
  /** Força o placeholder mesmo com asset registrado (ex.: slot antes/depois). */
  forcePlaceholder?: boolean;
  /** Oculta a etiqueta Higgsfield (quando o slot tem sinalização própria). */
  hideLabel?: boolean;
};

// Slot de asset: renderiza a mídia real gerada no Higgsfield quando registrada
// em src/media.ts; caso contrário, o placeholder "estudo de luz" (docs/asset-manifest.md).
export default function MediaPlaceholder({
  assetId,
  variant,
  className = "",
  label,
  alt,
  forcePlaceholder = false,
  hideLabel = false,
}: Props) {
  const media = forcePlaceholder ? undefined : MEDIA[assetId];

  if (media) {
    return (
      <picture>
        <source srcSet={media.avif} type="image/avif" />
        <source srcSet={media.webp} type="image/webp" />
        <img
          src={media.webp}
          alt={alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          className={`object-cover ${className}`}
        />
      </picture>
    );
  }

  return (
    <div className={`scene scene-${variant} ${className}`} role="img" aria-label={alt}>
      {brand.showAssetLabels && !hideLabel && (
        <span className="scene-label" aria-hidden="true">
          {assetId} · Higgsfield{label ? ` — ${label}` : ""}
        </span>
      )}
    </div>
  );
}
