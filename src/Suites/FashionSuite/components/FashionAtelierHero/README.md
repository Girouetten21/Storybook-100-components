# 👗 Fashion Atelier Hero: Parallel Panel Reveal

The **Fashion Atelier Hero** is a high-fashion "Gate" component that uses a "Vertical Parallel Reveal" pattern. Two oversized image panels slide away to reveal a centralized cinematic vision, simulating the opening of an exclusive workshop or atelier.

---

## 🚀 Key Animation Features

*   **Vertical Partition Split**: Independent top and bottom panels slide in opposite directions with a `1.5s` exponential ease.
*   **Layered Zoom**: As panels open, the background image undergoes a `1.2` scale-down zoom to create an "entering the room" sensation.
*   **Minimalist Stagger**: Metadata tags and hero titles fade in with a very subtle `y` offset to maintain a clean, high-fashion aesthetic.
*   **Scroll Inhibit Logic**: Prevents any page movement until the user initiates the "Enter Atelier" sequence.

---

## 🎨 How to Customize

### 🍔 Gate Interaction
The entrance is triggered by the `handleEnter` function (**Line 45**).
*   **Button Text**: Change `"Enter the Atelier"` in the JSX around **Line 131**.
*   **Panel Speed**: Decrease `duration: 1.8` on **Lines 67 and 72** to make the gate open faster.

### 🖼️ Imagery & Branding
*   **Main Background**: Replace `bgHero` (**Line 7**) with your own fashion-forward visual.
*   **Branding Tag**: Update the small text `"Atelier Collection / 2026"` in **Line 124**.

### 🖋️ Typography Animation
The title entrance is located in the timeline around **Line 83**. 
*   **Scale Animation**: Currently starts at `scale: 1.15` and settles to `1`. 
*   **Auto Alpha**: Uses `autoAlpha` to ensures a clean fade-in without layout thrashing.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 21**) to manage the single-entry sequence.
*   **Stability**: It uses `isAnimating.current` to prevent multiple clicks from re-triggering the sequence while it's already in motion.
*   **Scoped Selection**: All internal elements like `.hero-inner` and `.panel-texture` are scoped to the `containerRef`, ensuring CSS safety.

---

**Tip**: This component is the "Main Entrance" to a premium brand experience. Use it to set a slow, deliberate tone for the user before they explore the rest of your site. 👗💎🎞️🚀
