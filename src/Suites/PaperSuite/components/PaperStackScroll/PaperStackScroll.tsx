import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './PaperStackScroll.scss';

import img1 from '../../img/generated_4.png';
import img2 from '../../img/generated_5.png';
import img3 from '../../img/generated_6.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EPISTLE_DATA = [
    { 
        id: 'I',
        date: 'October 14, 1892', 
        title: 'The First Discovery', 
        text: 'My dearest friend, I write to you under the faint glow of the gaslamp. The structural anomalies we uncovered in the lower catacombs defy all modern architectural logic. I fear we have unsealed a door that was locked for entirely valid reasons.',
        img: img1 
    },
    { 
        id: 'II',
        date: 'November 3rd, 1892', 
        title: 'Shadows in the Dust', 
        text: 'The photographs I developed this morning confirm my deepest anxieties. The silhouettes captured in the silver nitrate are not artifacts on the lens. The long shadows cast over the marble pillars are moving independent of the light source.',
        img: img2 
    },
    { 
        id: 'III',
        date: 'December 21, 1892', 
        title: 'The Final Entry', 
        text: 'If this letter reaches your desk, do not come looking for the expedition site. Burn the coordinates I sent you in August. The architecture down here... it thinks. It breathes. I am sealing the archive door behind me.',
        img: img3 
    },
];

export const PaperStackScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Alternating Axis Physical Page Drops
    useGSAP(() => {
        const pages = gsap.utils.toArray<HTMLElement>('.epistle-page');
        if (pages.length === 0) return;

        // 1. Initial Position Setup
        pages.forEach((page, i) => {
            if (i === 0) {
                // The first page sits quietly on the desk, slightly tilted organically
                gsap.set(page, { rotation: -1.5 });
            } else {
                // Alternating sweep logic: Odd numbers drop from BOTTOM, Evens from TOP
                const startY = i % 2 === 1 ? 120 : -120;
                // Exaggerated starting tilt so it 'slaps' down into place
                const startRot = i % 2 === 1 ? 8 : -8; 
                
                // Keep pages completely outside the screen via yPercent until needed
                gsap.set(page, { yPercent: startY, rotation: startRot, autoAlpha: 0 });
            }
        });

        // 2. Master Pinned Timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${pages.length * 100}%`,
                pin: pinRef.current,
                scrub: 1, // Fluid paper glide
                anticipatePin: 1
            }
        });

        // 3. Stacking Animation
        pages.forEach((page, i) => {
            if (i === 0) return;

            const prevPage = pages[i - 1];
            // Safe shadow overlay layer, avoiding GSAP 'filter' CSS bugs entirely
            const prevShadow = prevPage.querySelector('.shadow-overlay');
            
            // Final resting rotation (organic, imperfect stacking)
            const finalRot = i % 2 === 1 ? 2.5 : -1.5;

            masterTl
                // --- Step A: Push the old page down into the desk ---
                .to(prevPage, { 
                    scale: 0.90, // It physically moves away from the camera
                    duration: 1, 
                    ease: 'sine.inOut' 
                }, `drop${i}`)
                // Darken the old page natively using an opacity overlay (60FPS safe!)
                .to(prevShadow, { 
                    autoAlpha: 0.55, 
                    duration: 1, 
                    ease: 'sine.inOut' 
                }, `drop${i}`)

                // --- Step B: Sweep the new page into the center of the desk ---
                .to(page, { 
                    yPercent: 0, 
                    rotation: finalRot, 
                    autoAlpha: 1, 
                    duration: 1, 
                    ease: 'power3.out' // Swift sweep that slows down elegantly as it lands
                }, `drop${i}`);
        });

    }, { scope: wrapperRef });

    return (
        <section className="epistolary-wrapper" ref={wrapperRef}>
            <div className="desk-pin" ref={pinRef}>

                {/* Desk Ambience / Background Details */}
                <div className="desk-texture"></div>
                <div className="desk-metadata">ARCHIVE DOSSIER 01-A</div>

                {/* The Page Stack Environment */}
                <div className="page-arena">
                    {EPISTLE_DATA.map((item, index) => (
                        <div className="epistle-page" key={`page-${index}`} style={{ zIndex: index + 1 }}>
                            
                            {/* Darkness Overlay (Animated via GSAP to simulate shadows of pages above it) */}
                            <div className="shadow-overlay"></div>

                            {/* Page Content */}
                            <div className="page-inner">
                                <div className="page-header">
                                    <span className="doc-id">DOC: {item.id}</span>
                                    <span className="doc-date">{item.date}</span>
                                </div>

                                <div className="page-illustration">
                                    <img src={item.img} alt={item.title} />
                                    {/* Subtle photo corner mounts */}
                                    <div className="corner-mount tl"></div>
                                    <div className="corner-mount tr"></div>
                                    <div className="corner-mount bl"></div>
                                    <div className="corner-mount br"></div>
                                </div>

                                <div className="page-text-zone">
                                    <h2 className="title">{item.title}</h2>
                                    <p className="typewriter-text">{item.text}</p>
                                </div>
                                
                                <div className="signature-line">
                                    Director of Antiquities
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PaperStackScroll;
