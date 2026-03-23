
import React, { useState } from 'react';
import { buildTradeInWhatsAppUrl, WHATSAPP_NUMBER } from '../utils/whatsapp';
import { ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

const popularModels = [
  'iPhone 11', 'iPhone 11 Pro', 'iPhone 12', 'iPhone 12 Pro',
  'iPhone 13', 'iPhone 13 Pro', 'iPhone 14', 'iPhone 14 Pro',
  'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Otro',
];

const steps = [
  { step: '01', title: 'Contanos tu equipo', desc: 'Modelo, estado y batería. Todo por WhatsApp.' },
  { step: '02', title: 'Recibís la tasación', desc: 'Te damos el valor del canje en el momento.' },
  { step: '03', title: 'Elegís tu nuevo iPhone', desc: 'Aplicás el crédito y pagás solo la diferencia.' },
];

const TradeIn: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [battery, setBattery] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const url = buildTradeInWhatsAppUrl(selectedModel || 'No especificado', battery, activeTime, notes);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="plan-canje" className="section-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 reveal">
          <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
            Plan Canje
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.05 }}>
              Entregá el tuyo.<br />
              <span className="text-gradient-blue">Llevate uno mejor.</span>
            </h2>
            <p className="text-ink-tertiary text-base max-w-xs leading-relaxed">
              Tomamos tu iPhone usado como parte de pago. <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20iPhone%20Navarro%2C%20busco%20un%20modelo%20específico.`} target="_blank" rel="noopener noreferrer" className="text-iphone-blue hover:underline">Rápido, sin vueltas.</a>
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
              {['Sin intermediarios', 'Precio justo', 'Al instante'].map(b => (
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
                <RefreshCw size={20} className="text-iphone-blue" />
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Calculá tu canje</h3>
                <p className="text-ink-tertiary text-xs">Respuesta inmediata por WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="tradein-model">
                  ¿Qué iPhone tenés?
                </label>
                <select
                  id="tradein-model"
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
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="tradein-battery">
                  Condición de batería (%)
                </label>
                <input
                  id="tradein-battery"
                  type="number"
                  placeholder="Ej: 85"
                  value={battery}
                  onChange={e => setBattery(e.target.value)}
                  className="lead-input"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="tradein-time">
                  Tiempo de uso
                </label>
                <select
                  id="tradein-time"
                  value={activeTime}
                  onChange={e => setActiveTime(e.target.value)}
                  className="lead-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Seleccionar</option>
                  <option value="Menos de 6 meses">Menos de 6 meses</option>
                  <option value="Entre 6 y 12 meses">Entre 6 y 12 meses</option>
                  <option value="Más de 1 año">Más de 1 año</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2" htmlFor="tradein-notes">
                  Detalles adicionales (roturas, rayas, etc.)
                </label>
                <textarea
                  id="tradein-notes"
                  placeholder="Opcional. Ej: Tiene una marca en el borde..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="lead-input"
                  rows={2}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="btn-primary w-full justify-center group"
                style={{ borderRadius: 14, padding: '15px 24px' }}
              >
                Consultar por WhatsApp
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center font-mono text-xs text-ink-tertiary tracking-wider">+54 9 2227 50-2299</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeIn;
