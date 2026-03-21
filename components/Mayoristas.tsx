
import React from 'react';
import { buildMayoristaWhatsAppUrl } from '../utils/whatsapp';
import { Package, Users, Truck, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: <Package size={22} />, title: 'Stock permanente', desc: 'Acceso prioritario a todos los modelos del mercado.' },
  { icon: <Users size={22} />, title: 'Atención directa', desc: 'Trato personalizado vía WhatsApp. Sin intermediarios.' },
  { icon: <Truck size={22} />, title: 'Envíos a todo el país', desc: 'Despachos rápidos con tracking. Llegamos donde estés.' },
];

const Mayoristas: React.FC = () => {
  const waUrl = buildMayoristaWhatsAppUrl();
  return (
    <section id="mayoristas" className="section-light py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-[3rem] overflow-hidden p-10 md:p-16 relative"
          style={{
            background: 'linear-gradient(135deg, #0051A2 0%, #0071E3 60%, #2997FF 100%)',
            color: '#fff',
          }}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />

          <div className="relative z-10">
            <div className="mb-10 reveal">
              <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                Canal Mayorista
              </span>
              <h2 className="font-bold tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.05, color: '#fff', marginBottom: 12 }}>
                Revendés iPhones.<br/>
                Nosotros te abastecemos.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 480, lineHeight: 1.6 }}>
                Más de 10.000 ventas realizadas. El proveedor de confianza de revendedores en todo el país.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-10 reveal reveal-delay-1">
              {benefits.map(b => (
                <div
                  key={b.title}
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <div className="mb-4 opacity-80">{b.icon}</div>
                  <h3 className="font-bold mb-2" style={{ color: '#fff', fontSize: 16 }}>{b.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
                style={{
                  background: '#fff',
                  color: '#0071E3',
                  fontWeight: 700,
                  borderRadius: 980,
                  padding: '14px 28px',
                  fontSize: 15,
                  textDecoration: 'none',
                  transition: 'transform 150ms ease, box-shadow 200ms ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
              >
                Escribinos como mayorista
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mayoristas;
