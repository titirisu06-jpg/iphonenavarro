const fs = require('fs');

const sql = `
-- =======================================
-- ACTUALIZACIÓN DE STOCK: IPADS, ACCESORIOS, WATCH, MACBOOKS
-- =======================================

-- 1. Insertar o actualizar Productos Base
INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES 
  -- iPads
  ('ipad-10', 'iPad 10th Gen 11"', 'iPads', 475, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue?wid=5120&hei=2880&fmt=p-jpg', 'Pantalla Liquid Retina de 10.9 pulgadas con True Tone. Chip A14 Bionic.', ARRAY['128GB'], ARRAY['Blue', 'Pink', 'Silver']),
  ('ipad-air-m3-13', 'iPad Air 13" (M3)', 'iPads', 925, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=5120&hei=2880&fmt=p-jpg', 'Rendimiento espectacular con el chip M3.', ARRAY['128GB'], ARRAY['Blue', 'Purple']),
  ('ipad-air-m4-11', 'iPad Air 11" (M4)', 'iPads', 725, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=5120&hei=2880&fmt=p-jpg', 'La próxima generación del iPad Air con chip M4.', ARRAY['128GB', '256GB'], ARRAY['Blue', 'Purple', 'Space Gray', 'Starlight']),
  ('ipad-air-m4-13', 'iPad Air 13" (M4)', 'iPads', 1005, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=5120&hei=2880&fmt=p-jpg', 'Gran pantalla y rendimiento M4.', ARRAY['128GB', '512GB'], ARRAY['Space Gray']),
  ('ipad-pro-m4-13', 'iPad Pro 13" (M4)', 'iPads', 1405, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg', 'Pantalla Ultra Retina XDR. Chip M4. Modelos Cellular disponibles.', ARRAY['512GB'], ARRAY['Space Black']),
  ('ipad-pro-m5-11', 'iPad Pro 11" (M5)', 'iPads', 1075, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-11inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg', 'Rendimiento extremo con tecnología M5.', ARRAY['256GB'], ARRAY['Black', 'Silver']),
  ('ipad-pro-m5-13', 'iPad Pro 13" (M5)', 'iPads', 1365, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg', 'El iPad más poderoso con chip M5.', ARRAY['256GB'], ARRAY['Space Black']),

  -- AirPods & Accesorios
  ('airpods-4', 'AirPods 4', 'AirPods', 220, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=5120&hei=2880&fmt=p-jpg', 'Audio espacial personalizado y nuevo diseño.', ARRAY['N/A'], ARRAY['White']),
  ('airpods-4-anc', 'AirPods 4 (Noise Cancellation)', 'AirPods', 250, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=5120&hei=2880&fmt=p-jpg', 'Cancelación activa de ruido y audio adaptativo.', ARRAY['N/A'], ARRAY['White']),
  ('airpods-pro-2', 'AirPods Pro 2 USB-C', 'AirPods', 275, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg', 'Audio sin límites con estuche de carga USB-C.', ARRAY['N/A'], ARRAY['White']),
  ('airpods-pro-3', 'AirPods Pro 3', 'AirPods', 325, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg', 'La nueva generación de AirPods Pro.', ARRAY['N/A'], ARRAY['White']),
  ('airpods-max', 'AirPods Max (2nd Gen)', 'AirPods', 625, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=5120&hei=2880&fmt=p-jpg', 'El audio de alta fidelidad llevado al máximo.', ARRAY['N/A'], ARRAY['Midnight']),
  ('cargador-20w', 'Cargador 20W USB-C', 'Accesorios', 100, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHJA3?wid=1144&hei=1144&fmt=jpeg', 'Adaptador de corriente USB-C original de Apple.', ARRAY['N/A'], ARRAY['White']),

  -- Apple Watch
  ('watch-se-2', 'Apple Watch SE 2nd Gen 44mm', 'Apple Watch', 305, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'Todo lo que necesitás, por menos. Versión Cellular.', ARRAY['44mm'], ARRAY['Midnight']),
  ('watch-se-3-40', 'Apple Watch SE 3rd Gen 40mm', 'Apple Watch', 375, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'Nuevo Apple Watch SE con más potencia.', ARRAY['40mm'], ARRAY['Midnight', 'Starlight']),
  ('watch-se-3-44', 'Apple Watch SE 3rd Gen 44mm', 'Apple Watch', 415, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'Nuevo Apple Watch SE.', ARRAY['44mm'], ARRAY['Midnight']),
  ('watch-s11-42', 'Apple Watch Series 11 42mm', 'Apple Watch', 455, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'La última serie. GPS.', ARRAY['42mm'], ARRAY['Space Gray', 'Rose Gold', 'Jet Black', 'Silver']),
  ('watch-s11-46', 'Apple Watch Series 11 46mm', 'Apple Watch', 480, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'La última serie. GPS, diseño más grande.', ARRAY['46mm'], ARRAY['Space Gray', 'Jet Black', 'Rose Gold']),

  -- MacBooks
  ('mac-neo-13-256', 'MacBook Neo 13" A18 Pro 8GB/256GB', 'MacBooks', 835, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=5120&hei=2880&fmt=p-jpg', 'Liviana. Potente. Nuevo modelo Neo.', ARRAY['256GB'], ARRAY['Indigo', 'Citrus']),
  ('mac-neo-13-512', 'MacBook Neo 13" A18 Pro 8GB/512GB', 'MacBooks', 955, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=5120&hei=2880&fmt=p-jpg', 'Mayor almacenamiento para profesionales.', ARRAY['512GB'], ARRAY['Citrus', 'Indigo', 'Silver']),
  ('mac-air-m4-15', 'MacBook Air M4 15" 16/256GB', 'MacBooks', 1335, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=5120&hei=2880&fmt=p-jpg', 'Diseño super delgado, ahora con M4.', ARRAY['256GB'], ARRAY['Silver', 'Starlight']),
  ('mac-air-m5-13', 'MacBook Air M5 13" 16/512GB', 'MacBooks', 1325, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=5120&hei=2880&fmt=p-jpg', 'Chip M5 para velocidad increíble.', ARRAY['512GB'], ARRAY['Midnight', 'Silver', 'Standard']),
  ('mac-air-m5-15', 'MacBook Air M5 15.3" 16/512GB', 'MacBooks', 1575, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=5120&hei=2880&fmt=p-jpg', 'La pantalla más grande en una Air, ahora M5.', ARRAY['512GB'], ARRAY['Midnight', 'Silver', 'Sky Blue', 'Starlight']),
  ('mac-air-m5-13-1tb', 'MacBook Air M5 13" 16GB/1TB', 'MacBooks', 1655, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=5120&hei=2880&fmt=p-jpg', 'Configuración de almacenamiento extremo.', ARRAY['1TB'], ARRAY['Midnight', 'Silver']),
  ('mac-pro-14-m5', 'MacBook Pro 14" M5 16/512GB', 'MacBooks', 1825, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=5120&hei=2880&fmt=p-jpg', 'La laptop más potente para profesionales creativos.', ARRAY['512GB'], ARRAY['Black', 'Silver'])
ON CONFLICT (id) DO NOTHING;

-- 2. Eliminar variantes viejas de accesorios/ipads/macs para reemplazarlas
DELETE FROM variants WHERE product_id IN (
  'ipad-10', 'ipad-air-m3-13', 'ipad-air-m4-11', 'ipad-air-m4-13', 'ipad-pro-m4-13', 'ipad-pro-m5-11', 'ipad-pro-m5-13',
  'airpods-4', 'airpods-4-anc', 'airpods-pro-2', 'airpods-pro-3', 'airpods-max', 'cargador-20w',
  'watch-se-2', 'watch-se-3-40', 'watch-se-3-44', 'watch-s11-42', 'watch-s11-46',
  'mac-neo-13-256', 'mac-neo-13-512', 'mac-air-m4-15', 'mac-air-m5-13', 'mac-air-m5-15', 'mac-air-m5-13-1tb', 'mac-pro-14-m5'
);

-- 3. Insertar Variantes
INSERT INTO variants (product_id, storage, color, battery, price, stock_status) VALUES
-- IPADS
('ipad-10', '128GB', 'Blue', '100%', 475, 'in_stock'),
('ipad-10', '128GB', 'Pink', '100%', 475, 'in_stock'),
('ipad-10', '128GB', 'Silver', '100%', 475, 'in_stock'),

('ipad-air-m3-13', '128GB', 'Blue', '100%', 925, 'in_stock'),
('ipad-air-m3-13', '128GB', 'Purple', '100%', 925, 'in_stock'),

('ipad-air-m4-11', '128GB', 'Blue', '100%', 725, 'in_stock'),
('ipad-air-m4-11', '128GB', 'Purple', '100%', 725, 'in_stock'),
('ipad-air-m4-11', '128GB', 'Space Gray', '100%', 725, 'in_stock'),
('ipad-air-m4-11', '128GB', 'Starlight', '100%', 725, 'in_stock'),
('ipad-air-m4-11', '256GB', 'Space Gray', '100%', 845, 'in_stock'),

('ipad-air-m4-13', '128GB', 'Space Gray', '100%', 1005, 'in_stock'),
('ipad-air-m4-13', '512GB', 'Space Gray', '100%', 1305, 'in_stock'),

('ipad-pro-m4-13', '512GB', 'Space Black', '100%', 1405, 'in_stock'),

('ipad-pro-m5-11', '256GB', 'Black', '100%', 1075, 'in_stock'),
('ipad-pro-m5-11', '256GB', 'Silver', '100%', 1075, 'in_stock'),

('ipad-pro-m5-13', '256GB', 'Space Black', '100%', 1365, 'in_stock'),


-- AUDIO Y ACCESORIOS
('airpods-4', 'N/A', 'White', '100%', 220, 'in_stock'),
('airpods-4-anc', 'N/A', 'White', '100%', 250, 'in_stock'),
('airpods-pro-2', 'N/A', 'White', '100%', 275, 'in_stock'),
('airpods-pro-3', 'N/A', 'White', '100%', 325, 'in_stock'),
('airpods-max', 'N/A', 'Midnight', '100%', 625, 'in_stock'),
('cargador-20w', 'N/A', 'White', '100%', 100, 'in_stock'),

-- APPLE WATCH
('watch-se-2', '44mm', 'Midnight', '100%', 305, 'in_stock'),

('watch-se-3-40', '40mm', 'Midnight', '100%', 375, 'in_stock'),
('watch-se-3-40', '40mm', 'Starlight', '100%', 375, 'in_stock'),

('watch-se-3-44', '44mm', 'Midnight', '100%', 415, 'in_stock'),

('watch-s11-42', '42mm', 'Space Gray', '100%', 455, 'in_stock'),
('watch-s11-42', '42mm', 'Rose Gold', '100%', 455, 'in_stock'),
('watch-s11-42', '42mm', 'Jet Black', '100%', 455, 'in_stock'),
('watch-s11-42', '42mm', 'Silver', '100%', 455, 'in_stock'),

('watch-s11-46', '46mm', 'Space Gray', '100%', 480, 'in_stock'),
('watch-s11-46', '46mm', 'Jet Black', '100%', 480, 'in_stock'),
('watch-s11-46', '46mm', 'Rose Gold', '100%', 480, 'in_stock'),


-- MACBOOK
('mac-neo-13-256', '256GB', 'Indigo', '100%', 835, 'in_stock'),
('mac-neo-13-256', '256GB', 'Citrus', '100%', 835, 'in_stock'),

('mac-neo-13-512', '512GB', 'Citrus', '100%', 955, 'in_stock'),
('mac-neo-13-512', '512GB', 'Indigo', '100%', 955, 'in_stock'),
('mac-neo-13-512', '512GB', 'Silver', '100%', 955, 'in_stock'),

('mac-air-m4-15', '256GB', 'Silver', '100%', 1335, 'in_stock'),
('mac-air-m4-15', '256GB', 'Starlight', '100%', 1335, 'in_stock'),

('mac-air-m5-13', '512GB', 'Standard', '100%', 1325, 'in_stock'),
('mac-air-m5-13', '512GB', 'Midnight', '100%', 1375, 'in_stock'),
('mac-air-m5-13', '512GB', 'Silver', '100%', 1375, 'in_stock'),

('mac-air-m5-15', '512GB', 'Midnight', '100%', 1575, 'in_stock'),
('mac-air-m5-15', '512GB', 'Silver', '100%', 1575, 'in_stock'),
('mac-air-m5-15', '512GB', 'Sky Blue', '100%', 1575, 'in_stock'),
('mac-air-m5-15', '512GB', 'Starlight', '100%', 1575, 'in_stock'),

('mac-air-m5-13-1tb', '1TB', 'Midnight', '100%', 1655, 'in_stock'),
('mac-air-m5-13-1tb', '1TB', 'Silver', '100%', 1655, 'in_stock'),

('mac-pro-14-m5', '512GB', 'Black', '100%', 1825, 'in_stock'),
('mac-pro-14-m5', '512GB', 'Silver', '100%', 1825, 'in_stock');
`;

fs.writeFileSync('insert_accessories.sql', sql, 'utf8');
console.log('Script insert_accessories.sql generado con éxito.');
