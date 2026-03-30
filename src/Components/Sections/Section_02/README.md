# 🏢 Section 02: Artisanal Houses Scenic Navigation

The **Section 02** is a masterpiece of "Forced Scroll" storytelling. It uses a scene-based navigation pattern where the user "scrolls" through the distinct stages of leather craftsmanship (The Houses) without traditional vertical movement.

---

## 🚀 Key Animation Features

*   **Observed Scrolling**: Uses `gsap.Observer` to intercept scroll/touch events and trigger discrete "Scene Jumps".
*   **Wipe Transition**: Slides between "Curation House", "Tanning House", and "Finishing House" using a high-speed vertical `yPercent` wipe.
*   **Staggered House Reveal**: Titles, descriptions, and icon-based sub-steps fade in with `autoAlpha` and `y` translation during every scene change.
*   **Event Intersection Lock**: Prevents basic scrolling within the section to enforce the narrative flow until all houses are seen.

---

## 🎨 How to Customize

### 📋 Content Data
All house content is located in the `housesData` array (**Line 8**).
*   **House Title**: Change `"CURATION HOUSE"`.
*   **Sub-steps**: Each house has a list of sub-steps with an icon. You can replace the SVG icon and text directly in the array.

### ⏱️ Transition Speed
The speed of the "Wipe" effect is located in the `goToSection` function (**Line 173**). 
*   **Scene Duration**: Currently `duration: 0.8`. Decrease to `0.5` for a very snappy, industrial feel. 
*   **Ease**: Uses `power2.inOut` for a balanced, premium movement.

### 🎨 Visual Background
The "Houses" decorative background text is located in **Line 208**. To change it:
```tsx
<div className="background-text">YOUR TEXT</div>
```

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 155**) for the `goToSection` function.
*   **Atomic Actions**: It ensures that while a scene change is in progress (`animating.current = true`), no other scroll events can interrupt the motion, preventing layout glitches.
*   **Self-Cleaning Observer**: The `Observer.kill()` is handled within the `useGSAP` cleanup function (**Line 203**), ensuring total memory safety.

---

**Tip**: This component is a "Narrative Pillar". Use it for step-by-step processes or feature highlights where you want to focus the user's total attention on one piece of information at a time. 🏘️💎🎞️🚀
