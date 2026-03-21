
import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Star, Package, CreditCard, MessageCircle } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const navLinks = [
  { name: 'Catálogo', id: 'catalogo', icon: <Smartphone size={16} /> },
  { name: 'Plan Canje', id: 'plan-canje', icon: <Star size={16} /> },
  { name: 'Mayoristas', id: 'mayoristas', icon: <Package size={16} /> },
  { name: 'Garantía', id: 'garantia', icon: <Star size={16} /> },
  { name: 'Medios de Pago', id: 'medios-de-pago', icon: <CreditCard size={16} /> },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Hero is full-screen dark, so nav becomes light glassmorph after scroll
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToSection(id);
  };

  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav-scrolled py-3 shadow-sm'
          : 'glass-nav-hero py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-9 h-9 bg-iphone-blue rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-bold text-base leading-none tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-ink' : 'text-white'
              }`}
            >
              iPhone Navarro
            </span>
            <span className="font-mono text-[9px] text-iphone-blue uppercase tracking-widest">
              Navarro · Buenos Aires
            </span>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={e => handleNavClick(e, link.id)}
              className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled
                  ? 'text-ink-secondary hover:text-ink'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2.5"
            style={{ padding: '10px 20px', fontSize: 14 }}
          >
            <MessageCircle size={14} />
            Escribinos
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-ink' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#FFFFFF', top: 0, paddingTop: 80 }}
      >
        <div className="flex flex-col px-8 pt-8 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="flex items-center gap-4 py-4 text-xl font-semibold text-ink border-b border-gray-100 cursor-pointer"
              style={{ color: '#1D1D1F' }}
              onClick={e => handleNavClick(e, link.id)}
            >
              <span style={{ color: '#0071E3' }}>{link.icon}</span>
              {link.name}
            </a>
          ))}
          <div className="pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              style={{ borderRadius: 16 }}
            >
              <MessageCircle size={20} />
              Escribinos por WhatsApp
            </a>
          </div>
          <p className="text-center text-xs font-mono text-ink-tertiary pt-4 tracking-widest uppercase">
            +54 9 2227 58-0719
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
