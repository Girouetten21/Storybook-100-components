# 🏗️ GSAP-Skills: High-Performance Animation Architecture

Welcome to the architectural core of the **Storybook-100-components** library. This project follows a rigorous animation standard designed for 60FPS cinematic experiences, automatic memory management, and extreme modularity.

---

## 🚀 The Core Principles (Standard of Excellence)

Every component in this library is built using the official **`@gsap/react`** standard. If you are reusing or customizing these components, you must adhere to these four pillars of performance:

### 1. The `useGSAP()` Hook (Lifecycle Sanity)
We avoid `useEffect` and `useLayoutEffect` for GSAP. Instead, we use the `useGSAP()` hook.
*   **Automatic Cleanup**: All animations and ScrollTriggers are reverted automatically when the component unmounts.
*   **Scoped Selection**: Every animation is scoped to a `containerRef` using `{ scope: containerRef }`. This prevents selector collisions in large applications.

### 2. `contextSafe()` (Interactive Resilience)
All event-driven animations (clicks, hovers, toggles) are wrapped in `contextSafe`.
*   **Memory Safety**: It ensures that any animation triggered by a user's action is properly tracked and killed if the component disappears mid-animation.
*   **Zero Leakage**: No more ghost animations running in the background.

### 3. `autoAlpha` (Visual Integrity)
We never animate `opacity` to 0. We use `autoAlpha: 0`.
*   **Performance**: `autoAlpha` toggles `visibility: hidden` when the element is transparent.
*   **Zero Layout Thrashing**: This prevents the browser from rendering invisible elements and improves intersection observer performance.

### 4. Hardware Optimization (`force3D`)
For complex transforms (scaling, rotating, large translations), we use `force3D: true` to ensure the GPU handles the rendering, keeping the frame rate buttery smooth.

---

## 🎨 How to Customize These Components

### 🖼️ Imagery & Assets
Most components use imports from `../../assets/img`. To use your own images, simply replace the imports at the top of the `.tsx` file or pass them as props (if the component is already prop-driven).

### ⏳ Timing & Easing
Our default easing is usually `power4.inOut` (dramatic) or `expo.out` (premium). 
*   To speed up an animation, find the `duration:` property in the GSAP timeline.
*   To adjust the stagger (sequential reveal), look for `stagger: 0.1` or similar.

### 🏗️ Scoping CSS (BEM / SCSS)
Each component is coupled with a dedicated `.scss` file. We use a unique wrapper class for each component to avoid global style leakage.

---

## 🛠️ Requirements & Installation

Ensure your project has the following dependencies:
```bash
npm install gsap @gsap/react
```

For Scroll-heavy components:
```bash
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

---

**Built with precision for the next generation of the web.** 🥂✨🎞️🚀
