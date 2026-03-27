import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './OrigamiGateHero.scss';

// Import cinematic background
import bgHero from '../../assets/img/Background_3.webp';

export const OrigamiGateHero: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const isAnimating = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement>(null);

    // Scroll Lock Logic
    useLayoutEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();

        if (!isOpened) {
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
    }, [isOpened]);

    const handleOrigamiOpen = () => {
        if (isAnimating.current || isOpened) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsOpened(true);
            }
        });

        // 1. Hide instruction UI
        tl.to('.origami-ui-layer', { 
            opacity: 0, 
            y: -40,
            duration: 0.8, 
            ease: 'power3.inOut' 
        })

        // 2. THE UNFOLD: Triangles peeling back in 3D
        .to('.panel-top', { rotationX: 110, opacity: 0, duration: 2, ease: 'expo.inOut' }, '-=0.4')
        .to('.panel-bottom', { rotationX: -110, opacity: 0, duration: 2, ease: 'expo.inOut' }, '<')
        .to('.panel-left', { rotationY: -110, opacity: 0, duration: 2, ease: 'expo.inOut' }, '<')
        .to('.panel-right', { rotationY: 110, opacity: 0, duration: 2, ease: 'expo.inOut' }, '<')

        // 3. Cinematic reveal of content
        .fromTo(contentRef.current, 
            { opacity: 0, scale: 1.15, filter: 'blur(20px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.2, ease: 'power4.out' },
            '-=1.6'
        )
        
        // 4. Elegant text entrance (STABLE VERSION)
        .fromTo('.origami-reveal-inner *',
            { y: 60, opacity: 0, filter: 'blur(15px)' },
            { 
                y: 0, 
                opacity: 1, 
                filter: 'blur(0px)', 
                duration: 1.4, 
                stagger: 0.15, 
                ease: 'power4.out',
                force3D: true 
            },
            '-=1.5'
        );
    };

    return (
        <div ref={containerRef} className={`origami-gate-container ${isOpened ? 'is-stable' : ''}`}>
            
            {/* HIDDEN WORLD (THE REVEAL) */}
            <div 
                ref={contentRef} 
                className="origami-bg-layer"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${bgHero})` }}
            >
                <div className="origami-reveal-inner">
                    <span className="eyebrow">Digital Couture / 2026</span>
                    <h2>Sublime Aesthetics.</h2>
                    <p>Where the precision of mathematics meets the soul of cinematic design.</p>
                </div>
            </div>

            {/* FOLDING TRIANGLE PANELS */}
            <div ref={panelsRef} className={`origami-panels ${isOpened ? 'is-active' : ''}`}>
                <div className="panel-top"></div>
                <div className="panel-bottom"></div>
                <div className="panel-left"></div>
                <div className="panel-right"></div>
                
                {/* Thin golden grid lines for the fold */}
                <div className="fold-lines">
                    <div className="line-diag-1"></div>
                    <div className="line-diag-2"></div>
                </div>
            </div>

            {/* INTERACTION UI (MINIMALIST) */}
            <div className="origami-ui-layer">
                <div className="instruction-box" onClick={handleOrigamiOpen}>
                    <div className="vertical-text">OPEN</div>
                    <div className="trigger-nexus">
                        <div className="nexus-ring"></div>
                        <div className="nexus-dot"></div>
                    </div>
                </div>
            </div>

            {/* Luxury Grain & Vignette */}
            <div className="origami-fx"></div>
        </div>
    );
};

export default OrigamiGateHero;
