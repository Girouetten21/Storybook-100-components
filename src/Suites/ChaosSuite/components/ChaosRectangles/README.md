# 🌌 Random Rectangles: "Event Horizon" Gravitational Collapse

The **Random Rectangles** component is a massive immersive piece that uses a "Gravitational Collapse" pattern. As the user scrolls, randomized geometric fragments from the periphery are drawn into a perfect central arrangement, forming a title.

---

## 🚀 Key Animation Features

*   **Pinning Mastery**: The entire viewport is pinned for a duration of `3000px` to allow the complex collapse to occur.
*   **Periphery Scatter**: Rectangles start outside the screen boundaries at randomized `x`, `y`, `scale`, and `rotation` values.
*   **Gravitational Pull**: Using a scrubbing ScrollTrigger, these fragments fly toward a `0, 0` coordinate position to form the "Event Horizon" title.
*   **Floating Drift**: Adds subtle, organic movement to the background layers for a "Space-time" feel.

---

## 🎨 How to Customize

### 📋 Title Content
The main title is located in the JSX around **Line 173**.
*   **Main Title**: Change `"EVENT HORIZON"`.
*   **Sub-title**: Update the secondary text `"GRAVITATIONAL SINGULARITY"`.

### ⏱️ Pinning Duration
The length of the "collapse" is determined by the `end: "+=3000"` property on **Line 105**.
*   **Longer Play**: Increase to `"+=5000"` for a slower, more deliberate collapse.
*   **Faster Play**: Decrease to `"+=1500"` for a rapid impact.

### 📐 Rectangle Density
The number of rectangles is determined by the `Array(40)` in **Line 177**.
*   To add more fragments for a "denser" feel, increase the array size.
*   To change the variety of the rectangles, modify the `randomColor()` and `randomSize()` logic in the helper functions.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component handles **Scroll Memory Restoration** automatically within `useGSAP` (**Line 98**) to ensure the user starts at the top of the pinned section upon hard refresh.

```tsx
// Ensures clean ScrollTrigger state on refresh
window.history.scrollRestoration = 'manual';
```

---

**Tip**: This component is a "Main Storyteller". Use it as the centerpiece of a portfolio or a major product introduction where you want a "Wow" factor during scroll. 🥂✨🎞️🚀
