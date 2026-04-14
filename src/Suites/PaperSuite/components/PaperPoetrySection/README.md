# 📜 Whispering Poetry Scroll: Ink Bloom Typography

The **Whispering Poetry Scroll** is an elegant, editorial-style vertical scrolling experience. It features "Ink Bloom" word reveals where titles emerge from a deep blur and wide letter-spacing, settling into a perfectly tight, architectural arrangement.

---

## 🚀 Key Animation Features

*   **Ink Bloom Reveal**: Words start at `filter: blur(30px)` and `letterSpacing: 2.5em`, then "condense" into focus as the user scrolls.
*   **Elastic Connectors**: A vertical line between stanzas that grows and shrinks dynamically to bridge the gaps in the scroll.
*   **Aesthetic Grain**: A fixed, nearly transparent grain overlay for a "Paper" or "Aged Film" visual texture.
*   **Centered Centering Logic**: Synchronized `paddingLeft` and `letterSpacing` to ensure the words always remain perfectly centered on the page.

---

## 🎨 How to Customize

### 🍔 Stanza Content
The text and word titles are stored in the `POETRY_DATA` array (**Line 9**).
*   **Main Word**: Change `"S I L E N C I O"` (Add spaces between letters for the "wide" initial look).
*   **Poem Text**: Update the content.
*   **Background Color**: Each stanza has a custom `bg` (e.g., `#f5f5f0`).

### 🔦 Bloom Intensity
Initial blur and spacing are located on **Lines 49-50**. 
*   **More Dreamy**: Increase `blur(60px)`. 
*   **Wider Separation**: Increase `letterSpacing: 4em`.

### 🧪 Elastic Connector
The "bridge" line animation is determined on **Line 87**.
*   **Thickness**: Modify the `width` property in the `.poetry-connector` SCSS file.
*   **Timing**: Adjust the `scrub: 2` on **Line 95** for more kinetic lag.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component leverages the `gsap.utils.toArray` loop (**Line 37**) for each stanza. 
*   **Memory Safety**: It uses `autoAlpha` for all text fades to ensure zero performance hit on long scrolls.
*   **Responsive Integrity**: Since it uses `paddingLeft` and `letterSpacing` symmetrically, the words will remain perfectly centered on any viewport width from mobile to 4K monitors.

---

**Tip**: This component is for "Manifestos", "About Us" pages, or "Poetic Storytelling". Best used with high-legibility serif or grotesk fonts for that editorial, high-end feel. 🖋️💎🎞️🚀
