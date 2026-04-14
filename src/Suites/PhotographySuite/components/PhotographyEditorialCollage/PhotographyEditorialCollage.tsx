import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets locales corregidos
import img1 from '../../img/arch.png';
import img2 from '../../img/fashion.png';
import img3 from '../../img/mosaic_optics.png';
import img4 from '../../img/lens.png';

import './PhotographyEditorialCollage.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyEditorialCollage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 🎞️ EFECTO DE REVELADO Y PARALAJE
        const items = containerRef.current.querySelectorAll('.collage-item');
        
        items.forEach((item: any, i: number) => {
            const speed = 1 + (i * 0.15);
            
            // Animación de entrada
            gsap.fromTo(item, 
                { opacity: 0, y: 100 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Parallax individual (más sutil)
            gsap.to(item, {
                y: -100 * speed,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

    }, { scope: containerRef });

    const collection = [
        { img: img1, pos: "pos-1", meta: "F/8.0 // 1/250s // ISO 100", title: "ARCHITECTURAL SILENCE" },
        { img: img2, pos: "pos-2", meta: "F/1.4 // 1/15s // ISO 1600", title: "GRAIN & SOUL" },
        { img: img3, pos: "pos-3", meta: "F/2.8 // 1/1000s // ISO 400", title: "OPTICAL REFRACTION" },
        { img: img4, pos: "pos-4", meta: "F/11 // 30s // ISO 50", title: "NOCTURNAL FLOW" },
    ];

    return (
        <section className="editorial-collage" ref={containerRef}>
            <div className="collage-header">
                <span className="eyebrow">// CURATED EXHIBITION</span>
                <h2 className="title">THE <span>COLLECTED</span> WORKS</h2>
            </div>

            <div className="collage-grid">
                {collection.map((item, i) => (
                    <div key={i} className={`collage-item ${item.pos}`}>
                        <div className="item-inner">
                            <div className="image-wrap">
                                <img src={item.img} alt={item.title} />
                                <div className="reveal-overlay"></div>
                            </div>
                            <div className="item-card">
                                <span className="item-meta">{item.meta}</span>
                                <h4 className="item-title">{item.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DECORATIVE HUD ELEMENTS */}
            <div className="collage-hud">
                <div className="hud-line"></div>
                <div className="hud-data">EXHIBITION // GALLERY // 10.4</div>
            </div>
        </section>
    );
};

export default PhotographyEditorialCollage;
