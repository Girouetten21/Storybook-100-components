import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './KineticPixelMenu.scss';

gsap.registerPlugin(useGSAP);

const GRID_COLS = 25; // 25 High-density columns
const GRID_ROWS = 15; // 15 High-density rows
const TOTAL_PIXELS = GRID_COLS * GRID_ROWS;

export const KineticPixelMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Initial setup
    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ paused: true });
        timelineRef.current = tl;

        // Block interaction immediately when animation starts
        tl.set('.kinetic-pixel-menu-wrapper', { pointerEvents: 'auto' });

        // A secondary blackout overlay beneath the mosaic handles pure contrast and protects logic
        tl.to('.pixel-menu-backing', { autoAlpha: 1, duration: 0.2 });

        // Construct the monolithic background from scattered shards coalescing from the abyss
        tl.fromTo(pixelsRef.current, 
            { 
                opacity: 0, 
                scale: 0,
                z: () => gsap.utils.random(-1500, 500), 
                xPercent: () => gsap.utils.random(-500, 500),
                yPercent: () => gsap.utils.random(-500, 500),
                rotationX: () => gsap.utils.random(-180, 180),
                rotationY: () => gsap.utils.random(-180, 180)
            },
            {
                opacity: 1,
                scale: 1.05, // 1.05 expansion scale forces absolute overlap eliminating grid hairline errors mathematically
                z: 0, xPercent: 0, yPercent: 0,
                rotationX: 0,
                rotationY: 0,
                stagger: {
                    amount: 1.5,
                    from: "random",
                    grid: [GRID_ROWS, GRID_COLS] // Informs GSAP of 2D distribution logic for smarter math
                },
                ease: "expo.inOut",
                duration: 1.4
            }, 
            "-=0.1" // Fires intimately with the background blind
        );

        // Subtly inject the navigation elements scaling up alongside the completing matrix
        tl.fromTo('.menu-item', 
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out' },
            "-=0.7"
        );

    }, { scope: containerRef });

    // Handle Open/Close Toggle
    useEffect(() => {
        if (timelineRef.current) {
            if (isOpen) {
                timelineRef.current.play();
                document.body.style.overflow = 'hidden'; // Lock standard DOM scroll loop
            } else {
                timelineRef.current.reverse();
                document.body.style.overflow = '';
            }
        }
    }, [isOpen]);

    return (
        <div className="kinetic-pixel-menu-container" ref={containerRef}>
            {/* The Trigger Button - Hard Brutalism text style */}
            <button className="pixel-menu-trigger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'CLOSE [ X ]' : 'MENU [ + ]'}
            </button>

            {/* The Fullscreen Matrix Construction Environment */}
            <div className={`kinetic-pixel-menu-wrapper ${isOpen ? 'active' : ''}`}>
                
                {/* Fallback solid backdrop to guarantee readability regardless of pixel gaps */}
                <div className="pixel-menu-backing"></div>

                {/* The Fractured Grid Assembly Array */}
                <div className="menu-pixel-grid">
                    {Array.from({ length: TOTAL_PIXELS }).map((_, i) => {
                        const colNum = i % GRID_COLS;
                        const rowNum = Math.floor(i / GRID_COLS);
                        // Cartesian absolute positioning for structural image slicing
                        const xPos = (colNum / (GRID_COLS - 1)) * 100;
                        const yPos = (rowNum / (GRID_ROWS - 1)) * 100;

                        return (
                            <div 
                                key={i} 
                                className="menu-pixel-cell"
                                ref={el => { pixelsRef.current[i] = el; }}
                                style={{
                                    backgroundPosition: `${xPos}% ${yPos}%`
                                }}
                            ></div>
                        );
                    })}
                </div>

                {/* Typography Superior Overlay Layer */}
                <nav className="menu-navigation">
                    <ul>
                        <li className="menu-item"><span className="index">01.</span> HOME ENTRY</li>
                        <li className="menu-item"><span className="index">02.</span> SHOWCASE VAULT</li>
                        <li className="menu-item"><span className="index">03.</span> ARCHITECTURE CORE</li>
                        <li className="menu-item"><span className="index">04.</span> TRANSMISSION LOGS</li>
                    </ul>
                </nav>

            </div>
        </div>
    );
};

export default KineticPixelMenu;
