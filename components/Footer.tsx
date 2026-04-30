
import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/navigation';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { DollarSign, Banknote, CreditCard } from 'lucide-react';
import { Instagram, MessageCircle } from 'lucide-react';

const paymentMethods = [
  { icon: <DollarSign size={24} />, title: 'Efectivo USD', desc: 'Dólares billetes al tipo de cambio del día.', color: '#16A34A', bg: 'rgba(22,163,74,0.07)', border: 'rgba(22,163,74,0.15)' },
  { icon: <Banknote size={24} />, title: 'Efectivo ARS', desc: 'Pesos argentinos sin recargo.', color: '#2563EB', bg: 'rgba(37,99,235,0.07)', border: 'rgba(37,99,235,0.15)' },
  { icon: <CreditCard size={24} />, title: 'Transferencia', desc: 'Transferencia bancaria o Mercado Pago.', color: '#7C3AED', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.15)' },
];

const navGroups = [
  { title: 'Tienda', links: [{ name: 'Catálogo', id: 'catalogo' }, { name: 'Plan Canje', id: 'plan-canje' }, { name: 'Mayoristas', id: 'mayoristas' }] },
  { title: 'Info', links: [{ name: 'Garantía', id: 'garantia' }, { name: 'Contacto', id: 'contacto' }] },
];

const MediosDePago: React.FC = () => (
  <section id="medios-de-pago" className="section-white py-20 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-10 reveal">
        <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>Medios de pago</span>
        <h2 className="font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.1 }}>
          Pagá como <span className="text-gradient-blue">más te convenga.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5 reveal reveal-delay-1">
        {paymentMethods.map(m => (
          <div
            key={m.title}
            className="p-7 rounded-2xl card-white"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: m.bg, border: `1px solid ${m.border}`, color: m.color }}>
              {m.icon}
            </div>
            <h3 className="font-bold text-ink text-lg mb-2">{m.title}</h3>
            <p className="text-ink-tertiary text-sm leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Combined Footer + MediosDePago export
const Footer: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl();
  const year = new Date().getFullYear();

  return (
    <>
      <MediosDePago />
      {/* Dark footer */}
      <footer style={{ background: '#060608', borderTop: '1px solid #1C1C1E' }} className="pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-iphone-blue rounded-xl flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-white text-base">iPhone Navarro</span>
                  <p className="font-mono text-[9px] text-iphone-blue uppercase tracking-widest">Navarro · BA</p>
                </div>
              </div>
              <p style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
                iPhones nuevos, sellados y usados. Más de 10.000 ventas en Argentina.
              </p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/iphonenavarro_/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ background: '#1C1C1E', color: '#8E8E93' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E1306C'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1C1C1E'; (e.currentTarget as HTMLElement).style.color = '#8E8E93'; }}
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ background: '#1C1C1E', color: '#8E8E93' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#25D366'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1C1C1E'; (e.currentTarget as HTMLElement).style.color = '#8E8E93'; }}
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Nav */}
            <div className="grid grid-cols-2 gap-10">
              {navGroups.map(g => (
                <div key={g.title}>
                  <h4 className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 10, color: '#0071E3', fontWeight: 600 }}>{g.title}</h4>
                  <ul className="space-y-3">
                    {g.links.map(l => (
                      <li key={l.id}>
                        <button onClick={() => scrollToSection(l.id)} style={{ color: '#8E8E93', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 200ms', padding: 0 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8E8E93'; }}
                        >{l.name}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 10, color: '#0071E3', fontWeight: 600 }}>Contacto</h4>
              <p className="font-mono text-white mb-2" style={{ fontSize: 15 }}>+54 9 2227 50-2299</p>
              <p style={{ color: '#8E8E93', fontSize: 14, marginBottom: 16 }}>Navarro, Buenos Aires, Argentina</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 14, padding: '9px 18px', borderRadius: 12 }}>
                <MessageCircle size={14} />
                Escribinos
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1C1C1E', paddingTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div className="flex gap-6 text-sm font-medium" style={{ color: '#8E8E93' }}>
              <Link to="/faq" className="hover:text-white transition-colors duration-200">Preguntas Frecuentes (FAQ)</Link>
              <Link to="/privacidad" className="hover:text-white transition-colors duration-200">Política de Privacidad</Link>
            </div>
            <p className="font-mono text-center" style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              © {year} IPHONE NAVARRO · NAVARRO · BUENOS AIRES · ARGENTINA
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
