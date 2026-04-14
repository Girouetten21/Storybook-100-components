import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets locales
import img1 from '../../img/hero_main.png';
import img2 from '../../img/lens_act1.png';
import img3 from '../../img/lens_act2.png';
import img4 from '../../img/lens_act3.png';

import './PhotographyPerspectiveGrid.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PerspectiveGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const grid = gridRef.current;
        if (!grid) return;

        // 🎞️ 1. REVELADO ÓPTICO (Se vuelven nítidas al llegar y SE QUEDAN nítidas)
        const images = grid.querySelectorAll('.perspective-card img');
        
        gsap.fromTo(images, 
            { filter: 'blur(15px)', opacity: 0, scale: 1.1 },
            { 
                filter: 'blur(0px)', // NITIDEZ TOTAL
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // 🖱️ 2. INTERACCIÓN DE MOVIMIENTO (Solo Tilt, fotos siempre claras)
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = grid.getBoundingClientRect();
            
            // Tilt sutil para profundidad
            const xVal = (clientX - (left + width / 2)) / 70;
            const yVal = (clientY - (top + height / 2)) / 70;

            gsap.to(grid, {
                rotationY: xVal,
                rotationX: -yVal,
                duration: 1.2,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(grid, { rotationX: 0, rotationY: 0, duration: 1.5, ease: "power2.out" });
        };

        grid.addEventListener('mousemove', handleMouseMove);
        grid.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            grid.removeEventListener('mousemove', handleMouseMove);
            grid.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: containerRef });

    const gridItems = [
        { img: img1, label: "0.85m // NEAR", title: "OPTICAL PRECISION" },
        { img: img2, label: "1.50m // MID", title: "NARRATIVE FOCUS" },
        { img: img3, label: "3.20m // FAR", title: "ATMOSPHERIC DEPTH" },
        { img: img4, label: "∞ // INF", title: "ETERNAL VISION" },
    ];

    return (
        <section className="perspective-section" ref={containerRef}>
            <div className="perspective-header">
                <span className="eyebrow">// DEPTH FIELD EXPLORATION</span>
                <h2 className="title">BEYOND THE <span>FOCUS</span> PLANE</h2>
            </div>

            <div className="perspective-grid-wrapper">
                <div className="perspective-grid" ref={gridRef}>
                    {gridItems.map((item, i) => (
                        <div key={i} className="perspective-card">
                            <div className="card-inner">
                                <div className="card-image">
                                    <img src={item.img} alt={item.title} />
                                    <div className="card-overlay"></div>
                                </div>
                                <div className="card-info">
                                    <span className="dist-tag">{item.label}</span>
                                    <h4 className="card-title">{item.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HUD BAJADO Y SEPARADO */}
            <div className="perspective-hud">
                <div className="hud-metric">AF-POINT // ACTIVE</div>
                <div className="hud-metric">SENSOR // FULL FRAME</div>
            </div>
        </section>
    );
};

export default PerspectiveGrid;
