import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AetherialJourneyScroll.scss';

// Import high-end images
import bg1 from '../../img/generated_3.png';
import bg2 from '../../img/generated_4.png';
import bg3 from '../../img/generated_5.png';
import bg4 from '../../img/generated_6.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const JOURNEY_DATA = [
    {
        title: "The Origin",
        subtitle: "SCENE 01 / ARCHIVE",
        desc: "Everything begins with a single line of thought, a spark of architectural intuition that defines the space between void and matter.",
        img: bg1
    },
    {
        title: "Optical Flow",
        subtitle: "SCENE 02 / PRECISION",
        desc: "Observing the way light behaves when hitting raw surfaces. It is no longer just a building; it is a live instrument of shadow.",
        img: bg2
    },
    {
        title: "Void & Soul",
        subtitle: "SCENE 03 / ESSENCE",
        desc: "In the silence between the walls, we find the true purpose of design. It is meant to be felt before it is seen.",
        img: bg3
    },
    {
        title: "The Horizon",
        subtitle: "SCENE 04 / FINAL",
        desc: "Tracing the boundaries of the digital frontier. A continuous expansion of aesthetic boundaries and technical mastery.",
        img: bg4
    }
];

export const AetherialJourneyScroll: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Official useGSAP hook + scoping
    useGSAP(() => {
        const horizontalSection = sectionRef.current;
        if (!horizontalSection) return;

        const slides = gsap.utils.toArray('.journey-slide');
        const totalWidth = horizontalSection.scrollWidth;
        const scrollWidth = totalWidth - window.innerWidth;

        // 1. THE MAIN HORIZONTAL DRIVE
        const horizAnim = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1.2,
                start: "top top",
                end: () => `+=${scrollWidth + window.innerHeight}`, // Extended scroll length
                invalidateOnRefresh: true,
                anticipatePin: 1,
                refreshPriority: 1 // CALCULATE AFTER DETAILSCROLL
            }
        });

        horizAnim
            .to({}, { duration: 0.2 }) // Start delay buffer
            .to(horizontalSection, {
                x: -scrollWidth,
                duration: 1,
                ease: "none"
            })
            .to({}, { duration: 0.2 }); // End delay buffer before unpinning

        // 2. INDIVIDUAL GEOMETRIC TRIGGERS (Parallax Only)
        slides.forEach((slide: any) => {
            const img = slide.querySelector('.slide-img');
            
            // Image Parallax (Still scoped to center-cross)
            gsap.fromTo(img, 
                { x: -50 }, 
                { x: 50, ease: "none",
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: horizAnim,
                        scrub: true,
                        start: "left right",
                        end: "right left"
                    }
                }
            );
        });

    }, { scope: triggerRef }); // AUTO CLEANUP & SCOPING

    return (
        <div ref={triggerRef} className="lumina-journey-wrapper">
            <div ref={sectionRef} className="lumina-journey-container">
                {JOURNEY_DATA.map((item, index) => (
                    <section key={index} className="journey-slide">

                        {/* THE CINEMATIC IMAGE LAYER */}
                        <div className="slide-content-split">
                            <div className="slide-img-box">
                                <div
                                    className="slide-img"
                                    style={{ backgroundImage: `url(${item.img})` }}
                                ></div>
                                <div className="slide-img-overlay"></div>
                            </div>

                            <div className="slide-text-box">
                                <span className="slide-subtitle">{item.subtitle}</span>
                                <h2 className="slide-title">{item.title}</h2>
                                <p className="slide-desc">{item.desc}</p>
                                <div className="slide-number">0{index + 1}</div>
                            </div>
                        </div>

                    </section>
                ))}
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="journey-progress-bar">
                <div className="bar-fill"></div>
            </div>
        </div>
    );
};

export default AetherialJourneyScroll;
