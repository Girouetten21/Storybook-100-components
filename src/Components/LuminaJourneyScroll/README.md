# 🌌 Lumina Journey Scroll: Immersive Horizontal Narrative

The **Lumina Journey Scroll** is a horizontal storytelling section that pins the entire page as the user "travels" horizontally through multiple scenes. It features an "Optical Cross" parallax effect within each slide.

---

## 🚀 Key Animation Features

*   **Horizontal Drive**: Pins the main viewport and translates the entire `horizontalSection` by its full `scrollWidth`.
*   **ContainerAnimation Integration**: Individual slide elements (like images) are triggered relative to the *horizontal movement*, not the vertical scroll, ensuring perfect synchronization.
*   **Split Content Reveal**: As each slide enters the viewport, subtitles and titles fade in as the image slightly drifts in the opposite direction.
*   **Dynamic Progress Tracking**: Features a CSS-driven progress bar that fills based on the total horizontal distance traveled.

---

## 🎨 How to Customize

### 📋 Slide Backgrounds & Text
All data is stored in the `JOURNEY_DATA` array (**Line 15**).
*   **Title**: Change `"The Origin"`.
*   **Subtitle**: Update the `"SCENE 01"` metadata.
*   **Main Image**: Replace `bg1` to `bg4`.

### ⏱️ Horizontal Scroll Length
The "Scroll Duration" (the vertical space used to complete the horizontal scroll) is on **Line 64**. 
*   **Slower Travel**: Match `scrollWidth` (Current). 
*   **Faster Travel**: Divide `scrollWidth` by `2`.

### 🖼️ Interior Image Parallax
The image drift is determined on **Line 75**. 
*   **X-axis Drift**: Change `x: -50` to `50` for more parallax depth.
*   **Smoothness**: Adjust `scrub: 1.2` or `true` (**Line 80**) for more or less kinetic lag.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`containerAnimation`** (**Line 79**) within its internal `ScrollTrigger`.
*   **Innovation**: This allows us to trigger "enters" and "leaves" based on the horizontal slider's position, even though the user is technically scrolling vertically.
*   **Auto Invalidating**: Uses `invalidateOnRefresh: true` (**Line 65**) to ensure that if the user resizes their window, the horizontal calculations are perfectly updated.

---

**Tip**: This component is a "Portfolio Walkthrough". Use it to display a series of case studies or a chronological brand history. High-resolution panoramas are recommended. 🌌💎🎞️🚀
