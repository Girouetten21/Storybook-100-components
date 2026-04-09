import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Assets
import apertureHardwareImg from '../../assets/img/lens/aperture.png';
import act1Img from '../../assets/img/photography/lens_act1.png';
import act2Img from '../../assets/img/photography/lens_act2.png';
import act3Img from '../../assets/img/photography/lens_act3.png';

import './LensApertureExhibition.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LensApertureExhibitionProps {
    isUnlocked?: boolean;
}

const LensApertureExhibition: React.FC<LensApertureExhibitionProps> = ({ isUnlocked }) => {
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
            .fromTo('.lens-info-block',
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.5"
            )
            .fromTo('.lens-base',
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
            const x = (e.clientX - window.innerWidth / 2) / 30;
            const y = (e.clientY - window.innerHeight / 2) / 30;
            gsap.to('.lens-content-inner', { x, y, duration: 1, ease: "power2.out" });
        };
        window.addEventListener('mousemove', moveLens);

        return () => window.removeEventListener('mousemove', moveLens);
    }, { dependencies: [isUnlocked], scope: containerRef });

    return (
        <section className={`lens-exhibition ${!isUnlocked ? 'is-locked' : ''}`} ref={containerRef}>

            {/* 🎞️ UI DECOR */}
            <div className="lens-ui-top">
                <div className="ui-item">F/1.4 // ASPH</div>
                <div className="ui-item">AF-S // FOCUS LOCK</div>
            </div>

            <div className="lens-ui-bottom">
                <div className="ui-item">ISO 64</div>
                <div className="ui-item">EXPOSURE +0.3</div>
            </div>

            {/* 🧿 THE MASTER LENS */}
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

            <div className="lens-info-block">
                <span className="eyebrow">OPTICAL PRECISION</span>
                <h3 className="lens-headline">CAPTURE <span>THE</span> ESSENCE.</h3>
                <p>
                    Experience the pinnacle of optical engineering.
                    Our lenses are crafted with radioactive glass elements
                    to achieve a signature bokeh that breathes life into the silence.
                </p>
            </div>

        </section>
    );
};

export default LensApertureExhibition;
