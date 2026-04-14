# Photography Technical Manifesto // Editorial Information Grid

## Overview
A minimalist, text-centric section designed to provide philosophical and technical depth to the photography suite. It balances a high-impact panoramic image with a 4-column informational grid.

## Visual Identity
- **Panoramic Hero**: A wide 60vh image that uses `clip-path` for a sophisticated reveal and subtle parallax during scroll.
- **Technical Grid**: 4 columns representing the core pillars of the suite. Each column features a numerical ID and a high-contrast mono-spaced header.
- **Micro-HUDs**: Small labels on the image reinforce the "Calibrated System" aesthetic.
- **Editorial Typography**: Wide line-heights and generous white space create a high-end, gallery-catalog feel.

## Tech Stack
- **GSAP ScrollTrigger**: Orchestrates the staggered entrance of the columns and the parallax effect of the hero image.
- **Clip-Path**: Used for the signature "rolling shutter" reveal of the primary image.

## Usage
```tsx
<PhotographyTechnicalManifesto />
```
