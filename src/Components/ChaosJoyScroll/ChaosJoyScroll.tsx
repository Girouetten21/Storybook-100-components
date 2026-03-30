import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ChaosJoyScroll.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHAOS_SECTIONS = [
    {
        title: "UNLEASH",
        highlight: "ENERGY",
        color: "#FFF500", // Electric Yellow
        sticker: "⚡",
        bgMix: "multiply"
    },
    {
        title: "FEEL THE",
        highlight: "CHAOS",
        color: "#FF00FF", // Neon Pink
        sticker: "🎈",
        bgMix: "screen"
    },
    {
        title: "SMILING",
        highlight: "BRUTAL",
        color: "#00FFFF", // Electric Cyan
        sticker: "🤪",
        bgMix: "exclusion"
    }
];

export const ChaosJoyScroll: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Official useGSAP hook + scoping
    useGSAP(() => {
        const sections = gsap.utils.toArray('.chaos-section');

        sections.forEach((section: any, i: number) => {
            const title = section.querySelector('.chaos-title');
            const sticker = section.querySelector('.chaos-sticker');
            const overlay = section.querySelector('.chaos-overlay-text');

            // 1. PIN & PUNCH ENTRANCE (Fixed Trigger Range)
            gsap.fromTo(title,
                { autoAlpha: 0, scale: 0.5, skewX: 20, rotate: -5 },
                {
                    autoAlpha: 1, scale: 1, skewX: 0, rotate: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%", // Appears earlier
                        end: "bottom 15%", // Disappears much later (near exit)
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // 2. CHAOTIC STICKER MOVEMENT (Floating)
            gsap.to(sticker, {
                y: -200,
                rotate: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // 3. BG IMPACT
            gsap.to(section, {
                backgroundColor: CHAOS_SECTIONS[i].color,
                duration: 0.5,
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                }
            });

            // 4. OVERLAY PARALLAX
            gsap.to(overlay, {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5
                }
            });
        });

    }, { scope: mainRef }); // AUTO CLEANUP & SCOPING

    return (
        <div ref={mainRef} className="chaos-joy-wrapper">

            {CHAOS_SECTIONS.map((item, index) => (
                <section
                    key={index}
                    className="chaos-section"
                    style={{ '--chaos-color': item.color } as React.CSSProperties}
                >
                    <div className="chaos-overlay-text">JOY JOY JOY JOY JOY JOY JOY JOY</div>

                    <div className="chaos-content">
                        <div className="chaos-sticker">{item.sticker}</div>
                        <h2 className="chaos-title">
                            {item.title} <br />
                            <span className="highlight">{item.highlight}</span>
                        </h2>
                    </div>

                    {/* DECORATIVE BRUTALIST GRID */}
                    <div className="chaos-grid"></div>
                </section>
            ))}

        </div>
    );
};

export default ChaosJoyScroll;
