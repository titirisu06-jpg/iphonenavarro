---
name: Shadcn UI Integration
description: Skill para inicializar, compilar e implementar componentes de Shadcn UI en React.
---

# Shadcn UI Skill

Estás equipado con el conocimiento experto para integrar componentes de Shadcn UI en aplicaciones React + Vite + Tailwind.

## Reglas de Instalación
Shadcn requiere inicialización en el proyecto antes de poder instalar componentes sueltos. Cuando el usuario solicite instalar Shadcn, ejecuta:
1. `npx shadcn@latest init -d` (Usa el flag `-d` para aceptar los valores por defecto si es posible, o asegúrate de responder interactivo correctamente).
2. Asegúrate de que `components.json` se creó en la raíz del proyecto (junto a `package.json`).
3. Modifica la ruta de imports en `tsconfig.json` si es necesario para soportar los alias `@/components/...`.

## Reglas de Inclusión de Componentes
- Cuando necesites un componente (ej. un botón), ¡NO PROGRAMES EL BOTÓN DESDE CERO!
- Ejecuta primero `npx shadcn@latest add button` en la terminal.
- Luego, importa el componente en el archivo necesario: `import { Button } from "@/components/ui/button"`.

## Dependencias Comunes Automáticas
Al instalar Shadcn, `clsx` y `tailwind-merge` se instalan automáticamente. Utiliza la función utilitaria `cn()` que Shadcn crea en `lib/utils.ts` para agrupar condicionalmente las clases de Tailwind en todos tus diseños.

## Estilo
Mantén el diseño minimalista de la inmobiliaria. Usa las variantes "outline" o "ghost" para acciones secundarias, y el color primario ("default") para los "Call to Action" importantes.
