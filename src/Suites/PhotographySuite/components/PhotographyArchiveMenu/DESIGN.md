# Photography Archive Menu // Editorial Navigation

## Overview
A full-screen "Darkroom Overlay" menu designed for high-end photography portfolios. It prioritizes discovery through interaction, using professional visuals to preview different sections of the suite.

## Visual Identity
- **Editorial Typography**: Large, serif labels paired with mono-spaced meta-data.
- **Dynamic Previews**: A cross-fading background system that reacts to list-item hovers.
- **Shutter HUD**: Technical metrics and status indicators that reinforce the camera-body theme.

## Tech Stack
- **GSAP Context**: Uses `useGSAP` with `contextSafe` for robust, high-performance animation handling during rapid hovers.
- **Clip-Path Transitions**: The menu opens via an expanding circular iris, mimicking a camera shutter.
- **Scroll Hijacking**: Blocks site-wide scrolling while open using standard DOM manipulation.

## Usage
```tsx
<PhotographyArchiveMenu />
```
