
export enum Category {
  SELLADOS = 'Sellados',
  USADOS_PREMIUM = 'Usados Premium',
  USADOS = 'Usados',
  ACCESORIOS = 'Accesorios',
  MACBOOKS = 'MacBooks',
  IPADS = 'iPads',
  APPLE_WATCH = 'Apple Watch',
  AIRPODS = 'AirPods',
}

export interface ProductVariant {
  id: string;
  product_id: string;
  storage: string;
  color: string;
  battery: string;
  price: number;
  stock_status: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number | string;
  currency: 'ARS' | 'USD';
  image: string;
  isSale?: boolean;
  oldPrice?: number | string;
  storages?: string[];
  colors?: string[];
  description?: string;
  variants?: ProductVariant[];
}

export interface TradeInData {
  model: string;
  battery: string;
  activeTime: string;
  notes: string;
}
