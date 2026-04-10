import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './PhotographyMasterStory.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyMasterStory: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 📐 Animación de la escala vertical (Sticky Progress)
        gsap.to('.story-sticky-metric .metric-line', {
            height: '100%',
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });

        // Revelado sutil de los bloques de texto
        const blocks = gsap.utils.toArray('.story-content-block');
        blocks.forEach((block: any) => {
            gsap.from(block, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section className="photography-master-story-v2" ref={containerRef}>
            
            {/* 🎞️ BACKGROUND WATERMARK TITLE */}
            <div className="story-bg-watermark">STORY</div>

            <div className="story-split-layout">
                
                {/* 📏 LEFT SIDE: STICKY METRIC (Brutalist style) */}
                <aside className="story-sidebar">
                    <div className="story-sticky-container">
                        <div className="story-sticky-metric">
                            <span className="metric-label">CALIBRATING // NARRATIVE</span>
                            <div className="metric-track">
                                <div className="metric-line"></div>
                            </div>
                            <span className="metric-depth">AUTO-FOCUS // 1.4F</span>
                        </div>
                    </div>
                </aside>

                {/* 📝 RIGHT SIDE: CLEAN MINIMAL CONTENT */}
                <main className="story-main-content">
                    
                    <div className="story-content-block">
                        <span className="block-index">01/ Vision</span>
                        <h2 className="block-title">THE <span>PURITY</span> OF OPTICS.</h2>
                        <p className="block-text">
                            We believe that photography is the ultimate form of subtraction. 
                            It is not about what we add to the frame, but what we have the courage 
                            to leave out. Every image in this suite is a testament to the pursuit of 
                            essential geometry.
                        </p>
                    </div>

                    <div className="story-content-block">
                        <span className="block-index">02/ Arsenal</span>
                        <h2 className="block-title">TECHNICAL <span>AUTHORITY</span>.</h2>
                        <p className="block-text">
                            Utilizing medium format resolution allows us to capture what the human eye often overlooks. 
                            Our process integrates analog principles with digital precision, resulting in 100MP files 
                            that preserve the texture of light itself.
                        </p>
                        <div className="technical-specs">
                            <div className="spec-item">PHASE ONE IQ4</div>
                            <div className="spec-item">RODENSTOCK 40MM</div>
                            <div className="spec-item">D65 CALIBRATION</div>
                        </div>
                    </div>

                    <div className="story-content-block">
                        <span className="block-index">03/ Legacy</span>
                        <h2 className="block-title">GLOBAL <span>FOOTPRINT</span>.</h2>
                        <p className="block-text">
                            From solo exhibitions in the concrete galleries of Berlin to editorial 
                            narratives in the pages of Vogue, our aesthetic serves a global audience 
                            that values restraint, precision, and architectural silence.
                        </p>
                    </div>

                    <div className="story-content-block">
                        <span className="block-index">04/ Science</span>
                        <h2 className="block-title">CHROMATIC <span>SYSTEMS</span>.</h2>
                        <p className="block-text">
                            Color is not just an aesthetic choice; it is a mathematical calibration. 
                            We work with D65 White Points and custom ICC profiles to ensure that 
                            the transition from RAW data to fine-art print is mathematically perfect.
                        </p>
                    </div>

                    <div className="story-content-block">
                        <span className="block-index">05/ Atmosphere</span>
                        <h2 className="block-title">GRAIN <span>STRUCTURE</span>.</h2>
                        <p className="block-text">
                            Sometimes, precision requires a touch of imperfection. We carefully 
                            introduce curated grain structures to our digital files, emulating 
                            the chemical reaction of silver halide on physical film reels.
                        </p>
                    </div>

                    <div className="story-content-block">
                        <span className="block-index">06/ Experience</span>
                        <h2 className="block-title">STUDIO <span>DIALOGUE</span>.</h2>
                        <p className="block-text">
                            The studio is a controlled environment for uncontrolled inspiration. 
                            It is where we bring together high-end lighting systems and architectural 
                            discipline to create portraits that feel like sculptures made of light.
                        </p>
                    </div>

                </main>
            </div>

            {/* DECORATIVE HUD LINE */}
            <div className="story-bottom-hud">
                <div className="hud-line"></div>
                <div className="hud-data">CONTINUE // SCANNING // SYSTEM.LOAD</div>
            </div>
        </section>
    );
};

export default PhotographyMasterStory;
