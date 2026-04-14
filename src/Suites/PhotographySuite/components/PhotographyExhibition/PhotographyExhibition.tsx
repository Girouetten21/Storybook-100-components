import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Assets
import apertureHardwareImg from '../../img/aperture.png';
import act1Img from '../../img/lens_act1.png';
import act2Img from '../../img/lens_act2.png';
import act3Img from '../../img/lens_act3.png';

import './PhotographyExhibition.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PhotographyExhibitionProps {
    isUnlocked?: boolean;
}

const PhotographyExhibition: React.FC<PhotographyExhibitionProps> = ({ isUnlocked }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isUnlocked || !containerRef.current) return;

        // 1. ONE-TIME ENTRY REVEAL
        const entryTl = gsap.timeline({
            onComplete: () => {
                ScrollTrigger.refresh();
            }
        });

        entryTl.fromTo('.lens-ui-top, .lens-ui-bottom',
            { opacity: 0, y: (i) => i === 0 ? -20 : 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        )
            .fromTo('.lens-text-side',
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.5"
            )
            .fromTo('.lens-visual-side',
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 0);

        // 2. SCROLL-BASED TRANSITIONS
        const scrubTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        scrubTl.to({}, { duration: 0.5 })
            .to('.aperture-viewport', { clipPath: 'circle(72% at 50% 50%)', duration: 2 })
            .to('.p-slide-1', { opacity: 1, filter: 'blur(0px)', duration: 1 }, "-=1.5")
            .to('.p-slide-1', { opacity: 0, filter: 'blur(20px)', scale: 1.2, duration: 1.5 })
            .to('.p-slide-2', { opacity: 1, filter: 'blur(0px)', scale: 1.1, duration: 1.5 }, "<")
            .to('.p-slide-2', { opacity: 0, filter: 'blur(20px)', scale: 1.2, duration: 1.5 }, "+=1")
            .to('.p-slide-3', { opacity: 1, filter: 'blur(0px)', scale: 1.1, duration: 1.5 }, "<")
            .to({}, { duration: 2 });

        const moveLens = (e: MouseEvent) => {
            const visualSide = containerRef.current?.querySelector('.lens-visual-side');
            if (!visualSide) return;
            
            const { left, top, width, height } = visualSide.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            const x = (e.clientX - centerX) / 25;
            const y = (e.clientY - centerY) / 25;
            gsap.to('.lens-content-inner', { x, y, duration: 1, ease: "power2.out" });
        };
        window.addEventListener('mousemove', moveLens);

        // Force refresh after layout settle
        setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => window.removeEventListener('mousemove', moveLens);
    }, { dependencies: [isUnlocked], scope: containerRef });

    return (
        <section className={`lens-exhibition ${!isUnlocked ? 'is-locked' : ''}`} ref={containerRef}>

            {/* 🎞️ UI DECOR (Global) */}
            <div className="lens-ui-top">
                <div className="ui-item">F/1.4 // OPTICAL MASTER</div>
                <div className="ui-item">AF-S // NARRATIVE LOCK</div>
            </div>

            <div className="lens-ui-bottom">
                <div className="ui-item">ISO 64</div>
                <div className="ui-item">PURE // FOCUS</div>
            </div>

            <div className="lens-split-layout">
                
                {/* 📝 LEFT COLUMN: TEXT & TITLES */}
                <div className="lens-text-side">
                    <div className="text-content">
                        <span className="eyebrow">TECHNICAL ARTISTRY</span>
                        <h3 className="lens-headline">CAPTURE<br/><span>THE</span><br/>ESSENCE.</h3>
                        <div className="description-wrap">
                            <p>
                                Experience the pinnacle of optical engineering.
                                Our lenses are crafted with radioactive glass elements
                                to achieve a signature bokeh that breathes life into the silence.
                            </p>
                            <div className="meta-stats">
                                <div className="stat"><span>LENGTH</span> 35MM</div>
                                <div className="stat"><span>STOPS</span> T1.5</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🧿 RIGHT COLUMN: THE MASTER LENS */}
                <div className="lens-visual-side">
                    <div className="lens-container">
                        <div className="lens-base">
                            {/* 🖲️ APERTURE HARDWARE */}
                            <div className="aperture-hardware">
                                <img src={apertureHardwareImg} alt="Aperture Blades" />
                            </div>

                            {/* 📸 CONTENT VIEWPORT */}
                            <div className="aperture-viewport">
                                <div className="lens-content-inner">
                                    <div className="lens-slide p-slide-1">
                                        <img src={act1Img} alt="Act I: The Observer" />
                                        <div className="slide-label">ACT // I: THE OBSERVER</div>
                                    </div>
                                    <div className="lens-slide p-slide-2">
                                        <img src={act2Img} alt="Act II: The Focus" />
                                        <div className="slide-label">ACT // II: THE FOCUS</div>
                                    </div>
                                    <div className="lens-slide p-slide-3">
                                        <img src={act3Img} alt="Act III: The Capture" />
                                        <div className="slide-label">ACT // III: THE CAPTURE</div>
                                    </div>
                                </div>
                                <div className="shutter-flash" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default PhotographyExhibition;
