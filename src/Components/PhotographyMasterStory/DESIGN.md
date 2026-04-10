# Photography Master Story // The Editorial Biography

## Overview
A vertically extensive, 4-act narrative component designed to provide deep biographical and philosophical context to the photography suite. It establishes the photographer's authority through equipment specifications, exhibition history, and a core artistic manifesto.

## Acts & Structure
- **Act 01: The Vision**: A large-scale hero section with deep parallax images and the primary philosophical statement.
- **Act 02: Technical Arsenal**: A 2-column grid detailing the professional hardware and optics used, emphasizing technical precision.
- **Act 03: Editorial & Global Presence**: A clean, monospaced table listing publications and international exhibitions.
- **Act 04: The Final Quote**: A high-impact signature closure using massive italicized typography and a centered quote.

## Tech Stack
- **GSAP ScrollTrigger**: Manages the staggered reveal of text and grid items per act as they enter the viewport.
- **Parallax Backgrounds**: Achieved through ScrollTrigger linear interpolation on background image Y-translation.
- **Responsive Layout**: Adapts from complex grids to single-column flows for mobile devices.

## Usage
```tsx
<PhotographyMasterStory />
```
