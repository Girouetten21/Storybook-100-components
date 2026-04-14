import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './NoirCurtainHero.scss';

// Import cinematic background from project assets
import bgHero from '../../img/generated_5.png';

gsap.registerPlugin(useGSAP);

export const NoirCurtainHero: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftCurtainRef = useRef<HTMLDivElement>(null);
    const rightCurtainRef = useRef<HTMLDivElement>(null);
    const interactionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);

    // POWERED BY GSAP-SKILLS: Safe interaction logic and scoped selectors
    const { contextSafe } = useGSAP({ scope: containerRef });

    // CRITICAL: Prevent scrolling until the 'Gate' is opened
    useLayoutEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (!isStarted) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
        };
    }, [isStarted]);

    const handleEnter = contextSafe(() => {
        if (isAnimating.current || isStarted) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsStarted(true);
            }
        });

        // 1. Hide the button and gate UI
        tl.to(interactionRef.current, {
            autoAlpha: 0,
            y: -20,
            duration: 0.6,
            ease: 'power2.inOut'
        })
        
        // 2. The EPIC SPLIT: Heavy mechanical sweep of the curtains
        .to(leftCurtainRef.current, {
            xPercent: -101, 
            duration: 1.8,
            ease: 'expo.inOut' 
        }, '-=0.1')
        .to(rightCurtainRef.current, {
            xPercent: 101,
            duration: 1.8,
            ease: 'expo.inOut'
        }, '<')

        // 3. Reveal the deeper layer with cinematic zoom
        .fromTo(contentRef.current, 
            { autoAlpha: 0, scale: 1.15 },
            { autoAlpha: 1, scale: 1, duration: 2.2, ease: 'power3.out' },
            '-=1.5'
        )
        
        // 4. Staggered reveal of the inner elements
        .fromTo('.hero-inner *', 
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' },
            '-=1.2'
        )
        
        // 5. CRITICAL FIX: To prevent horizontal scroll artifacts from off-screen panels
        .set('.curtain-gate', { visibility: 'hidden' });
    });

    return (
        <div ref={containerRef} className={`split-curtain-container ${isStarted ? 'is-stable' : ''}`}>
            
            {/* THE WORLD BEHIND (THE REVEAL) */}
            <div 
                ref={contentRef} 
                className="hero-content"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgHero})` }}
            >
                <div className="hero-inner">
                    <span className="hero-eyebrow">Awwwards Selection 2026</span>
                    <h2 ref={heroTitleRef}>Majestic Frontiers.</h2>
                    <p className="hero-desc">Redefining the boundaries of immersive architecture through motion and code.</p>
                </div>
            </div>

            {/* THE PROTECTIVE GATE (CURTAINS) */}
            <div className={`curtain-gate ${isStarted ? 'is-open' : ''}`}>
                <div ref={leftCurtainRef} className="curtain-half left">
                    <div className="gate-detail">EST. 2026</div>
                </div>
                <div ref={rightCurtainRef} className="curtain-half right">
                    <div className="gate-detail">VOL. 01</div>
                </div>
            </div>

            {/* INTERACTION LAYER */}
            <div ref={interactionRef} className="gate-interaction">
                <div className="gate-header">
                    <span className="brand-dot"></span>
                    <span className="brand-name">Architectural Collective</span>
                </div>
                
                <h1 className="gate-h1">Into the Deep</h1>
                
                <button className="enter-btn" onClick={handleEnter}>
                    <span className="btn-bg"></span>
                    <span className="btn-text">Enter Experience</span>
                </button>
            </div>

            {/* FOOTER DECORATOR */}
            <div className="gate-fixed-footer">
                <span className="scroll-hint">Ready for Exploration</span>
            </div>
        </div>
    );
};

export default NoirCurtainHero;
