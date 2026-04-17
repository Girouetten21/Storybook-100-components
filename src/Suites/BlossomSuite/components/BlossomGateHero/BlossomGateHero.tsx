import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomGateHero.scss';

// Import soft backgrounds
import bgFloral from '../../img/blossom_hero.png'; // Updated with refined botanical landscape

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SVGFlower = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        {[...Array(12)].map((_, i) => (
            <path
                key={i}
                d="M50 50 Q70 10 50 0 Q30 10 50 50"
                stroke="currentColor"
                strokeWidth="0.4"
                transform={`rotate(${i * 30} 50 50)`}
                opacity={0.3}
            />
        ))}
        <circle cx="50" cy="50" r="1.5" fill="currentColor" opacity={0.4} />
    </svg>
);

interface BlossomGateHeroProps {
    onReveal?: () => void;
}

export const BlossomGateHero: React.FC<BlossomGateHeroProps> = ({ onReveal }) => {
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

    useGSAP(() => {
        // Continuous rotation for the botanical gate watermark
        gsap.to('.gate-bg-flower', {
            rotate: 360,
            duration: 80,
            repeat: -1,
            ease: "none"
        });
    }, { scope: containerRef });

    const runBlossomTransition = contextSafe(() => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
                if (onReveal) onReveal();
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        });

        // 0. Make the background layer visible as we start opening
        tl.set('.blossom-final-reveal', { autoAlpha: 1 });

        // 1. Initial UI fade out
        tl.to(['.blossom-gate-content', '.gate-bg-flower-wrap'], { autoAlpha: 0, scale: 0.98, duration: 0.7, ease: 'power2.inOut' });

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
                { scale: 1.15, filter: 'blur(20px) brightness(1.3)', autoAlpha: 0 },
                { scale: 1, filter: 'blur(0px) brightness(1)', autoAlpha: 1, duration: 2.5, ease: 'expo.out' },
                '-=1.5'
            )

            // 4. Staggered text reveal with smoother 'Liquid' feel
            .fromTo('.blossom-reveal-inner *',
                { y: 50, autoAlpha: 0, filter: 'blur(10px)' },
                {
                    y: 0,
                    autoAlpha: 1,
                    filter: 'blur(0px)',
                    duration: 1.6,
                    stagger: 0.2,
                    ease: 'power4.out'
                },
                '-=1.8'
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
                        {/* Background Minimalist Flower - Now enormous and offset */}
                        <div className="gate-bg-flower-wrap">
                            <SVGFlower className="gate-bg-flower" />
                        </div>

                        {/* Top Left: Brand & Date */}
                        <div className="gate-top-left-info">
                            <div className="botanical-brand">
                                <span className="serif">Bloom</span>
                                <span className="sans">Flora</span>
                            </div>
                            <div className="gate-date-detail">EST. 2026 / VOL. 01</div>
                        </div>

                        {/* Vertical Accent */}
                        <div className="gate-vertical-text">ARCHIVES — NO. 402</div>

                        {/* Bottom Left: Title */}
                        <div className="gate-main-title-wrap">
                            <h1 className="gate-title-main">Flora Aura</h1>
                        </div>

                        {/* Bottom Right: ENTER & Tagline */}
                        <div className="gate-bottom-right-action">
                            <div className="gate-tagline">
                                Seasonal Selections Hand-Picked with Love
                            </div>

                            <button className="blossom-enter-btn" onClick={runBlossomTransition}>
                                <span className="btn-text">ENTER</span>
                                <svg className="btn-shape" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </svg>
                            </button>

                            <div className="gate-coords">40.4168° N, 3.7038° W</div>
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
