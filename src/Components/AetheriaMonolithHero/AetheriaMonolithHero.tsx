import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetheriaMonolithHero.scss';

// High-end background
import bgElite from '../../assets/img/Background_4.webp';

gsap.registerPlugin(useGSAP);

export const AetheriaMonolithHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped animations and safe event handlers
    const { contextSafe } = useGSAP({ scope: containerRef });

    // Scroll Lock
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

    const runThresholdTransition = contextSafe(() => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });

        // 1. Initial Compression (Fast Trigger)
        tl.to(coreRef.current, {
            scale: 0.1,
            rotate: 90,
            duration: 0.3,
            ease: 'expo.in'
        })
        
        // 2. Line expansion and UI Wipe (Instant response)
        .to(lineRef.current, {
            width: '100%',
            autoAlpha: 1,
            duration: 0.5,
            ease: 'expo.inOut'
        }, '-=0.1')
        .to('.interaction-label, .gate-branding', {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.out'
        }, '<')
        .to(coreRef.current, {
            autoAlpha: 0,
            duration: 0.2
        }, '<')
        
        // 3. PREP: Make background visible behind panels
        .set('.aether-final-reveal', { autoAlpha: 1 })
        
        // 4. THE 3D SPLIT (Kinetic Depth)
        .to(topPanelRef.current, {
            yPercent: -100,
            rotateX: 10,
            duration: 1.4,
            ease: 'expo.inOut'
        }, '+=0.02')
        .to(bottomPanelRef.current, {
            yPercent: 100,
            rotateX: -10,
            duration: 1.4,
            ease: 'expo.inOut'
        }, '<')
        .to(lineRef.current, {
            autoAlpha: 0,
            duration: 0.3
        }, '<')
        
        // 5. Light Sweep (The Lens Flare across the line)
        .fromTo('.line-flare',
            { left: '-10%', autoAlpha: 0 },
            { left: '110%', autoAlpha: 1, duration: 1.2, ease: 'power3.inOut' },
            '-=1.4'
        )

        // 6. Reveal background (High-End Contrast Strike)
        .fromTo('.aether-hero-bg', 
            { scale: 1.15, autoAlpha: 0, filter: 'brightness(3)' },
            { 
                scale: 1, 
                autoAlpha: 1, 
                filter: 'brightness(1)', 
                duration: 2.2, 
                ease: 'power4.out',
                force3D: true
            },
            '-=1.2'
        )

        // 7. Modern Typography entrance (The "Standing" Reveal)
        .fromTo('.aether-reveal-content h2 span:not(.dot)',
            { autoAlpha: 0, y: 100, rotateX: 60, letterSpacing: '0.4em' },
            { 
                autoAlpha: 1, 
                y: 0, 
                rotateX: 0, 
                letterSpacing: '-0.05em', 
                duration: 2.2, 
                ease: 'expo.out', 
                force3D: true 
            },
            '-=1.8'
        )
        // The Signature Dot reveal
        .fromTo('.aether-reveal-content h2 .dot',
            { autoAlpha: 0, scale: 4, y: -20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(2)' },
            '-=1.2'
        )
        .fromTo('.aether-reveal-content .eyebrow, .aether-reveal-content p',
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', force3D: true },
            '-=1.4'
        );
    });

    return (
        <div ref={containerRef} className={`aether-threshold-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD ASCENDANT */}
            <div className={`aether-final-reveal ${isRevealed ? 'is-visible' : ''}`}>
                <div className="aether-hero-bg" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bgElite})` }}></div>
                <div className="aether-reveal-content">
                    <span className="eyebrow">— Collection No. 9 —</span>
                    <h2><span>Aetheria</span><span className="dot">.</span></h2>
                    <p>Where mathematical precision meets the soul of cinematic architecture.</p>
                </div>
            </div>

            {/* THE MULTI-LAYER GATE */}
            {!isRevealed && (
                <div className="aether-gate-layer">
                    
                    <div ref={topPanelRef} className="aether-panel top">
                        <div className="panel-texture"></div>
                    </div>
                    <div ref={bottomPanelRef} className="aether-panel bottom">
                        <div className="panel-texture"></div>
                    </div>

                    <div className="gate-interaction-area" onClick={runThresholdTransition}>
                        
                        {/* 3D CORE MONOLITH */}
                        <div ref={coreRef} className="core-glass-cube">
                            <div className="cube-face front"></div>
                            <div className="cube-face back"></div>
                        </div>

                        <div ref={lineRef} className="radiant-line">
                            <div className="line-glow"></div>
                            <div className="line-flare"></div>
                        </div>
                        <div className="interaction-label">Initialize Sequence</div>
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
