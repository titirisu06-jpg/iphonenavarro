
import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

const trustItems = [
  { value: '+10.000', label: 'Ventas realizadas' },
  { value: '12 meses', label: 'Garantía sellados' },
  { value: '1 mes', label: 'Garantía usados' },
  { value: '100%', label: 'Originales verificados' },
];

const Garantia: React.FC = () => (
  <section id="garantia" className="section-white py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 reveal">
        {trustItems.map(item => (
          <div
            key={item.label}
            className="text-center p-6 rounded-2xl"
            style={{ background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.05)' }}
          >
            <p className="font-bold text-iphone-blue mb-1" style={{ fontSize: 28, letterSpacing: '-0.03em' }}>
              {item.value}
            </p>
            <p className="text-ink-tertiary text-xs font-semibold uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div
        className="rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden reveal"
        style={{ background: '#F5F5F7', border: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)' }}
          >
            <ShieldCheck size={38} className="text-iphone-blue" />
          </div>
          <div>
            <h2 className="font-bold text-ink mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Comprá con confianza total.
            </h2>
            <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-2xl">
              Todos los equipos sellados tienen{' '}
              <strong className="text-ink">12 meses de garantía oficial</strong>.
              Los Usados Premium cuentan con{' '}
              <strong className="text-ink">1 mes de garantía escrita</strong>{' '}
              por fallas de fabricación. Más de 10.000 clientes nos eligieron.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Equipos 100% originales · Sin modificaciones</span>
            </div>
          </div>
        </div>
        {/* Decorative stars */}
        <div className="absolute top-8 right-8 flex gap-1.5 drop-shadow-sm">
          {[...Array(5)].map((_, i) => <Star key={i} size={18} color="#F59E0B" fill="#F59E0B" />)}
        </div>
      </div>
    </div>
  </section>
);

export default Garantia;
