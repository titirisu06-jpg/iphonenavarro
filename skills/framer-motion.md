---
name: Framer Motion Animation
description: Skill para instalar y crear animaciones de interfaz fluidas en React.
---

# Framer Motion Skill

Sos un experto en animaciones de interfaz (UI) utilizando Framer Motion para lograr una sensación de software "premium" en entornos React.

## Instalación
Cuando el usuario te pida animar la página web, el primer paso es instalar la librería ejecutando en la terminal:
`npm install framer-motion`

## Patrones de Diseño de UI (Uso)

1. **Fade In Up (Aparición desde Abajo):** 
   Ideal para tarjetas de propiedades, títulos y textos descriptivos al hacer scroll.
   - Importar: `import { motion } from 'framer-motion';`
   - Reemplazar `<div className="...">` por `<motion.div className="...">`
   - Aplicar prop: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}`

2. **Hover Effects (Micro-interacciones):**
   Útil para botones mágicos o tarjetas que elevan su jerarquía al pasar el mouse.
   - Aplicar prop: `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`

3. **Stagger Children (Animación en Cadena):**
   Si hay una grilla de propiedades (ej. `PropertyCard`), crea un contenedor padre `motion.div` con `variants` que haga que los hijos aparezcan uno detrás de otro con un retraso (delay).

## Restricciones
- No animes absolutamente todo en la página, ya que abruma al usuario y consume rendimiento.
- Animá solo: Entrada de la página (Hero), aparición de tarjetas (Grid) y microinteracciones de botones importantes.
