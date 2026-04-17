# Suite Component Architecture: Interaction & Scroll Management

This document outlines the standard engineering patterns for managing "Critical States" in high-fidelity suites, specifically focusing on **Loading phases**, **Gate entrance barriers**, and **Navigation overlays**.

## 1. The "Aggressive Scroll Lock" Pattern

To ensure a premium, cinematic experience, we must prevent the user from scrolling while the system is initializing or while a full-screen HUD is active. Standard `overflow: hidden` is often insufficient when dealing with smooth-scroll libraries (like Lenis) or mobile momentum.

### The Stable Reference Strategy

**CRITICAL:** Event listeners in React must use a stable function reference. If defined inside a component's body without careful management, a new function is created on every render, leading to "Zombie Listeners" that cannot be removed.

#### Implementation Template

```tsx
import React, { useState, useLayoutEffect } from 'react';

// 1. Define the handler OUTSIDE the component scope to keep the reference stable
const preventScroll = (e: Event) => {
    e.preventDefault();
    // Use stopPropagation ONLY if necessary for specific nested HUDs
};

export const YourGateComponent: React.FC = () => {
    const [isActive, setIsActive] = useState(true);

    useLayoutEffect(() => {
        if (isActive) {
            // 2. Apply both Event Listeners and CSS Styles for redundancy
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            
            // Standard overflow lock
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0); // Reset position if it's a Gate
        } else {
            // 3. Explicitly unlock when state changes
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        }

        // 4. Cleanup on Unmount (Safety Net)
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [isActive]);

    return (
        // Component JSX
    );
};
```

---

## 2. Component-Specific Implementation Guides

### A. The Loader (`GlitchLoader`)
- **Mounting:** Add the scroll lock immediately.
- **Progress:** Don't unlock based on `progress === 100`.
- **Visibility:** Unlock only when the component is removed from the DOM (usually after a fade-out animation).
- **Tip:** Use `setVisible(false)` in the `onComplete` of the fade animation to trigger the `useEffect` cleanup.

### B. The GateHero (`GlitchGateHero`)
- **Lock Type:** Absolute. The gate is a physical barrier.
- **Unlock Trigger:** Set `isBreached(true)` at the **END** (`onComplete`) of the entrance timeline.
- **Layout:** The gate container should stay in the DOM as a section (spacer), but the overlay should be removed or made `pointer-events: none`.

### C. The Menu (`GlitchMenu`)
- **Syncing Transitions:** Use GSAP Timelines for visibility.
- **Common Error:** Don't toggle visibility using only an `is-open` CSS class, as it will cut off the `reverse()` animation.
- **Solution:** Set `.menu-overlay { visibility: 'visible' }` as the first step in the `play()` timeline and let GSAP manage the opacity/alpha.

---

## 3. Best Practices Checklist

- [ ] Is `preventScroll` defined outside the component?
- [ ] Is `passive: false` used in the `wheel` event listener?
- [ ] Are both `wheel` and `touchmove` covered?
- [ ] Does the `useLayoutEffect` cleanup handle every possible exit path (unmount and state change)?
- [ ] Is `document.body.style.overflow` reset to `''` (empty string) instead of `'auto'` to avoid overriding other global styles?
