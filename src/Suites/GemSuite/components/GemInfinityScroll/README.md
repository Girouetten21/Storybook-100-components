# 💎 Crystalline Infinity Scroll: Diamond Reveal Sequence

The **Crystalline Infinity Scroll** is a highly immersive, full-screen pinned gallery. It uses a growing "Diamond" mask (`clip-path: polygon()`) to reveal new sections while the previous section undergoes a deeply cinematic optical blur and scale fade.

---

## 🚀 Key Animation Features

*   **Diamond Clip-Path Expand**: Transitions between slides using a 4-point polygon that scales from the absolute center (`50% 50%`) outward beyond the viewport edges.
*   **Dual Optical Sync**: As the new slide reveals, the outgoing slide scales down and applies a heavy `blur(20px)` and brightness drop, simulating a camera changing focus to a new layer.
*   **Glassmorphism Floating Frame**: Text content sits inside a high-end `backdrop-filter: blur(16px)` card with delicate border lighting.
*   **Buttery Pinning**: Prevents regular scrolling via ScrollTrigger pinning while moving the user seamlessly through the sequence.

---

## 🎨 How to Customize

### 📋 Slide Data
All text and images are defined in the `CRYSTAL_DATA` array (**Line 14**).
*   **Images**: Update `img1` through `img4` for your own background imagery.
*   **Text content**: Tweak the titles, subtitles, and standard text per slide.

### 🔷 The Diamond Mask
The magic happens with the `clipPath` animation around **Line 83**.
*   **Shape Modification**: If you prefer a circle reveal, change the `from` and `to` properties to `circle(0% at 50% 50%)` and `circle(150% at 50% 50%)`.
*   **Speed**: Controlled by `scrub: 1.2` on the main ScrollTrigger (**Line 53**). Increase to `2` for more kinetic delay (slower follow).

### 🔍 Blur Depth
The optical blur applied to the *departing* slide is configured at **Line 72**.
*   **Less Blur**: Change `blur(20px)` to `blur(10px)`.
*   **Brightness**: `brightness(0.4)` dims the slide by 60%.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component leverages the **GSAP-Skills** standard strictly.
*   **Scoping**: Uses `wrapperRef` as the context scope. All internal selectors `.crystal-slide`, `.glass-content`, etc., are protected.
*   **Auto Alpha**: Internal staggered reveals of typography exclusively use `autoAlpha: 0` to `autoAlpha: 1` rather than standard opacity.

---

**Tip**: This component commands total attention. Use it for a product deep-dive (like showcasing the specific features of a luxury watch or vehicle) or for a multi-stage brand manifesto. 🎞️💎✨🚀
