import { useEffect, useState } from "react";
import { waLink } from "../brand";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("tratamentos");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) setVisible(true);
      },
      { rootMargin: "0px 0px -60% 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
      className={`fixed right-5 bottom-5 z-40 flex size-13 items-center justify-center rounded-full bg-ink text-cream ring-1 ring-cream/25 transition-all duration-500 hover:bg-bronze ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4a9.2 9.2 0 0 0 3.5 3.1c.5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.5-.6 1.7-1.2.2-.6.2-1 .1-1.2 0-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  );
}
