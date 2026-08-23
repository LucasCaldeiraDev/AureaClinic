import { brand, waLink } from "../brand";

const faq = [
  {
    q: "A avaliação é paga?",
    a: "Sim, e o valor é revertido caso você inicie um protocolo. A avaliação inclui diagnóstico de pele e um plano apresentado por escrito.",
  },
  {
    q: "Os resultados parecem naturais?",
    a: "Esse é o critério central da casa: protocolos em etapas, doses conservadoras e reavaliação antes de qualquer reforço.",
  },
  {
    q: "Quanto tempo dura uma sessão?",
    a: "Entre 30 e 90 minutos, conforme o protocolo. Você recebe a estimativa exata no seu plano.",
  },
  {
    q: "Quais formas de pagamento?",
    a: "Cartão, Pix e parcelamento. As condições são apresentadas junto com o plano — sem surpresa no caixa.",
  },
  {
    q: "Preciso de indicação médica?",
    a: "Não. A porta de entrada é a avaliação com a responsável técnica, que indica — ou desaconselha — cada procedimento.",
  },
];

export default function Booking() {
  return (
    <section id="agendar" className="scroll-mt-24 bg-sand">
      <div className="container-x grid gap-16 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="eyebrow">Agendamento</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)]">
            Comece pela <em className="text-bronze italic">avaliação</em>.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Sem compromisso com pacote: a primeira conversa serve para entender se fazemos sentido
            para você.
          </p>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary mt-9">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4a9.2 9.2 0 0 0 3.5 3.1c.5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.5-.6 1.7-1.2.2-.6.2-1 .1-1.2 0-.1-.2-.2-.4-.3Z" />
            </svg>
            Agendar pelo WhatsApp
          </a>
          <p className="mt-6 text-sm text-ink-soft">
            Atendimento de {brand.hours} <span className="text-ink-soft/60">(horário ilustrativo)</span>
            <span className="mt-1 block">{brand.address}</span>
          </p>
        </div>

        <div>
          <p className="eyebrow">Perguntas frequentes</p>
          <div className="mt-6">
            {faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  {item.q}
                  <span className="faq-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[52ch] pb-6 leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
