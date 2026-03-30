# ✂️ Sartorial Heritage Scroll: The Bespoke Collection

The **Sartorial Heritage Scroll** is the 44th component of the library, meticulously engineered for high-end luxury, tailoring, real estate, or any brand requiring absolute, surgical precision in its UI aesthetics.

---

## 🎩 The "Wow" Factor: Core Engineering
Unlike the previous scrolls that slide from the bottom, this component is built around the concept of "Cutting and Measuring":

1. **Jacket-Split Transition**: The incoming image mask starts completely closed in the center (`inset(0% 50% 0% 50%)`). As you scroll, it drastically unzips/splits open from the middle outwards to the edges `inset(0% 0% 0% 0%)`. It flawlessly mimics a tailored jacket being opened, or scissors slicing down a fabric.
2. **The Tailor's Grid**: The UI is wrapped in a geometric measuring boundary (`.tailor-grid`). Upon entry, `1px` gold thread lines draw themselves across the screen, establishing intersection points armed with precise `+` crosshairs.
3. **Gold Thread Anchors**: The `avant-meta` boxes feature a delicate `.thread-line` spanning from the sequence number `01` directly to the category marker.

---

## 🎨 How to Customize (The Atelier)

### 📋 Content Modification
Data is centralized in the `TAILOR_DATA` array within the `.tsx` file.
*   Update `mark` to denote specific tailoring/workflow steps (e.g., *MEASUREMENT*, *DRAFT & CUT*, *FITTING*).
*   Descriptions are built for a delicate `Playfair Display` serif font.

### ✂️ Grid & Thread Colors
The professional tailoring theme is heavily defined by its color grading. Modify in `SartorialHeritageScroll.scss`:
*   **The Navy Suit (Background)**: Default is `#0b0d10` (Midnight Charcoal Navy).
*   **The Silk/Gold Thread**: All lines, borders, and crosshairs are tinted `#d4af37` (Classic Gold). You can shift this to Silver (`#c0c0c0`) for a modern automotive or tech look.

### 📐 Adjusting The 'Cut' Ease (GSAP)
The speed at which the image splits open is controlled by GSAP's physics engine (**Line 77**):
*   Current: `ease: 'expo.inOut'` (Starts incredibly slow, snaps open violently fast, and slows down perfectly at the edges. *Very* scissor-like).
*   Alternative: `ease: 'sine.inOut'` (For a much more relaxed, fluid, "curtain waving" approach rather than a sharp cut).

---

**Tip**: This component commands deep respect. Do not overload it with text. The grid, the negative space, and the surgical precision of the `inset()` split animations are what make it breathtaking. 🪡✨
