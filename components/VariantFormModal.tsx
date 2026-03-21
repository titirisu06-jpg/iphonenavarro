import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ProductVariant } from '../types';
import { X, Save } from 'lucide-react';

interface VariantFormModalProps {
  product_id: string;
  variant?: ProductVariant | null;
  onClose: () => void;
  onSaved: () => void;
}

export const VariantFormModal: React.FC<VariantFormModalProps> = ({ product_id, variant, onClose, onSaved }) => {
  const [formData, setFormData] = useState<Partial<ProductVariant>>({
    product_id,
    storage: '',
    color: '',
    battery: '100',
    price: 0,
    stock_status: 'in_stock'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variant) setFormData(variant);
  }, [variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL) {
      alert('Modo Demo: Variante simulada guardada localmente.');
      onSaved();
      return;
    }

    if (formData.id) {
      await supabase.from('variants').update(formData).eq('id', formData.id);
    } else {
      await supabase.from('variants').insert([formData]);
    }

    setLoading(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X size={16} />
        </button>

        <div className="p-6">
          <h3 className="text-xl font-bold text-ink mb-5">
            {variant ? 'Editar Variante' : 'Añadir Variante'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase mb-1">Stock</label>
                <select name="stock_status" value={formData.stock_status} onChange={handleChange} className="lead-input">
                  <option value="in_stock">En Stock</option>
                  <option value="out_of_stock">Sin Stock</option>
                  <option value="preorder">Pre-Orden</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase mb-1">Almacenamiento</label>
                <input required name="storage" value={formData.storage} onChange={handleChange} className="lead-input" placeholder="128GB" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase mb-1">Color</label>
                <input required name="color" value={formData.color} onChange={handleChange} className="lead-input" placeholder="Black" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase mb-1">Batería (%)</label>
                <input required type="number" name="battery" value={formData.battery} onChange={handleChange} className="lead-input" min="0" max="100" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase mb-1">Precio Variación ($)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="lead-input" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-ink-secondary hover:bg-gray-100">
                Cancelar
              </button>
              <button disabled={loading} type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                <Save size={16} /> Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
