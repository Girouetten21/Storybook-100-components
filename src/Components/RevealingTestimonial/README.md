# 💬 Revealing Testimonial: Floating Door Separation

The **Revealing Testimonial** is a high-end "Scroll Reveal" component. As the user scrolls, a centered floating box "splits" like doors opening, revealing a beautiful testimonial text and background image hidden behind them.

---

## 🚀 Key Animation Features

*   **Split Mirroring**: Two symmetrical overlay panels (acting as "doors") move away on the X-axis while simultaneously rotating for a 3D leaf effect.
*   **Parallax Text Reveal**: Titles and testimonials fade in with a very slow `y` translation starting at `40px` and settling to `0`.
*   **Synchronized Scaling**: The background image within the door panels undergoes a subtle scale-up to increase the "floating" sensation.
*   **Seamless Loop Avoidance**: ScrollTrigger uses `scrub: 1.2` for smooth, lag-free scrubbing across all devices.

---

## 🎨 How to Customize

### 📋 Content & Metadata
The content is located in the JSX around **Line 60**. 
*   **Testimonial**: Update `"Choosing the perfect hide..."`.
*   **Metadata**: Change `"Atelier / 26"` in the `.testimonial-eyebrow`.

### 🚪 Door Separation
The "splitting" distance is determined on **Lines 35 and 41**. 
*   **Distance**: Increase `xPercent: -40` and `40` for a wider opening. 
*   **Rotation**: Currently uses `rotateY: -5` and `5`. Increase for a more aggressive 3D leaf effect.

### 🖼️ Imagery
The components use two layers of images. 
*   **Front Image**: The one seen on the "doors" before they open.
*   **Back Image**: The one revealed behind the doors.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component manages ScrollTrigger instances automatically within the `useGSAP` hook (**Line 27**).
*   **Scoped Selection**: It uses `scope: containerRef` to target `.left-panel`, `.right-panel`, and `.testimonial-text` without global selector conflicts.
*   **Auto Cleanup**: Animations are automatically reverted, ensuring the panels start closed upon component re-mount or hard page refresh.

---

**Tip**: This component is perfect for "Key Statements" or "Founder Testimonials". Its movement is slow and deliberate, designed to make the user pause and read. 🖋️💎🎞️🚀
