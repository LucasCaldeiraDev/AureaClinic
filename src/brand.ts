// Tokens de marca (white-label): re-skin por cliente = editar este arquivo + tokens de src/index.css.
export const brand = {
  name: "Áurea",
  descriptor: "Estética Avançada",
  city: "São Paulo",
  whatsapp: "5511999999999",
  whatsappMessage: "Olá! Quero agendar uma avaliação na Áurea.",
  instagramHandle: "aurea.estetica",
  address: "Rua Exemplo, 123 — Jardins, São Paulo/SP (endereço ilustrativo)",
  hours: "seg. a sáb., 9h às 19h",
  // Mostra a etiqueta "asset Higgsfield entra aqui" em cada placeholder.
  showAssetLabels: true,
};

export const waLink = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
  brand.whatsappMessage,
)}`;
