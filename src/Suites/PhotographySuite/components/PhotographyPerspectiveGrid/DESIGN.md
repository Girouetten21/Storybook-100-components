# Photography Perspective Grid // Depth of Field Exploration

## Overview
An interactive 3D spatial component that explores the concept of "Depth of Field" (DoF). The entire grid reacts to mouse movement via a tilt-shift effect, while individual images dynamically blur based on their distance from the cursor.

## Visual Identity
- **3D Tilt-Shift**: The grid uses CSS perspective and GSAP to rotate in 3D space, following the cursor.
- **Dynamic Bokeh**: Images simulate a wide-aperture lens by blurring (`filter: blur`) as the cursor moves away, creating a focal point around the mouse.
- **Distance HUD**: Technical labels (0.85m, 1.50m, etc.) reinforce the optical theme.
- **Floating Typography**: Labels are projected forward in 3D space using `translateZ`, creating a parallax effect.

## Tech Stack
- **GSAP**: Orchestrates the 3D rotation and the proximity-based blur scaling.
- **CSS 3D Transforms**: Uses `transform-style: preserve-3d` to maintain spatial depth across layers.

## Usage
```tsx
<PhotographyPerspectiveGrid />
```
