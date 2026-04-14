# Photography Contact Banner // Narrative Call to Action

## Overview
A cinematic, high-impact banner designed to bridge sections within the photography suite. It uses the "Contact Sheet" metaphor to present a technical, editorial call to action.

## Visual Identity
- **Focus-Pull background**: Starts blurry/grayscale and sharpens as it enters the viewport.
- **HUD Tracks**: Persistent horizontal tracks showing technical film metadata (Frame counts, film types) that move with the scroll.
- **Viewfinder Crosshairs**: Static indicators in the corners that establish a camera-body perspective.
- **Shutter CTA**: A button that pulses with a white "flash" on hover, mimicking a camera shutter.

## Tech Stack
- **GSAP ScrollTrigger**: Orchestrates the focus-reveal and the HUD-tracking animations.
- **Magnetic Interactivity**: Uses custom event listeners to pivot the CTA button towards the mouse.
- **CSS Keyframes**: Handles the `shutterFlash` pulse for high-performance hover feedback.

## Usage
```tsx
<PhotographyContactBanner />
```
