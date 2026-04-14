# 🎞️ Split Text Menu: Dramatic Spotlight Typography

The **Split Text Menu** is a full-screen navigation component that uses a "Spotlight" reveal (circular clip-path) to transition from the main page into an editorial-style menu. It features words that "split" apart upon hover to reveal panoramic image gaps.

---

## 🚀 Key Animation Features

*   **Spotlight Center Reveal**: A dramatic circular expansion originating from the exact center of the screen (`clipPath: circle(150% at 50% 50%)`).
*   **3D Entrance**: Menu items enter with a `rotateX: -15` and `y: 50` stagger for a 3D-oriented appearance.
*   **Word Gapping Peak**: When a link is hovered, the words split apart, allowing a high-end image to peek through a rectangular gap.
*   **Unified Closing Sequence**: The menu closes with a `1.8x` timeScale reversal for quick user feedback.

---

## 🎨 How to Customize

### 🍔 Navigation Links
The links are driven by the `menuItems` array (**Line 12**).
```tsx
const menuItems = [
    { title: 'YOUR LINK', category: 'Metadata', image: imgImported },
    ...
];
```

### 🔦 Spotlight Origin
You can change the origin of the circle reveal on **Lines 31-32**.
*   **Center**: `50% 50%` (Default)
*   **Top Right**: `90% 10%`
*   **Bottom Left**: `10% 90%`

### 🖋️ Hover Split Timing
The "Word Split" logic is primarily handled in the **SCSS** file (`&::before` and `&::after`), but the initial entrance of the items is defined in the GSAP timeline (**Line 36**). 
*   **Rotate Intensity**: Adjust `rotateX: -15` for a more or less aggressive 3D tilt.
*   **Ease**: Uses `power4.inOut` for the reveal and `power3.out` for the links.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 58**) for the `toggleMenu` function. 
*   **Safety**: It ensures the total reversal of the timeline and the setting of `setIsOpen(false)` only happens after the animation completes (`tlRef.current.reverse().then(...)`).
*   **Auto Alpha**: Uses `autoAlpha` to ensure the menu items and footer are completely invisible to the engine when the menu is closed.

---

**Tip**: To change the background color of the menu, modify the `backgroundColor` property in the `fromTo` reveal logic on **Line 31**. 🥂✨🎞️🚀
