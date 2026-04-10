import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets
import manifestoImg from '../../assets/img/photography/hero_main.png';

import './PhotographyTechnicalManifesto.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyTechnicalManifesto: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo('.manifesto-image-wrap', 
            { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
            { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: "expo.out" }
        )
        .fromTo('.manifesto-col',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=0.8"
        );

        // Parallax suave en la imagen al scroll
        gsap.to('.manifesto-image-wrap img', {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    const manifestoData = [
        {
            id: "01",
            title: "THE OBSERVER",
            text: "Photography is the art of observation. It has little to do with the things you see and everything to do with the way you see them. We wait for the light to speak."
        },
        {
            id: "02",
            title: "THE OPTICS",
            text: "Refraction defines the soul of the frame. We utilize high-dispersion radioactive glass and hand-ground elements to ensure that every photon is captured with pure integrity."
        },
        {
            id: "03",
            title: "THE MOMENT",
            text: "A shutter click is a mechanical heartbeat. Between the sound of the mirror and the silence of the capture, we find the essence of a narrative that will never repeat."
        },
        {
            id: "04",
            title: "THE ARCHIVE",
            text: "Memory is a chemical process. Whether in silver halides or silicon sensors, our mission is to build a timeless archive of stories that transcend the digital noise."
        }
    ];

    return (
        <section className="photography-manifesto" ref={containerRef}>
            <div className="manifesto-inner">
                
                {/* 🖼️ LARGE IMAGE HERO */}
                <div className="manifesto-image-wrap">
                    <img src={manifestoImg} alt="Technical Mastery" />
                    <div className="image-hud-overlay">
                        <div className="hud-label">CALIBRATED // OPTICAL SYSTEM</div>
                        <div className="hud-label">VER // 2026.4</div>
                    </div>
                </div>

                {/* 📝 INFO GRID: 4 MINI COLUMNS */}
                <div className="manifesto-grid">
                    {manifestoData.map((col, i) => (
                        <div key={i} className="manifesto-col">
                            <div className="col-header">
                                <span className="col-id">{col.id}</span>
                                <h3 className="col-title">{col.title}</h3>
                            </div>
                            <div className="col-body">
                                <p>{col.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* DECORATIVE FOOTER LINE */}
            <div className="manifesto-footer">
                <div className="footer-line"></div>
                <div className="footer-meta">TECHNICAL // ART // MANIFESTO</div>
            </div>
        </section>
    );
};

export default PhotographyTechnicalManifesto;
