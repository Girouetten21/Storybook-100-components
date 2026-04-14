import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetherialFocusGrid.scss';

const SPEC_DATA = [
    { label: "Material", val: "Aero-Grade Titanium", description: "Precision forged at microscopic levels." },
    { label: "Refraction", val: "Infinite 0.01", description: "Light passing through without resistance." },
    { label: "Finish", val: "Obsidian Void", description: "Deep black coating that absorbs 99% of light." },
    { label: "Core", val: "Neutron Pulse", description: "Stabilized energy source for eternal brilliance." }
];

export const AetherialFocusGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Staggered reveal of spec lines
        gsap.fromTo('.spec-item',
            { autoAlpha: 0, x: -30 },
            { 
                autoAlpha: 1, x: 0, 
                duration: 1, 
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%'
                }
            }
        );

        // Parallax image
        gsap.to('.focus-visual', {
            y: 100,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aetherial-focus-grid">
            <div className="focus-grid-layout">
                
                {/* LEFT COLUMN: Header & Visual */}
                <div className="focus-left-panel">
                    <div className="focus-header">
                        <span className="focus-eyebrow">Technical Blueprint</span>
                        <h2 className="focus-title">The <i>Anatomy</i> of Aether</h2>
                    </div>

                    <div className="focus-visual-container">
                        <div className="focus-visual">
                            <div className="visual-core"></div>
                            <div className="visual-ring"></div>
                            <div className="visual-axis-x"></div>
                            <div className="visual-axis-y"></div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Specifications List */}
                <div className="focus-right-panel">
                    <div className="focus-specs">
                        {SPEC_DATA.map((item, index) => (
                            <div key={index} className="spec-item">
                                <span className="spec-label">{item.label}</span>
                                <h4 className="spec-val">{item.val}</h4>
                                <p className="spec-desc">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AetherialFocusGrid;
