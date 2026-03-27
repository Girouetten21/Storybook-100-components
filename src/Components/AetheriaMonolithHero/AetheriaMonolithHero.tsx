import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './AetheriaMonolithHero.scss';

// High-end background
import bgElite from '../../assets/img/Background_4.webp';

export const AetheriaMonolithHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);

    // CRITICAL: Scroll Lock
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

    const runThresholdTransition = () => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const q = gsap.utils.selector(containerRef);
        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });

        // 1. Line expansion and UI Fade-out (Instant response)
        tl.to(lineRef.current, {
            width: '100%',
            duration: 0.5,
            ease: 'expo.inOut'
        })
        .to(q('.interaction-label'), {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out'
        }, '<')
        
        // 2. PREP: Make background visible behind panels (Hardware-only)
        .set(q('.aether-final-reveal'), { autoAlpha: 1 })
        
        // 3. THE SPLIT: Pure Y translation (Zero recalculations)
        .to(topPanelRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: 'expo.inOut'
        }, '+=0.05')
        .to(bottomPanelRef.current, {
            yPercent: 100,
            duration: 1.2,
            ease: 'expo.inOut'
        }, '<')
        
        // 4. Completely clear the junction line
        .to(lineRef.current, {
            opacity: 0,
            duration: 0.2
        }, '<')

        // 5. Reveal background (Scale and Opacity only)
        .fromTo(q('.aether-hero-bg'), 
            { scale: 1.05, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 2, 
                ease: 'power2.out',
                force3D: true
            },
            '-=1.2'
        )

        // 6. Typography (Simple and fast)
        .fromTo(q('.aether-reveal-content h2'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', force3D: true },
            '-=1.5'
        )
        .fromTo(q('.aether-reveal-content p, .aether-reveal-content .eyebrow'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', force3D: true },
            '-=1.3'
        );
    };

    return (
        <div ref={containerRef} className={`aether-threshold-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD ASCENDANT */}
            <div className={`aether-final-reveal ${isRevealed ? 'is-visible' : ''}`}>
                <div className="aether-hero-bg" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${bgElite})` }}></div>
                <div className="aether-reveal-content">
                    <span className="eyebrow">— Collection No. 9 —</span>
                    <h2>Aetheria.</h2>
                    <p>Where mathematical precision meets the soul of cinematic architecture.</p>
                </div>
            </div>

            {/* THE DUAL PANEL GATE */}
            {!isRevealed && (
                <div className="aether-gate-layer">
                    
                    <div ref={topPanelRef} className="aether-panel top"></div>
                    <div ref={bottomPanelRef} className="aether-panel bottom"></div>

                    <div className="gate-interaction-area" onClick={runThresholdTransition}>
                        <div ref={lineRef} className="radiant-line">
                            <div className="line-glow"></div>
                        </div>
                        <div className="interaction-label">Enter Experience</div>
                    </div>

                    <div className="gate-branding">
                        <span>Lumina Collective / 2026</span>
                    </div>
                </div>
            )}

            <div className="aether-overlay-fx"></div>
        </div>
    );
};

export default AetheriaMonolithHero;
