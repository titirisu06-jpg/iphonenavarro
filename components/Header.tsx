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
    // Wait until almost reaching the light-themed Catalog section to switch themes
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize state
    handleScroll();
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
      className={`fixed top-4 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-5xl z-[100] transition-colors duration-500 will-change-transform ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          : 'bg-[#1D1D1F]/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
      } rounded-[24px] lg:rounded-full`}
    >
      <div className={`flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'max-h-[480px]' : 'max-h-[60px] lg:max-h-[72px]'}`}>
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 lg:py-3.5 h-[60px] lg:h-[72px]">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
          >
            <div className="w-9 h-9 bg-[#0071E3] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-semibold text-[15px] leading-none tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-[#1D1D1F]' : 'text-white'
                }`}
              >
                iPhone Navarro
              </span>
              <span className={`font-mono text-[9px] mt-0.5 uppercase tracking-[0.1em] transition-colors duration-300 ${isScrolled ? 'text-[#0071E3]' : 'text-white/70'}`}>
                Premium Tech
              </span>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={e => handleNavClick(e, link.id)}
                className={`text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                  isScrolled
                    ? 'text-[#424245] hover:text-[#1D1D1F]'
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
              className="bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-200 shadow-[0_4px_16px_rgba(0,113,227,0.3)] hover:shadow-[0_8px_24px_rgba(0,113,227,0.45)] transform hover:-translate-y-0.5"
            >
              <MessageCircle size={14} />
              Hablanos
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 -mr-2 rounded-full transition-colors ${isScrolled ? 'text-[#1D1D1F] hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Internal to the pill) */}
        <div 
          className={`lg:hidden border-t px-5 transition-opacity duration-300 delay-100 ${
            isMobileMenuOpen ? 'opacity-100 pb-5' : 'opacity-0 pb-0'
          } ${isScrolled ? 'border-black/5' : 'border-white/10'}`}
        >
          <div className="flex flex-col space-y-1 mt-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={e => handleNavClick(e, link.id)}
                className={`flex items-center gap-3 py-3 px-3 rounded-xl transform transition-all active:scale-[0.98] ${
                  isScrolled 
                    ? 'text-[#1D1D1F] hover:bg-black/5' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isScrolled ? 'bg-[#0071E3]/10 text-[#0071E3]' : 'bg-white/10 text-white'}`}>
                  {link.icon}
                </div>
                <span className="font-semibold text-[15px]">{link.name}</span>
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#0071E3] hover:bg-[#0077ED] text-white text-[15px] font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,113,227,0.3)] active:scale-[0.98] transition-all"
            >
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

