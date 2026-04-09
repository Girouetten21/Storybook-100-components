import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './KineticPixelScroll.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GRID_COLS = 25; // Dense pixel matrix horizontally
const GRID_ROWS = 15; // Dense pixel matrix vertically
const TOTAL_PIXELS = GRID_COLS * GRID_ROWS;

export const KineticPixelScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Cinematic smooth frame latency interpolation
            }
        });

        // 1. Pixel Shattering Physics
        tl.to(pixelsRef.current, {
            z: () => gsap.utils.random(-800, 800), // Violently push/pull in 3D Z space
            xPercent: () => gsap.utils.random(-800, 800), // Burst outwards X
            yPercent: () => gsap.utils.random(-800, 800), // Burst outwards Y
            rotationX: () => gsap.utils.random(-180, 180),
            rotationY: () => gsap.utils.random(-180, 180),
            opacity: 0,
            scale: () => gsap.utils.random(0.1, 0.4), // Shrink and disintegrate
            stagger: {
                amount: 2, // Spreads the timeline effect across scrolling distance
                grid: [GRID_ROWS, GRID_COLS], // Gives GSAP absolute physical coordinates logic
                from: "center", // The explosion starts physically from the center of the grid outwards
                ease: "power2.inOut" // Internal stagger variance
            },
            ease: "circ.inOut",
            duration: 2
        });

        // 2. Secret Backdrop Monolith Scaling
        tl.fromTo('.reveal-headline', 
            { scale: 0.8, autoAlpha: 0, filter: 'blur(20px)' },
            { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' },
            0 // Pin this synchronously to the exact start of the scrubbing thread
        );

    }, { scope: containerRef });

    return (
        <section className="kinetic-pixel-scroll" ref={containerRef}>
            <div className="scroll-track">
                <div className="sticky-viewport">
                    
                    {/* The Hidden Core Monolith Data */}
                    <div className="reveal-layer">
                        <h1 className="reveal-headline">DISINTEGRATION<br/>PROTOCOL</h1>
                    </div>

                    {/* The Foreground Grid of dynamically mapped image shards */}
                    <div className="pixel-grid">
                        {Array.from({ length: TOTAL_PIXELS }).map((_, i) => {
                            const colNum = i % GRID_COLS;
                            const rowNum = Math.floor(i / GRID_COLS);
                            
                            // Map column/row mathematically cleanly mapping exactly to 0-100% boundary coordinates
                            const xPos = (colNum / (GRID_COLS - 1)) * 100;
                            const yPos = (rowNum / (GRID_ROWS - 1)) * 100;

                            return (
                                <div 
                                    key={i} 
                                    className="pixel-cell"
                                    ref={el => { pixelsRef.current[i] = el; }} // Array accumulation mapping
                                    style={{
                                        backgroundPosition: `${xPos}% ${yPos}%`
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default KineticPixelScroll;
