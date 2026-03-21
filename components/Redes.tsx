import React from 'react';
import { Instagram, MapPin, Mail, Sparkles } from 'lucide-react';

const Redes: React.FC = () => {
  return (
    <section className="section-white py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center w-full">
        <span className="font-mono uppercase tracking-[0.4em] mb-4 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
          Comunidad
        </span>
        <h1 className="font-bold text-ink tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          Nuestras <span className="text-gradient-blue">Redes.</span>
        </h1>
        <p className="text-ink-secondary text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Enterate de las últimas novedades, ingresos de equipos y promociones exclusivas siguiéndonos todos los días.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Instagram */}
          <a
            href="https://instagram.com/applenav_"
            target="_blank"
            rel="noopener noreferrer"
            className="group card-white p-10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{ borderRadius: 28 }}
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <Instagram size={36} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-ink mb-1">Instagram</h3>
            <p className="text-ink-secondary text-base font-medium">@applenav_</p>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@applenav_"
            target="_blank"
            rel="noopener noreferrer"
            className="group card-white p-10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{ borderRadius: 28 }}
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-black group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={36} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-ink mb-1">TikTok</h3>
            <p className="text-ink-secondary text-base font-medium">@applenav_</p>
          </a>
        </div>

        {/* Contact Banner */}
        <div className="bg-iphone-blue/5 border border-iphone-blue/10 p-8 rounded-3xl reveal text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-ink text-xl mb-2">Contacto Directo</h4>
            <p className="text-ink-secondary text-sm">¿Tenés otra consulta? Escribinos por correo o visitá nuestro local.</p>
          </div>
          <div className="flex gap-4">
            <a href="mailto:contacto@applenavarro.com" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-iphone-blue hover:bg-iphone-blue/10 transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://maps.google.com/?q=Chacabuco+y+Rivadavia,+Lobos,+Buenos+Aires" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-iphone-blue hover:bg-iphone-blue/10 transition-colors">
              <MapPin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Redes;
