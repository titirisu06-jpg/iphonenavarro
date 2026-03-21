-- 1. Crear el bucket 'products' publico (si no existe)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true) 
ON CONFLICT (id) DO NOTHING;

-- 2. Permitir que cualquier persona pueda VER las imagenes
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'products' );

-- 3. Permitir que los administradores (Auth) puedan SUBIR imagenes
CREATE POLICY "Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- 4. Permitir que los administradores puedan ACTUALIZAR o BORRAR imagenes
CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'products' AND auth.role() = 'authenticated' );

CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'products' AND auth.role() = 'authenticated' );
