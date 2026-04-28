const fs = require('fs');

const sql = `
-- =======================================
-- ACTUALIZACIÓN DE INVENTARIO JOPI
-- =======================================
-- 1. Actualizar precios base de productos si corresponde, o insertarlos si no existen
-- Como no tenemos imágenes de los que no existían, reutilizamos las de la web oficial de Apple.

-- Asegurarse de que existan los productos (insert o ignore/update)
INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES 
  ('u-ip12pm', 'iPhone 12 Pro Max', 'Usados', 330, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha', 'Batería indicada en cada variante.', ARRAY['128GB', '256GB'], ARRAY['Gold', 'Blue']),
  ('u-ip15', 'iPhone 15', 'Usados', 475, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg', 'Batería indicada en cada variante.', ARRAY['128GB', '256GB'], ARRAY['Negro', 'Green']),
  ('u-ip16p', 'iPhone 16 Pro', 'Usados', 770, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg', 'Batería indicada en cada variante.', ARRAY['128GB'], ARRAY['Black', 'Desert']),
  ('u-ip17', 'iPhone 17', 'Usados', 955, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg', 'Batería indicada en cada variante.', ARRAY['512GB'], ARRAY['Black', 'Blue']),
  ('u-ip17p', 'iPhone 17 Pro', 'Usados', 1210, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg', 'Batería indicada en cada variante.', ARRAY['256GB'], ARRAY['Orange'])
ON CONFLICT (id) DO NOTHING;

-- Actualizamos los precios base de los Sellados
UPDATE products SET price = 700 WHERE id = 'ip15';
UPDATE products SET price = 800 WHERE id = 'ip16';
UPDATE products SET price = 720 WHERE id = 'ip17e';
UPDATE products SET price = 1340 WHERE id = 'ip17p';
UPDATE products SET price = 1480 WHERE id = 'ip17pm';

-- Actualizamos los precios base de los Usados que ya existían
UPDATE products SET price = 325 WHERE id = 'u-ip13';
UPDATE products SET price = 435 WHERE id = 'u-ip13p';
UPDATE products SET price = 470 WHERE id = 'u-ip13pm';
UPDATE products SET price = 370 WHERE id = 'u-ip14';
UPDATE products SET price = 470 WHERE id = 'u-ip14p';
UPDATE products SET price = 560 WHERE id = 'u-ip14pm';
UPDATE products SET price = 720 WHERE id = 'u-ip15pm';
UPDATE products SET price = 640 WHERE id = 'u-ip16';
UPDATE products SET price = 970 WHERE id = 'u-ip16pm';

-- 2. Eliminar TODAS las variantes para reemplazarlas por el stock real de Jopi
DELETE FROM variants;

-- 3. Insertar Nuevas Variantes (Usados)
INSERT INTO variants (product_id, storage, color, battery, price, stock_status) VALUES
-- iPhone 12 Pro Max
('u-ip12pm', '128GB', 'Gold', '76%', 330, 'in_stock'),
('u-ip12pm', '128GB', 'Blue', '81%', 355, 'in_stock'),

-- iPhone 13
('u-ip13', '128GB', 'Negro', '74% / 76% / 78%', 325, 'in_stock'),
('u-ip13', '128GB', 'Negro', '95%', 350, 'in_stock'),
('u-ip13', '128GB', 'Rojo', '79%', 325, 'in_stock'),
('u-ip13', '128GB', 'Blue', '75%', 325, 'in_stock'),
('u-ip13', '128GB', 'Blue', '86%', 350, 'in_stock'),
('u-ip13', '128GB', 'Verde', '89% / 100%', 350, 'in_stock'),

-- iPhone 13 Pro
('u-ip13p', '128GB', 'Gold', '74% / 77%', 435, 'in_stock'),
('u-ip13p', '128GB', 'Blue', '74% / 78% / 79%', 435, 'in_stock'),
('u-ip13p', '128GB', 'Blue', '80% al 84%', 450, 'in_stock'),
('u-ip13p', '128GB', 'Gris', '80% / 100%', 450, 'in_stock'),
('u-ip13p', '128GB', 'Green', '84% / 100%', 450, 'in_stock'),

-- iPhone 13 Pro Max
('u-ip13pm', '128GB', 'Blue', '77%', 470, 'in_stock'),
('u-ip13pm', '128GB', 'Blue', '100%', 495, 'in_stock'),
('u-ip13pm', '128GB', 'Gris', '78%', 480, 'in_stock'),
('u-ip13pm', '128GB', 'Gris', '100%', 495, 'in_stock'),
('u-ip13pm', '128GB', 'Gold', '84% / 100%', 495, 'in_stock'),

-- iPhone 14
('u-ip14', '128GB', 'Negro', '80% al 84%', 370, 'in_stock'),
('u-ip14', '128GB', 'Púrpura', '82%', 370, 'in_stock'),
('u-ip14', '128GB', 'Blue', '84%', 370, 'in_stock'),

-- iPhone 14 Pro
('u-ip14p', '128GB', 'Negro', '78%', 470, 'in_stock'),
('u-ip14p', '128GB', 'Púrpura', '100%', 475, 'in_stock'),
('u-ip14p', '256GB', 'Silver', 'Consultar', 490, 'in_stock'),

-- iPhone 14 Pro Max
('u-ip14pm', '128GB', 'Negro / Púrpura', '77%', 560, 'in_stock'),

-- iPhone 15
('u-ip15', '128GB', 'Negro', '81% al 100%', 475, 'in_stock'),
('u-ip15', '256GB', 'Green', '80%', 485, 'in_stock'),

-- iPhone 15 Pro Max
('u-ip15pm', '256GB', 'Natural', 'Consultar', 720, 'in_stock'),
('u-ip15pm', '256GB', 'Blue', '83% / 87%', 720, 'in_stock'),

-- iPhone 16
('u-ip16', '128GB', 'Green', '88%', 640, 'in_stock'),
('u-ip16', '128GB', 'Blanco', '90% / 96%', 640, 'in_stock'),
('u-ip16', '128GB', 'Varios', '89% al 100%', 640, 'in_stock'),

-- iPhone 16 Pro
('u-ip16p', '128GB', 'Black', '89% / 92%', 770, 'in_stock'),
('u-ip16p', '128GB', 'Desert', '90%', 770, 'in_stock'),

-- iPhone 16 Pro Max
('u-ip16pm', '256GB', 'Silver', '92% al 98%', 970, 'in_stock'),

-- iPhone 17
('u-ip17', '512GB', 'Black', '100% (19 ciclos)', 955, 'in_stock'),
('u-ip17', '512GB', 'Blue', '100% (7 ciclos)', 955, 'in_stock'),

-- iPhone 17 Pro
('u-ip17p', '256GB', 'Orange', '100% (22 a 141 ciclos)', 1210, 'in_stock');


-- 4. Insertar Nuevas Variantes (Sellados)
INSERT INTO variants (product_id, storage, color, battery, price, stock_status) VALUES
('ip15', '128GB', 'Consultar', '100%', 700, 'in_stock'),
('ip16', '128GB', 'Consultar', '100%', 800, 'in_stock'),
('ip17e', '256GB', 'Consultar', '100%', 720, 'in_stock'),
('ip17p', '256GB', 'Consultar', '100%', 1340, 'in_stock'),
('ip17pm', '256GB', 'Blue', '100%', 1480, 'in_stock'),
('ip17pm', '256GB', 'Orange', '100%', 1480, 'in_stock'),
('ip17pm', '256GB', 'Silver', '100%', 1500, 'in_stock');
`;

fs.writeFileSync('actualizar_stock_jopi.sql', sql, 'utf8');
console.log('Script SQL generado con éxito.');
