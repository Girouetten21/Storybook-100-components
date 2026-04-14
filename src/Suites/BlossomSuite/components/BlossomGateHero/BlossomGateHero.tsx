import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './BlossomGateHero.scss';

// Import soft backgrounds
import bgFloral from '../../../../assets/img/Background_2.webp';

gsap.registerPlugin(useGSAP);

export const BlossomGateHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Safe interaction logic
    const { contextSafe } = useGSAP({ scope: containerRef });

    // Sync Scroll Lock 
    useLayoutEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (!isRevealed) {
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
    }, [isRevealed]);

    const runBlossomTransition = contextSafe(() => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });

        // 0. Make the background layer visible as we start opening
        tl.set('.blossom-final-reveal', { autoAlpha: 1 });

        // 1. Initial UI fade out
        tl.to('.blossom-gate-content', { autoAlpha: 0, scale: 0.98, duration: 0.7, ease: 'power2.inOut' });

        // 2. The Organic Petal Reveal (SVG Path expansion)
        tl.to('.blossom-panel-top', { 
            yPercent: -101, // 101 to avoid microscopic lines
            duration: 1.8, 
            ease: 'expo.inOut' 
        }, '-=0.3')
        .to('.blossom-panel-bottom', { 
            yPercent: 101, 
            duration: 1.8, 
            ease: 'expo.inOut' 
        }, '-=1.8')

        // 3. Reveal Background with soft zoom
        .fromTo('.blossom-hero-bg', 
            { scale: 1.1, filter: 'blur(15px) brightness(1.2)', autoAlpha: 0 },
            { scale: 1, filter: 'blur(0px) brightness(1)', autoAlpha: 1, duration: 2.2, ease: 'power2.out' },
            '-=1.5'
        )

        // 4. Staggered text reveal
        .fromTo('.blossom-reveal-inner *', 
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.4, stagger: 0.15, ease: 'power3.out' },
            '-=1.4'
        );
    });

    return (
        <div ref={containerRef} className={`blossom-gate-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD BEYOND (FLORAL HERO) */}
            <div className={`blossom-final-reveal ${isRevealed ? 'is-visible' : ''}`}>
                <div className="blossom-hero-bg" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${bgFloral})` }}></div>
                <div className="blossom-reveal-inner">
                    <span className="eyebrow">— L'Art de la Fleur —</span>
                    <h2>Ethereal Bloom.</h2>
                    <p>Curating the finest botanical selections to breathe life into your most intimate spaces.</p>
                </div>
            </div>

            {/* THE ORGANIC PANELS (THE DOOR) */}
            {!isRevealed && (
                <>
                    <div className="blossom-panel blossom-panel-top"></div>
                    <div className="blossom-panel blossom-panel-bottom"></div>
                    
                    <div className="blossom-gate-content">
                        <div className="botanical-brand">
                            <span className="serif">Bloom</span>
                            <span className="divider"></span>
                            <span className="sans">Atelier</span>
                        </div>
                        
                        <h1 className="gate-title-main">Flora Aura</h1>
                        
                        <button className="blossom-enter-btn" onClick={runBlossomTransition}>
                            <span className="btn-text">Step Inside</span>
                            <svg className="btn-shape" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </svg>
                        </button>
                        
                        <div className="gate-tagline">
                           Seasonal Selections • Hand-Picked with Love
                        </div>
                    </div>
                </>
            )}

            {/* Floating Dust/Pollen FX */}
            {!isRevealed && <div className="blossom-dust-overlay"></div>}
        </div>
    );
};

export default BlossomGateHero;
