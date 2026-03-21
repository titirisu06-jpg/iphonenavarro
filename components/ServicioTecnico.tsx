import React, { useState } from 'react';
import { buildServiceWhatsAppUrl } from '../utils/whatsapp';
import { Wrench, ArrowRight, CheckCircle } from 'lucide-react';

const popularModels = [
  'iPhone 11', 'iPhone 11 Pro', 'iPhone 12', 'iPhone 12 Pro',
  'iPhone 13', 'iPhone 13 Pro', 'iPhone 14', 'iPhone 14 Pro',
  'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Otro',
];

const steps = [
  { step: '01', title: 'Diagnóstico rápido', desc: 'Contamos qué le pasa a tu iPhone.' },
  { step: '02', title: 'Presupuesto inicial', desc: 'Recibís un costo estimado al momento.' },
  { step: '03', title: 'Reparación Express', desc: 'En pocas horas te lo llevás andando.' },
];

const ServicioTecnico: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    const url = buildServiceWhatsAppUrl(selectedModel || 'No especificado', activeTime, issue);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="servicio-tecnico" className="section-light py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 reveal">
          <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
            Servicio Técnico Efectivo
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.05 }}>
              ¿Se rompió?<br />
              <span className="text-gradient-blue">Lo arreglamos rápido.</span>
            </h2>
            <p className="text-ink-tertiary text-base max-w-xs leading-relaxed">
              Técnicos calificados, repuestos de alta calidad y garantía asegurada.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Steps */}
          <div className="space-y-4 reveal">
            {steps.map(item => (
              <div
                key={item.step}
                className="card-white flex gap-6 p-6"
                style={{ cursor: 'default' }}
              >
                <span
                  className="font-mono font-bold shrink-0 leading-none"
                  style={{ fontSize: 36, color: 'rgba(0,113,227,0.15)' }}
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="font-bold text-ink text-lg mb-1">{item.title}</h3>
                  <p className="text-ink-tertiary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {['Repuestos OEM', 'Técnicos Expertos', 'Garantía 90 días'].map(b => (
                <div
                  key={b}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
                  style={{ background: 'rgba(0,113,227,0.05)', border: '1px solid rgba(0,113,227,0.12)' }}
                >
                  <CheckCircle size={16} className="text-iphone-blue" />
                  <span className="text-xs text-ink-secondary font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card-white p-8 reveal reveal-delay-2">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,113,227,0.08)' }}>
                <Wrench size={20} className="text-iphone-blue" />
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Consultar Presupuesto</h3>
                <p className="text-ink-tertiary text-xs">Respuesta inmediata por WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="service-model">
                  ¿Qué iPhone tenés?
                </label>
                <select
                  id="service-model"
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  className="lead-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Seleccioná el modelo</option>
                  {popularModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="service-time">
                  Tiempo de uso / Estado general
                </label>
                <input
                  id="service-time"
                  type="text"
                  placeholder="Ej: Lo tengo hace 1 año"
                  value={activeTime}
                  onChange={e => setActiveTime(e.target.value)}
                  className="lead-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="service-issue">
                  ¿Qué problema presenta?
                </label>
                <textarea
                  id="service-issue"
                  placeholder="Ej: Se rompió la pantalla, no carga el pin..."
                  value={issue}
                  onChange={e => setIssue(e.target.value)}
                  className="lead-input"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="btn-primary w-full justify-center group"
                style={{ borderRadius: 14, padding: '15px 24px' }}
              >
                Consultar Técnico
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicioTecnico;
