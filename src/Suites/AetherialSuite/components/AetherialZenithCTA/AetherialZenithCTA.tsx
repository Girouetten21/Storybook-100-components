import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetherialZenithCTA.scss';

export const AetherialZenithCTA: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // 1. Line expansion (The "Zenith" axis)
        tl.fromTo('.zenith-axis',
            { scaleY: 0 },
            { scaleY: 1, ease: 'none' }
        );

        // 2. Text split reveal
        tl.fromTo('.zenith-word.left',
            { x: -50, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, ease: 'power2.out' },
            '-=0.5'
        )
        .fromTo('.zenith-word.right',
            { x: 50, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, ease: 'power2.out' },
            '<'
        );

        // 3. Subtext entrance
        tl.fromTo('.zenith-subtext',
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1 },
            '-=0.3'
        );

        // 4. Subtle background glow
        tl.fromTo('.zenith-glow',
            { scale: 0.8, opacity: 0 },
            { scale: 1.2, opacity: 0.15, duration: 2 },
            '-=1'
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aetherial-zenith-section">
            <div className="zenith-container">
                <div className="zenith-glow"></div>
                
                <div className="zenith-axis"></div>

                <div className="zenith-typography">
                    <h2 className="zenith-main-title">
                        <span className="zenith-word left">Aether</span>
                        <span className="zenith-word right">ial</span>
                    </h2>
                </div>

                <div className="zenith-footer-content">
                    <div className="zenith-subtext">
                        <p className="manifesto-tag">V. 2026 / INFINITE REFINEMENT</p>
                        <button className="zenith-action-btn">
                            <span className="btn-text">Commence Your Legacy</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>

                    <div className="zenith-signature">
                        <span>DESIGNED IN THE VOID</span>
                        <div className="sig-dot"></div>
                        <span>BY LUMINA COLLECTIVE</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AetherialZenithCTA;
