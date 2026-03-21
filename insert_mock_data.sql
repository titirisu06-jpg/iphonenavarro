-- Pegá este código en tu SQL Editor de Supabase y dale a RUN para cargar iPhones de prueba.

INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES 
  (
    'iphone-15-pro-mock', 
    'iPhone 15 Pro', 
    'Sellados', 
    1100, 
    'USD', 
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846360609', 
    'Chip A17 Pro. Titanio aeroespacial. Sistema de cámaras Pro.', 
    ARRAY['128GB', '256GB', '512GB'], 
    ARRAY['Titanio Azul', 'Titanio Natural', 'Titanio Blanco', 'Titanio Negro']
  ),
  (
    'iphone-13-normal-mock', 
    'iPhone 13', 
    'Usados Premium', 
    550, 
    'USD', 
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1657641867367', 
    'Condición de batería 90%+. Sin detalles estéticos.', 
    ARRAY['128GB'], 
    ARRAY['Rosa', 'Medianoche']
  ),
  (
    'iphone-11-mock', 
    'iPhone 11', 
    'Usados', 
    300, 
    'USD', 
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566956144418', 
    'Ideal calidad precio. Batería 85%. Excelente estado.', 
    ARRAY['64GB'], 
    ARRAY['Negro']
  );

-- Opcional: Agregar Variantes para el iPhone 15 Pro y 13
INSERT INTO variants (product_id, storage, color, battery, price, stock_status)
VALUES 
  ('iphone-15-pro-mock', '256GB', 'Titanio Natural', '100', 1200, 'in_stock'),
  ('iphone-15-pro-mock', '128GB', 'Titanio Azul', '100', 1100, 'in_stock'),
  ('iphone-13-normal-mock', '128GB', 'Rosa', '92', 550, 'in_stock');
