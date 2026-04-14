# Lens Aperture Exhibition // The Optical Journey

## Overview
A scroll-driven narrative component that mimics the mechanical experience of looking through a high-end camera lens. It transitions from a "Hardware-First" black void to a revealed three-act visual story.

## Visual Identity
- **Mechanical Iris**: A central aperture that opens dynamically as the user scrolls.
- **Three-Act Narrative**: Uses a sequence of three large-format images to tell a cohesive "Behind-the-lens" story.
- **Overlay HUD**: Real-time technical metadata that changes relative to the scroll position.

## Tech Stack
- **GSAP ScrollTrigger**: Manages the multi-stage reveal and the focus-pull transitions between slides.
- **Pinning**: The entire component pins for approximately 3000px of scroll to ensure the user absorbs the narrative.
- **Clip-Path Clipping**: Uses a custom `circle()` clip-path on the viewport to synchronize with the aperture hardware.

## Usage
```tsx
<LensApertureExhibition isUnlocked={isUnlocked} />
```
