# Photography Film Archive // Chronological Horizontal Narrative

## Overview
A high-detail, horizontalPinned gallery designed to differentiate itself from the suite's vertical grids. It uses the visual metaphor of a continuous 35mm film reel to showcase curated photography.

## Visual Identity
- **35mm Reel Metaphor**: Features sprocket holes, vertical frame borders, and negative edge-coding (KDK_400).
- **Kodak Signature Palette**: Uses a specific orange/red for frame codes (`#ff4d00`) and a deep charcoal background (`#020202`).
- **Horizontal Pinned Motion**: Fixed section that scrolls horizontally while pinned, creating a cinematic linear narrative.
- **Focus Loupe**: Hover interaction that adds a radial vignetted lens over the image to simulate a focus check.

## Tech Stack
- **GSAP ScrollTrigger**: Manages the master pinning and the horizontal offset translation.
- **Container Animation**: Individual image reveals are triggered by the horizontal position within the viewport.

## Usage
```tsx
<PhotographyFilmArchive />
```
