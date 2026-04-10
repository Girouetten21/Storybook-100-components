# Photography Editorial Collage // Curated Gallery Exhibition

## Overview
A brutalist, asymmetrical gallery layout designed to mimic high-end physical art exhibitions. It prioritizes white space, intentional overlaps, and technical narrative through EXIF metadata.

## Visual Identity
- **Exhibition Mounting**: Uses a 12-column grid to position images with varied sizes and Z-depths, breaking the traditional grid flow.
- **Deep Parallax**: Each image moves at a unique speed relative to its position, creating a three-dimensional spatial journey during scroll.
- **Developing Reveal**: Images start desaturated and slightly darkened, "developing" into full fidelity on hover.
- **EXIF Metadata**: Technical specs (Aperture, Shutter, ISO) are presented as "gallery labels" on each piece.

## Tech Stack
- **GSAP ScrollTrigger**: Orchestrates the multi-speed parallax and the initial staggered entrance of the collection.
- **CSS Grid (Brutalist)**: Manages the asymmetrical positioning and overlapping layers.

## Usage
```tsx
<PhotographyEditorialCollage />
```
