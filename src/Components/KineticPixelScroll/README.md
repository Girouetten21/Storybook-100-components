# 🪩 Kinetic Pixel Scroll

**Component #52 - Geometric Matrix Disintegration**

A highly advanced volumetric scrolling module that shatters a unified flat 2D image into 375 independent DOM nodes radiating outwards along the Z-axis in response to scrolling input.

### 📐 Mechanical Architecture
- **Grid Synthesis**: Does not rely on poorly supported Safari `background-attachment: fixed` properties. We instead algorithmically calculate real background absolute CSS percentages inside the `.map()` method bridging perfectly to the `GRID_COLS`/`GRID_ROWS` constants.
- **GSAP Spatial Mapping**: Utilizes highly customized stagger logic (`from: "center", grid: [15, 25]`). GSAP actively understands the physical Cartesian array topology and propagates the explosive effect spherically outward rather than sequentially index by index.
- **Performance Layering**: Integrates GPU rendering `backface-visibility: hidden` and `will-change: transform` to allow over 300 active objects to animate simultaneously at 60fps on consumer laptops without layout thrashing.

### Integration
Place `<KineticPixelScroll />` dynamically into the generic page layout flow. The element maintains its own `height` constraints natively padding the scroll length effectively.
