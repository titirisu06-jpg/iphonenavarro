
import React from 'react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { DollarSign, Banknote, CreditCard, MessageCircle } from 'lucide-react';

const paymentMethods = [
  {
    icon: <DollarSign size={28} className="text-emerald-400" />,
    title: 'Efectivo USD',
    desc: 'Dólares billetes al tipo de cambio del día.',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: <Banknote size={28} className="text-blue-400" />,
    title: 'Efectivo ARS',
    desc: 'Pesos argentinos. Sin recargo.',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: <CreditCard size={28} className="text-purple-400" />,
    title: 'Transferencia',
    desc: 'Transferencia bancaria o Mercado Pago.',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
];

const MediosDePago: React.FC = () => {
  const waUrl = buildWhatsAppUrl('Hola iPhone Navarro, quiero saber con qué medios de pago trabajan.');

  return (
    <section id="medios-de-pago" className="py-24 bg-midnight scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 section-reveal">
          <span className="font-mono text-[10px] text-iphone-blue uppercase tracking-[0.5em] mb-4 block">
            Medios de pago
          </span>
          <h2 className="font-bold text-white tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Pagá como<br/>
            <span className="text-gradient-blue">más te convenga.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 section-reveal">
          {paymentMethods.map(m => (
            <div
              key={m.title}
              className={`${m.bgColor} border ${m.borderColor} rounded-2xl p-7 hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="mb-5">{m.icon}</div>
              <h3 className="font-bold text-white text-lg mb-2">{m.title}</h3>
              <p className="text-titanium text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center section-reveal">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-iphone-blue font-semibold hover:underline text-sm"
          >
            <MessageCircle size={15} />
            Consultar financiación disponible
          </a>
        </div>
      </div>
    </section>
  );
};

export default MediosDePago;
