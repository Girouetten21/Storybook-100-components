# 📐 Fibonacci Golden Section

**Component #56 - Mathematically Precise Architectural Section**

The **Fibonacci Golden Section** is a high-end structural module designed using the **Golden Ratio (1.618)**. It prioritizes mathematical harmony over arbitrary layout decisions, creating a visual experience that feels inherently "correct" and premium.

### ⚜️ Key Features:
*   **Divine Proportion Layout**: A split-block system using the 61.8% vs 38.2% ratio for visual weight.
*   **Golden Spiral SVG**: An animated SVG path that traces the Fibonacci spiral as the user scrolls into the section.
*   **Sequential Fibonacci Stagger**: Entrances are timed using a Fibonacci-based sequence (0.1, 0.2, 0.3, 0.5, 0.8...) for natural, rhythmic reveals.
*   **Architectural Parallax**: Sub-layered image parallax within the blocks to create depth and sophistication.
*   **Premium Typography**: A curated pairing of *Playfair Display* (Architectural elegance) and *Outfit* (Mathematical precision).

### 🚀 Performance Optimization:
*   **SVG Simplification**: Uses a single optimized path for the spiral to minimize DOM load.
*   **GSAP Scoping**: Utilizes the `@gsap/react` `useGSAP` hook for automatic cleanup and selector scoping.
*   **Fluid Phi-Grid**: CSS-Flex implemented with `calc()` and ratio variables for perfect responsiveness.

### 📂 Structure:
```text
FibonacciGoldenSection/
├── FibonacciGoldenSection.tsx     # Logic & Mathematical sequencing
├── FibonacciGoldenSection.scss    # Grid system & Luxury aesthetics
└── README.md                    # Technical documentation
```
