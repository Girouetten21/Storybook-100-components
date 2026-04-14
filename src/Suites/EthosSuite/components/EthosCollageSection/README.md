# 🖼️ Curated Collage Section

**Component #57 - Minimalist Variety Showcase**

The **Curated Collage Section** is a high-end structural module designed to showcase variety through an elegant, museum-inspired minimalist aesthetic. It breaks away from traditional grid layouts, using an asymmetrical "floating" arrangement that feels airy, sophisticated, and curated.

### ⚜️ Key Features:
*   **Asynchronous Parallax Grid**: Every item in the collage flows at a different speed (`0.6x` to `1.5x`), creating a layered depth effect as the user scrolls.
*   **Minimalist Detail Imagery**: A collection of 5 unique assets (Architecture, Silk, Precision, Organic, Nature) each framed with clean ivory and subtle shadows.
*   **Grayscale-to-Color Reveal**: Images are initially grayscale to maintain the minimalist tone, transitioning to full color and scale on hover for an interactive pop.
*   **Elegant Editorial Typography**: Features a combination of the ultra-thin `Fraunces` for titles and `Outfit` for technical data, echoing a high-end luxury look.
*   **Museum Palette**: Built on a `Stone/Ivory (#f7f7f4)` base with `Charcoal (#111)` text, perfectly suited for high-fashion or architectural portfolios.

### 🚀 Performance Optimization:
*   **GSAP Scoping**: Uses the `@gsap/react` `useGSAP` hook for automated memory management and selector safety.
*   **CSS-Based Shadows**: Leverages very subtle, performant CSS shadows to create depth without affecting page weight.
*   **Fluid Percentage Layout**: Uses `%` and `vw` units to ensure the collage maintains its relative proportions across large desktop displays.

### 📂 Structure:
```text
CuratedCollageSection/
├── CuratedCollageSection.tsx     # Logic & Asynchronous triggers
├── CuratedCollageSection.scss    # Museum grid & Luxury aesthetics
└── README.md                   # Documentation
```
