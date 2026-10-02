import { Category, type ProductVariant } from '../types';

export const formatBattery = (battery?: string): string => {
  const value = battery?.trim();
  if (!value || value === 'N/A') return '';
  return /^\d+(?:[.,]\d+)?$/.test(value) ? `${value}%` : value;
};

export const getVariantCondition = (
  variant: ProductVariant,
  category?: Category,
): 'Semi' | 'Sellado' => {
  if (variant.condition) return variant.condition;
  return category === Category.SELLADOS ? 'Sellado' : 'Semi';
};
