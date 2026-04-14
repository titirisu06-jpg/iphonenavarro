import React from 'react';
import { MapPin } from 'lucide-react';

const Nosotros: React.FC = () => {
  return (
    <section id="nosotros" className="section-white py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <div className="reveal">
            <span className="font-mono uppercase tracking-[0.4em] mb-4 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
              Nosotros
            </span>
            <h2 className="font-bold text-ink tracking-tight leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Especialistas en<br />
              <span className="text-gradient-blue">iPhone.</span>
            </h2>
            <p className="text-ink-secondary text-lg leading-relaxed mb-8">
              En iPhone Navarro, nos dedicamos a ofrecerte la mejor experiencia en tecnología Apple. Con años de experiencia en la industria, garantizamos calidad, seguridad y asesoramiento personalizado en cada una de tus compras y reparaciones.
            </p>

            {/* Ubicación */}
            <div className="bg-iphone-blue/5 border border-iphone-blue/10 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-iphone-blue/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="font-bold text-ink text-xl mb-2 relative z-10">Nuestra Ubicación</h3>
              <p className="text-ink-secondary text-sm mb-4 relative z-10 max-w-sm">
                Vení a conocernos a nuestro local en Lobos y descubrí todo lo que tenemos para vos.
              </p>
              
              <div className="relative z-10 w-full h-48 rounded-xl overflow-hidden border border-iphone-blue/10 mb-4 bg-white">
                <iframe 
                  src="https://maps.google.com/maps?q=-35.187597,-59.098280&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación iPhone Navarro Lobos"
                ></iframe>
              </div>

              <a 
                href="https://maps.app.goo.gl/Kz1Wp4RTyCDDPJWh9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-iphone-blue font-semibold text-sm hover:underline relative z-10"
              >
                <MapPin size={16} />
                Abrir en Google Maps
              </a>
            </div>
          </div>

          {/* Video */}
          <div className="reveal reveal-delay-2 flex justify-center lg:justify-end">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100" style={{ maxWidth: 320, transform: 'rotate(2deg)' }}>
              <video 
                src="/58351163-a664-4bd9-a1d9-14ea299a52ba.MP4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '9/16' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
