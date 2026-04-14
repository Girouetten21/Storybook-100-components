import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MuseumGateHero.scss';

// Cinematic backgrounds
import bgCoffee from '../../img/generated_1.png';

gsap.registerPlugin(useGSAP);

export const MuseumGateHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped animations and safe event triggers
    const { contextSafe } = useGSAP({ scope: containerRef });

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

    const runRoasterTransition = contextSafe(() => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });

        // 0. Pre-activate reveal layer
        tl.set('.roaster-final-reveal', { autoAlpha: 1 });

        // 1. Initial UI ejection
        tl.to('.roaster-gate-content', { 
            y: -50, 
            autoAlpha: 0, 
            duration: 0.7, 
            ease: 'power3.in' 
        });

        // 2. THE GRINDER EFFECT (Pillars fall + Texture rises)
        tl.to('.roaster-pillar', {
            yPercent: 100,
            duration: 2,
            stagger: {
                each: 0.12,
                from: "center"
            },
            ease: 'expo.inOut'
        }, '-=0.3')
        
        // Counter-animation for the grain texture (Parallax)
        .to('.pillar-grain', {
            yPercent: -40,
            duration: 2.2,
            stagger: 0.12,
            ease: 'power2.inOut'
        }, '-=2.0')

        // 3. Reveal Content with Amber Strike
        .fromTo('.roaster-hero-bg', 
            { scale: 1.2, filter: 'sepia(0.8) brightness(2) contrast(1.5)', autoAlpha: 0 },
            { scale: 1, filter: 'sepia(0) brightness(1) contrast(1)', autoAlpha: 1, duration: 2.5, ease: 'power3.out' },
            '-=1.5'
        )

        // 4. Robust Text Reveal
        .fromTo('.roaster-reveal-inner *', 
            { y: 50, autoAlpha: 0, filter: 'blur(10px)' },
            { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.6, stagger: 0.15, ease: 'power4.out' },
            '-=1.8'
        );
    });

    return (
        <div ref={containerRef} className={`roaster-gate-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD BEYOND */}
            <div className={`roaster-final-reveal ${isRevealed ? 'is-visible' : ''}`}>
                <div className="roaster-hero-bg" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url(${bgCoffee})` }}></div>
                <div className="roaster-reveal-inner">
                    <span className="eyebrow">Artisan Coffee / High Extraction</span>
                    <h2>Noble Dark.</h2>
                    <p>Submerging into the visceral warmth of artisan coffee culture, where every bean tells its own story.</p>
                </div>
            </div>

            {/* THE TEXTURED PILLARS (GRAIN PARALLAX) */}
            {!isRevealed && (
                <>
                    <div className="roaster-pillars-layer">
                        {[1, 2, 3, 4, 5].map((p) => (
                            <div key={p} className={`roaster-pillar p${p}`}>
                                <div className="pillar-grain" style={{ backgroundImage: `url(${bgCoffee})` }}></div>
                                <div className="pillar-overlay"></div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="roaster-gate-content">
                        <div className="roastery-branding">
                            <span className="roaster-bean-logo">
                                <span className="bean-dot"></span>
                                <span className="bean-dot large"></span>
                                <span className="bean-dot"></span>
                            </span>
                            <span className="roaster-name">Obsidian Roasters</span>
                        </div>
                        
                        <h1 className="roaster-title">The Roast.</h1>
                        
                        <button className="roaster-enter-btn" onClick={runRoasterTransition}>
                            <div className="btn-bg"></div>
                            <span className="btn-text">Awaken the Senses</span>
                            <div className="btn-steam"></div>
                        </button>
                    </div>
                </>
            )}

            {/* Cinematic Noise & Vignette */}
            <div className="roaster-texture-fx"></div>
        </div>
    );
};

export default MuseumGateHero;
