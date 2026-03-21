import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle, Battery } from 'lucide-react';
import type { Product, ProductVariant } from '../types';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';
import { supabase } from '../utils/supabase';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(true);

  const [selectedStorage, setSelectedStorage] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedBattery, setSelectedBattery] = useState<string | undefined>();

  useEffect(() => {
    const fetchVariants = async () => {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setSelectedStorage(product.storages?.[0]);
        setSelectedColor(product.colors?.[0]);
        setLoadingVariants(false);
        return;
      }
      const { data } = await supabase
        .from('variants')
        .select('*')
        .eq('product_id', product.id)
        .eq('stock_status', 'in_stock');
        
      if (data && data.length > 0) {
        setVariants(data);
        setSelectedStorage(data[0].storage);
        setSelectedColor(data[0].color);
        setSelectedBattery(data[0].battery);
      } else {
        setSelectedStorage(product.storages?.[0]);
        setSelectedColor(product.colors?.[0]);
      }
      setLoadingVariants(false);
    };
    fetchVariants();
  }, [product.id]);

  const displayStorages = variants.length > 0 
    ? Array.from(new Set(variants.map(v => v.storage))) 
    : product.storages || [];

  const displayColors = variants.length > 0 && selectedStorage
    ? Array.from(new Set(variants.filter(v => v.storage === selectedStorage).map(v => v.color))) 
    : product.colors || [];

  const displayBatteries = variants.length > 0 && selectedStorage && selectedColor
    ? Array.from(new Set(variants.filter(v => v.storage === selectedStorage && v.color === selectedColor).map(v => v.battery)))
    : [];

  useEffect(() => {
    if (variants.length > 0 && selectedColor && displayColors.length > 0) {
      if (!displayColors.includes(selectedColor)) setSelectedColor(displayColors[0]);
    }
  }, [selectedStorage, displayColors]);

  useEffect(() => {
    if (variants.length > 0 && selectedBattery && displayBatteries.length > 0) {
      if (!displayBatteries.includes(selectedBattery)) setSelectedBattery(displayBatteries[0]);
    }
  }, [selectedColor, displayBatteries]);

  const exactVariant = variants.find(v => v.storage === selectedStorage && v.color === selectedColor && v.battery === selectedBattery);
  const currentPrice = exactVariant ? exactVariant.price : product.price;

  const formattedPrice = typeof currentPrice === 'number' 
    ? `${product.currency === 'USD' ? 'U$D' : '$'} ${currentPrice.toLocaleString('es-AR')}`
    : currentPrice;

  const handleConsult = () => {
    const url = buildProductWhatsAppUrl(product.name, selectedStorage, selectedColor, selectedBattery);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row" 
        style={{ borderRadius: 24, maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-50/50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-contain max-h-64 md:max-h-full"
            style={{ filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.15))' }}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-iphone-blue mb-2">
            {product.category}
          </span>
          <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">{product.name}</h2>
          
          <div className="text-2xl font-semibold text-ink mb-6">
            {formattedPrice}
            <span className="text-sm font-normal text-ink-tertiary ml-2">estimado</span>
          </div>

          {product.description && (
            <p className="text-ink-secondary text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Options */}
          <div className="space-y-5 mb-8">
            {loadingVariants ? (
              <div className="animate-pulse flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <>
                {/* Storage */}
                {displayStorages.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
                      Almacenamiento
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {displayStorages.map(storage => (
                        <button
                          key={storage}
                          onClick={() => setSelectedStorage(storage)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                            selectedStorage === storage 
                            ? 'border-iphone-blue bg-iphone-blue/5 text-iphone-blue' 
                            : 'border-gray-200 text-ink-secondary hover:border-gray-300'
                          }`}
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {displayColors.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {displayColors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                            selectedColor === color 
                            ? 'border-iphone-blue bg-iphone-blue/5 text-iphone-blue' 
                            : 'border-gray-200 text-ink-secondary hover:border-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Batteries */}
                {displayBatteries.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
                      Batería
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {displayBatteries.map(battery => (
                        <button
                          key={battery}
                          onClick={() => setSelectedBattery(battery)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                            selectedBattery === battery 
                            ? 'border-iphone-blue bg-iphone-blue/5 text-iphone-blue' 
                            : 'border-gray-200 text-ink-secondary hover:border-gray-300'
                          }`}
                        >
                          <Battery size={14} /> {battery}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-2 text-xs text-ink-tertiary">
              <CheckCircle size={14} className="text-green-500" />
              <span>Garantía asegurada</span>
            </div>
            <button
              onClick={handleConsult}
              className="btn-primary w-full justify-center"
              style={{ borderRadius: 14, padding: '16px', fontSize: 16 }}
            >
              <MessageCircle size={18} />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
