import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ImageOff, Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products as localProducts } from '../data/products';
import { Category } from '../types';
import type { Product, ProductVariant } from '../types';
import { getVariantCondition } from '../utils/product';
import { supabase } from '../utils/supabase';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import ProductModal from './ProductModal';

type SortOption = 'recommended' | 'model-desc' | 'price-asc' | 'price-desc' | 'name';
type ConditionFilter = 'all' | 'Sellado' | 'Semi';

const categoryLabels: Record<Category, string> = {
  [Category.SELLADOS]: 'Sellados',
  [Category.USADOS_PREMIUM]: 'Usados Premium',
  [Category.USADOS]: 'Usados',
  [Category.MACBOOKS]: 'MacBooks',
  [Category.IPADS]: 'iPads',
  [Category.APPLE_WATCH]: 'Apple Watch',
  [Category.AIRPODS]: 'AirPods',
  [Category.ACCESORIOS]: 'Accesorios',
};

const categoryOrder: Category[] = [
  Category.SELLADOS,
  Category.USADOS_PREMIUM,
  Category.USADOS,
  Category.MACBOOKS,
  Category.IPADS,
  Category.APPLE_WATCH,
  Category.AIRPODS,
  Category.ACCESORIOS,
];

const categoryWeight = new Map(categoryOrder.map((category, index) => [category, index]));

const normalizeText = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es');

const normalizeStorage = (value: string) => value.replace(/\s/g, '').toUpperCase();

const storageRank = (value: string): number => {
  const normalized = normalizeStorage(value);
  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount)) return Number.POSITIVE_INFINITY;
  return normalized.endsWith('TB') ? amount * 1024 : amount;
};

const availableVariants = (product: Product): ProductVariant[] => (
  (product.variants || []).filter((variant) => variant.stock_status !== 'out_of_stock')
);

const productStorages = (product: Product): string[] => Array.from(new Set([
  ...(product.storages || []),
  ...availableVariants(product).map((variant) => variant.storage),
]));

const numericPrice = (price: number | string): number => {
  if (typeof price === 'number') return price;
  const parsed = Number(String(price).replace(/[^0-9.,-]/g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
};

const minimumPrice = (product: Product): number => {
  const prices = availableVariants(product)
    .map((variant) => numericPrice(variant.price))
    .filter(Number.isFinite);
  return prices.length > 0 ? Math.min(...prices) : numericPrice(product.price);
};

const isIphone = (product: Product): boolean => normalizeText(product.name).startsWith('iphone');

const iphoneModelRank = (product: Product): [number, number] => {
  const normalizedName = normalizeText(product.name);
  const generation = Number(normalizedName.match(/iphone\s*(\d+)/)?.[1] || 0);
  const tier = normalizedName.includes('pro max')
    ? 5
    : normalizedName.includes('pro')
      ? 4
      : normalizedName.includes('plus')
        ? 3
        : /\d+e\b/.test(normalizedName)
          ? 1
          : 2;
  return [generation, tier];
};

const compareModelsNewest = (a: Product, b: Product): number => {
  const aIsIphone = isIphone(a);
  const bIsIphone = isIphone(b);
  if (aIsIphone && bIsIphone) {
    const [aGeneration, aTier] = iphoneModelRank(a);
    const [bGeneration, bTier] = iphoneModelRank(b);
    return bGeneration - aGeneration || bTier - aTier || a.name.localeCompare(b.name, 'es');
  }
  if (aIsIphone !== bIsIphone) return aIsIphone ? -1 : 1;
  return a.name.localeCompare(b.name, 'es', { numeric: true });
};

const compareRecommended = (a: Product, b: Product): number => {
  const categoryDifference = (categoryWeight.get(a.category) ?? 99) - (categoryWeight.get(b.category) ?? 99);
  return categoryDifference || compareModelsNewest(a, b);
};

const formatPrice = (product: Product, price = minimumPrice(product)): string => {
  if (!Number.isFinite(price)) return String(product.price);
  return `${product.currency === 'USD' ? 'USD' : '$'} ${price.toLocaleString('es-AR')}`;
};

interface ProductCardProps {
  product: Product;
  storageFilter: string;
  conditionFilter: ConditionFilter;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  storageFilter,
  conditionFilter,
  onSelect,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const variants = availableVariants(product);
  const relevantVariants = variants.filter((variant) => (
    (storageFilter === 'all' || normalizeStorage(variant.storage) === storageFilter)
    && (conditionFilter === 'all' || getVariantCondition(variant, product.category) === conditionFilter)
  ));
  const hasVariantFilter = storageFilter !== 'all' || conditionFilter !== 'all';
  const displayVariants = hasVariantFilter ? relevantVariants : variants;
  const storages = Array.from(new Set(
    displayVariants.length > 0
      ? displayVariants.map((variant) => variant.storage)
      : productStorages(product),
  )).sort((a, b) => storageRank(a) - storageRank(b));
  const variantPrices = displayVariants.map((variant) => numericPrice(variant.price)).filter(Number.isFinite);
  const cardPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : minimumPrice(product);
  const distinctPrices = new Set(variantPrices);
  const hasPriceRange = distinctPrices.size > 1;
  const usedUnits = product.category === Category.USADOS ? displayVariants.length : 0;

  useEffect(() => setImageFailed(false), [product.image]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.035)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)]">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5f5f7] p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-iphone-blue"
        aria-label={`Ver opciones de ${product.name}`}
      >
        <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-tight shadow-sm ${
          product.category === Category.SELLADOS
            ? 'bg-iphone-blue text-white'
            : 'border border-black/[0.06] bg-white/90 text-ink backdrop-blur'
        }`}>
          {categoryLabels[product.category] || product.category}
        </span>

        {imageFailed ? (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-tertiary">
            <ImageOff size={30} strokeWidth={1.5} />
            <span className="text-xs">Imagen no disponible</span>
          </span>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-1.5 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-ink">{product.name}</h3>
          {usedUnits > 0 && (
            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
              {usedUnits} {usedUnits === 1 ? 'unidad' : 'unidades'}
            </span>
          )}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-ink-tertiary">
          {product.description || 'Consultá disponibilidad y opciones.'}
        </p>

        {storages.length > 0 && (
          <div className="mb-5 mt-auto flex flex-wrap gap-1.5">
            {storages.slice(0, 3).map((storage) => (
              <span
                key={`${product.id}-${storage}`}
                className="rounded-lg bg-[#f5f5f7] px-2.5 py-1.5 text-xs font-medium text-ink-secondary"
              >
                {storage}
              </span>
            ))}
            {storages.length > 3 && (
              <span className="rounded-lg bg-[#f5f5f7] px-2.5 py-1.5 text-xs font-medium text-ink-tertiary">
                +{storages.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-end justify-between gap-3 border-t border-black/[0.06] pt-5">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-ink-tertiary">
              {hasPriceRange ? 'Desde' : 'Precio'}
            </span>
            <span className="text-lg font-semibold tracking-tight text-ink">{formatPrice(product, cardPrice)}</span>
          </div>
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue focus-visible:ring-offset-2"
          >
            Ver opciones
          </button>
        </div>
      </div>
    </article>
  );
};

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const validCategory = Object.values(Category).includes(categoryParam as Category)
    ? categoryParam as Category
    : 'all';

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(validCategory);
  const [query, setQuery] = useState('');
  const [storageFilter, setStorageFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogItems, setCatalogItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const forceReviewStock = import.meta.env.DEV || import.meta.env.VITE_USE_LOCAL_CATALOG === 'true';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setActiveCategory(validCategory);
  }, [validCategory]);

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
        .select('*, variants(*)')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.error('Error fetching catalog:', error);
        setCatalogItems(localProducts);
      } else {
        const remoteProducts = data as unknown as Product[];
        const remoteIphones = remoteProducts.filter(isIphone);
        const remoteIphoneIds = new Set(remoteIphones.map((product) => product.id));
        const remoteHasCondition = remoteIphones.some((product) => (
          (product.variants || []).some((variant) => Object.hasOwn(variant, 'condition'))
        ));
        const remoteStockIsCurrent = ['ip18p', 'ip18pm', 'u-ip11', 'u-ip17e']
          .every((id) => remoteIphoneIds.has(id)) && remoteHasCondition;

        if (forceReviewStock || !remoteStockIsCurrent) {
          const nonIphoneProducts = remoteProducts.filter((product) => !isIphone(product));

          // Hasta que Supabase tenga la migración nueva, el sitio usa el stock
          // versionado para iPhones y conserva las demás categorías remotas.
          setCatalogItems([...localProducts, ...nonIphoneProducts]);
        } else {
          setCatalogItems(remoteProducts);
        }
      }

      setLoading(false);
    };

    void loadCatalog();
  }, [forceReviewStock]);

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProduct]);

  const storageOptions = useMemo(() => Array.from(new Set(
    catalogItems.flatMap(productStorages).map(normalizeStorage),
  )).sort((a, b) => storageRank(a) - storageRank(b)), [catalogItems]);

  const categoryCounts = useMemo(() => new Map(
    categoryOrder.map((category) => [
      category,
      catalogItems.filter((product) => product.category === category).length,
    ]),
  ), [catalogItems]);

  const usedIphoneUnits = useMemo(() => catalogItems
    .filter((product) => product.category === Category.USADOS && isIphone(product))
    .reduce((total, product) => total + availableVariants(product).length, 0), [catalogItems]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const result = catalogItems.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;

      if (normalizedQuery) {
        const searchableText = normalizeText([
          product.name,
          product.category,
          ...(product.colors || []),
          ...productStorages(product),
          ...availableVariants(product).map((variant) => variant.color),
        ].join(' '));
        if (!searchableText.includes(normalizedQuery)) return false;
      }

      if (storageFilter !== 'all') {
        const hasStorage = productStorages(product)
          .some((storage) => normalizeStorage(storage) === storageFilter);
        if (!hasStorage) return false;
      }

      if (conditionFilter !== 'all') {
        const variants = availableVariants(product);
        const hasCondition = variants.length > 0
          ? variants.some((variant) => getVariantCondition(variant, product.category) === conditionFilter)
          : (product.category === Category.SELLADOS ? 'Sellado' : 'Semi') === conditionFilter;
        if (!hasCondition) return false;
      }

      return true;
    });

    return result.sort((a, b) => {
      switch (sortOption) {
        case 'model-desc':
          return compareModelsNewest(a, b);
        case 'price-asc':
          return minimumPrice(a) - minimumPrice(b) || compareRecommended(a, b);
        case 'price-desc':
          return minimumPrice(b) - minimumPrice(a) || compareRecommended(a, b);
        case 'name':
          return a.name.localeCompare(b.name, 'es', { numeric: true });
        default:
          return compareRecommended(a, b);
      }
    });
  }, [activeCategory, catalogItems, conditionFilter, query, sortOption, storageFilter]);

  const groupedProducts = useMemo(() => {
    if (sortOption !== 'recommended' || activeCategory !== 'all') {
      return [{ key: 'results', label: '', products: filteredProducts }];
    }

    return categoryOrder
      .map((category) => ({
        key: category,
        label: categoryLabels[category],
        products: filteredProducts.filter((product) => product.category === category),
      }))
      .filter((group) => group.products.length > 0);
  }, [activeCategory, filteredProducts, sortOption]);

  const hasActiveFilters = activeCategory !== 'all'
    || query.trim().length > 0
    || storageFilter !== 'all'
    || conditionFilter !== 'all'
    || sortOption !== 'recommended';

  const handleCategoryChange = (category: Category | 'all') => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: category });
    }
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setQuery('');
    setStorageFilter('all');
    setConditionFilter('all');
    setSortOption('recommended');
    setSearchParams({});
  };

  const categories: Array<{ key: Category | 'all'; label: string; count: number }> = [
    { key: 'all', label: 'Todos', count: catalogItems.length },
    ...categoryOrder
      .filter((category) => (categoryCounts.get(category) || 0) > 0)
      .map((category) => ({
        key: category,
        label: categoryLabels[category],
        count: categoryCounts.get(category) || 0,
      })),
  ];

  return (
    <section id="catalogo" className="min-h-screen scroll-mt-20 bg-[#f5f5f7] pb-24 pt-10 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-4xl sm:mb-12"
        >
          <span className="mb-4 inline-flex rounded-full bg-iphone-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-iphone-blue">
            Stock actualizado
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
            Elegí tu próximo iPhone.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-tertiary sm:text-lg">
            Compará modelos, capacidades y estado real de cada equipo. Precios claros y asesoramiento directo.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5 text-sm font-medium text-ink-secondary">
            {usedIphoneUnits > 0 && (
              <span className="rounded-full border border-black/[0.06] bg-white px-4 py-2 shadow-sm">
                {usedIphoneUnits} usados detallados
              </span>
            )}
            <span className="rounded-full border border-black/[0.06] bg-white px-4 py-2 shadow-sm">Precios en USD</span>
            <span className="rounded-full border border-black/[0.06] bg-white px-4 py-2 shadow-sm">Garantía incluida</span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative z-30 mb-10 rounded-[26px] border border-black/[0.07] bg-white/90 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-4 lg:sticky lg:top-20"
        >
          <div className="grid gap-2.5 lg:grid-cols-[minmax(260px,1fr)_auto_auto_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Buscar en el catálogo</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary" size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar modelo, color o capacidad"
                className="h-12 w-full rounded-2xl border border-black/[0.08] bg-[#f5f5f7] pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-tertiary focus:border-iphone-blue focus:bg-white focus:ring-4 focus:ring-iphone-blue/10"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Filtrar por capacidad</span>
              <select
                value={storageFilter}
                onChange={(event) => setStorageFilter(event.target.value)}
                className="h-12 w-full min-w-36 appearance-none rounded-2xl border border-black/[0.08] bg-[#f5f5f7] px-4 pr-9 text-sm font-medium text-ink outline-none transition focus:border-iphone-blue focus:bg-white focus:ring-4 focus:ring-iphone-blue/10"
              >
                <option value="all">Capacidad</option>
                {storageOptions.map((storage) => <option key={storage} value={storage}>{storage}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-tertiary">▼</span>
            </label>

            <label className="relative">
              <span className="sr-only">Filtrar por condición</span>
              <select
                value={conditionFilter}
                onChange={(event) => setConditionFilter(event.target.value as ConditionFilter)}
                className="h-12 w-full min-w-40 appearance-none rounded-2xl border border-black/[0.08] bg-[#f5f5f7] px-4 pr-9 text-sm font-medium text-ink outline-none transition focus:border-iphone-blue focus:bg-white focus:ring-4 focus:ring-iphone-blue/10"
              >
                <option value="all">Todo estado</option>
                <option value="Sellado">Sellados</option>
                <option value="Semi">Seminuevos</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-tertiary">▼</span>
            </label>

            <label className="relative">
              <span className="sr-only">Ordenar productos</span>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
                className="h-12 w-full min-w-44 appearance-none rounded-2xl border border-black/[0.08] bg-[#f5f5f7] px-4 pr-9 text-sm font-medium text-ink outline-none transition focus:border-iphone-blue focus:bg-white focus:ring-4 focus:ring-iphone-blue/10"
              >
                <option value="recommended">Recomendados</option>
                <option value="model-desc">Modelo más nuevo</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="name">Nombre A–Z</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-tertiary">▼</span>
            </label>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl px-3 text-sm font-medium text-ink-secondary transition hover:bg-black/[0.04] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue"
              >
                <X size={16} /> Limpiar
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <SlidersHorizontal className="ml-1 hidden shrink-0 text-ink-tertiary sm:block" size={17} />
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => handleCategoryChange(category.key)}
                aria-pressed={activeCategory === category.key}
                className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue focus-visible:ring-offset-2 ${
                  activeCategory === category.key
                    ? 'border-ink bg-ink text-white'
                    : 'border-black/[0.08] bg-white text-ink-secondary hover:border-black/20 hover:text-ink'
                }`}
              >
                {category.label}
                <span className={`text-xs ${activeCategory === category.key ? 'text-white/60' : 'text-ink-tertiary'}`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-ink-secondary">
            {loading ? 'Actualizando catálogo…' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'modelo' : 'modelos'}`}
          </p>
          {!loading && filteredProducts.length > 0 && (
            <p className="hidden text-sm text-ink-tertiary sm:block">Stock sujeto a disponibilidad</p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[480px] animate-pulse rounded-[28px] border border-black/[0.05] bg-white" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-[32px] border border-black/[0.06] bg-white px-6 py-20 text-center shadow-sm">
            <Search className="mx-auto mb-4 text-ink-tertiary" size={30} strokeWidth={1.5} />
            <h2 className="text-xl font-semibold tracking-tight text-ink">No encontramos coincidencias</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-tertiary">
              Probá con otro modelo o quitá alguno de los filtros aplicados.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedProducts.map((group) => (
              <section key={group.key} aria-label={group.label || 'Resultados'}>
                {group.label && (
                  <div className="mb-5 flex items-end justify-between border-b border-black/[0.08] pb-4">
                    <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{group.label}</h2>
                    <span className="text-sm text-ink-tertiary">{group.products.length} modelos</span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.products.map((product) => (
                    <div key={product.id}>
                      <ProductCard
                        product={product}
                        storageFilter={storageFilter}
                        conditionFilter={conditionFilter}
                        onSelect={setSelectedProduct}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-[32px] bg-ink px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">¿Buscás otra configuración?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Escribinos y te ayudamos a encontrar el modelo, color y capacidad que necesitás.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20iPhone%20Navarro%2C%20busco%20un%20modelo%20espec%C3%ADfico.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:scale-[1.02] hover:bg-white/90"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

export default Catalog;
