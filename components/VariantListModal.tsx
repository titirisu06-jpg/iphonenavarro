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

        <div className="p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ink">Variantes: {product.name}</h2>
              <p className="text-sm text-ink-tertiary mt-1">Gestión de inventario detallado por condición.</p>
            </div>
            <button 
              onClick={() => { setEditingVariant(null); setIsVariantFormOpen(true); }}
              className="btn-primary" 
              style={{ padding: '10px 16px', borderRadius: 12, marginRight: '32px' }}
            >
              <Plus size={16} /> Añadir Variante
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-ink-secondary">
                  <th className="p-4">Almacenamiento</th>
                  <th className="p-4">Color</th>
                  <th className="p-4">Batería</th>
                  <th className="p-4">Estado Stock</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-ink-tertiary">Cargando variantes...</td></tr>
                ) : variants.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-ink-tertiary">No hay variantes cargadas para este producto.</td></tr>
                ) : (
                  variants.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold">{v.storage}</td>
                      <td className="p-4">{v.color}</td>
                      <td className="p-4 flex items-center gap-1.5 font-medium"><Battery size={14}/> {v.battery}%</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${v.stock_status === 'in_stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {v.stock_status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-ink">${v.price}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => { setEditingVariant(v); setIsVariantFormOpen(true); }} className="p-2 text-ink-secondary hover:text-iphone-blue">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(v.id)} className="p-2 text-ink-secondary hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
