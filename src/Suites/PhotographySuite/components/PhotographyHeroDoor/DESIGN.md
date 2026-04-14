# Hero Door Photography // The Gateway

## Overview
`HeroDoorPhotography` is the cinematic entrance to the photography suite. It acts as a gated portal that enforces a linear narrative by blocking background interactions until the user "unlocks" the story.

## Visual Identity
- **Brutalist Split**: A diagonal background split using technical and observer-centric imagery.
- **Master Image**: A central editorial portrait of a professional photographer, acting as the thematic anchor.
- **Technical HUD**: Floating typography and metrics (F-stop, ISO) that establish an expert, gear-focused aesthetic.

## Tech Stack
- **GSAP**: Orchestrates the initial marquee and the explosive unlock animation.
- **Scroll Blocking**: Aggressively intercepts wheel and touch events via `useEffect` hooks until `isGated` is false.
- **Magnetic Physics**: The central door element reacts subtly to mouse movement to encourage user interaction.

## Usage
```tsx
<HeroDoorPhotography onUnlock={() => handleUnlock()} />
```
