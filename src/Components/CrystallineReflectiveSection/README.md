# 🪞 Crystalline Reflective Section

**Component #59 - Mirror & Glassmorphism Showcase**

The **Crystalline Reflective Section** is a high-performance interactive gallery designed to simulate the atmosphere of a prestige jewelry exhibition. It focuses on the materiality of glass, the physics of reflection, and the ethereal quality of light scattered through high-value gemstones.

### ⚜️ Key Features:
*   **3D Mouse-Tilt Glass Cards**: Every card in the mosaic reacts to mouse movement with a smooth GSAP-driven tilting effect, utilizing `transform-style: preserve-3d` to make the gemstones "pop" out of their glass frames.
*   **Deep Block Reflections**: Leveraging `-webkit-box-reflect`, the grid items project a realistic environmental reflection onto a simulated "black mirror" floor, creating a sense of weight and physical presence.
*   **Frosted Backdrop-Filter Architecture**: Implements a high-density `blur(25px)` logic with linear-gradient border shines, achieving a premium frosted glass aesthetic that maintains readability while highlighting visual depth.
*   **Spectral Ambient Layer**: A dedicated floating prism background (`prism.png`) uses a slow 20-second GSAP loop to create a dynamic, shifting light environment behind the interactive elements.
*   **Editorial Mosaic Grid**: A 12-column asynchronous grid that balances large feature entries with smaller square detail cards for a sophisticated, non-repetitive rhythm.

### 🚀 Technical Implementation:
*   **Z-Depth Layering**: Internal elements (Images vs. Typography) are separated into different Z-planes (`translateZ`), ensuring the 3D tilt interaction feels layered and cinematic.
*   **Metallic Shimmer Hover**: A CSS-driven `card-shine` gradient translates across the glass surface on hover, mimicking real-world light hits on reflective surfaces.
*   **Dynamic Responsive Flow**: Specifically optimized for ultra-wide displays while gracefully collapsing into a high-contrast vertical column on mobile devices.

### 📂 Structure:
```text
CrystallineReflectiveSection/
├── CrystallineReflectiveSection.tsx     # Logic & 3D Tilt triggers
├── CrystallineReflectiveSection.scss    # Glassmorphism & Reflective Grid
└── README.md                          # Documentation
```
