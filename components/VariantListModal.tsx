import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Product, ProductVariant } from '../types';
import { X, Plus, Edit2, Trash2, Battery } from 'lucide-react';
import { VariantFormModal } from './VariantFormModal';

interface VariantListModalProps {
  product: Product;
  onClose: () => void;
}

export const VariantListModal: React.FC<VariantListModalProps> = ({ product, onClose }) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVariantFormOpen, setIsVariantFormOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    fetchVariants();
  }, [product.id]);

  const fetchVariants = async () => {
    setLoading(true);
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setVariants([]); // empty mockup
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('variants')
      .select('*')
      .eq('product_id', product.id);

    if (!error && data) {
      setVariants(data as ProductVariant[]);
    }
    setLoading(false);
  };

  const handleDelete = async (variantId: string) => {
    if (!confirm('Eliminar variante?')) return;
    if (!import.meta.env.VITE_SUPABASE_URL) return;

    await supabase.from('variants').delete().eq('id', variantId);
    fetchVariants();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl relative my-auto min-h-[50vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
          <X size={18} />
        </button>

        <div className="p-4 lg:p-8 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="pr-10 sm:pr-0">
              <h2 className="text-xl lg:text-2xl font-bold text-ink truncate">Variantes: {product.name}</h2>
              <p className="text-xs lg:text-sm text-ink-tertiary mt-1">Gestión de inventario detallado por condición.</p>
            </div>
            <button 
              onClick={() => { setEditingVariant(null); setIsVariantFormOpen(true); }}
              className="btn-primary w-full sm:w-auto" 
              style={{ padding: '10px 16px', borderRadius: 12 }}
            >
              <Plus size={16} /> Añadir Variante
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 overflow-y-auto min-h-0">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-ink-secondary">
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider">Almacenamiento</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider">Color</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider">Batería</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider">Stock</th>
                    <th className="p-4 text-[11px] font-bold uppercase tracking-wider">Precio</th>
                    <th className="p-4 text-right text-[11px] font-bold uppercase tracking-wider pr-6">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={6} className="p-8 text-center text-ink-tertiary">Cargando variantes...</td></tr>
                  ) : variants.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-ink-tertiary">No hay variantes cargadas.</td></tr>
                  ) : (
                    variants.map(v => (
                      <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-semibold text-ink">{v.storage}</td>
                        <td className="p-4 text-ink-secondary">{v.color}</td>
                        <td className="p-4 flex items-center gap-1.5 font-medium text-ink-secondary">
                          <Battery size={14} className={v.battery < 85 ? 'text-amber-500' : 'text-green-500'} /> {v.battery}%
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter ${v.stock_status === 'in_stock' ? 'bg-green-100/50 text-green-700 border border-green-200' : 'bg-red-100/50 text-red-700 border border-red-200'}`}>
                            {v.stock_status === 'in_stock' ? 'En Stock' : 'Sin Stock'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-ink">${v.price}</td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => { setEditingVariant(v); setIsVariantFormOpen(true); }} className="p-2 text-ink-secondary hover:text-iphone-blue hover:bg-iphone-blue/5 rounded-lg transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(v.id)} className="p-2 text-ink-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {loading ? (
                <div className="p-8 text-center text-ink-tertiary">Cargando variantes...</div>
              ) : variants.length === 0 ? (
                <div className="p-8 text-center text-ink-tertiary">No hay variantes cargadas.</div>
              ) : (
                variants.map(v => (
                  <div key={v.id} className="p-4 flex flex-col gap-3 active:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-ink text-base">{v.storage} — {v.color}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-ink-secondary">
                          <span className="flex items-center gap-1 font-medium">
                            <Battery size={12} className={v.battery < 85 ? 'text-amber-500' : 'text-green-500'} /> {v.battery}%
                          </span>
                          <span className={`font-bold uppercase tracking-tighter ${v.stock_status === 'in_stock' ? 'text-green-600' : 'text-red-600'}`}>
                             {v.stock_status === 'in_stock' ? 'En Stock' : 'Sin Stock'}
                          </span>
                        </div>
                      </div>
                      <p className="font-bold text-iphone-blue">${v.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <button 
                        onClick={() => { setEditingVariant(v); setIsVariantFormOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-iphone-blue/10 text-iphone-blue rounded-xl font-bold text-xs"
                      >
                        <Edit2 size={14} /> Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(v.id)} 
                        className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {isVariantFormOpen && (
        <VariantFormModal 
          product_id={product.id}
          variant={editingVariant}
          onClose={() => setIsVariantFormOpen(false)}
          onSaved={() => { setIsVariantFormOpen(false); fetchVariants(); }}
        />
      )}
    </div>
  );
};
