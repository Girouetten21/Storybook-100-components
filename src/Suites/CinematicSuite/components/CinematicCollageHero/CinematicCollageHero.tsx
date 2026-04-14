import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CinematicCollageHero.scss';

// Import cinematic images
import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';

const HERO_IMAGES = [img1, img2, img3];
const COLLAGE_DATA = [
    { word: "VISION", w: 550, h: 380 },
    { word: "DEPTH", w: 300, h: 300 },
    { word: "CRAFT", w: 400, h: 550 },
    { word: "SOUL", w: 250, h: 250 },
    { word: "LEGACY", w: 500, h: 320 },
    { word: "ELITE", w: 320, h: 480 },
];

interface Fragment {
    id: number;
    img: string;
    word: string;
    width: number;
    height: number;
    top: string;
    left: string;
    rotation: number;
}

gsap.registerPlugin(useGSAP);

export const CinematicCollageHero: React.FC = () => {
    const [isSequencePlaying, setIsSequencePlaying] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [fragments, setFragments] = useState<Fragment[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Using contextSafe for event-based timelines
    const { contextSafe } = useGSAP({ scope: containerRef });

    // CRITICAL FIX: useLayoutEffect for scroll locking
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

    const triggerCollageSequence = contextSafe(() => {
        if (isSequencePlaying || isRevealed) return;
        setIsSequencePlaying(true);
        setFragments([]);
        
        const tl = gsap.timeline({
            onComplete: () => {
                setIsSequencePlaying(false);
                setIsRevealed(true);
                setFragments([]); 
            }
        });

        // 1. Initial Gate Fade-out
        tl.to('.collage-gate-ui', { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: 'power3.in' });

        // 2. THE PERSISTENT COLLAGE BURST (Stacking 3-4 images at a time)
        const burstCount = 20;
        for (let i = 0; i < burstCount; i++) {
            tl.add(() => {
                const data = COLLAGE_DATA[Math.floor(Math.random() * COLLAGE_DATA.length)];
                const newFragment: Fragment = {
                    id: Date.now() + i,
                    img: HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)],
                    word: data.word,
                    width: data.w,
                    height: data.h,
                    top: `${15 + Math.random() * 55}%`,
                    left: `${15 + Math.random() * 55}%`,
                    rotation: -6 + Math.random() * 12
                };

                // Add to stack, keep only last 5 for performance/visibility
                setFragments(prev => {
                    const next = [...prev, newFragment];
                    if (next.length > 5) return next.slice(1);
                    return next;
                });
            }, `+=${0.08 + (i * 0.005)}`);
        }

        // 3. The Final Impact Strike (HYPER FAST)
        tl.to('.collage-flash-overlay', { autoAlpha: 1, duration: 0.05, ease: 'none' })
        .to('.collage-flash-overlay', { 
            autoAlpha: 0, 
            duration: 0.3, 
            ease: 'power1.out',
            onStart: () => setFragments([]) // Clear stack exactly on the flash
        })
        
        // 4. Reveal Final content (INSTANT)
        .fromTo('.collage-reveal-inner *',
            { y: 30, autoAlpha: 0, filter: 'blur(10px)', scale: 0.98 },
            { y: 0, autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 0.8, stagger: 0.07, ease: 'power4.out' },
            '-=0.45'
        );
    });

    return (
        <div ref={containerRef} className={`cinematic-collage-container ${isRevealed ? 'is-stable' : ''}`}>
            
            {/* HERO RESULT LAYER */}
            <div 
                className={`collage-final-reveal ${isRevealed ? 'is-visible' : ''}`}
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${img1})` }}
            >
                <div className="collage-reveal-inner">
                    <span className="eyebrow">Selection / Archive V3</span>
                    <h2>Asymmetric Order.</h2>
                    <p>Submerging into a high-fidelity architectural journey through persistent fragments of vision.</p>
                </div>
            </div>

            {/* THE MULTI-LAYER PERSISTENT COLLAGE (STACK) */}
            {isSequencePlaying && fragments.map((frag) => (
                <div key={frag.id} className="collage-flash-layer">
                    <div className="fragment-container" style={{ 
                        top: frag.top, 
                        left: frag.left,
                        width: `${frag.width}px`,
                        height: `${frag.height}px`,
                        transform: `translate(-50%, -50%) rotate(${frag.rotation}deg) scale(1.05)`
                    }}>
                        <div className="fragment-img" style={{ backgroundImage: `url(${frag.img})` }}></div>
                        <div className="fragment-word">{frag.word}</div>
                        <div className="fragment-flash"></div>
                    </div>
                </div>
            ))}

            {/* STARTING GATE */}
            {!isRevealed && !isSequencePlaying && (
                <div className="collage-gate-ui">
                    <div className="gate-header">
                        <span className="dot pulse"></span>
                        <span className="brand">Editorial Archive</span>
                    </div>

                    <h1 className="gate-title">Archive.</h1>

                    <button className="gate-trigger" onClick={triggerCollageSequence}>
                        <div className="btn-shape"></div>
                        <span className="btn-label">Begin Sequence</span>
                    </button>

                    <div className="gate-footer">
                        <span>VOL. 38 / LAYERED MONO</span>
                    </div>
                </div>
            )}

            {/* OVERLAYS */}
            <div className="collage-flash-overlay"></div>
            <div className="collage-grain-fx"></div>
        </div>
    );
};

export default CinematicCollageHero;
