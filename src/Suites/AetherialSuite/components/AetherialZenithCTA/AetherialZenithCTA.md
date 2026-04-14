# AetherialZenithCTA

El componente `AetherialZenithCTA` es el cierre cinematográfico de la **Aetherial Suite**. Representa el "Cénit", el punto más alto y espiritual de la experiencia, donde la tipografía se divide para revelar un eje infinito.

## Características de Diseño

- **Eje Central:** Una línea vertical que se expande hacia el infinito, simbolizando la conexión entre lo material y lo etéreo.
- **Tipografía Partida:** La palabra "Aether-ial" se divide simétricamente, utilizando una combinación de *Playfair Display* normal y una cursiva dorada para resaltar la dualidad.
- **Atmósfera Lumínica:** Un aura central (`zenith-glow`) que crece suavemente al scrollear, iluminando el texto desde atrás.
- **Llamada a la Acción (CTA):** Un botón con diseño editorial que se expande elegantemente al pasar el cursor.

## Animación ScrollTrigger

El componente utiliza un `scrub` de GSAP para que:
1. El eje central crezca a medida que te acercas al final de la página.
2. Las piezas del título se junten desde los laterales.
3. El aura brille con mayor intensidad conforme el usuario se aproxima al cierre.

## Uso

```tsx
import { AetherialZenithCTA } from './components/AetherialZenithCTA/AetherialZenithCTA';

// Posicionado al final de AetherialSuite.tsx para cerrar la narrativa.
<AetherialZenithCTA />
```
