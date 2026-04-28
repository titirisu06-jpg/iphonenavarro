---
name: Tailwind Advanced & Dark Mode
description: Skill experto para la gestión de temas, grids avanzados y Dark Mode usando Tailwind CSS.
---

# Advanced Tailwind & Dark Mode Skill

Poseés la capacidad de diseñar e implementar estilos premium y escalables utilizando la funcionalidad avanzada de Tailwind CSS, incluyendo temas dinámicos.

## Implementación de Modo Oscuro (Dark Mode)
- **Activación:** Configurar en `tailwind.config.js` (o `tailwind.config.ts`) la propiedad `darkMode: 'class'`. Esto permite un interruptor manual en la barra de navegación.
- **Jerarquía:** Todo el fondo principal oscuro será `bg-slate-900` o un tono muy oscuro de verde (ej. `bg-[#0f172a]`), mientras que las tarjetas o contenedores secundarios serán apenas más claros `bg-slate-800`.
- **Textos:** Reemplazar los textos negros `text-gray-900` por blancos en modo nocturno usando el prefijo `dark:` (Ejemplo: `text-gray-900 dark:text-gray-100`).

## Patrones Visuales Premium
Si el proyecto trata de vender algo costoso (como una Inmobiliaria), utiliza estos acercamientos CSS:
1. **Glassmorphism:** Usar `bg-white/10 backdrop-blur-md border border-white/20` para crear efectos de vidrio esmerilado en las cabeceras o modales. 
2. **Sombras Suaves:** No utilices `shadow-md` duro, prefiere `shadow-[0_8px_30px_rgb(0,0,0,0.12)]` para sombras difusas.
3. **Gradients Sutiles:** `bg-gradient-to-r from-brand-oliva to-brand-salvia` para fondos o incluso texto (`bg-clip-text text-transparent`).

## Consistencia
Al modificar una página, si notas colores "hardcodeados" en el código (ej. `#34568B`), muévelos a `tailwind.config.js` bajo una clave temática (ej. `brand-primary`) y reemplaza todas las instancias en los archivos para mantener el sistema de diseño limpio.
