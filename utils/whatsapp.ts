// iPhoneNavarro — WhatsApp config
export const WHATSAPP_NUMBER = '5492227580719'; // +54 9 2227 58-0719

export const buildWhatsAppUrl = (message?: string): string => {
  const defaultMsg = 'Hola%20iPhone%20Navarro%2C%20quiero%20hacer%20una%20consulta.';
  const encoded = message ? encodeURIComponent(message) : defaultMsg;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const buildProductWhatsAppUrl = (productName: string, storage?: string, color?: string, battery?: string): string => {
  const batteryStr = battery ? `Batería ${battery}%` : '';
  const details = [productName, storage, color, batteryStr].filter(Boolean).join(' - ');
  return buildWhatsAppUrl(`Hola iPhone Navarro, me interesa el ${details}. Quiero más info.`);
};

export const buildTradeInWhatsAppUrl = (
  model: string,
  battery: string,
  activeTime: string,
  notes: string
): string => {
  const parts = [];
  if (model) parts.push(`Modelo: ${model}`);
  if (battery) parts.push(`Batería: ${battery}%`);
  if (activeTime) parts.push(`Uso: ${activeTime}`);
  if (notes) parts.push(`Detalles: ${notes}`);
  
  const details = parts.join(', ');
  return buildWhatsAppUrl(`Hola iPhone Navarro, quiero consultar el Plan Canje para mi equipo. Detalles del equipo: ${details}`);
};

export const buildServiceWhatsAppUrl = (
  model: string,
  activeTime: string,
  issue: string
): string => {
  const parts = [];
  if (model) parts.push(`Modelo: ${model}`);
  if (activeTime) parts.push(`Uso: ${activeTime}`);
  if (issue) parts.push(`Problema: ${issue}`);
  
  const details = parts.join(', ');
  return buildWhatsAppUrl(`Hola iPhone Navarro, quiero consultar por Servicio Técnico. Detalles del equipo: ${details}`);
};

export const buildMayoristaWhatsAppUrl = (): string => {
  return buildWhatsAppUrl(`Hola iPhone Navarro, soy revendedor y me interesa la venta mayorista.`);
};
