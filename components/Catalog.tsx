
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  [Category.MACBOOKS]: 'MacBooks',
  [Category.IPADS]: 'iPads',
  [Category.APPLE_WATCH]: 'Apple Watch',
  [Category.AIRPODS]: 'AirPods',
};

const badgeColors: Record<Category, React.CSSProperties> = {
  [Category.SELLADOS]: { background: '#0071E3', color: '#fff' },
  [Category.USADOS_PREMIUM]: { background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' },
  [Category.USADOS]: { background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' },
  [Category.ACCESORIOS]: { background: '#EDE9FE', color: '#6D28D9', border: '1px solid #DDD6FE' },
  [Category.MACBOOKS]: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569' },
  [Category.IPADS]: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
  [Category.APPLE_WATCH]: { background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' },
  [Category.AIRPODS]: { background: '#fdf4ff', color: '#a21caf', border: '1px solid #fbcfe8' },
};

const ProductCard: React.FC<{ product: Product; onSelect: (p: Product) => void }> = ({ product, onSelect }) => {
  return (
    <div 
      className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col justify-between" 
      style={{ borderRadius: '24px', padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden flex items-center justify-center bg-gray-50/50 mb-4" style={{ height: 220, borderRadius: '16px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
          style={{ padding: 20, maxHeight: 200 }}
          loading="lazy"
        />
        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white shadow-sm"
          style={{ color: '#1D1D1F', letterSpacing: '0.04em' }}
        >
          {categoryLabels[product.category]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-ink text-lg leading-tight mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{product.description}</p>
        )}
        
        {/* Storage chips */}
        {(() => {
          const allStorages = Array.from(new Set([
            ...(product.storages || []),
            ...((product as any).variants?.map((v: any) => v.storage) || [])
          ]));
          return allStorages.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
              {allStorages.map(s => (
                <span
                  key={Math.random() + s}
                  className="text-xs font-medium text-gray-600 px-2.5 py-1 rounded-md bg-gray-100/80"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : <div className="mt-auto mb-5"></div>;
        })()}
        
        {/* CTA */}
        <button
          onClick={() => onSelect(product)}
          className="w-full justify-center bg-black hover:bg-gray-800 text-white font-medium flex items-center gap-2 transition-colors"
          style={{ borderRadius: '12px', padding: '12px 16px', fontSize: '15px' }}
        >
          Consultar precio
        </button>
      </div>
    </div>
  );
};

const categoryWeight: Record<string, number> = {
  [Category.SELLADOS]: 1,
  [Category.USADOS_PREMIUM]: 2,
  [Category.USADOS]: 3,
  [Category.MACBOOKS]: 4,
  [Category.IPADS]: 5,
  [Category.APPLE_WATCH]: 6,
  [Category.AIRPODS]: 7,
  [Category.ACCESORIOS]: 8,
};

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(
    (categoryParam as Category) || 'all'
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogItems, setCatalogItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam as Category);
    } else {
      setActiveCategory('all');
    }
  }, [categoryParam]);

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
        const sortedData = (data as Product[]).sort((a, b) => {
          const wA = categoryWeight[a.category] || 99;
          const wB = categoryWeight[b.category] || 99;
          return wA - wB;
        });
        setCatalogItems(sortedData);
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
    { key: Category.MACBOOKS, label: 'MacBooks' },
    { key: Category.IPADS, label: 'iPads' },
    { key: Category.APPLE_WATCH, label: 'Apple Watch' },
    { key: Category.AIRPODS, label: 'AirPods' },
    { key: Category.ACCESORIOS, label: 'Accesorios' },
  ];

  const handleCategoryChange = (key: Category | 'all') => {
    setActiveCategory(key);
    setShowAll(false);
    if (key === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: key });
    }
  };

  const filtered = activeCategory === 'all' ? catalogItems : catalogItems.filter(p => p.category === activeCategory);

  return (
    <section id="catalogo" className="bg-white py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="font-semibold text-ink tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            Catálogo de Productos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Encontrá el equipo ideal. Simple, rápido y con la mejor garantía.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div 
            className="flex gap-2 overflow-x-auto pb-4 max-w-full" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
            <div className="flex gap-2 hide-scroll px-2">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`shrink-0 transition-all duration-200 border ${
                    activeCategory === cat.key 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  style={{ minHeight: '40px', padding: '0 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 500 }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[400px]">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-[24px] h-[380px] animate-pulse border border-gray-200" />
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-ink-tertiary">
              <p className="text-lg">No hay productos disponibles en esta categoría.</p>
            </div>
          ) : (
            (showAll ? filtered : filtered.slice(0, 8)).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              >
                <ProductCard product={product} onSelect={setSelectedProduct} />
              </motion.div>
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
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-3 text-sm">
            ¿No ves el modelo que buscás?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20iPhone%20Navarro%2C%20busco%20un%20modelo%20específico.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-black font-medium hover:underline decoration-gray-300 underline-offset-4"
          >
            Consultanos por WhatsApp
            <ChevronRight size={16} />
          </a>
        </motion.div>
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
