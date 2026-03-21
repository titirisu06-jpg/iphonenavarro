DELETE FROM variants;
DELETE FROM products;

INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES 
-- Nuevos
('ip15', 'iPhone 15', 'Sellados', 650, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['128GB'], ARRAY['Blue', 'Black', 'Pink']),
('ip16', 'iPhone 16', 'Sellados', 755, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['128GB'], ARRAY['Black', 'White', 'Ultramarine', 'Teal']),
('ip17', 'iPhone 17', 'Sellados', 900, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['256GB'], ARRAY['Black', 'White', 'Lavender', 'Mist Blue']),
('ip17e', 'iPhone 17 e', 'Sellados', 720, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['256GB'], ARRAY['Standard']),
('ip17p', 'iPhone 17 Pro', 'Sellados', 1285, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['256GB', '512GB'], ARRAY['Silver', 'Blue', 'Orange']),
('ip17pm', 'iPhone 17 Pro Max', 'Sellados', 1420, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg', '12 meses de garantía oficial Apple.', ARRAY['256GB'], ARRAY['Orange']),

-- Usados
('u-ip12m', 'iPhone 12 mini', 'Usados', 220, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=940&hei=1112&fmt=png-alpha', '', ARRAY['64GB'], ARRAY['Default']),
('u-ip12p', 'iPhone 12 Pro', 'Usados', 310, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-hero?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB', '256GB'], ARRAY['Grafito', 'Gold', 'Default']),
('u-ip13', 'iPhone 13', 'Usados', 320, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Blue', 'Green', 'Midnight', 'Default']),
('u-ip13p', 'iPhone 13 Pro', 'Usados', 415, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Blue', 'Default']),
('u-ip13pm', 'iPhone 13 Pro Max', 'Usados', 450, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB', '256GB'], ARRAY['Gold', 'Blue', 'Green', 'Default']),
('u-ip14', 'iPhone 14', 'Usados', 335, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-purple-select-202209?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Purple', 'Red', 'Default']),
('u-ip14p', 'iPhone 14 Pro', 'Usados', 440, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-spaceblack-select?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Black']),
('u-ip14pm', 'iPhone 14 Pro Max', 'Usados', 530, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Gold', 'Default']),
('u-ip15pm', 'iPhone 15 Pro Max', 'Usados', 680, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846360609', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['256GB'], ARRAY['Natural Titanium']),
('u-ip16', 'iPhone 16', 'Usados', 620, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['128GB'], ARRAY['Black']),
('u-ip16pm', 'iPhone 16 Pro Max', 'Usados', 910, 'USD', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg', 'Mínimo 2 unidades. Consignación +10usd', ARRAY['256GB'], ARRAY['Desert Titanium']);


INSERT INTO variants (product_id, storage, color, battery, price, stock_status)
VALUES
-- Nuevos 15
('ip15', '128GB', 'Blue', '100', 650, 'in_stock'),
('ip15', '128GB', 'Black', '100', 650, 'in_stock'),
('ip15', '128GB', 'Pink', '100', 650, 'in_stock'),

-- Nuevos 16
('ip16', '128GB', 'Black', '100', 755, 'in_stock'),
('ip16', '128GB', 'White', '100', 755, 'in_stock'),
('ip16', '128GB', 'Ultramarine', '100', 755, 'in_stock'),
('ip16', '128GB', 'Teal', '100', 755, 'in_stock'),

-- Nuevos 17
('ip17', '256GB', 'Black', '100', 900, 'in_stock'),
('ip17', '256GB', 'White', '100', 900, 'in_stock'),
('ip17', '256GB', 'Lavender', '100', 900, 'in_stock'),
('ip17', '256GB', 'Mist Blue', '100', 900, 'in_stock'),

-- Nuevos 17 e
('ip17e', '256GB', 'Standard', '100', 720, 'in_stock'),

-- Nuevos 17 Pro
('ip17p', '256GB', 'Silver', '100', 1295, 'in_stock'),
('ip17p', '256GB', 'Blue', '100', 1290, 'in_stock'),
('ip17p', '256GB', 'Orange', '100', 1285, 'in_stock'),
('ip17p', '512GB', 'Orange', '100', 1470, 'in_stock'),

-- Nuevos 17 Pro Max
('ip17pm', '256GB', 'Orange', '100', 1420, 'in_stock'),

-- Usados iPhone 12 mini
('u-ip12m', '64GB', 'Standard', 'Consultar', 220, 'in_stock'),

-- Usados iPhone 12 Pro
('u-ip12p', '128GB', 'Standard', '78', 310, 'in_stock'),
('u-ip12p', '128GB', 'Grafito', '85', 320, 'in_stock'),
('u-ip12p', '256GB', 'Gold', '100 (Batería y Pantalla Nueva)', 345, 'in_stock'),
('u-ip12p', '128GB', 'Standard', 'Consultar', 320, 'in_stock'),

-- Usados iPhone 13
('u-ip13', '128GB', 'Standard', 'Consultar', 325, 'in_stock'),
('u-ip13', '128GB', 'Blue', '80', 320, 'in_stock'),
('u-ip13', '128GB', 'Green', '80', 320, 'in_stock'),
('u-ip13', '128GB', 'Midnight', '76', 320, 'in_stock'),
('u-ip13', '128GB', 'Midnight', '91', 320, 'in_stock'),

-- Usados iPhone 13 Pro
('u-ip13p', '128GB', 'Standard', 'Consultar', 420, 'in_stock'),
('u-ip13p', '128GB', 'Blue', '74', 415, 'in_stock'),
('u-ip13p', '128GB', 'Blue', '80', 415, 'in_stock'),

-- Usados iPhone 13 Pro Max
('u-ip13pm', '128GB', 'Standard', 'Consultar', 455, 'in_stock'),
('u-ip13pm', '128GB', 'Gold', '87 (Cámara cambiada)', 450, 'in_stock'),
('u-ip13pm', '128GB', 'Gold', '80', 450, 'in_stock'),
('u-ip13pm', '128GB', 'Blue', '100', 450, 'in_stock'),
('u-ip13pm', '256GB', 'Green', '100', 475, 'in_stock'),

-- Usados iPhone 14
('u-ip14', '128GB', 'Standard', 'Consultar', 345, 'in_stock'),
('u-ip14', '128GB', 'Purple', '85', 335, 'in_stock'),
('u-ip14', '128GB', 'Purple', '84', 335, 'in_stock'),
('u-ip14', '128GB', 'Purple', '83', 335, 'in_stock'),
('u-ip14', '128GB', 'Red', '100', 345, 'in_stock'),

-- Usados iPhone 14 Pro
('u-ip14p', '128GB', 'Black', '83', 440, 'in_stock'),

-- Usados iPhone 14 Pro Max
('u-ip14pm', '128GB', 'Standard', 'Consultar', 530, 'in_stock'),
('u-ip14pm', '128GB', 'Gold', '100 (Pantalla nueva)', 550, 'in_stock'),

-- Usados iPhone 15 Pro Max
('u-ip15pm', '256GB', 'Natural Titanium', 'Consultar', 680, 'in_stock'),

-- Usados iPhone 16
('u-ip16', '128GB', 'Black', 'Consultar', 620, 'in_stock'),

-- Usados iPhone 16 Pro Max
('u-ip16pm', '256GB', 'Desert Titanium', 'Consultar', 910, 'in_stock');
