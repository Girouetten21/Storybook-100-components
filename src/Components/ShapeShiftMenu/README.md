# 📐 Shape Shift Menu: Geometric Metamorphosis

The **Shape Shift Menu** is a highly interactive full-screen navigation component. It features a "Pill to Circle to Laser" metamorphosis animation that serves as a high-end transition between the page content and a typographic menu gallery.

---

## 🚀 Key Animation Features

*   **Geometric Transformation**: A 3D "Pill" button compresses to a "Circle", then stretches into a vertical "Laser Ray" before finally filling the whole screen.
*   **Sequential Slam Gallery**: Menu items enter with a rapid, impactful "slam" effect (`scale: 1.2` to `1`) and `y` translation.
*   **Mirror Clipping**: Uses `clip-path` and `borderRadius` animations to bridge between basic shapes and a full-page overlay.
*   **Time-Scaled Reversal**: Closes at `1.8x` or `2x` speed for a quick, responsive "back to content" feel.

---

## 🎨 How to Customize

### 📋 Menu Data
Navigation items are stored in the `menuItems` array (**Line 14**).
*   **Title**: Change `"PORTFOLIO"`.
*   **Category**: Update metadata like `"PROJECT SELECTION"`.

### 🧪 Shape Metamorphosis Stages
The transition happens in the `tlRef` timeline starting at **Line 31**. 
*   **Stage 1 (Circle)**: Modify `width: '80px'` and `borderRadius: '50%'` on **Line 33**. 
*   **Stage 2 (Laser)**: Adjust the "Vertical Stretch" by changing `height: '100%'` and `width: '2px'` on **Line 38**.

### 🖋️ Gallery Entrance
The "Slam" effect is located on **Line 47**.
*   **Impact**: Increase `scale: 1.5` for a more aggressive entrance.
*   **Speed**: Decrease `duration: 0.6` to make the links appear faster.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 62**) for the `toggleMenu` function.
*   **Integrity**: It uses `reverse().then(...)` to ensure the menu state `setIsOpen(false)` only triggers after the full closing animation completes.
*   **Scoped Selection**: All "shape" elements and "gallery" items are scoped to the `containerRef`, preventing CSS leakage.

---

**Tip**: This component is for brands that want to feel "Technical", "Architectural", or "Digital-Avant-Garde". The sharp laser transition is its signature. ⚡💎🎞️🚀
