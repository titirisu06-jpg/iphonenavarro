import React, { useEffect, useMemo, useState } from 'react';
import { Battery, CheckCircle, MessageCircle, X } from 'lucide-react';
import { Category } from '../types';
import type { Product, ProductVariant } from '../types';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';
import { formatBattery, getVariantCondition } from '../utils/product';
import { supabase } from '../utils/supabase';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const unique = (values: string[]) => Array.from(new Set(values));

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(true);
  const [selectedStorage, setSelectedStorage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const [selectedBattery, setSelectedBattery] = useState<string>();

  useEffect(() => {
    const fetchVariants = async () => {
      setLoadingVariants(true);
      setVariants([]);

      const embeddedVariants = (product.variants || []).filter(
        (variant) => variant.stock_status !== 'out_of_stock',
      );

      if (embeddedVariants.length > 0) {
        const first = embeddedVariants[0];
        setVariants(embeddedVariants);
        setSelectedStorage(first.storage);
        setSelectedColor(first.color);
        setSelectedCondition(getVariantCondition(first, product.category));
        setSelectedBattery(first.battery);
        setLoadingVariants(false);
        return;
      }

      if (!import.meta.env.VITE_SUPABASE_URL) {
        setSelectedStorage(product.storages?.[0]);
        setSelectedColor(product.colors?.[0]);
        setLoadingVariants(false);
        return;
      }

      const { data, error } = await supabase
        .from('variants')
        .select('*')
        .eq('product_id', product.id)
        .eq('stock_status', 'in_stock');

      if (error) {
        console.error('Error fetching product variants:', error);
      }

      const availableVariants = (data || []) as ProductVariant[];
      setVariants(availableVariants);

      if (availableVariants.length > 0) {
        const first = availableVariants[0];
        setSelectedStorage(first.storage);
        setSelectedColor(first.color);
        setSelectedCondition(getVariantCondition(first, product.category));
        setSelectedBattery(first.battery);
      } else {
        setSelectedStorage(product.storages?.[0]);
        setSelectedColor(product.colors?.[0]);
      }

      setLoadingVariants(false);
    };

    fetchVariants();
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const displayStorages = useMemo(
    () => (variants.length > 0
      ? unique(variants.map((variant) => variant.storage))
      : unique(product.storages || []))
      .filter((storage) => storage && storage.trim().toUpperCase() !== 'N/A'),
    [product.storages, variants],
  );

  const displayColors = useMemo(() => {
    if (variants.length === 0) return unique(product.colors || []);
    return unique(
      variants
        .filter((variant) => variant.storage === selectedStorage)
        .map((variant) => variant.color),
    );
  }, [product.colors, selectedStorage, variants]);

  const displayConditions = useMemo(
    () => unique(
      variants
        .filter((variant) => variant.storage === selectedStorage && variant.color === selectedColor)
        .map((variant) => getVariantCondition(variant, product.category)),
    ),
    [product.category, selectedColor, selectedStorage, variants],
  );

  const displayBatteries = useMemo(
    () => unique(
      variants
        .filter((variant) => (
          variant.storage === selectedStorage
          && variant.color === selectedColor
          && getVariantCondition(variant, product.category) === selectedCondition
        ))
        .map((variant) => variant.battery),
    ),
    [product.category, selectedColor, selectedCondition, selectedStorage, variants],
  );

  useEffect(() => {
    if (displayStorages.length > 0 && (!selectedStorage || !displayStorages.includes(selectedStorage))) {
      setSelectedStorage(displayStorages[0]);
    }
  }, [displayStorages, selectedStorage]);

  useEffect(() => {
    if (displayColors.length > 0 && (!selectedColor || !displayColors.includes(selectedColor))) {
      setSelectedColor(displayColors[0]);
    }
  }, [displayColors, selectedColor]);

  useEffect(() => {
    if (displayConditions.length > 0 && (!selectedCondition || !displayConditions.includes(selectedCondition))) {
      setSelectedCondition(displayConditions[0]);
    }
  }, [displayConditions, selectedCondition]);

  useEffect(() => {
    if (displayBatteries.length > 0 && (!selectedBattery || !displayBatteries.includes(selectedBattery))) {
      setSelectedBattery(displayBatteries[0]);
    } else if (displayBatteries.length === 0) {
      setSelectedBattery(undefined);
    }
  }, [displayBatteries, selectedBattery]);

  const matchingVariants = variants.filter((variant) => (
    variant.storage === selectedStorage
    && variant.color === selectedColor
    && getVariantCondition(variant, product.category) === selectedCondition
    && variant.battery === selectedBattery
  ));
  const exactVariant = matchingVariants[0];
  const currentPrice = exactVariant?.price ?? product.price;
  const formattedPrice = typeof currentPrice === 'number'
    ? `${product.currency === 'USD' ? 'USD' : '$'} ${currentPrice.toLocaleString('es-AR')}`
    : currentPrice;
  const showBatteryOptions = displayBatteries.some((battery) => Boolean(formatBattery(battery)));

  const handleConsult = () => {
    const url = buildProductWhatsAppUrl(
      product.name,
      selectedStorage,
      selectedColor,
      selectedCondition,
      selectedBattery,
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative my-auto flex w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-2xl md:max-h-[90vh] md:flex-row md:overflow-hidden"
        style={{ borderRadius: 24, maxHeight: 'calc(100vh - 2rem)' }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Cerrar detalle"
        >
          <X size={18} className="text-gray-600" />
        </button>

        <div className="flex h-52 w-full shrink-0 items-center justify-center bg-gray-50/50 p-6 sm:h-64 md:h-auto md:w-1/2 md:p-8">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2 md:max-h-[420px]"
            style={{ filter: 'drop-shadow(0 18px 24px rgba(0,0,0,0.12))' }}
          />
        </div>

        <div className="flex w-full flex-col p-6 sm:p-8 md:w-1/2 md:overflow-y-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-iphone-blue mb-2">
            {product.category}
          </span>
          <h2 id="product-modal-title" className="text-2xl font-bold text-ink mb-2 tracking-tight">{product.name}</h2>

          <div className="text-2xl font-semibold text-ink mb-6">
            {formattedPrice}
          </div>

          {product.description && (
            <p className="text-ink-secondary text-sm leading-relaxed mb-6">{product.description}</p>
          )}

          <div className="space-y-5 mb-8">
            {loadingVariants ? (
              <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4" />
            ) : (
              <>
                {displayStorages.length > 0 && (
                  <OptionGroup
                    label="Almacenamiento"
                    options={displayStorages}
                    selected={selectedStorage}
                    onSelect={setSelectedStorage}
                  />
                )}

                {displayColors.length > 0 && (
                  <OptionGroup
                    label="Color"
                    options={displayColors}
                    selected={selectedColor}
                    onSelect={setSelectedColor}
                  />
                )}

                {(product.category === Category.SELLADOS || product.category === Category.USADOS)
                  && displayConditions.length > 0 && (
                  <OptionGroup
                    label="Condición"
                    options={displayConditions}
                    selected={selectedCondition}
                    onSelect={setSelectedCondition}
                  />
                )}

                {showBatteryOptions && (
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
                      Batería
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {displayBatteries.filter((battery) => formatBattery(battery)).map((battery) => (
                        <button
                          key={battery}
                          onClick={() => setSelectedBattery(battery)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                            selectedBattery === battery
                              ? 'border-iphone-blue bg-iphone-blue/5 text-iphone-blue'
                              : 'border-gray-200 text-ink-secondary hover:border-gray-300'
                          }`}
                        >
                          <Battery size={14} /> {formatBattery(battery)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.category === Category.USADOS && exactVariant && (
                  <p className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                    {matchingVariants.length} {matchingVariants.length === 1 ? 'unidad disponible' : 'unidades disponibles'} con esta configuración
                  </p>
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

interface OptionGroupProps {
  label: string;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
}

const OptionGroup: React.FC<OptionGroupProps> = ({ label, options, selected, onSelect }) => (
  <div>
    <label className="block text-xs font-semibold text-ink-secondary uppercase tracking-wider mb-2">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
            selected === option
              ? 'border-iphone-blue bg-iphone-blue/5 text-iphone-blue'
              : 'border-gray-200 text-ink-secondary hover:border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default ProductModal;
