# 🎬 Cinematic Overture Loader

**Component #47** breaks away from the scroll interactions specifically to provide the opening thesis for a luxury digital experience: The Loading Sequence.

Instead of spinning circles or uninspired progress bars, the Overture Loader builds massive tension using an extreme GSAP easing curve (`expo.inOut`) applied to a typographical counter. 

## ⚖️ The Tension Formula (Ease)
The `expo.inOut` calculation on a 4.5-second sequence creates psychological suspense:
1. It starts crawling from `000` to `005`.
2. Suddenly rips aggressively through `020` to `085` in a near visual blur.
3. Decelerates and painfully ticks through `097, 098, 099... 100`, making the user wait for the drop.

## 🎞️ Analog Film Aesthetics
The two halves of the screen masquerade as `.shutter-top` and `.shutter-bottom`. They are pitch black (`#030303`), but they contain a raw SVG Fractal Noise filter injected directly via SCSS pseudo-elements. This gives the digital void an electric, film-grain analogue pulse at 60FPS without loading external image assets.

## ⚠️ Important Implementation Details
When deploying in a real app (`App.tsx` or `_app.jsx` in NextJS):
1. The component **must** sit at the absolute highest level of your DOM tree inside the `body`.
2. It natively manipulates `document.body.style.overflow = 'hidden'` during the 4-second sequence and removes it via `onComplete`. *Do not manually lock your body scroll anywhere else during mount, or it might conflict.*
3. Upon reaching 100%, the component sets `display: none` to physically remove itself from paint and click-hit-box calculations, freeing memory immediately. 
