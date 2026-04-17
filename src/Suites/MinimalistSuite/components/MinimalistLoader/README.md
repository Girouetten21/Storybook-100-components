# 🖋️ Aesthetic Typographic Loader

**Component #48** belongs to the ultra-premium editorial tier of components. Instead of relying on cinematic darkness or flashy technical tricks, it leverages negative space, extreme contrast, and massive typography.

## 🎨 The Alabaster Palette
Using pure white (`#FFF`) is often jarring. This component uses **Museum Alabaster** (`#F4F3EE`), a warm, organic off-white tone that mimics high-end paper or gallery walls. Coupled with a rich charcoal text (`#1A1A1A`), it achieves immediate luxury status.

## ✂️ Simulated SplitText Animation
High-end loaders almost always animate typography letter-by-letter. To achieve this cleanly in React without locking yourself into paid GSAP plugins:
1. The `word` string is dynamically split into an HTML array (`.split('').map(...)`)
2. Each letter is wrapped inside a `.char-mask` container that has `overflow: hidden`.
3. The letter itself (`.char-inner`) is initially pushed to `yPercent: 120` via GSAP, pulling it physically below the bottom edge of its invisible mask container.
4. Using an organic stagger, GSAP pulls the letters up (`yPercent: 0`) with a slight rotation (`rotation: 5` to `0`), making them look like they are rising out of the paper itself.

## 🔒 Memory Safe Scroll Lock
 Inheriting the architecture from the previous iterations, this component contains bulletproof React Strict Mode lifecycle garbage collection. It injects absolute mathematical overrides natively into the window's scroll event buses and safely destroys them without causing memory leaks upon `onComplete()`.
