import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ShatterVaultHero.scss';

// Import cinematic background
import bgHero from '../../img/generated_5.png';

gsap.registerPlugin(useGSAP);

export const ShatterVaultHero: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const quadrantsRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Safe interaction logic and scoped selectors
    const { contextSafe } = useGSAP({ scope: containerRef });

    // CRITICAL: Scroll Lock Logic
    useLayoutEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (!isOpened) {
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
    }, [isOpened]);

    const handleShatterReveal = contextSafe(() => {
        if (isAnimating.current || isOpened) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsOpened(true);
            }
        });

        // 1. Hide the triggering UI layer aggressively
        tl.to('.shatter-ui-layer', { 
            autoAlpha: 0, 
            scale: 0.85, 
            duration: 0.6, 
            ease: 'expo.inOut' 
        })

        // 2. THE MECHANICAL SHATTER: 4 quadrants fly towards the viewer and outwards
        .to('.quad-tl', { rotationY: -110, rotationX: 45, xPercent: -60, yPercent: -60, autoAlpha: 0, duration: 2, ease: 'power4.inOut' }, '-=0.3')
        .to('.quad-tr', { rotationY: 110, rotationX: 45, xPercent: 60, yPercent: -60, autoAlpha: 0, duration: 2, ease: 'power4.inOut' }, '<')
        .to('.quad-bl', { rotationY: -110, rotationX: -45, xPercent: -60, yPercent: 60, autoAlpha: 0, duration: 2, ease: 'power4.inOut' }, '<')
        .to('.quad-br', { rotationY: 110, rotationX: -45, xPercent: 60, yPercent: 60, autoAlpha: 0, duration: 2, ease: 'power4.inOut' }, '<')

        // 3. Reveal the world behind with a counter-surge
        .fromTo(contentRef.current, 
            { autoAlpha: 0, scale: 0.8, filter: 'brightness(0) blur(20px)' },
            { autoAlpha: 1, scale: 1, filter: 'brightness(1) blur(0px)', duration: 2.5, ease: 'expo.out' },
            '-=1.6'
        )
        
        // 4. Staggered reveal of internal typography
        .fromTo('.shatter-reveal-inner *',
            { y: 100, autoAlpha: 0, skewY: 5 },
            { y: 0, autoAlpha: 1, skewY: 0, duration: 1.4, stagger: 0.15, ease: 'power4.out' },
            '-=1.6'
        );
    });

    return (
        <div ref={containerRef} className={`shatter-vault-container ${isOpened ? 'is-stable' : ''}`}>
            
            {/* BACKGROUND CONTENT LAYER */}
            <div 
                ref={contentRef} 
                className="shatter-bg-layer"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bgHero})` }}
            >
                <div className="shatter-reveal-inner">
                    <span className="shatter-eyebrow">Selection / Architectural</span>
                    <h2>Vault of Perception.</h2>
                    <p>Exploring the frontiers of cinematic digital architecture through precision motion and structural code.</p>
                </div>
            </div>

            {/* MECHANICAL VAULT QUADRANTS */}
            <div ref={quadrantsRef} className={`shatter-gate ${isOpened ? 'is-active' : ''}`}>
                <div className="quad-tl"><span className="quad-marker">TL-0</span></div>
                <div className="quad-tr"><span className="quad-marker">TR-1</span></div>
                <div className="quad-bl"><span className="quad-marker">BL-2</span></div>
                <div className="quad-br"><span className="quad-marker">BR-3</span></div>
            </div>

            {/* INTERACTION UI (CENTRIC NEXUS) */}
            <div className="shatter-ui-layer">
                <div className="nexus-box">
                    <div className="nexus-header">
                        <span className="dot"></span>
                        <span className="txt">The Monolith Studio</span>
                    </div>
                    
                    <h1 className="nexus-title">SHATTER</h1>

                    <button className="nexus-btn-trigger" onClick={handleShatterReveal}>
                        <div className="pulse-aura"></div>
                        <span className="btn-label">Initial Sequence</span>
                    </button>
                    
                    <div className="nexus-footer">
                        <span>EST. 2026 / VOL. IV</span>
                    </div>
                </div>
            </div>

            {/* Cinematic Noise & Texture */}
            <div className="shatter-film-fx"></div>
        </div>
    );
};

export default ShatterVaultHero;
