import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MinimalistLoader.scss';

gsap.registerPlugin(useGSAP);

export const MinimalistLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    // You can alter this word to whatever fits the brand ('ATELIER', 'GALLERY', 'BESPOKE')
    const word = "ELEGANCE";

    useGSAP(() => {
        // Strict Mode Safe Scroll Lock
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // Lock Document aggressively
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

        // 1. Staggered Minimalist Typography Reveal (Emerging from their masks)
        tl.fromTo('.char-inner', {
            yPercent: 120, // Start hidden below the mask
            rotation: 5,   // Slight slant for an organic slide-in
        }, {
            yPercent: 0,
            rotation: 0,
            duration: 1.4,
            stagger: 0.08, // The domino effect delay between letters
            ease: "power4.out"
        });

        // 2. Tabular Minimalist Counter progressing
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 100,
            duration: 2.2,
            ease: "expo.inOut",
            onUpdate: () => setProgress(Math.floor(counterObj.val)),
        }, "-=0.5");

        // 3. The Elegant Exit Wipe
        // First, the letters slide up into the void
        tl.to('.char-inner', {
            yPercent: -120,
            rotation: -5,
            duration: 1,
            stagger: 0.04,
            ease: "power4.in"
        }, 'exit');

        // The architectural dividing line shrinks away
        tl.to('.abstract-line', {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.inOut"
        }, 'exit');

        // Small HUD elements float away
        tl.to(['.loader-hud', '.loader-footer'], {
            autoAlpha: 0,
            y: -20,
            duration: 0.5,
            ease: "power3.in"
        }, 'exit');

        // Finally, the physical alabaster canvases sweep upwards, splitting to reveal the App
        tl.to('.bg-panel', {
            yPercent: -100,
            duration: 1.4,
            ease: "expo.inOut",
            stagger: 0.1 // Slight delay between the left and right panels wiping
        }, 'exit+=0.4');

        // Cleanup for React Strict Mode
        return () => unlockScroll();

    }, { scope: containerRef });

    return (
        <div className="aesthetic-loader" ref={containerRef}>
            {/* Split panel backgrounds acting as physical curtains to add architectural complexity */}
            <div className="bg-panel panel-left"></div>
            <div className="bg-panel panel-right"></div>

            {/* Top Minimalist Heads Up Display */}
            <div className="loader-hud">
                <div className="folio-id">SERIES — 48</div>
                <div className="counter-wrap">
                    [ {String(progress).padStart(2, '0')} — 100 ]
                </div>
            </div>

            {/* Sub-pixel structural element */}
            <div className="abstract-line"></div>

            {/* Gigantic Manual SplitText Container */}
            <div className="typography-container">
                {word.split('').map((char, index) => (
                    <div className="char-mask" key={index}>
                        <div className="char-inner">{char}</div>
                    </div>
                ))}
            </div>

            {/* Bottom Minimalist Footer */}
            <div className="loader-footer">
                <div className="caption">AESTHETIC GALLERY INITIALIZATION</div>
                <div className="caption">© 2026</div>
            </div>
        </div>
    );
};

export default MinimalistLoader;
