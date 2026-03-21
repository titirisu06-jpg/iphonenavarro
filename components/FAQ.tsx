
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: '¿Los equipos son originales?', a: 'Sí, todos los equipos son 100% originales Apple. Los sellados vienen en caja sin abrir con garantía oficial. Los usados son verificados y revisados por nuestro equipo.' },
  { q: '¿Hacen envíos a todo el país?', a: 'Sí, enviamos a toda Argentina vía correo privado o Andreani. Los envíos se cotizan según el destino. Consultá antes de comprar.' },
  { q: '¿Cómo funciona el Plan Canje?', a: 'Contanos tu equipo por WhatsApp (modelo, estado y batería), te tasamos al instante y aplicás ese valor como crédito para tu nuevo iPhone. Simple y sin intermediarios.' },
  { q: '¿Tienen garantía los usados?', a: 'Los equipos Usados Premium tienen 2 meses de garantía escrita por fallas de fabricación. Los sellados tienen 12 meses de garantía oficial Apple.' },
  { q: '¿Qué medios de pago aceptan?', a: 'Aceptamos efectivo en pesos (ARS) y dólares (USD) al tipo de cambio del día, y transferencia bancaria o Mercado Pago.' },
  { q: '¿Hacen venta mayorista?', a: 'Sí, tenemos canal mayorista para revendedores. Escribinos por WhatsApp indicando que sos revendedor y te damos toda la info.' },
];

const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onToggle: () => void }> = ({ q, a, isOpen, onToggle }) => (
  <div style={{ borderBottom: '1px solid #E5E5EA' }}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
      style={{ background: 'none', border: 'none', width: '100%' }}
      aria-expanded={isOpen}
    >
      <span
        className="font-semibold text-base"
        style={{ color: isOpen ? '#0071E3' : '#1D1D1F', transition: 'color 200ms' }}
      >
        {q}
      </span>
      <ChevronDown
        size={18}
        style={{
          color: '#6E6E73',
          flexShrink: 0,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 280ms ease',
        }}
      />
    </button>
    <div style={{
      overflow: 'hidden',
      maxHeight: isOpen ? 120 : 0,
      transition: 'max-height 280ms ease',
      paddingBottom: isOpen ? 20 : 0,
    }}>
      <p style={{ color: '#424245', fontSize: 15, lineHeight: 1.65 }}>{a}</p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="section-light py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 reveal">
          <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
            FAQ
          </span>
          <h2 className="font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}>
            Todo lo que<br />
            <span className="text-gradient-blue">necesitás saber.</span>
          </h2>
        </div>
        <div className="card-white p-2 reveal reveal-delay-1" style={{ borderRadius: 24, overflow: 'hidden' }}>
          <div className="px-6">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
