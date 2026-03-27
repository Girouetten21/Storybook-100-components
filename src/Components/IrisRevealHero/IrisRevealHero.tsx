import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './IrisRevealHero.scss';

// Import cinematic background
import bgHero from '../../assets/img/Background_2.webp';

export const IrisRevealHero: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const isAnimating = useRef(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const contentLayerRef = useRef<HTMLDivElement>(null);
    const holdTimeline = useRef<gsap.core.Timeline | null>(null);

    // CRITICAL: Scroll Lock Logic until the 'Iris' is fully opened
    useLayoutEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (!isRevealed) {
            document.body.style.overflow = 'hidden';

            // Force zero-scroll and block events
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

    // Handle the "Iris" opening cinematic
    const triggerIrisAnimation = () => {
        if (isAnimating.current || isRevealed) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsRevealed(true);
            }
        });
        
        // 1. Zoom and snap the iris open via clip-path
        tl.to(contentLayerRef.current, {
            clipPath: 'circle(150% at 50% 50%)',
            duration: 2.2,
            ease: 'expo.inOut'
        })
        
        // 2. Cinematic reveal of the background content
        .fromTo('.iris-content-inner', 
            { scale: 1.25, opacity: 0, filter: 'blur(15px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' },
            '-=1.8'
        )
        
        // 3. Staggered typography reveal
        .fromTo('.iris-content-inner *',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' },
            '-=1.5'
        );
    };

    // Tracking the "Hold" interaction physics
    const startHolding = () => {
        if (isRevealed) return;
        
        // Kill any existing drain animation
        gsap.killTweensOf(setHoldProgress);
        
        holdTimeline.current = gsap.timeline();
        holdTimeline.current.to({}, {
            duration: 1.2, // Time to hold in seconds
            onUpdate: function() {
                setHoldProgress(this.progress());
            },
            onComplete: () => {
                triggerIrisAnimation();
            }
        });
    };

    const stopHolding = () => {
        if (isRevealed) return;
        if (holdTimeline.current) {
            holdTimeline.current.kill();
            // Drain the progress smoothly on release
            const currentObj = { val: holdProgress };
            gsap.to(currentObj, {
                val: 0,
                duration: 0.5,
                ease: 'power2.out',
                onUpdate: () => setHoldProgress(currentObj.val)
            });
        }
    };

    return (
        <div ref={containerRef} className={`iris-reveal-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* THE WORLD WITHIN (REVEALED CINEMATIC LAYER) */}
            <div 
                ref={contentLayerRef} 
                className="iris-content-layer"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${bgHero})` }}
            >
                <div className="iris-content-inner">
                    <span className="iris-eyebrow">Interactive Vision</span>
                    <h2>Subterranean Depth.</h2>
                    <p>Unlock the frontiers of cinematic digital architecture through precision motion.</p>
                </div>
            </div>

            {/* THE PROTECTIVE GATE OVERLAY */}
            <div className={`iris-gate ${isRevealed ? 'is-hidden' : ''}`}>
                <div className="gate-instruction">Hold to Experience</div>
                
                <div 
                    className="interaction-point"
                    onMouseDown={startHolding}
                    onMouseUp={stopHolding}
                    onMouseLeave={stopHolding}
                    onTouchStart={startHolding}
                    onTouchEnd={stopHolding}
                >
                    <div className="dot-core" style={{ transform: `scale(${1 + holdProgress * 2})` }}></div>
                    <div className="progress-ring">
                        <svg className="svg-ring" viewBox="0 0 100 100">
                            <circle 
                                className="ring-path" 
                                cx="50" cy="50" r="48" 
                                style={{ strokeDashoffset: 301 - (holdProgress * 301) }} 
                            />
                        </svg>
                    </div>
                </div>

                <div className="gate-meta">
                    <span>Vol. 02 / Iris Reveal</span>
                </div>
            </div>

            {/* Cinematic Noise & Vignette */}
            <div className="iris-overlay-fx"></div>
        </div>
    );
};

export default IrisRevealHero;
