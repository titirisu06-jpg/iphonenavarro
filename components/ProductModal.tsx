import React, { useState } from 'react';
import { X, MessageCircle, CheckCircle } from 'lucide-react';
import type { Product } from '../types';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    product.storages?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );

  const formattedPrice = typeof product.price === 'number' 
    ? `${product.currency === 'USD' ? 'U$D' : '$'} ${product.price.toLocaleString('es-AR')}`
    : product.price;

  const handleConsult = () => {
    const url = buildProductWhatsAppUrl(product.name, selectedStorage, selectedColor);
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
            {/* Storage */}
            {product.storages && product.storages.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-3">
                  Almacenamiento
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.storages.map(storage => (
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
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-3">
                  Color a consultar
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
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
