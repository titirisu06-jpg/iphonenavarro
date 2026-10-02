const fs = require('node:fs');
const path = require('node:path');

const variants = [];

const addUnits = (productId, storage, color, batteries, price, condition = 'Semi') => {
  for (const battery of batteries) {
    variants.push({
      productId,
      storage,
      color,
      battery,
      condition,
      price,
      stockStatus: 'in_stock',
    });
  }
};

// Sellados: la lista no informa cantidad, por eso cada combinación representa disponibilidad.
addUnits('ip15', '128GB', 'Consultar', ['100%'], 800, 'Sellado');
addUnits('ip16', '128GB', 'Consultar', ['100%'], 900, 'Sellado');
addUnits('ip17', '256GB', 'Consultar', ['100%'], 1030, 'Sellado');
addUnits('ip17p', '256GB', 'Consultar', ['100%'], 1270, 'Sellado');
addUnits('ip17pm', '256GB', 'Consultar', ['100%'], 1370, 'Sellado');
addUnits('ip18p', '256GB', 'Consultar', ['100%'], 1480, 'Sellado');
addUnits('ip18pm', '256GB', 'Negro', ['100%'], 1730, 'Sellado');
addUnits('ip18pm', '256GB', 'Silver', ['100%'], 1730, 'Sellado');
addUnits('ip18pm', '256GB', 'Celeste', ['100%'], 1730, 'Sellado');
addUnits('ip18pm', '256GB', 'Bordo', ['100%'], 1830, 'Sellado');

// Usados: una fila por cada equipo físico informado.
addUnits('u-ip11', '64GB', 'Lila', ['75%'], 170);
addUnits('u-ip11', '64GB', 'White', ['100%'], 170);

addUnits('u-ip13', '128GB', 'Blanco', ['85%'], 330);
addUnits('u-ip13', '128GB', 'Blue', ['86%', '84%'], 330);
addUnits('u-ip13', '128GB', 'Green', ['85%'], 330);
addUnits('u-ip13', '128GB', 'Pink', ['81%', '86%', '80%', '88%'], 330);
addUnits('u-ip13', '128GB', 'Starlight', ['89%', '96%', '84%', '100%', '100%', '88%', '85%', '86%', '85%', '85%', '88%', '84%', '89%', '86%', '87%'], 330);
addUnits('u-ip13', '256GB', 'Midnight', ['78%'], 330);

addUnits('u-ip13p', '128GB', 'Sierra Blue', ['7%'], 400);

addUnits('u-ip14', '128GB', 'Rojo', ['77%', '79%'], 365);
addUnits('u-ip14', '128GB', 'Black', ['86%', '81%'], 365);
addUnits('u-ip14', '128GB', 'Blue', ['80%'], 365);

addUnits('u-ip14p', '128GB', 'Negro', ['85%'], 485);
addUnits('u-ip14p', '128GB', 'Space Black', ['85%'], 485);
addUnits('u-ip14p', '256GB', 'Space Black', ['100%', '99%', '73%'], 560);

addUnits('u-ip15', '128GB', 'Black', ['82%', '86%'], 485);
addUnits('u-ip15', '128GB', 'Pink', ['87%'], 485);

addUnits('u-ip15p', '128GB', 'Black Titanium', ['88%', '80%', '80%', '82%', '84%'], 600);
addUnits('u-ip15p', '128GB', 'Blue Titanium', ['84%', '83%', '89%', '80%'], 600);
addUnits('u-ip15p', '128GB', 'Natural Titanium', ['80%'], 600);
addUnits('u-ip15p', '256GB', 'Black Titanium', ['85%'], 640);

addUnits('u-ip15pm', '256GB', 'Black Titanium', ['82%', '84%', '83%'], 700);
addUnits('u-ip15pm', '256GB', 'Blue Titanium', ['82%', '88%', '80%', '97%', '80%'], 700);

addUnits('u-ip16', '128GB', 'Black', ['89%', '89%', '89%', '89%', '87%', '89%', '90%', '91%', '88%'], 640);
addUnits('u-ip16', '128GB', 'Pink', ['88%'], 640);
addUnits('u-ip16', '128GB', 'Ultramarine', ['89%', '91%', '90%', '88%'], 640);
addUnits('u-ip16', '128GB', 'White', ['90%'], 640);
addUnits('u-ip16', '128GB', 'White', ['100%'], 640, 'Sellado');

addUnits('u-ip16p', '128GB', 'Black', ['89%'], 750);
addUnits('u-ip16p', '128GB', 'Desert', ['88%'], 750);

addUnits('u-ip16pm', '256GB', 'Desert', ['91%'], 890);
addUnits('u-ip16pm', '256GB', 'Black Titanium', ['87%'], 890);

addUnits('u-ip17', '256GB', 'Black', ['100%'], 910, 'Sellado');
addUnits('u-ip17', '256GB', 'Lavender', ['93%', '100%'], 910);

addUnits('u-ip17p', '256GB', 'Orange', ['92%'], 1160);
addUnits('u-ip17p', '256GB', 'Cosmic Orange', ['100%', '100%'], 1160, 'Sellado');
addUnits('u-ip17p', '256GB', 'Deep Blue', ['100%'], 1160, 'Sellado');
addUnits('u-ip17p', '256GB', 'Silver', ['100%', '100%'], 1160, 'Sellado');

addUnits('u-ip17pm', '256GB', 'Blue', ['99%', '99%'], 1230);
addUnits('u-ip17pm', '256GB', 'Orange', ['99%'], 1230);
addUnits('u-ip17pm', '256GB', 'Cosmic Orange', ['100%'], 1230, 'Sellado');
addUnits('u-ip17pm', '512GB', 'Silver', ['95%'], 1400);

addUnits('u-ip17e', '256GB', 'Black', ['N/A'], 600);

const productDefinitions = [
  ['ip15', 'iPhone 15', 'Sellados', 800, '/products/iphone-15.png'],
  ['ip16', 'iPhone 16', 'Sellados', 900, '/products/iphone-16.png'],
  ['ip17', 'iPhone 17', 'Sellados', 1030, '/products/iphone-17.png'],
  ['ip17p', 'iPhone 17 Pro', 'Sellados', 1270, '/products/iphone-17-pro.png'],
  ['ip17pm', 'iPhone 17 Pro Max', 'Sellados', 1370, '/products/iphone-17-pro-max.png'],
  ['ip18p', 'iPhone 18 Pro', 'Sellados', 1480, '/products/iphone-18-pro.png'],
  ['ip18pm', 'iPhone 18 Pro Max', 'Sellados', 1730, '/products/iphone-18-pro-max.png'],
  ['u-ip11', 'iPhone 11', 'Usados', 170, '/products/iphone-11.png'],
  ['u-ip13', 'iPhone 13', 'Usados', 330, '/products/iphone-13.png'],
  ['u-ip13p', 'iPhone 13 Pro', 'Usados', 400, '/products/iphone-13-pro.png'],
  ['u-ip14', 'iPhone 14', 'Usados', 365, '/products/iphone-14.png'],
  ['u-ip14p', 'iPhone 14 Pro', 'Usados', 485, '/products/iphone-14-pro.png'],
  ['u-ip15', 'iPhone 15', 'Usados', 485, '/products/iphone-15.png'],
  ['u-ip15p', 'iPhone 15 Pro', 'Usados', 600, '/products/iphone-15-pro.png'],
  ['u-ip15pm', 'iPhone 15 Pro Max', 'Usados', 700, '/products/iphone-15-pro-max.png'],
  ['u-ip16', 'iPhone 16', 'Usados', 640, '/products/iphone-16.png'],
  ['u-ip16p', 'iPhone 16 Pro', 'Usados', 750, '/products/iphone-16-pro.png'],
  ['u-ip16pm', 'iPhone 16 Pro Max', 'Usados', 890, '/products/iphone-16-pro-max.png'],
  ['u-ip17', 'iPhone 17', 'Usados', 910, '/products/iphone-17.png'],
  ['u-ip17p', 'iPhone 17 Pro', 'Usados', 1160, '/products/iphone-17-pro.png'],
  ['u-ip17pm', 'iPhone 17 Pro Max', 'Usados', 1230, '/products/iphone-17-pro-max.png'],
  ['u-ip17e', 'iPhone 17e', 'Usados', 600, '/products/iphone-17e.png'],
];

const expectedUsedCounts = {
  'u-ip11': 2,
  'u-ip13': 24,
  'u-ip13p': 1,
  'u-ip14': 5,
  'u-ip14p': 5,
  'u-ip15': 3,
  'u-ip15p': 11,
  'u-ip15pm': 8,
  'u-ip16': 16,
  'u-ip16p': 2,
  'u-ip16pm': 2,
  'u-ip17': 3,
  'u-ip17p': 6,
  'u-ip17pm': 5,
  'u-ip17e': 1,
};

const expectedUsedPriceTiers = {
  'u-ip11:170': 2,
  'u-ip13:330': 24,
  'u-ip13p:400': 1,
  'u-ip14:365': 5,
  'u-ip14p:485': 2,
  'u-ip14p:560': 3,
  'u-ip15:485': 3,
  'u-ip15p:600': 10,
  'u-ip15p:640': 1,
  'u-ip15pm:700': 8,
  'u-ip16:640': 16,
  'u-ip16p:750': 2,
  'u-ip16pm:890': 2,
  'u-ip17:910': 3,
  'u-ip17p:1160': 6,
  'u-ip17pm:1230': 4,
  'u-ip17pm:1400': 1,
  'u-ip17e:600': 1,
};

const usedVariants = variants.filter((variant) => variant.productId.startsWith('u-'));
if (usedVariants.length !== 94) {
  throw new Error(`Se esperaban 94 usados y se generaron ${usedVariants.length}.`);
}

for (const [productId, expectedCount] of Object.entries(expectedUsedCounts)) {
  const actualCount = usedVariants.filter((variant) => variant.productId === productId).length;
  if (actualCount !== expectedCount) {
    throw new Error(`${productId}: se esperaban ${expectedCount} unidades y se generaron ${actualCount}.`);
  }
}

for (const [tier, expectedCount] of Object.entries(expectedUsedPriceTiers)) {
  const [productId, price] = tier.split(':');
  const actualCount = usedVariants.filter(
    (variant) => variant.productId === productId && variant.price === Number(price),
  ).length;
  if (actualCount !== expectedCount) {
    throw new Error(`${tier}: se esperaban ${expectedCount} unidades y se generaron ${actualCount}.`);
  }
}

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const sqlArray = (values) => `ARRAY[${values.map(quote).join(', ')}]::text[]`;

const productRows = productDefinitions.map(([id, name, category, price, image]) => {
  const productVariants = variants.filter((variant) => variant.productId === id);
  const storages = [...new Set(productVariants.map((variant) => variant.storage))];
  const colors = [...new Set(productVariants.map((variant) => variant.color))];
  const description = category === 'Sellados'
    ? 'Equipo sellado con garantía oficial Apple.'
    : 'Condición y batería indicadas en cada variante.';

  return `  (${[
    quote(id),
    quote(name),
    quote(category),
    price,
    quote('USD'),
    quote(image),
    quote(description),
    sqlArray(storages),
    sqlArray(colors),
  ].join(', ')})`;
});

const variantRows = variants.map((variant) => `  (${[
  quote(variant.productId),
  quote(variant.storage),
  quote(variant.color),
  quote(variant.battery),
  quote(variant.condition),
  variant.price,
  quote(variant.stockStatus),
].join(', ')})`);

const desiredIds = productDefinitions.map(([id]) => quote(id)).join(', ');
const sql = `-- Stock iPhone Navarro — 2026-10-01
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
  AND id NOT IN (${desiredIds});

INSERT INTO products (id, name, category, price, currency, image, description, storages, colors)
VALUES
${productRows.join(',\n')}
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
${variantRows.join(',\n')};

COMMIT;
`;

const outputPath = path.join(__dirname, '..', 'actualizar_stock_2026-10-01.sql');
fs.writeFileSync(outputPath, sql, 'utf8');

const catalogProducts = productDefinitions.map(([id, name, category, price, image]) => {
  const productVariants = variants.filter((variant) => variant.productId === id);
  const storages = [...new Set(productVariants.map((variant) => variant.storage))];
  const colors = [...new Set(productVariants.map((variant) => variant.color))];

  return {
    id,
    name,
    category,
    price,
    currency: 'USD',
    image,
    description: category === 'Sellados'
      ? 'Equipo sellado con garantía oficial Apple.'
      : 'Condición y batería indicadas en cada variante.',
    storages,
    colors,
    variants: productVariants.map((variant, index) => ({
      id: `${id}-${String(index + 1).padStart(3, '0')}`,
      product_id: id,
      storage: variant.storage,
      color: variant.color,
      battery: variant.battery,
      condition: variant.condition,
      price: variant.price,
      stock_status: variant.stockStatus,
    })),
  };
});

const catalogOutputPath = path.join(__dirname, '..', 'data', 'iphone-stock.json');
fs.writeFileSync(catalogOutputPath, `${JSON.stringify(catalogProducts, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  output: outputPath,
  catalogOutput: catalogOutputPath,
  products: productDefinitions.length,
  sealedVariants: variants.length - usedVariants.length,
  usedUnits: usedVariants.length,
  totalIphoneVariants: variants.length,
  usedByProduct: Object.fromEntries(
    Object.keys(expectedUsedCounts).map((productId) => [
      productId,
      usedVariants.filter((variant) => variant.productId === productId).length,
    ]),
  ),
}, null, 2));
