# 👗 Avant-Garde Fashion Scroll: Giant Index & Stacked Reveals

The **Avant-Garde Fashion Scroll** is a highly editorial pinned scroll component designed specifically for luxury, fashion, and high-end artistic portfolios. It plays heavily with asymmetrical layout, out-of-bounds typography, and deep geometric clipping masks.

---

## 🚀 Key Animation Features

*   **Massive Index Topography**: The slide numbering (`01`, `02`) is scaled to `55vw`, rendering it as a giant, almost abstract watermark that bleeds off the left side of the screen.
*   **Vertical Swipe Mask (`clip-path`)**: As the user scrolls, new slides don't fade in; they "wipe" up from the bottom using an animated `inset(100% 0% 0% 0%)` masking technique, creating an illusion of physical layering cards.
*   **Asymmetrical Information Box**: Metadata doesn't sit safely beneath the image. A solid black element breaks the boundary of the image, hanging drastically `-35%` off the left edge, mimicking avant-garde editorial print layouts.
*   **Cinematic Deconstruction**: The outgoing image shrinks and desaturates (`grayscale(50%) brightness(0.3)`) behind the new incoming image, adding intense focal depth.

---

## 🎨 How to Customize

### 📋 Collection Data
All fashion imagery and text are housed in the `FASHION_DATA` array (**Line 14**).
*   **Images**: Replace `img1`, `img2`, `img3` with your own photography. Portrait standard (e.g., Models, Lookbooks) looks best here.
*   **Metadata**: Update the collection seasons (`FW / 26`), titles, and descriptions.

### 📐 The Giant Index Position
The typography is deliberately excessive and uncontrolled. Modify **Lines 18-35** in the `.scss` file to shift its weight.
*   **Massive Size**: Default is `55vw`. Reduce to `30vw` if you prefer it to fit inside the screen safely.
*   **Bleed Left**: Default is `left: -5%`. You can shift this positive or negative depending on the font you use to ensure the numbers overlap the image exactly how you want.

### 🖼️ Asymmetrical Meta Box
The fashion "hanging overlap" effect is located at **Line 66** of the `.scss`.
*   **Hang Distance**: Change `left: -35%` to push the box further left or right across the image.
*   **Background Color**: Change `background: #080808` to `#ffffff` and text to `#000` to create a stark negative-space contrast box.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component leverages a single master timeline architecture to avoid scroll conflict (the "Flicker").
*   **Single Unified Timeline**: Moving the giant numeric indices, masking the outgoing image, translating the metadata arrays, and moving the incoming masking box are *all* strictly bound to the exact same scrubbed ScrollTrigger. This ensures 100% frame-perfect sync regardless of user scroll speed.
*   **Pre-Setting Elements**: Instead of applying heavy CSS that fights JS, GSAP automatically applies `clipPath: inset(100% ...)` to all `slides.slice(1)` right before the scroll starts (**Line 43**).

---

**Tip**: This component commands a dark theme. Keep typography clean, colors non-existent, and let the photography and the massive typography do the heavy lifting. 🖤👗✨🚀
