# 🗾 Stacked Tour Cards: Dynamic Vertical Stacking

The **Stacked Tour Cards** component uses a "Sticky Stacking" pattern, where cards accumulate on top of each other as the user scrolls. It features a sophisticated "Optical Blur" and "Zoom Out" effect for the covered cards to create a sense of tangible depth.

---

## 🚀 Key Animation Features

*   **Sticky Stacking Logic**: Utilizing `position: sticky` in CSS, synchronized with GSAP to create the accumulation effect.
*   **Optical Blur & Scale**: As a card is covered by the next, it scales down to `0.88` and gains a `blur(8px)` effect for a high-end lens feel.
*   **Staggered Text Entrance**: Categories, titles, and price pills stagger into view with `autoAlpha` and `y` translation when their section becomes active.
*   **Hardware Optimized**: Uses `filter` and `scale` for GPU-accelerated transitions.

---

## 🎨 How to Customize

### 📋 Data Structure
The component is driven by the `toursData` array (**Line 13**). To add or change cards:
```tsx
const toursData = [
    {
        id: '1',
        category: 'YOUR CATEGORY',
        title: 'Your Tour Title',
        image: yourImportedImage,
        duration: 'X HOURS',
        price: 'FROM X€'
    },
    ...
];
```

### 🖼️ Sticky Timing
The "covering" effect is controlled by the `ScrollTrigger` in **Line 53**.
*   **Duration of Zoom**: Current logic is `start: "top top"` and `end: "bottom top"`. This means the zoom completes exactly when the next card's top reaches the top of the viewport.
*   **Blur Intensity**: Adjust `blur(8px)` on **Line 60** for more or less depth of field.

### 🖋️ Typography & Entrance
Text entrance is controlled by `gsap.fromTo` on **Line 76**. 
*   **Entrance Delay**: Adjust `stagger: 0.05` to speed up or slow down the sequential reveal of labels and titles.
*   **Ease**: Uses `power3.out` for a smooth, natural settle.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component manages life cycles automatically within the `useGSAP` hook (**Line 49**). 
*   **Scoped Selection**: It uses a `wrapperRef` as scope, ensuring multiple instances of this component can exist on the same page without ScrollTrigger collisions.
*   **Auto Cleanup**: No need for manual `ScrollTrigger.kill()` on unmount.

---

**Tip**: This component works best when placed in a full-width container. Each card should have high-resolution background imagery for the "Optical Blur" effect to feel premium. 🎞️💎🚀
