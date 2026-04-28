import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const StoreDestination: React.FC = () => {
  return (
    <section className="section-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          
          {/* Catalog Area */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-ink tracking-tight mb-8 leading-tight">
              Todo el stock.<br/>
              <span className="text-iphone-blue">En un solo lugar.</span>
            </h2>
            <p className="text-ink-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light">
              Conocé nuestros precios actualizados en tiempo real. Equipos nuevos sellados y usados seleccionados bajo estrictos estándares de calidad.
            </p>
            
            <Link 
              to="/catalogo" 
              className="inline-flex items-center gap-3 bg-ink text-white font-medium px-8 py-4 rounded-full hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              Explorar Catálogo
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Location Area - Minimalist elegant block */}
          <div className="w-full lg:w-[400px] bg-surface-light rounded-[2rem] p-10 border border-black/5 hover:border-iphone-blue/20 transition-colors duration-500 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-iphone-blue mb-8 shadow-sm">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-ink mb-4 tracking-tight">Nuestro Local</h3>
              <p className="text-ink-secondary leading-relaxed mb-10 font-light">
                Navarro, Buenos Aires.<br/>
                Vení a conocer los equipos personalmente y recibí nuestro asesoramiento.
              </p>
            </div>
            
            <a 
              href="https://maps.app.goo.gl/Kz1Wp4RTyCDDPJWh9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full bg-white border border-black/5 rounded-2xl p-4 text-ink font-medium hover:shadow-md transition-all duration-300"
            >
              <span className="pl-2">Ver en Google Maps</span>
              <div className="w-10 h-10 rounded-full bg-iphone-blue/5 flex items-center justify-center text-iphone-blue group-hover:bg-iphone-blue group-hover:text-white transition-colors duration-300">
                <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreDestination;
