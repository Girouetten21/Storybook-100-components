# AetherialEtherealCards

El componente `AetherialEtherealCards` es una representación visual de la ligereza y la elevación. Utiliza tarjetas de cristal (glassmorphism) que flotan de forma independiente con diferentes ritmos de parallax.

## Características Conceptuales

- **Ligereza Extrema:** Las tarjetas utilizan fondos casi invisibles (`rgba(255,255,255,0.02)`) y desenfoques profundos para integrarse con el entorno.
- **Parallax Independiente:** Cada tarjeta tiene un valor de desplazamiento distinto (`flux`, `opacity`, `inertia`), lo que crea una sensación de profundidad de "otro mundo" al scrollear.
- **Detalles Etéreos:** Incluye "auras" de fondo (blobs de luz con desenfoque extremo) que se mueven suavemente.
- **Interactividad Sutil:** Al pasar el mouse, las tarjetas revelan un barrido de luz interna y el borde dorado se intensifica.

## Estructura de Datos

El componente acepta un array de objetos con:
- `tag`: Pequeño identificador conceptual.
- `title`: Título en tipografía *Playfair Display*.
- `desc`: Descripción corta.
- `parallax`: El valor (positivo o negativo) del desplazamiento en el eje Y.

## Integración

```tsx
import { AetherialEtherealCards } from './components/AetherialEtherealCards/AetherialEtherealCards';

// Ubicado idealmente antes del JourneyScroll para preparar el mood de elevación.
<AetherialEtherealCards />
```
