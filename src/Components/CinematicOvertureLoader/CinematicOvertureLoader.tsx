import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CinematicOvertureLoader.scss';

gsap.registerPlugin(useGSAP);

export const CinematicOvertureLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        // 1. Strict Mode Safe Scroll Lock
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        
        // Bind to window to aggressively block synthetic React touch/mouse scrolls during load
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
                // Safely free the DOM once GSAP finishes the animation
                unlockScroll();
                // Destroy the loader container hit-box natively
                gsap.set(containerRef.current, { display: 'none' }); 
            }
        });

        // 2. Initial Fade-In of the Typography
        tl.fromTo('.loader-content', 
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
        );

        // 3. The Suspenseful Progress Counter
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 100,
            duration: 4.5, // Long cinematic tension
            ease: "expo.inOut", // Starts incredibly slow, sweeps past 50 rapidly, agonizingly halts at 99
            onUpdate: () => setProgress(Math.floor(counterObj.val)),
        }, "-=0.5");

        // Along with the counter, animate the razor-thin champagne progress line
        tl.to('.razor-line', {
            scaleX: 1,
            duration: 4.5,
            ease: "expo.inOut"
        }, "<"); 

        // 4. THE REVEAL EXPLOSION (Triggered the exact millisecond we hit 100%)
        // The typography slides out elegantly upwards instead of aggressively scaling
        tl.to('.counter-block', {
            yPercent: -20,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, 'reveal');

        tl.to('.brand-title', {
            y: -30,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.in"
        }, 'reveal');

        // The Razor line vanishes
        tl.to('.razor-line', {
            scaleY: 0,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }, 'reveal+=0.3');

        // Ultra-performant hardware-accelerated fade out of the entire shutter canvas
        tl.to('.shutter-layer', {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut"
        }, 'reveal+=0.4');

        // Cleanup listener bound to Strict Mode unmounts forcing robust garbage collection
        return () => unlockScroll();

    }, { scope: containerRef });

    return (
        <div className="overture-loader" ref={containerRef}>
            
            {/* The Unified Canvas locking the DOM down */}
            <div className="shutter-layer"></div>
            
            {/* The Sub-Pixel Tension Divider */}
            <div className="razor-line"></div>

            <div className="loader-content">
                <div className="counter-block">
                    {/* Render with leading zeros to maintain typographic width (000, 042, 100) */}
                    {String(progress).padStart(3, '0')}
                </div>
                <div className="brand-title">THE ARCHIVE INITIALIZING</div>
            </div>
        </div>
    );
};

export default CinematicOvertureLoader;
