# 📐 Fibonacci Geometry Loader

**Component #49** is meant for studios heavily influenced by classical design, architecture, or mathematical precision. It is completely vector-based (SVG) rendering a flawless Golden Rectangle scaled to the exact sequence: *13, 8, 5, 3, 2, 1, 1*.

## 🐚 The Divine Arc Calculation
Drawing complex paths smoothly without GSAP's paid `DrawSVGPlugin` requires hard-coded mathematics. We manually calculated the sum of the quarter-circumferences `(π/2 * r)` of all 6 bounding boxes bridging the path:
* `(π/2) * 800` = 1256.6
* `(π/2) * 500` = 785.4
* `(π/2) * 300` = 471.2
* `(π/2) * 200` = 314.1
* `(π/2) * 100` = 157.1
* `(π/2) * 100` = 157.1
* **TOTAL LENGTH:** 3141.5

By feeding `stroke-dasharray: 3142` into the SCSS, we can command GSAP to perfectly "draw" the mathematical line by simply animating `strokeDashoffset: 0`.

## ⚡ 60FPS DOM Performance Tip
React states (`useState`) triggering renders rapidly (e.g., from a loading variable ticking from `1%` to `100%` inside a `requestAnimationFrame`) can drop frames on heavy layouts. This component bypasses the Virtual DOM entirely, utilizing GSAP `onUpdate` to mutate the raw SVG `<text>` node content using `percentRef.current.textContent`. This achieves 60FPS fluid ticks while freezing the React lifecycle.
