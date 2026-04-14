# Photography Service Mosaic // Light Discovery

## Overview
A boutique service showcase that uses a brutalist grid and magnetic interactions to present professional photography services. It emphasizes technical mastery and editorial quality.

## Visual Identity
- **Brutalist Grid**: Staggered layout with varied card sizes (Architectural, Portrait, Technical).
- **Magnetic Interactivity**: Images shift slightly based on mouse movement to create a tactile, 3D feel.
- **Prismatic Overlays**: Subtle color-dodge gradients that appear on hover, mimicking lens flares.

## Tech Stack
- **GSAP Staggered Reveal**: ScrollTrigger animates each card into view with rotation and scaling.
- **Magnetic Logic**: Custom event listeners calculate relative mouse position to govern image and overlay displacement.
- **Responsive Flex**: Gracefully degrades into a single-column list on mobile, preserving readability.

## Usage
```tsx
<PhotographyServiceMosaic />
```
