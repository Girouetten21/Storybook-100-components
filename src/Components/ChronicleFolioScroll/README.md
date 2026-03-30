# 📖 Chronicle Folio Scroll: The Immersive Manuscript

The **Chronicle Folio Scroll** is component #45. It breaks the bounds of standard digital scrolling by recreating the profound, tactile feeling of reading a high-end luxury book or ancient manuscript.

---

## ✒️ The "Living Book" Features

1. **The Book Spine (Depth Engine)**: A precise vertical gradient shadow (`.book-spine`) sits at exactly `55vw` (the division line). It acts as a visual valley, tricking the eye into believing the two columns are actually pages curving into the hard binding of a book.
2. **Parchment Blending (`mix-blend-mode`)**: The images on the right don't just sit on the screen. CSS `mix-blend-mode: multiply` is applied so the photography visually seeps into the beige parchment color (`#EBE7DE`), making it look like real ink printed deeply onto textured paper.
3. **The Literary Drop Cap**: The first letter of every paragraph is extracted and styled massively (`5rem`) to mimic classical Medieval or Renaissance manuscript typography.
4. **Physical Page Overlap**: Instead of using masking or simple fading, as you scroll, the new image *physically slides in from outside the screen bounds* (`xPercent: 100` to `xPercent: 0`). Because it carries a heavy `-20px` black drop shadow on its left edge, it casts a physical shadow over the old image as it slides, flawlessly imitating an actual page being turned or a heavy card sliding.

---

## 🎨 Editorial Customization

### 📋 Chapter Data Structure
All typography is meticulously built in the `CHRONICLE_DATA` array.
*   **The Drop Cap**: To maintain semantic perfection, put the very first letter of your paragraph in the `drop:` property, and the rest of the text in the `text:` property.
*   **Category**: `chapter:` allows you to label chapters using roman numerals, numbers, or thematic markers (e.g., *Part I*, *Act II*).

### 🖋️ Color & Ink Palette (SCSS)
This layout uses a strict dual-tone "Paper and Ink" philosophy.
*   **The Parchment (Paper)**: `#F8F5EF`. A creamy, heavily aged white.
*   **The Ink (Text)**: `#2F2D2A`. Never use pure `#000000` black. Real ink is a dark, warm charcoal or very deep brown.
*   **The Marker**: `#B54E3A` (Brick Red) is used for chapter titles, mimicking the red highlighter ink used by medieval scribes.

### 📜 Typography Control
To alter the feel of the book, switch out the `font-family` from `Playfair Display` to a traditional Serif like `Georgia` or `Baskerville` for peak intellectualism.

---

**Reading Mechanics**: The GSAP sequence is built securely. Text rises softly reading upward like traditional digital text blocks, whilst the right-hand image performs the horizontal "page turn." This guarantees maximum narrative immersion without fatiguing the reader. 📚🕯️
