# 🪶 Epistolary Stack Scroll: The Archive Letters

The **Epistolary Stack Scroll** (Component #46) is a heavily atmospheric pinned scroll component designed for mystery, historical archiving, literature, and storytelling. It shifts the perspective away from side-by-side reading and mimics the tactile action of dropping physical letters onto a dark wooden desk.

---

## 🎩 The "Tactile Drop" Movement
Unlike the previous component which utilized horizontal sweeping masks (a clean cut), this component relies on physical `yPercent` translation blocks and slight off-axis rotations.

1. **Alternating Axis Drops**: As the user scrolls, the new literary page doesn't just fade in. It plummets into the screen.
   * *Page 2* sweeps rapidly upwards from the bottom (`yPercent: 120` to `0`).
   * *Page 3* crashes downwards from the ceiling (`yPercent: -120` to `0`).
   * This alternating mechanical action mimics hands tossing loose letters onto a table from different angles.
2. **Organic Chaos (Rotation)**: Each page lands with a perfectly calculated, imperfect angle (e.g., `-1.5deg`, `2.5deg`). This breaks the digital grid and adds an overwhelming amount of realism to the stack.
3. **Hardware-Safe Depth Shadowing**: We completely avoided CSS `filter: brightness()` for darkening the old pages. Instead, each page contains a pure black `<div className="shadow-overlay">` that natively fades from `0` to `0.55` opacity. Rendering this is 100x easier for the GPU, completely eliminating the "black box" render crash on complex Safari compositors.

---

## 📜 How to Customize The Archive

### ✒️ Literary Data Structure
Data is managed exactly like a set of dossier files in `EPISTLE_DATA`.
*   You have full control over the metadata headers (`date`, `id`).
*   The `typewriter-text` class handles the core body of the paragraph, designed specifically for dense readability at `1.05rem`.
*   Note: Since the text acts like a written letter below an attached photograph, do not exceed 4 lines of text to prevent overflowing the card layout.

### 📷 The Photographic Treatment
*   The images automatically undergo a vintage wash using CSS `filter: sepia(0.3) contrast(1.1)` inside the SCSS. If you want hyper-modern branding, remove this line inside `.page-illustration img`.
*   `mix-blend-mode: multiply` is safely used here because it multiplies directly onto the paper backing color (`#eDeADc`), never risking multiplying against a transparent DOM layer.

### 🗄️ The Setting (Colors)
The component sets its stage directly through background juxtaposition:
*   **The Desk**: `#0c0a09` (a rich, abyssal dark mahogany wood or leather).
*   **The Paper**: `#f7f4ec` (heavy weighted cotton cream paper).
*   **The Shadow Falloff**: A custom pseudo-element vignette is placed over the desk (`circle at center, transparent 30%, rgba(0,0,0,0.8) 120%`) to force the user's eye dead into the center of the desk, hiding the edges of the browser.

---

**Tip**: This component thrives on mystery and lore. Use it to reveal "classified" documents, ancient letters, case studies, or deeply personal brand manifestos letter-by-letter. 🕯️✉️
