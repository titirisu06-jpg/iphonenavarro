import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Product, Category } from '../types';
import { X, Save } from 'lucide-react';

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose, onSaved }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: Category.SELLADOS,
    price: 0,
    currency: 'USD',
    image: '',
    description: '',
    storages: [],
    colors: []
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'storages' | 'colors') => {
    const array = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL) {
      alert('Modo Demo: Producto guardado localmente (no impacta en BD).');
      onSaved();
      return;
    }

    let finalImageUrl = formData.image;

    // Upload image if a new one is selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `imagenes_producto/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, imageFile, { upsert: true });

      if (uploadError) {
        alert('Error subiendo imagen. Verificá haber creado un bucket llamado "products" (Público) en Storage de Supabase.');
        console.error(uploadError);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const payload = { ...formData, image: finalImageUrl };

    if (formData.id) {
      await supabase.from('products').update(payload).eq('id', formData.id);
    } else {
      const slugId = formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
      await supabase.from('products').insert([{ ...payload, id: slugId }]);
    }

    setLoading(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X size={18} />
        </button>

        <div className="p-5 lg:p-8">
          <h2 className="text-2xl font-bold text-ink mb-6">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Nombre</label>
                <input required name="name" value={formData.name || ''} onChange={handleChange} className="lead-input" placeholder="Ej: iPhone 15 Pro Max" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="lead-input">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Precio</label>
                <div className="flex gap-2">
                  <select name="currency" value={formData.currency} onChange={handleChange} className="lead-input w-24 px-2">
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                  <input required type="number" name="price" value={formData.price || ''} onChange={handleChange} className="lead-input flex-1" placeholder="Ej: 900" />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Imagen del Producto</label>
                {formData.image && !imageFile && (
                  <div className="mb-3">
                    <img src={formData.image} alt="Preview" className="h-20 w-auto rounded-lg object-contain bg-gray-50 border border-gray-100" />
                  </div>
                )}
                <div className="flex gap-3 items-center">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-iphone-blue/10 file:text-iphone-blue hover:file:bg-iphone-blue/20 transition-colors cursor-pointer border border-gray-200 rounded-xl" 
                  />
                  {!formData.image && !imageFile && <span className="text-red-500 text-xl font-bold">*</span>}
                </div>
                <p className="text-xs text-ink-tertiary mt-2">La imagen se guardará automáticamente en Supabase.</p>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Descripción (Opcional)</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange} className="lead-input" rows={2} />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Almacenamientos (separar con coma)</label>
                <input 
                  type="text" 
                  value={formData.storages?.join(', ') || ''} 
                  onChange={e => handleArrayChange(e, 'storages')} 
                  className="lead-input" 
                  placeholder="64GB, 128GB, 256GB" 
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">Colores (separar con coma)</label>
                <input 
                  type="text" 
                  value={formData.colors?.join(', ') || ''} 
                  onChange={e => handleArrayChange(e, 'colors')} 
                  className="lead-input" 
                  placeholder="Black, White, Natural Titanium" 
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 rounded-xl font-medium text-ink-secondary hover:bg-gray-100 transition-colors order-2 sm:order-1">
                Cancelar
              </button>
              <button disabled={loading} type="submit" className="btn-primary w-full sm:w-auto order-1 sm:order-2" style={{ padding: '12px 24px', borderRadius: 12 }}>
                <Save size={18} />
                {loading ? 'Guardando...' : 'Guardar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
