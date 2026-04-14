import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FashionAtelierHero.scss';

// Import high-end editorial image
import bgFashion from '../../img/generated_7.png';

gsap.registerPlugin(useGSAP);

export const FashionAtelierHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Safe interaction logic and scoped selectors
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

    const runFashionTransition = contextSafe(() => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });

        // 0. Initial activations
        tl.set('.atelier-reveal-content', { autoAlpha: 1 });

        // 1. Initial UI Departure & Silk Flash
        tl.to('.atelier-gate-ui', { autoAlpha: 0, scale: 0.95, duration: 0.5, ease: 'power2.in' })
          .to('.atelier-silk-flash', { autoAlpha: 0.8, duration: 0.3, ease: 'power2.out' }, '-=0.2')
          .to('.atelier-silk-flash', { autoAlpha: 0, duration: 0.6, ease: 'sine.in' });

        // 2. THE GEOMETRIC SHUTTER (Locked until completion)
        tl.to('.atelier-panel.tl', { x: '-100%', y: '-100%', duration: 1.6, ease: 'expo.inOut' }, '-=0.4');
        tl.to('.atelier-panel.tr', { x: '100%', y: '-100%', duration: 1.6, ease: 'expo.inOut' }, '<');
        tl.to('.atelier-panel.bl', { x: '-100%', y: '100%', duration: 1.6, ease: 'expo.inOut' }, '<');
        tl.to('.atelier-panel.br', { x: '100%', y: '100%', duration: 1.6, ease: 'expo.inOut' }, '<');

        // 3. Central Image Expansion
        tl.fromTo('.atelier-hero-img-container',
            { width: '450px', height: '650px', y: '-50%', x: '-50%', scale: 1.15 },
            { width: '101vw', height: '101vh', scale: 1, duration: 1.6, ease: 'expo.inOut' },
            '<'
        );

        // 4. Hero Content Reveal
        tl.fromTo('.atelier-reveal-text *',
            { autoAlpha: 0, y: 50, rotateX: -20, filter: 'blur(20px)' },
            { autoAlpha: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.1, ease: 'power4.out' },
            '-=1.2'
        );
    });

    return (
        <div ref={containerRef} className={`atelier-gate-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD BEYOND */}
            <div className="atelier-reveal-content">
                <div className="atelier-hero-img-container">
                    <div className="atelier-hero-img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${bgFashion})` }}></div>
                </div>
                
                <div className="atelier-reveal-text">
                    <span className="atelier-eyebrow">— EXCLUSIF SS/26 —</span>
                    <h2 className="atelier-title">The Art of <i>Drapery</i>.</h2>
                    <p className="atelier-desc">Redefining modern luxury through silent silhouettes and timeless textures.</p>
                </div>
            </div>

            {/* THE FASHION GATE (The Geometric Shutter) */}
            {!isRevealed && (
                <div className="atelier-gate-door">
                    <div className="atelier-panel tl"></div>
                    <div className="atelier-panel tr"></div>
                    <div className="atelier-panel bl"></div>
                    <div className="atelier-panel br"></div>
                    <div className="atelier-silk-flash"></div>
                    
                    <div className="atelier-gate-ui">
                        <div className="atelier-center-frame" onClick={runFashionTransition}>
                            <div className="frame-img" style={{ backgroundImage: `url(${bgFashion})` }}></div>
                            <div className="frame-overlay">
                                <span>ENTER THE ATELIER</span>
                            </div>
                        </div>
                        
                        <div className="atelier-branding">
                            <span className="brand-dot">•</span>
                            <span className="brand-name">Maison du Style</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="atelier-grain-fx"></div>
        </div>
    );
};

export default FashionAtelierHero;
