-- Stock iPhone Navarro — 2026-10-01
-- Generado por scripts/generate-stock-2026-10-01.cjs
-- 7 productos sellados, 15 productos usados, 94 equipos usados detallados.
-- Ejecutar en Supabase después de desplegar el commit que incluye public/products/.
-- La transacción conserva MacBooks, iPads, Apple Watch, AirPods y accesorios.

BEGIN;

ALTER TABLE variants ADD COLUMN IF NOT EXISTS condition text;

UPDATE variants AS variant
SET condition = CASE WHEN product.category = 'Sellados' THEN 'Sellado' ELSE 'Semi' END
FROM products AS product
WHERE variant.product_id = product.id
  AND variant.condition IS NULL;

-- Resguardo para cualquier fila legada sin producto asociado o categoría reconocida.
UPDATE variants SET condition = 'Semi' WHERE condition IS NULL;

ALTER TABLE variants ALTER COLUMN condition SET DEFAULT 'Semi';
ALTER TABLE variants ALTER COLUMN condition SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'variants_condition_check'
      AND conrelid = 'public.variants'::regclass
  ) THEN
    ALTER TABLE variants
      ADD CONSTRAINT variants_condition_check CHECK (condition IN ('Semi', 'Sellado'));
  END IF;
END $$;

-- Se reemplaza únicamente el inventario de iPhones. Otras categorías se conservan.
DELETE FROM variants
WHERE product_id IN (
  SELECT id FROM products WHERE name ILIKE 'iPhone%'
);

DELETE FROM products
WHERE name ILIKE 'iPhone%'
  AND id NOT IN ('ip15', 'ip16', 'ip17', 'ip17p', 'ip17pm', 'ip18p', 'ip18pm', 'u-ip11', 'u-ip13', 'u-ip13p', 'u-ip14', 'u-ip14p', 'u-ip15', 'u-ip15p', 'u-ip15pm', 'u-ip16', 'u-ip16p', 'u-ip16pm', 'u-ip17', 'u-ip17p', 'u-ip17pm', 'u-ip17e');

INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES
  ('ip15', 'iPhone 15', 'Sellados', 800, 'USD', '/products/iphone-15.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['128GB']::text[], ARRAY['Consultar']::text[]),
  ('ip16', 'iPhone 16', 'Sellados', 900, 'USD', '/products/iphone-16.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['128GB']::text[], ARRAY['Consultar']::text[]),
  ('ip17', 'iPhone 17', 'Sellados', 1030, 'USD', '/products/iphone-17.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['256GB']::text[], ARRAY['Consultar']::text[]),
  ('ip17p', 'iPhone 17 Pro', 'Sellados', 1270, 'USD', '/products/iphone-17-pro.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['256GB']::text[], ARRAY['Consultar']::text[]),
  ('ip17pm', 'iPhone 17 Pro Max', 'Sellados', 1370, 'USD', '/products/iphone-17-pro-max.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['256GB']::text[], ARRAY['Consultar']::text[]),
  ('ip18p', 'iPhone 18 Pro', 'Sellados', 1480, 'USD', '/products/iphone-18-pro.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['256GB']::text[], ARRAY['Consultar']::text[]),
  ('ip18pm', 'iPhone 18 Pro Max', 'Sellados', 1730, 'USD', '/products/iphone-18-pro-max.png', 'Equipo sellado con garantía oficial Apple.', ARRAY['256GB']::text[], ARRAY['Negro', 'Silver', 'Celeste', 'Bordo']::text[]),
  ('u-ip11', 'iPhone 11', 'Usados', 170, 'USD', '/products/iphone-11.png', 'Condición y batería indicadas en cada variante.', ARRAY['64GB']::text[], ARRAY['Lila', 'White']::text[]),
  ('u-ip13', 'iPhone 13', 'Usados', 330, 'USD', '/products/iphone-13.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB', '256GB']::text[], ARRAY['Blanco', 'Blue', 'Green', 'Pink', 'Starlight', 'Midnight']::text[]),
  ('u-ip13p', 'iPhone 13 Pro', 'Usados', 400, 'USD', '/products/iphone-13-pro.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB']::text[], ARRAY['Sierra Blue']::text[]),
  ('u-ip14', 'iPhone 14', 'Usados', 365, 'USD', '/products/iphone-14.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB']::text[], ARRAY['Rojo', 'Black', 'Blue']::text[]),
  ('u-ip14p', 'iPhone 14 Pro', 'Usados', 485, 'USD', '/products/iphone-14-pro.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB', '256GB']::text[], ARRAY['Negro', 'Space Black']::text[]),
  ('u-ip15', 'iPhone 15', 'Usados', 485, 'USD', '/products/iphone-15.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB']::text[], ARRAY['Black', 'Pink']::text[]),
  ('u-ip15p', 'iPhone 15 Pro', 'Usados', 600, 'USD', '/products/iphone-15-pro.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB', '256GB']::text[], ARRAY['Black Titanium', 'Blue Titanium', 'Natural Titanium']::text[]),
  ('u-ip15pm', 'iPhone 15 Pro Max', 'Usados', 700, 'USD', '/products/iphone-15-pro-max.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB']::text[], ARRAY['Black Titanium', 'Blue Titanium']::text[]),
  ('u-ip16', 'iPhone 16', 'Usados', 640, 'USD', '/products/iphone-16.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB']::text[], ARRAY['Black', 'Pink', 'Ultramarine', 'White']::text[]),
  ('u-ip16p', 'iPhone 16 Pro', 'Usados', 750, 'USD', '/products/iphone-16-pro.png', 'Condición y batería indicadas en cada variante.', ARRAY['128GB']::text[], ARRAY['Black', 'Desert']::text[]),
  ('u-ip16pm', 'iPhone 16 Pro Max', 'Usados', 890, 'USD', '/products/iphone-16-pro-max.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB']::text[], ARRAY['Desert', 'Black Titanium']::text[]),
  ('u-ip17', 'iPhone 17', 'Usados', 910, 'USD', '/products/iphone-17.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB']::text[], ARRAY['Black', 'Lavender']::text[]),
  ('u-ip17p', 'iPhone 17 Pro', 'Usados', 1160, 'USD', '/products/iphone-17-pro.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB']::text[], ARRAY['Orange', 'Cosmic Orange', 'Deep Blue', 'Silver']::text[]),
  ('u-ip17pm', 'iPhone 17 Pro Max', 'Usados', 1230, 'USD', '/products/iphone-17-pro-max.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB', '512GB']::text[], ARRAY['Blue', 'Orange', 'Cosmic Orange', 'Silver']::text[]),
  ('u-ip17e', 'iPhone 17e', 'Usados', 600, 'USD', '/products/iphone-17e.png', 'Condición y batería indicadas en cada variante.', ARRAY['256GB']::text[], ARRAY['Black']::text[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  storages = EXCLUDED.storages,
  colors = EXCLUDED.colors;

INSERT INTO variants (product_id, storage, color, battery, condition, price, stock_status)
VALUES
  ('ip15', '128GB', 'Consultar', '100%', 'Sellado', 800, 'in_stock'),
  ('ip16', '128GB', 'Consultar', '100%', 'Sellado', 900, 'in_stock'),
  ('ip17', '256GB', 'Consultar', '100%', 'Sellado', 1030, 'in_stock'),
  ('ip17p', '256GB', 'Consultar', '100%', 'Sellado', 1270, 'in_stock'),
  ('ip17pm', '256GB', 'Consultar', '100%', 'Sellado', 1370, 'in_stock'),
  ('ip18p', '256GB', 'Consultar', '100%', 'Sellado', 1480, 'in_stock'),
  ('ip18pm', '256GB', 'Negro', '100%', 'Sellado', 1730, 'in_stock'),
  ('ip18pm', '256GB', 'Silver', '100%', 'Sellado', 1730, 'in_stock'),
  ('ip18pm', '256GB', 'Celeste', '100%', 'Sellado', 1730, 'in_stock'),
  ('ip18pm', '256GB', 'Bordo', '100%', 'Sellado', 1830, 'in_stock'),
  ('u-ip11', '64GB', 'Lila', '75%', 'Semi', 170, 'in_stock'),
  ('u-ip11', '64GB', 'White', '100%', 'Semi', 170, 'in_stock'),
  ('u-ip13', '128GB', 'Blanco', '85%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Blue', '86%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Blue', '84%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Green', '85%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Pink', '81%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Pink', '86%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Pink', '80%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Pink', '88%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '89%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '96%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '84%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '100%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '100%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '88%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '85%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '86%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '85%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '85%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '88%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '84%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '89%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '86%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '128GB', 'Starlight', '87%', 'Semi', 330, 'in_stock'),
  ('u-ip13', '256GB', 'Midnight', '78%', 'Semi', 330, 'in_stock'),
  ('u-ip13p', '128GB', 'Sierra Blue', '7%', 'Semi', 400, 'in_stock'),
  ('u-ip14', '128GB', 'Rojo', '77%', 'Semi', 365, 'in_stock'),
  ('u-ip14', '128GB', 'Rojo', '79%', 'Semi', 365, 'in_stock'),
  ('u-ip14', '128GB', 'Black', '86%', 'Semi', 365, 'in_stock'),
  ('u-ip14', '128GB', 'Black', '81%', 'Semi', 365, 'in_stock'),
  ('u-ip14', '128GB', 'Blue', '80%', 'Semi', 365, 'in_stock'),
  ('u-ip14p', '128GB', 'Negro', '85%', 'Semi', 485, 'in_stock'),
  ('u-ip14p', '128GB', 'Space Black', '85%', 'Semi', 485, 'in_stock'),
  ('u-ip14p', '256GB', 'Space Black', '100%', 'Semi', 560, 'in_stock'),
  ('u-ip14p', '256GB', 'Space Black', '99%', 'Semi', 560, 'in_stock'),
  ('u-ip14p', '256GB', 'Space Black', '73%', 'Semi', 560, 'in_stock'),
  ('u-ip15', '128GB', 'Black', '82%', 'Semi', 485, 'in_stock'),
  ('u-ip15', '128GB', 'Black', '86%', 'Semi', 485, 'in_stock'),
  ('u-ip15', '128GB', 'Pink', '87%', 'Semi', 485, 'in_stock'),
  ('u-ip15p', '128GB', 'Black Titanium', '88%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Black Titanium', '80%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Black Titanium', '80%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Black Titanium', '82%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Black Titanium', '84%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Blue Titanium', '84%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Blue Titanium', '83%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Blue Titanium', '89%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Blue Titanium', '80%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '128GB', 'Natural Titanium', '80%', 'Semi', 600, 'in_stock'),
  ('u-ip15p', '256GB', 'Black Titanium', '85%', 'Semi', 640, 'in_stock'),
  ('u-ip15pm', '256GB', 'Black Titanium', '82%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Black Titanium', '84%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Black Titanium', '83%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Blue Titanium', '82%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Blue Titanium', '88%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Blue Titanium', '80%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Blue Titanium', '97%', 'Semi', 700, 'in_stock'),
  ('u-ip15pm', '256GB', 'Blue Titanium', '80%', 'Semi', 700, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '87%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '90%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '91%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Black', '88%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Pink', '88%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Ultramarine', '89%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Ultramarine', '91%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Ultramarine', '90%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'Ultramarine', '88%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'White', '90%', 'Semi', 640, 'in_stock'),
  ('u-ip16', '128GB', 'White', '100%', 'Sellado', 640, 'in_stock'),
  ('u-ip16p', '128GB', 'Black', '89%', 'Semi', 750, 'in_stock'),
  ('u-ip16p', '128GB', 'Desert', '88%', 'Semi', 750, 'in_stock'),
  ('u-ip16pm', '256GB', 'Desert', '91%', 'Semi', 890, 'in_stock'),
  ('u-ip16pm', '256GB', 'Black Titanium', '87%', 'Semi', 890, 'in_stock'),
  ('u-ip17', '256GB', 'Black', '100%', 'Sellado', 910, 'in_stock'),
  ('u-ip17', '256GB', 'Lavender', '93%', 'Semi', 910, 'in_stock'),
  ('u-ip17', '256GB', 'Lavender', '100%', 'Semi', 910, 'in_stock'),
  ('u-ip17p', '256GB', 'Orange', '92%', 'Semi', 1160, 'in_stock'),
  ('u-ip17p', '256GB', 'Cosmic Orange', '100%', 'Sellado', 1160, 'in_stock'),
  ('u-ip17p', '256GB', 'Cosmic Orange', '100%', 'Sellado', 1160, 'in_stock'),
  ('u-ip17p', '256GB', 'Deep Blue', '100%', 'Sellado', 1160, 'in_stock'),
  ('u-ip17p', '256GB', 'Silver', '100%', 'Sellado', 1160, 'in_stock'),
  ('u-ip17p', '256GB', 'Silver', '100%', 'Sellado', 1160, 'in_stock'),
  ('u-ip17pm', '256GB', 'Blue', '99%', 'Semi', 1230, 'in_stock'),
  ('u-ip17pm', '256GB', 'Blue', '99%', 'Semi', 1230, 'in_stock'),
  ('u-ip17pm', '256GB', 'Orange', '99%', 'Semi', 1230, 'in_stock'),
  ('u-ip17pm', '256GB', 'Cosmic Orange', '100%', 'Sellado', 1230, 'in_stock'),
  ('u-ip17pm', '512GB', 'Silver', '95%', 'Semi', 1400, 'in_stock'),
  ('u-ip17e', '256GB', 'Black', 'N/A', 'Semi', 600, 'in_stock');

COMMIT;
