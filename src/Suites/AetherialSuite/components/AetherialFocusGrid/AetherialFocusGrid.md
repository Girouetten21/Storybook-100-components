# AetherialFocusGrid

El componente `AetherialFocusGrid` actúa como un puente técnico-visual dentro de la **Aetherial Suite**. Ubicado estratégicamente entre las secciones de scroll intensivo, este módulo se enfoca en desglosar los detalles técnicos del "blueprint" de la experiencia.

## Características de Diseño

- **Layout de Enfoque:** Divide la pantalla en una columna de especificaciones técnicas a la izquierda y una visual abstracta a la derecha.
- **Tipografía de Precisión:** Utiliza etiquetas en *Outfit* con espaciado extremo y valores en *Playfair Display* para combinar precisión técnica con elegancia.
- **Visual Vectorial:** Un contenedor minimalista con un "núcleo de luz" y un anillo orbital que representa las matemáticas detrás del diseño.
- **Marcas de Agua:** Incluye metadatos de fondo (`SPEC_2026`) que le dan un aire de documento técnico confidencial o plano arquitectónico.

## Animación

- **Stagger Reveal:** Las especificaciones se revelan de una en una con un desplazamiento lateral suave al entrar en el viewport.
- **Parallax de Visual:** El núcleo orbital tiene un movimiento asíncrono respecto al scroll, creando una sensación de profundidad física.

## Integración

```tsx
import { AetherialFocusGrid } from './components/AetherialFocusGrid/AetherialFocusGrid';

// Ubicado idealmente entre DetailScroll y JourneyScroll.
<AetherialFocusGrid />
```
