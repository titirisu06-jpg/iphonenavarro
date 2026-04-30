
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero3D from './components/Hero3D';
import Catalog from './components/Catalog';
import TradeIn from './components/TradeIn';
import Mayoristas from './components/Mayoristas';
import Garantia from './components/Garantia';
import Nosotros from './components/Nosotros';
import ServicioTecnico from './components/ServicioTecnico';
import Redes from './components/Redes';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import StoreDestination from './components/StoreDestination';
import FeaturedCatalog from './components/FeaturedCatalog';
import Footer from './components/Footer';
import FaqPrivacy from './components/FaqPrivacy';
import { buildWhatsAppUrl } from './utils/whatsapp';

const WhatsAppIcon = ({ size = 28, color = "white", className = "" }: { size?: number, color?: string, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill={color} 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const WhatsAppFab: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl();
  return (
    <a
      id="whatsapp-fab"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-[90] w-14 h-14 rounded-full flex items-center justify-center group"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      aria-label="Contactar por WhatsApp"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.55)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
      }}
    >
      <WhatsAppIcon size={28} color="white" className="group-hover:rotate-12 transition-transform duration-200" />
      <span
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200"
        style={{
          background: '#1D1D1F',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: 10,
        }}
      >
        ¿En qué te ayudamos?
      </span>
    </a>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero3D />
        <StoreDestination />
        <FeaturedCatalog />
        <TradeIn />
        <ServicioTecnico />
        <Mayoristas />
        <Garantia />
        <Nosotros />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};



const CatalogPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <Catalog />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

const RedesPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="pt-24 min-h-screen">
        <Redes />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

const FaqPrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <FaqPrivacy />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/catalogo" element={<CatalogPage />} />
    <Route path="/redes" element={<RedesPage />} />
    <Route path="/faq" element={<FaqPrivacyPage />} />
    <Route path="/privacidad" element={<FaqPrivacyPage />} />
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Routes>
);

export default App;
