
import React, { useState, useEffect } from 'react';
import { products as localProducts } from '../data/products';
import { supabase } from '../utils/supabase';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { Category } from '../types';
import type { Product } from '../types';
import { MessageCircle, ChevronRight } from 'lucide-react';
import ProductModal from './ProductModal';

const categoryLabels: Record<Category, string> = {
  [Category.SELLADOS]: 'Sellados',
  [Category.USADOS_PREMIUM]: 'Usados Premium',
  [Category.USADOS]: 'Usados',
  [Category.ACCESORIOS]: 'Accesorios',
};

const badgeColors: Record<Category, React.CSSProperties> = {
  [Category.SELLADOS]: { background: '#0071E3', color: '#fff' },
  [Category.USADOS_PREMIUM]: { background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' },
  [Category.USADOS]: { background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' },
  [Category.ACCESORIOS]: { background: '#EDE9FE', color: '#6D28D9', border: '1px solid #DDD6FE' },
};

const ProductCard: React.FC<{ product: Product; onSelect: (p: Product) => void }> = ({ product, onSelect }) => {
  return (
    <div className="card-white overflow-hidden" style={{ borderRadius: 20 }}>
      {/* Image area */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 200, background: 'linear-gradient(140deg, #F5F5F7 0%, #EBEBF0 100%)', borderRadius: '20px 20px 0 0' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transition-transform duration-500 hover:scale-110"
          style={{ padding: 16, maxHeight: 180 }}
          loading="lazy"
        />
        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ ...badgeColors[product.category], letterSpacing: '0.06em' }}
        >
          {categoryLabels[product.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-ink text-lg mb-1 tracking-tight">{product.name}</h3>
        {product.description && (
          <p className="text-ink-tertiary text-sm leading-relaxed line-clamp-2 mb-3">{product.description}</p>
        )}
        {/* Storage chips */}
        {(() => {
          const allStorages = Array.from(new Set([
            ...(product.storages || []),
            ...((product as any).variants?.map((v: any) => v.storage) || [])
          ]));
          return allStorages.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {allStorages.map(s => (
                <span
                  key={Math.random() + s}
                  className="text-[10px] font-semibold text-ink-secondary px-2.5 py-1 rounded-lg"
                  style={{ background: '#F5F5F7', border: '1px solid #E5E5EA', fontFamily: 'monospace' }}
                >
                  {s}
                </span>
              ))}
            </div>
          ) : null;
        })()}
        {/* CTA */}
        <button
          onClick={() => onSelect(product)}
          className="btn-primary w-full justify-center"
          style={{ borderRadius: 12, padding: '11px 16px', fontSize: 14 }}
        >
          <MessageCircle size={14} />
          Consultar precio
        </button>
      </div>
    </div>
  );
};

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogItems, setCatalogItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadCatalog = async () => {
      setLoading(true);
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setCatalogItems(localProducts);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*, variants(storage)')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.error('Error fetching catalog:', error);
        setCatalogItems(localProducts);
      } else {
        setCatalogItems(data as Product[]);
      }
      setLoading(false);
    };

    loadCatalog();
  }, []);

  const categories: Array<{ key: Category | 'all'; label: string }> = [
    { key: 'all', label: 'Todos' },
    { key: Category.SELLADOS, label: 'Sellados' },
    { key: Category.USADOS_PREMIUM, label: 'Usados Premium' },
    { key: Category.USADOS, label: 'Usados' },
  ];

  const filtered = activeCategory === 'all' ? catalogItems : catalogItems.filter(p => p.category === activeCategory);

  return (
    <section id="catalogo" className="section-light py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 reveal">
          <span className="font-mono uppercase tracking-[0.4em] mb-3 block" style={{ fontSize: 11, color: '#0071E3', fontWeight: 600 }}>
            Catálogo
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <h2 className="font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.05 }}>
              iPhones para<br />
              <span className="text-gradient-blue">cada presupuesto.</span>
            </h2>
            <p className="text-ink-secondary text-base max-w-xs md:text-right leading-relaxed">
              Sellados con garantía oficial. Usados verificados. Siempre con confianza.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10 reveal reveal-delay-1">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setShowAll(false); }}
              className={`filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center text-ink-tertiary">
              <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-iphone-blue/20 border-t-iphone-blue rounded-full animate-spin mb-4" />
              <p className="font-semibold text-sm tracking-wide">Cargando catálogo...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-ink-tertiary">
              <p className="text-lg">No hay productos disponibles en esta categoría.</p>
            </div>
          ) : (
            (showAll ? filtered : filtered.slice(0, 8)).map((product, i) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${(i % 8) * 0.05}s` }}>
                <ProductCard product={product} onSelect={setSelectedProduct} />
              </div>
            ))
          )}
        </div>

        {/* Show More Button */}
        {!loading && !showAll && filtered.length > 8 && (
          <div className="mt-10 flex justify-center animate-fade-up">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-ink-secondary font-semibold rounded-2xl transition-all duration-300 flex items-center gap-2"
            >
              Ver Catálogo Completo <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal">
          <p className="text-ink-secondary mb-3 text-sm">
            ¿No ves el modelo que buscás?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20iPhone%20Navarro%2C%20busco%20un%20modelo%20específico.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-iphone-blue font-semibold text-sm hover:underline"
          >
            Consultanos por WhatsApp
            <ChevronRight size={15} />
          </a>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default Catalog;
