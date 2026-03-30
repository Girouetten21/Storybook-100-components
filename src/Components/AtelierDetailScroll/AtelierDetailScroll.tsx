import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AtelierDetailScroll.scss';

// Import fashion imagery
import atelierMain from '../../assets/img/Background_1.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES = [
    {
        label: "01 / ORIGIN",
        title: "The Masterpiece",
        desc: "A singular vision of elegance, crafted for those who define the future of high-couture architecture.",
        zoom: 1, x: 0, y: 0
    },
    {
        label: "02 / CRAFT",
        title: "Precision Stitch",
        desc: "Every thread is a line of code in the language of excellence. Reinforced for eternal durability.",
        zoom: 2.5, x: -20, y: 15
    },
    {
        label: "03 / TEXTURE",
        title: "Raw Materiality",
        desc: "Sourced from the heart of the digital landscape. A texture that speaks before it is touched.",
        zoom: 3.2, x: 15, y: -10
    },
    {
        label: "04 / LEGACY",
        title: "The Signature",
        desc: "The final mark of quality. A promise kept across generations of fashion visionaries.",
        zoom: 1.8, x: -10, y: -25
    }
];

export const AtelierDetailScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Official useGSAP hook + scoping
    useGSAP(() => {
        // 1. PIN THE ENTIRE EXPERIENCE
        const pinTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=350%", // Long enough for 4 detailed steps
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        });

        // 2. ANIMATE EACH STEP
        FEATURES.forEach((feature, index) => {
            const stepSelector = `.atelier-step-${index}`;
            
            // Jump to zooming logic (Scale + Offset)
            if (index > 0) {
                pinTl.to(imgRef.current, {
                    scale: feature.zoom,
                    xPercent: feature.x,
                    yPercent: feature.y,
                    duration: 1,
                    ease: "power2.inOut"
                }, `step-${index}`);
            }

            // Text Revelations
            pinTl.fromTo(stepSelector,
                { autoAlpha: 0, x: index % 2 === 0 ? -100 : 100 },
                { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" },
                `step-${index}${index === 0 ? '' : '+=0.2'}`
            );

            // Exit of previous text (except for last one)
            if (index < FEATURES.length - 1) {
                pinTl.to(stepSelector, {
                    autoAlpha: 0,
                    y: -50,
                    duration: 0.6,
                    ease: "power2.in"
                }, `step-${index + 1}-=0.4`);
            }
        });

    }, { scope: containerRef }); // AUTO CLEANUP & SCOPING

    return (
        <div ref={containerRef} className="atelier-detail-wrapper">
            
            {/* THE PINNED STAGE */}
            <div ref={pinRef} className="atelier-stage">
                
                {/* THE ZOOMABLE IMAGE */}
                <div className="atelier-img-container">
                    <div 
                        ref={imgRef}
                        className="atelier-main-visual"
                        style={{ backgroundImage: `url(${atelierMain})` }}
                    ></div>
                    <div className="atelier-vignette"></div>
                </div>

                {/* THE NARRATIVE CONTENT */}
                <div className="atelier-narrative">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className={`atelier-step atelier-step-${i}`}>
                            <span className="step-label">{feature.label}</span>
                            <h2 className="step-title">{feature.title}</h2>
                            <p className="step-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* DECORATIVE ELEMENTS */}
                <div className="atelier-corner-label top-left">ATELIER COLLECTION / 2026</div>
                <div className="atelier-corner-label bottom-right">REFINEMENT IS RESISTANCE</div>
            </div>

        </div>
    );
};

export default AtelierDetailScroll;
