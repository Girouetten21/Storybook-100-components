# ⚜️ Fibonacci Golden Menu

**Component #50!** We hit the half-century mark with absolute technical precision. This component is a full-scale interaction Menu leveraging brutalist mathematical layout rules.

## 📏 CSS Grid Fibonacci Mapping
Instead of absolute pixels, this menu intelligently adapts to *any* monitor by utilizing nested fractions (`fr`). Because we use `gap: 1px`, the background color of the wrapper visually "draws" the grid lines naturally between the solid boxes without needing complex CSS borders!

- **Master Grid**: `13x8` Matrix (`8fr 5fr` columns).
- **Sub-Grid 1**: The remaining `5x8` block drops down to a `3fr 2fr` nested layout block.
- **Sub-Grid 2**: Finally dropping down to the molecular `1fr 1fr` tiny 1x1 ratio boxes.

## 🧲 Flex-Matching an SVG Overlay
Most developers fail to map complex SVG arcs directly on top of fluid HTML components because when a flex box scales, the SVG paths stretch weirdly.
By taking the exact integer mathematical mapping of the viewBox `(`viewBox="0 0 1300 800"`)` and explicitly telling the DOM to `preserveAspectRatio="none"`, the entire SVG stretches to match your browser width, snapping the mathematical golden spiral arc **perfectly** over the CSS Grid joints regardless of screen dimension.

## 🎛️ Architecture
When instantiated, merely inject `<FibonacciGoldenMenu />` at the root of your App. It acts as both a floating "MENU" trigger button on the top right (using `mix-blend-mode: difference` to be visible everywhere) and the master dark full-screen canvas.
