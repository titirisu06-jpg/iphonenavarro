
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
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from './utils/whatsapp';

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
      <MessageCircle size={28} color="white" className="group-hover:rotate-12 transition-transform duration-200" />
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
        <Catalog />
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

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/redes" element={<RedesPage />} />
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Routes>
);

export default App;
