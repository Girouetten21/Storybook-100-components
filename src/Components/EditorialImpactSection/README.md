# 🎞️ Editorial Impact Scroll: Multi-Layered Reveal

The **Editorial Impact Scroll** is a centerpiece of visual storytelling. It uses a "Page Turn" mask reveal and three independent layers of parallax to create a sense of cinematic weight as the user moves through the page.

---

## 🚀 Key Animation Features

*   **Inset Reveal Mask**: A dramatic `clip-path: inset(100% 0% 0% 0%)` that "peels" back each section like a luxurious magazine page.
*   **Layered Parallax Flow**: 
    *   **Main Background**: Moves slowly (`yPercent: 15`).
    *   **Floating Detail**: Moves rapidly (`yPercent: -20`) to create a floating sensation.
    *   **Typography**: Drifts horizontally based on section parity (even/odd) for a dynamic layout.
*   **Auto Alpha Synchronization**: All elements fade in and out with `autoAlpha` to ensure zero flickering during the scrub.

---

## 🎨 How to Customize

### 📋 Section Content
Metadata & text are stored in the `EDITORIAL_DATA` array (**Line 16**).
*   **Main Background**: Change `imgMain`.
*   **Floating Detail**: Change `imgFloat` (Recommended: transparent PNG).
*   **Color Theme**: Each section has a `bg` property for custom color backgrounds.

### ⏳ Reveal Direction
The mask peel direction is determined on **Line 61**. 
*   **From Bottom (Default)**: `inset(100% 0% 0% 0%)` to `inset(0% 0% 0% 0%)`. 
*   **From Left**: Change to `inset(0% 100% 0% 0%)`.

### ⏱️ Parallax Intensity
Horizontal titles drift on **Lines 107-111**. 
*   **Drift Distance**: Increase `i % 2 === 0 ? -20 : 20` for more horizontal movement.
*   **Text Fade**: Adjust `autoAlpha: 0.5` in the "from" state (**Line 107**) for a softer text reveal.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses the `useGSAP` loop (**Line 49**) to identify each `.editorial-section`. 
*   **Selector Scoping**: Every internal selector like `.reveal-mask` and `.editorial-title` is scoped, allowing the component to be reused infinitely without style or animation collision.

---

**Tip**: This component is a "Section High-Impact". It works best for displaying product features, fashion collections, or portfolio deep-dives. Use high-contrast imagery for the best mask effect. 🎞️💎🎞️🚀
