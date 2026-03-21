-- ===============
-- IPHONE NAVARRO
-- ===============
-- Pegá este código en la sección "SQL Editor" de Supabase y apretá RUN.

-- 1. CREACIÓN DE TABLAS
-- Tabla principal de Productos
CREATE TABLE products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  currency text DEFAULT 'USD',
  image text NOT NULL,
  description text,
  storages text[],
  colors text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de Variantes
CREATE TABLE variants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id text REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  storage text NOT NULL,
  color text NOT NULL,
  battery text NOT NULL,
  price numeric NOT NULL,
  stock_status text DEFAULT 'in_stock',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. POLÍTICAS DE SEGURIDAD (Row Level Security)
-- Activamos RLS para ambas tablas. 
-- Significa que nadie podrá modificar, excepto quien tenga sesión de Auth.
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede LEER/VER los productos (para que se muestren en la página al público)
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view variants" ON variants FOR SELECT USING (true);

-- Solo el administrador (Auth) puede INSERTAR, ACTUALIZAR y ELIMINAR
CREATE POLICY "Auth users can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can insert variants" ON variants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth users can update variants" ON variants FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can delete variants" ON variants FOR DELETE USING (auth.role() = 'authenticated');
