# 🔦 Activity List: Dynamic Mouse Follower

The **Activity List** is a modern, interactive multi-item list. It features a "Floating Preview Image" that follows the user's mouse with high-fidelity, spring-like momentum using the GSAP `quickTo` engine.

---

## 🚀 Key Animation Features

*   **QuickTo Lag Control**: Uses `gsap.quickTo` for the smoothest possible mouse tracking, ensuring the floating image has "weight" and "float" without a robotic 1:1 position.
*   **Contextual Scaling**: As the user hovers an item, the image container reveals itself with a `scale: 0.8` to `1` entrance.
*   **Automatic Image Swapping**: Updates the `activeImage` state and re-scales the container in a memory-safe execution block.
*   **Vector Arrow Toggle**: Interaction icons shift between "Inactive" and "Active" states using a simple SVG transition.

---

## 🎨 How to Customize

### 🍔 List Items
The content is stored in the `activities` array (**Line 20**).
*   **Title**: Change `"Hypatia of Alexandria"`.
*   **Tags**: Add or update tags (e.g., `['DESIGN', 'MOTION']`).
*   **Image**: Replace `photo1` with your own project image.

### 🔦 Mouse Sensitivity
Tracking speed is determined by `duration: 0.6` in **Line 57**. 
*   **More Lag (Floatier)**: Increase to `1.2`. 
*   **Snappier (Faster)**: Decrease to `0.2`.

### 🧪 Reveal Scale
Entrance of the floating box is on **Line 77**.
*   **Impact**: Change `scale: 1` to `1.2` for a subtle "pop" out effect during hover.
*   **Opacity**: Uses `autoAlpha` to ensures the container is `visibility: hidden` when not hovered.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component uses **`contextSafe`** (**Line 69**) for `handleMouseEnter` and `handleMouseLeave`.
*   **Performance**: Since mouse enters/leaves can happen dozens of times per second, `contextSafe` ensures that the GSAP engine doesn't build up un-killed timelines in memory.
*   **Event Listener Cleanup**: The `mousemove` listener is automatically added and removed within the `useGSAP` cleanup block (**Line 66**).

---

**Tip**: This component is a "Portfolio Staple". Use it to display a list of projects or services where a visual preview adds an extra layer of engagement. 🔦💎🎞️🚀
