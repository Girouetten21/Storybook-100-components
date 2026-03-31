import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FibonacciHeroDoor.scss';

gsap.registerPlugin(useGSAP);

export const FibonacciHeroDoor: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial strict scroll lock to act as a definitive door
    useEffect(() => {
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        if (!isUnlocked) {
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0); // Force lock to absolute top page
        }

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.body.style.overflow = '';
        };
    }, [isUnlocked]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(() => {
        // A subtle pulsing breathing effect entirely on the interact text
        gsap.fromTo('.unlock-text', 
            { textShadow: "0 0 10px rgba(212, 175, 55, 0.5)", opacity: 1 },
            { textShadow: "0 0 20px rgba(212, 175, 55, 0.8)", opacity: 0.6, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" }
        );
    }, { scope: containerRef });

    const handleUnlock = contextSafe(() => {
        if (isUnlocked) return;
        setIsUnlocked(true);

        const tl = gsap.timeline({
            onComplete: () => {
                // Completely strip the DOM node from the visual tree post-animation to free renderer
                if (containerRef.current) containerRef.current.style.display = 'none';
            }
        });

        // 1. Text elements fade out instantly
        tl.to('.unlock-text, .structural-info, .rotate-label', { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
        tl.to('.geom-text', { autoAlpha: 0, duration: 0.4 }, '<');

        // 2. The Golden Spiral unwinds rapidly from its core (the eye) outwards
        tl.to('.door-spiral-path', {
            strokeDashoffset: -3142,
            duration: 1.0,
            ease: "power2.inOut"
        }, '-=0.2');

        // 3. The Panels scatter outwardly mapped perfectly to the spiral uncoil logic!
        tl.to('.panel-1b', { x: '100vw', y: '100vh', rotation: 45, duration: 1.2, ease: 'expo.inOut' }, 'scatter');
        tl.to('.panel-1a', { x: '-100vw', y: '-100vh', rotation: -45, duration: 1.4, ease: 'expo.inOut' }, 'scatter+=0.1');
        tl.to('.panel-2', { y: '100vh', x: '-50vw', rotation: -15, duration: 1.5, ease: 'expo.inOut' }, 'scatter+=0.15');
        tl.to('.panel-3', { x: '150vw', y: '50vh', rotation: 25, duration: 1.6, ease: 'expo.inOut' }, 'scatter+=0.20');
        tl.to('.panel-5', { y: '-150vh', rotation: 10, duration: 1.8, ease: 'expo.inOut' }, 'scatter+=0.25');
        tl.to('.panel-8', { x: '-150vw', rotation: -5, duration: 2.0, ease: 'expo.inOut' }, 'scatter+=0.30');

        // 4. Fade out the absolute black void to reveal the site beneath
        tl.to('.hero-door-background', {
            autoAlpha: 0,
            duration: 1.2,
            ease: "power1.inOut"
        }, 'scatter+=0.8');
    });

    return (
        <div className="fibonacci-hero-door" ref={containerRef}>
            <div className="hero-door-background"></div>

            <div className="grid-layer">
                {/* 13x8 Physical CSS Grid matched to flawless math */}
                <div className="grid-panel panel-8">
                    <span className="geom-text">8</span>
                    <div className="structural-info top-left">
                        <span className="label">SYS_SEQ</span>
                        <span className="value">001.618</span>
                    </div>
                    <div className="structural-info bottom-right">
                        <span className="label">GOLDEN RATIO</span>
                        <span className="value">LOCKED</span>
                    </div>
                </div>
                
                <div className="grid-panel panel-5">
                    <span className="geom-text">5</span>
                    <div className="structural-info top-right">
                        <span className="label">X_AXIS</span>
                        <span className="value">500.00</span>
                    </div>
                </div>
                
                <div className="nested-5x3">
                    <div className="grid-panel panel-3">
                        <span className="geom-text">3</span>
                        <div className="structural-info bottom-left">
                            <span className="label">Y_AXIS</span>
                            <span className="value">300.00</span>
                        </div>
                    </div>
                    
                    <div className="grid-panel panel-2">
                        <span className="geom-text">2</span>
                        <div className="structural-info center-text">
                            AWAITING<br/>PROTOCOL
                        </div>
                    </div>
                    
                    <div className="nested-2x1">
                        <div className="grid-panel panel-1a">
                            <span className="geom-text">1</span>
                            <div className="rotate-label">INITIATION</div>
                        </div>
                        <div className="grid-panel panel-1b interact-box hover-glow" onClick={handleUnlock}>
                            <span className="geom-text">1</span>
                            {/* The "Eye" of the Spiral acts as the button organically */}
                            <div className="unlock-text">UNLOCK</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Golden Arc Seal */}
            <svg 
                className="spiral-layer" 
                viewBox="0 0 1300 800" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    className="door-spiral-path" 
                    d="M 0 800 
                       A 800 800 0 0 1 800 0 
                       A 500 500 0 0 1 1300 500 
                       A 300 300 0 0 1 1000 800 
                       A 200 200 0 0 1 800 600 
                       A 100 100 0 0 1 900 500 
                       A 100 100 0 0 1 1000 600" 
                />
            </svg>
        </div>
    );
};

export default FibonacciHeroDoor;
