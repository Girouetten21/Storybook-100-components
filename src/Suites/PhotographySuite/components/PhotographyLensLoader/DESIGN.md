# Photography Lens Loader // Shutter Calibration Sequence

## Overview
A cinematic entry experience designed to transition the user from a blank state into the high-end photography suite. It simulates the mechanical and electrical calibration of a professional camera system.

## Visual Identity
- **Mechanical Aperture**: An 8-blade SVG diaphragm that pulses while the "buffer" fills.
- **Darkroom Security Light**: A pulsating red indicator (`#ff0000`) that establishes a technical laboratory atmosphere.
- **Studio Flash Exit**: When 100% is reached, the UI emits a high-intensity white flash, followed by a `clip-path` wipe that reveals the main site.
- **Telemetry HUD**: Real-time status updates (CALIBRATING OPTICS, WARMING SENSOR) reinforce the suite's technical authority.

## Tech Stack
- **GSAP**: Orchestrates the complex exit timeline, shutter pulsing, and the final site reveal.
- **SVG Path Manipulation**: Used for the blade rotation and iris mechanics.
- **CSS Clip-Path**: Executes the clean vertical wipe at the end of the sequence.

## Usage
```tsx
const [isLoading, setIsLoading] = useState(true);
// ...
{isLoading && <PhotographyLensLoader onComplete={() => setIsLoading(false)} />}
```
