import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FibonacciGeometryLoader.scss';

gsap.registerPlugin(useGSAP);

export const FibonacciGeometryLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<SVGTextElement>(null);

    useGSAP(() => {
        // Strict Mode Safe Scroll Lock
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        const unlockScroll = () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };

        const tl = gsap.timeline({
            onComplete: () => {
                unlockScroll();
                gsap.set(containerRef.current, { display: 'none' }); 
            }
        });

        // 1. Draw the architectural SVG Grid sequentially
        tl.fromTo('.fibo-box', {
            opacity: 0,
            scale: 0.95,
            transformOrigin: "center center"
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out"
        }, "start");

        // 2. The GSAP Counter bound directly to SVG <text> for 60fps React-free updates
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 100,
            duration: 3.5,
            ease: "power3.inOut",
            onUpdate: () => {
                if (percentRef.current) {
                    percentRef.current.textContent = `${Math.floor(counterObj.val)}%`;
                }
            }
        }, "draw");

        // 3. The Divine Proportion Spiral tracing the path perfectly synced with the counter
        tl.to('.spiral-path', {
            // Path length is mathematically mapped to 3142 pixels in SCSS
            strokeDashoffset: 0, 
            duration: 3.5,
            ease: "power3.inOut"
        }, "draw");

        // Subtle fading in of the HUD typography
        tl.fromTo('.hud-texts', 
            { autoAlpha: 0, y: 15 }, 
            { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 
        "draw-=0.5");

        // 4. The Grand Exit (The Golden Thread Unravels)
        
        // Hide the HUD texts cleanly
        tl.to('.hud-texts', { 
            autoAlpha: 0, 
            duration: 0.4, 
            ease: "power2.inOut" 
        }, 'exit');

        // The Golden Thread's tail chases its head rapidly into the center of the spiral
        tl.to('.spiral-path', {
            strokeDashoffset: -3142, // Pushes the line out creating an 'undrawing' effect from the tail!
            duration: 0.8,
            ease: "expo.inOut"
        }, 'exit');

        // The architectural boxes softly vanish right as the thread burns away
        tl.to('.fibo-box', {
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
        }, 'exit+=0.3');

        // Clean up the absolute solid-black container gracefully to reveal the page
        tl.to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, 'exit+=1.0');

        return () => unlockScroll();
    }, { scope: containerRef });

    return (
        <div className="fibo-container" ref={containerRef}>
            {/* The Mathematical Golden Grid (Base 13x8 proportionally scaled by 100) */}
            <svg 
                className="fibo-svg" 
                viewBox="0 0 1300 800" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 6 Sub-divided Golden Rectangles mapping an exact Fib sequence */}
                <g className="fibo-boxes">
                    <rect className="fibo-box" x="0" y="0" width="800" height="800" />
                    <rect className="fibo-box" x="800" y="0" width="500" height="500" />
                    <rect className="fibo-box" x="1000" y="500" width="300" height="300" />
                    <rect className="fibo-box" x="800" y="600" width="200" height="200" />
                    <rect className="fibo-box" x="800" y="500" width="100" height="100" />
                    <rect className="fibo-box" x="900" y="500" width="100" height="100" />
                </g>

                {/* The Continuous Hand-Calculated Arc mimicking the Nautilus Shell */}
                <path 
                    className="spiral-path" 
                    d="M 0 800 
                       A 800 800 0 0 1 800 0 
                       A 500 500 0 0 1 1300 500 
                       A 300 300 0 0 1 1000 800 
                       A 200 200 0 0 1 800 600 
                       A 100 100 0 0 1 900 500 
                       A 100 100 0 0 1 1000 600" 
                />

                {/* Main Typography anchored in exactly the center of Box 8 */}
                <g className="hud-texts">
                    <text ref={percentRef} x="400" y="420" textAnchor="middle" fill="#D4AF37" fontSize="110" fontFamily="'Playfair Display', serif" letterSpacing="-0.03em" fontWeight="300">0%</text>
                    <text x="400" y="480" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="16" fontFamily="'Inter', sans-serif" letterSpacing="0.4em" fontWeight="400">DIVINE PROPORTION</text>
                    <text x="400" y="515" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="'Inter', sans-serif" letterSpacing="0.2em" fontWeight="300">PHI = 1.61803398875</text>
                </g>
                
                {/* Auxiliary Technical Blueprint Text sitting in Box 5 */}
                <g className="hud-texts" style={{ opacity: 0.35, fontFamily: 'monospace', fontSize: 10, fill: '#fff', letterSpacing: '0.1em' }}>
                    <text x="820" y="30">GRID SEQUENCE: 13, 8, 5, 3, 2, 1, 1</text>
                    <text x="820" y="50">X-ORIGIN: 800 Y-ORIGIN: 0</text>
                    <text x="820" y="480">AREA_UNIT: 250,000 Px²</text>
                </g>
            </svg>
        </div>
    );
};
export default FibonacciGeometryLoader;
