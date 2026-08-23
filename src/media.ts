// Registro dos assets gerados no Higgsfield (docs/asset-manifest.md).
// Um assetId presente aqui faz o MediaPlaceholder renderizar a mídia real;
// ausente, ele mantém o placeholder "estudo de luz".
export type MediaEntry = {
  avif: string;
  webp: string;
  width: number;
  height: number;
};

export const MEDIA: Record<string, MediaEntry> = {
  I1: { avif: "/media/treat-harmonizacao.avif", webp: "/media/treat-harmonizacao.webp", width: 1080, height: 1440 },
  I2: { avif: "/media/treat-laser.avif", webp: "/media/treat-laser.webp", width: 1080, height: 1440 },
  I3: { avif: "/media/treat-corporal.avif", webp: "/media/treat-corporal.webp", width: 1080, height: 1440 },
  I4: { avif: "/media/treat-skincare.avif", webp: "/media/treat-skincare.webp", width: 1080, height: 1440 },
  I5: { avif: "/media/space-recepcao.avif", webp: "/media/space-recepcao.webp", width: 1620, height: 1080 },
  I6: { avif: "/media/space-sala.avif", webp: "/media/space-sala.webp", width: 1080, height: 1440 },
  I7: { avif: "/media/space-detalhe.avif", webp: "/media/space-detalhe.webp", width: 1080, height: 1440 },
  I8: { avif: "/media/team-responsavel.avif", webp: "/media/team-responsavel.webp", width: 1080, height: 1440 },
  "V2-f1": { avif: "/media/experience-frame-01.avif", webp: "/media/experience-frame-01.webp", width: 960, height: 540 },
  "V2-f2": { avif: "/media/experience-frame-02.avif", webp: "/media/experience-frame-02.webp", width: 960, height: 540 },
  "V2-f3": { avif: "/media/experience-frame-03.avif", webp: "/media/experience-frame-03.webp", width: 960, height: 540 },
  "V2-f4": { avif: "/media/experience-frame-04.avif", webp: "/media/experience-frame-04.webp", width: 960, height: 540 },
};

export const HERO_MEDIA = {
  video: "/media/hero-loop.mp4",
  posterAvif: "/media/hero-poster.avif",
  posterWebp: "/media/hero-poster.webp",
};

export const EXPERIENCE_VIDEO = {
  src: "/media/experience-scrub.mp4",
  posterAvif: "/media/experience-frame-01.avif",
};
