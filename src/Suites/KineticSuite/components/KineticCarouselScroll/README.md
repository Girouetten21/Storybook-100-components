# 🖼️ Kinetic Carousel Scroll: Horizontal Floating Gallery

The **Kinetic Carousel Scroll** is an elegant, minimalist pinned gallery component. It transforms vertical scrolling into a sweeping horizontal journey, treating individual images like artifacts in a high-end photography exhibition.

---

## 🚀 Key Animation Features

*   **GSAP `containerAnimation` API**: The most advanced feature of GSAP ScrollTrigger. The interior animations (scaling, parallax, reveals) trigger based on the *horizontal position* of the carousel track, not the vertical scroll position of the page.
*   **Periphery Defocus**: Images scale down to `0.8x` and fade to `30% opacity` when they are at the edges of the screen, scaling up to perfect focus precisely in the center.
*   **Velocity-Linked Indicator**: The right-side floating arrow rotates upwards or downwards dynamically based on exactly how fast the user is scrolling the mouse wheel.
*   **Responsive Trajectory**: Calculates `track.scrollWidth - window.innerWidth` automatically. Adding or removing images from the array instantly resizes the pinned scroll duration without touching CSS.

---

## 🎨 How to Customize

### 📋 Carousel Data
All images and titles are sourced from the `CAROUSEL_DATA` array (**Line 15**).
*   Add more objects to the array to dynamically extend the scroll length.

### 🔬 Optical Focus Tuning
The "scale/fade" effect curves happen between **Lines 73 and 130**.
*   **Scale Depth**: Change `scale: 0.8` to `0.9` for a much milder scaling effect.
*   **Image Parallax**: On **Line 60**, adjust `xPercent: 20` to `40` to make the image "slide" significantly further inside its frame while panning.

### 📐 Layout Details (SCSS)
*   **Background Theme**: It uses `#f8f8f8` (warm minimalist white). To convert to dark mode, swap background and text colors at the top of the `.scss`.
*   **Item Aspect Ratio**: The images are locked to `aspect-ratio: 3 / 4` (portrait magazine style). You can change this to `16 / 9` for a cinematic landscape feel without breaking the GSAP math.

---

## 🛠️ Technical Protocol (`useGSAP`)

This component is a masterclass in dynamic bounds calculation.
*   **Refresh Invalidation**: The master timeline utilizes `invalidateOnRefresh: true`. This guarantees that if a user rotates their tablet or resizes their desktop window natively, GSAP recalculates the horizontal dimensions flawlessly.
*   **Auto Alpha Culling**: Metadata only exists in the paint cycle when `autoAlpha: 1` triggers in the center of the screen, preserving a smooth 60PFS across the entire track.

---

**Tip**: Use this pattern for portfolio showcases, editorial lookbooks, or horizontal timelines where "pausing the scroll" is necessary to tell a story. 🖼️💎✨🚀
