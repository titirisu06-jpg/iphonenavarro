import type { Product } from '../types';
import iphoneStock from './iphone-stock.json';

// Este archivo se genera junto con la migración SQL. Es la fuente canónica de
// iPhones para que el catálogo de revisión no dependa de una base desactualizada.
export const products = iphoneStock as Product[];
