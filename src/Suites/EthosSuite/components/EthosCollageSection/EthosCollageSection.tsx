import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './EthosCollageSection.scss';

// Curated Minimalist Assets
import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';
import img4 from '../../img/generated_4.png';
import img5 from '../../img/generated_5.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLLAGE_ITEMS = [
    { 
        src: img1, label: "01 // FORM", x: "10%", y: "12%", speed: 0.6,
        title: "ARCHITECTURAL ESSENCE",
        desc: "A study of brutalist geometry and the silent weight of concrete structures in morning light.",
        specs: { Origin: "Berlin, DE", Material: "Poured Concrete", Year: "2024" }
    },
    { 
        src: img2, label: "02 // TEXTURE", x: "78%", y: "8%", speed: 1.1,
        title: "KINETIC TEXTURES",
        desc: "The hyper-tactile surface of raw ivory silk, capturing the interplay between shadow and sheen.",
        specs: { Origin: "Lyon, FR", Material: "Raw Silk", Year: "2025" }
    },
    { 
        src: img3, label: "03 // PRECISION", x: "82%", y: "68%", speed: 0.7,
        title: "MECHANICAL CHRONO",
        desc: "Precision engineering revealed through the complex skeletal movement of a high-end chronometer.",
        specs: { Origin: "Geneva, CH", Material: "Brushed Steel", Year: "2026" }
    },
    { 
        src: img4, label: "04 // ORGANIC", x: "18%", y: "75%", speed: 1.4,
        title: "CERAMIC SILENCE",
        desc: "Organic forms born from hand-molded clay, celebrating the subtle imperfections of manual labor.",
        specs: { Origin: "Kyoto, JP", Material: "Matte Ceramic", Year: "2023" }
    },
    { 
        src: img5, label: "05 // NATURE", x: "32%", y: "85%", speed: 0.9,
        title: "BOTANICAL DETAIL",
        desc: "A macro perspective of biological architecture, focusing on the structural veins of the Monstera Deliciosa.",
        specs: { Origin: "Global", Material: "Botanical Specimen", Year: "Nature" }
    },
];

export const EthosCollageSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<number | null>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const items = gsap.utils.toArray('.collage-item');

        items.forEach((item: any, i: number) => {
            const speed = COLLAGE_ITEMS[i].speed;
            
            // 🌀 FLOATING PARALLAX
            gsap.to(item, {
                y: -150 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // ✨ ENTRANCE FADE & SCALE
            gsap.fromTo(item,
                { autoAlpha: 0, scale: 0.8 },
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 📝 BG TEXT PARALLAX
        gsap.to('.bg-text-layer', {
            x: -200,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: sectionRef });

    // GSAP Modal Transitions (IN)
    useGSAP(() => {
        if (selected !== null) {
            gsap.fromTo('.collage-modal-overlay', 
                { autoAlpha: 0 }, 
                { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
            );
            gsap.fromTo('.modal-content', 
                { y: 50, autoAlpha: 0, scale: 0.9 }, 
                { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, delay: 0.1, ease: "expo.out" }
            );
        }
    }, { dependencies: [selected], scope: sectionRef });

    // Handle Smooth Close
    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => setSelected(null)
        });

        tl.to('.modal-content', {
            y: 30,
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.4,
            ease: "power2.in"
        });
        tl.to('.collage-modal-overlay', {
            autoAlpha: 0,
            duration: 0.3
        }, "-=0.2");
    };

    return (
        <section className="collage-wrapper" ref={sectionRef}>
            
            <div className="collage-grid">
                
                {/* 📝 AREA 1: INTRO SECTION */}
                <div className="grid-item item-intro">
                    <div className="intro-inner">
                        <span className="collage-tag">CURATED // 2026</span>
                        <h2 className="main-title">MINIMALIST</h2>
                        <h3 className="sub-title">SYNERGY</h3>
                        <p className="description">
                            A curated selection of tactile experiences and architectural silence. 
                            Click an element to explore its narrative essence.
                        </p>
                    </div>
                </div>

                {/* 🖼️ THE DYNAMIC COLLAGE ITEMS */}
                {COLLAGE_ITEMS.map((item, index) => (
                    <div 
                        key={index} 
                        className={`collage-item grid-item-${index + 1}`}
                        onClick={() => setSelected(index)}
                    >
                        <div className="item-inner">
                            <img src={item.src} alt={item.label} />
                            <div className="item-label">{item.label}</div>
                            <div className="click-hint">EXPLORE DETAILS +</div>
                        </div>
                    </div>
                ))}

            </div>

            {/* 🖥️ THE MODAL LIGHTBOX */}
            {selected !== null && (
                <div className="collage-modal-overlay" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleClose}>CLOSE [X]</button>
                        
                        <div className="modal-layout">
                            <div className="modal-image-box">
                                <img src={COLLAGE_ITEMS[selected].src} alt={COLLAGE_ITEMS[selected].label} />
                            </div>
                            
                            <div className="modal-info-box">
                                <span className="m-tag">{COLLAGE_ITEMS[selected].label}</span>
                                <h2 className="m-title">{COLLAGE_ITEMS[selected].title}</h2>
                                <p className="m-desc">{COLLAGE_ITEMS[selected].desc}</p>
                                
                                <div className="m-specs">
                                    {Object.entries(COLLAGE_ITEMS[selected].specs).map(([key, value]) => (
                                        <div key={key} className="spec-row">
                                            <span className="s-key">{key}</span>
                                            <span className="s-val">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="modal-cta" onClick={handleClose}>BACK TO COLLECTION</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interactive Background Architectural Lines */}
            <div className="collage-bg-lines">
                <div className="line-v v-1"></div>
                <div className="line-v v-2"></div>
                <div className="line-h h-1"></div>
            </div>

        </section>
    );
};

export default EthosCollageSection;
