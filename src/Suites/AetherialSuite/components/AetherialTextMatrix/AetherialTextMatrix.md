# AetherialTextMatrix

El componente `AetherialTextMatrix` es una sección informativa premium diseñada para la **Aetherial Suite**. Utiliza una disposición en cuadrícula (grid) que se siente arquitectónica y limpia, enfocándose en la tipografía y la precisión lineal.

## Características Visuales

- **Diseño de Matriz:** Una cuadrícula de 3 columnas divididas por líneas vectoriales ultra-finas que se dibujan al hacer scroll.
- **Tipografía Cinematográfica:** Combina *Outfit* para datos técnicos y *Playfair Display* para títulos expresivos.
- **Micro-animaciones GSAP:** 
  - Las líneas se expanden desde el centro.
  - El contenido de las tarjetas tiene un "standing reveal" (revelado de pie) con desenfoque.
- **Responsive nativo:** Se adapta a un diseño vertical en dispositivos móviles, transformando los divisores en separadores horizontales.

## Uso

Importar el componente directamente dentro de la suite:

```tsx
import { AetherialTextMatrix } from './components/AetherialTextMatrix/AetherialTextMatrix';

// ... en el render
<AetherialTextMatrix />
```

## Estética "Aetherial"
Mantiene la paleta de colores `#050505` (Void Black) y `#c0b8a0` (Aether Gold) para una cohesión visual total con el Hero y los Scrolls de la misma Suite.
