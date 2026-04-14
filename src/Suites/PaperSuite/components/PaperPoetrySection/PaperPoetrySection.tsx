import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './PaperPoetrySection.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const POETRY_DATA = [
    {
        word: "S I L E N C I O",
        content: "El viento susurra lo que el alma no se atreve a decir.",
        bg: "rgba(245, 245, 240, 1)" // Paper Bone
    },
    {
        word: "T I N T A",
        content: "Donde la sangre se vuelve verso y el papel se vuelve piel.",
        bg: "rgba(235, 235, 230, 1)" // Aged Paper
    },
    {
        word: "E T E R N I D A D",
        content: "Un suspiro que se queda atrapado entre líneas infinitas.",
        bg: "rgba(225, 225, 220, 1)" // Greyish Paper
    },
    {
        word: "R E V E L A C I Ó N",
        content: "Al final del camino, solo quedan las palabras que no escribimos.",
        bg: "rgba(245, 245, 240, 1)" // Reset
    }
];

export const PaperPoetrySection: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Official useGSAP hook + scoping
    useGSAP(() => {
        const stanzas = gsap.utils.toArray('.poetry-stanza');
        
        stanzas.forEach((stanza: any) => {
            const word = stanza.querySelector('.poetry-word');
            const text = stanza.querySelector('.poetry-text');
            const line = stanza.querySelector('.poetry-connector');
            const frame = stanza.querySelector('.poetry-frame');

            // 1. INK BLOOM REVEAL (Stabilized & Centered Geometry)
            gsap.fromTo(word, 
                { 
                    autoAlpha: 0, 
                    filter: "blur(30px)", 
                    letterSpacing: "2.5em",
                    paddingLeft: "2.5em", // Sync with initial spacing
                    y: 80 
                },
                { 
                    autoAlpha: 1, 
                    filter: "blur(0px)", 
                    letterSpacing: "0.1em", // Maximum tightening for luxe feel
                    paddingLeft: "0.1em",  // Match for centering
                    y: 0,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stanza,
                        start: "top 95%",
                        end: "top 45%",
                        scrub: 2,
                    }
                }
            );

            // 2. SOFT TEXT FADE
            gsap.fromTo(text,
                { autoAlpha: 0, scale: 0.95, y: 30 },
                { 
                    autoAlpha: 1, scale: 1, y: 0,
                    scrollTrigger: {
                        trigger: stanza,
                        start: "top 60%",
                        end: "top 30%",
                        scrub: 1,
                    }
                }
            );

            // 3. ELASTIC CONNECTOR
            gsap.fromTo(line,
                { scaleY: 0 },
                { 
                    scaleY: 1,
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: stanza,
                        start: "top 90%",
                        end: "bottom 10%",
                        scrub: 2,
                    }
                }
            );

            // 4. ARCHITECTURAL FRAME ANIMATION
            gsap.fromTo(frame,
                { autoAlpha: 0, scale: 1.1 },
                { 
                    autoAlpha: 1, scale: 1,
                    scrollTrigger: {
                        trigger: stanza,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1.5,
                    }
                }
            );
        });

    }, { scope: mainRef }); // AUTO CLEANUP & SCOPING

    return (
        <div ref={mainRef} className="poetry-wrapper">
            
            {/* CINEMATIC GRAIN OVERLAY */}
            <div className="poetry-grain"></div>

            {POETRY_DATA.map((item, index) => (
                <section key={index} className="poetry-stanza" style={{ backgroundColor: item.bg }}>
                    
                    <div className="content-box">
                        <div className="poetry-frame"></div>
                        <span className="stanza-num">0{index + 1}</span>
                        <div className="poetry-word">{item.word}</div>
                        <p className="poetry-text">{item.content}</p>
                    </div>

                    {/* ARCHITECTURAL LAYERS */}
                    <div className="poetry-meta">L Y R I C // A R C H I V E</div>
                    <div className="poetry-margins">
                        <div className="line-left"></div>
                        <div className="line-right"></div>
                    </div>

                    {/* THE DELICATE LINE BETWEEN STANZAS */}
                    <div className="poetry-connector"></div>
                </section>
            ))}

        </div>
    );
};

export default PaperPoetrySection;
