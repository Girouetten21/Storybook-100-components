# AetherialFooter (Celestial Edition)

El `AetherialFooter` ha sido rediseñado para ser una pieza de exposición por sí sola. Ya no es una simple lista de enlaces, sino una composición geométrica y tipográfica que cierra la suite con una escala monumental.

## Mejoras de Diseño "WOW"

- **Fondo de Órbita Celestial:** Un conjunto de anillos y ejes en movimiento circular perpetuo que le da una profundidad técnica y espacial al final de la página.
- **Módulo de Newsletter Editorial:** Un campo de entrada minimalista con una línea de dibujo reactiva al foco (`focus`).
- **Navegación en Itálica Mayúscula:** Los enlaces principales ahora usan una fuente *Playfair Display* itálica de gran tamaño (`1.8rem`), dándole un aire de revista de alta costura a la navegación.
- **Logotipo Monumental:** El nombre "Aetherial" aparece en la base con un tamaño masivo (`6vw`), sirviendo como el sello final de calidad.
- **Sección de Conexión Social:** Los enlaces sociales ahora se presentan como "Nodos" con flechas de dirección (`↗`), reforzando la idea de conectividad técnica.

## Animación

Utiliza `gsap.stagger` para revelar suavemente cada módulo (`Newsletter`, `Navigation`, `Connect`) mientras el fondo rota silenciosamente en un bucle infinito de 40 segundos.

## Integración

```tsx
import { AetherialFooter } from './components/AetherialFooter/AetherialFooter';

// Posicionado al final de todo el flujo de la suite.
<AetherialFooter />
```
