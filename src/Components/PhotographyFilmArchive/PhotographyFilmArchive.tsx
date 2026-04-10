import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets locales
import img1 from '../../assets/img/photography/arch.png';
import img2 from '../../assets/img/photography/fashion.png';
import img3 from '../../assets/img/photography/mosaic_optics.png';
import img4 from '../../assets/img/photography/lens.png';
import img5 from '../../assets/img/photography/hero_main.png';
import img6 from '../../assets/img/photography/lens_act1.png';

import './PhotographyFilmArchive.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyFilmArchive: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !scrollContainerRef.current) return;

        // 1. Aumentamos el pinDistance para dar ese respiro final (+1000px extra de buffer)
        const pinDistance = scrollContainerRef.current.offsetWidth - window.innerWidth + 1000;

        // 🎞️ PINNED HORIZONTAL SCROLL
        gsap.to(scrollContainerRef.current, {
            x: () => -(scrollContainerRef.current!.offsetWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${pinDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 🔍 LOUPE EFFECT
        const items = sectionRef.current.querySelectorAll('.film-frame');
        items.forEach((item: any) => {
            const img = item.querySelector('img');
            gsap.fromTo(img, 
                { scale: 1.15, filter: 'grayscale(1) contrast(1.2)' },
                { 
                    scale: 1, 
                    filter: 'grayscale(0) contrast(1)', 
                    scrollTrigger: {
                        trigger: item,
                        start: "left center",
                        end: "right center",
                        scrub: true,
                        // Fix: containerAnimation should be linked if needed, 
                        // but since we are in a pinned section, standard triggers on items work 
                        // if we calculate correctly or use the proxy.
                    }
                }
            );
        });

    }, { scope: sectionRef });

    const collection = [
        { img: img1, code: "KDK_400_01", title: "ARCHITECTURAL" },
        { img: img2, code: "KDK_400_02", title: "EDITORIAL" },
        { img: img3, code: "KDK_400_03", title: "MACRO" },
        { img: img4, code: "KDK_400_04", title: "NOCTURNAL" },
        { img: img5, code: "KDK_400_05", title: "MASTER" },
        { img: img6, code: "KDK_400_06", title: "SENSORY" },
    ];

    return (
        <section className="film-archive-section" ref={sectionRef}>
            
            <div className="archive-intro">
                <span className="eyebrow">// PROJECT ARCHIVE</span>
                <h2 className="title">CHRONICLE OF <span>LIGHT</span></h2>
            </div>

            <div className="film-strip-wrapper">
                <div className="film-strip" ref={scrollContainerRef}>
                    
                    {collection.map((item, i) => (
                        <div key={i} className="film-frame">
                            <div className="frame-edge top">
                                <span className="iso">ISO 400</span>
                                <div className="sprocket-strip"></div> {/* 🟢 Optimizado: Un solo div con patrón CSS */}
                            </div>
                            
                            <div className="frame-content">
                                <div className="image-container">
                                    <img src={item.img} alt={item.title} />
                                    <div className="focus-loupe"></div>
                                </div>
                                <div className="frame-label">
                                    <span className="frame-code">{item.code}</span>
                                    <h4 className="frame-title">{item.title}</h4>
                                </div>
                            </div>

                            <div className="frame-edge bottom">
                                <span className="safety">SAFETY FILM // 35MM</span>
                                <div className="sprocket-strip"></div> {/* 🟢 Optimizado: Un solo div con patrón CSS */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* PROGRESS HUD */}
            <div className="archive-hud">
                <div className="hud-metric">SCANNING // READY</div>
                <div className="hud-metric">BUFFER // 100%</div>
            </div>

        </section>
    );
};

export default PhotographyFilmArchive;
