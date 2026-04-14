# 🏛️ Aetheria Monolith Hero: Cinematic Gate Sequence

The **Aetheria Monolith Hero** is a high-end "Gate" component designed to restrict scrolling until a dramatic interaction sequence is completed. It features a 3D glass cube core, mechanical panel splitting, and a standing typographic reveal.

---

## 🚀 Key Animation Features

*   **Mechanical Gate Split**: Top and bottom panels rotate and slide away on the X-axis for a cinematic depth effect.
*   **3D Core Monolith**: A CSS 3D cube that compresses and rotates before the reveal.
*   **Standing Typography**: Letters rotate from the X-axis into a vertical position for a high-fashion look.
*   **Scroll Lock Integrity**: Automatically prevents page scroll during the initial gate sequence.

---

## 🎨 How to Customize

### 🖼️ Background Image
Change the hero background by replacing the `bgElite` import:
```tsx
import myHeroBg from '../../assets/img/your-image.webp';
// Use it in line 152:
style={{ backgroundImage: `url(${myHeroBg})` }}
```

### 🖋️ Typography & Content
Content is located in the JSX starting at **Line 150**. 
*   **Eyebrow Text**: Change `"— Collection No. 9 —"`.
*   **Main Title**: Wrap your text in `<span>` tags (required for the staggered reveal).
*   **Subtitle**: Update the `<p>` tag content.

### ⏱️ Sequence Timing
The main sequence is located within `runThresholdTransition` (**Line 43**). 
*   To make the panels open faster, decrease `duration: 1.4` on **Lines 85 and 91**.
*   To adjust the typographic entrance, modify the `stagger: 0.15` and `duration: 2.2` on **Line 142**.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 21**) for the `runThresholdTransition` function. This ensures that if the user clicks and then navigates away before the animation finishes, all timelines are perfectly killed and no memory leaks occur.

```tsx
const { contextSafe } = useGSAP({ scope: containerRef });
const runThresholdTransition = contextSafe(() => { ... });
```

---

**Tip**: Use this as the very first section of your landing page for a premium "Entry Sequence" effect. 🎞️💎🚀
