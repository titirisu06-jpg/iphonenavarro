
import React, { useState } from 'react';
import { Send, Phone, User, CheckCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface LeadFormData {
  name: string;
  phone: string;
  interest: string;
  budget: string;
}

const interests = [
  'iPhone nuevo (sellado)',
  'iPhone usado premium',
  'Plan Canje',
  'Compra mayorista',
  'Otro',
];

const budgets = [
  'Hasta USD 500',
  'USD 500 - 800',
  'USD 800 - 1.100',
  'Más de USD 1.100',
];

const LeadCapture: React.FC = () => {
  const [form, setForm] = useState<LeadFormData>({ name: '', phone: '', interest: '', budget: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    const msg = `Hola iPhone Navarro! Me llamo ${form.name}.${form.interest ? ` Me interesa: ${form.interest}.` : ''}${form.budget ? ` Presupuesto: ${form.budget}.` : ''} Número de contacto: ${form.phone}.`;
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  if (sent) {
    return (
      <section id="contacto" className="section-light py-24 scroll-mt-20">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h3 className="font-bold text-ink text-2xl mb-3">¡Te enviamos al chat!</h3>
          <p className="text-ink-tertiary text-base leading-relaxed mb-8">
            Ahora podés enviar tu consulta directamente por WhatsApp. Te respondemos enseguida.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-iphone-blue text-sm font-medium underline underline-offset-2"
          >
            Hacer otra consulta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="section-light py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div className="reveal">
              <span
                className="font-mono uppercase tracking-[0.4em] mb-4 block"
                style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}
              >
                Contacto directo
              </span>
              <h2
                className="font-bold text-ink tracking-tight leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
              >
                Encontrá tu<br />
                <span className="text-gradient-blue">iPhone ideal.</span>
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                Completá el formulario y te conectamos con un asesor en segundos. Sin formularios eternos — tout directo a WhatsApp.
              </p>

              {/* Trust signals */}
              <div className="space-y-3">
                {[
                  { icon: '⚡', text: 'Respuesta en minutos por WhatsApp' },
                  { icon: '🔒', text: 'Tus datos no se almacenan' },
                  { icon: '🎯', text: 'Asesoramiento personalizado' },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-iphone-blue/8 rounded-full flex items-center justify-center text-sm shrink-0">
                      {t.icon}
                    </div>
                    <span className="text-sm text-ink-secondary font-medium">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal reveal-delay-2">
              <form
                onSubmit={handleSubmit}
                className="card-white p-8"
                style={{ borderRadius: 28 }}
              >
                <h3 className="font-bold text-ink text-xl mb-6">Consulta rápida</h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="lead-name">
                      Nombre *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
                      <input
                        id="lead-name"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="lead-input"
                        style={{ paddingLeft: 42 }}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="lead-phone">
                      WhatsApp / Teléfono *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
                      <input
                        id="lead-phone"
                        type="tel"
                        placeholder="+54 9 ..."
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="lead-input"
                        style={{ paddingLeft: 42 }}
                        required
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="lead-interest">
                      ¿Qué te interesa?
                    </label>
                    <select
                      id="lead-interest"
                      value={form.interest}
                      onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                      className="lead-input"
                      style={{ appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Elegí una opción</option>
                      {interests.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="lead-budget">
                      Presupuesto aproximado
                    </label>
                    <select
                      id="lead-budget"
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      className="lead-input"
                      style={{ appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Seleccioná</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center mt-2"
                    style={{ borderRadius: 14, padding: '15px 24px', fontSize: 15 }}
                  >
                    <Send size={16} />
                    Consultar por WhatsApp
                  </button>
                </div>

                <p className="text-center text-xs text-ink-tertiary mt-5 leading-relaxed">
                  Al enviar, se abrirá WhatsApp con tu consulta lista.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
