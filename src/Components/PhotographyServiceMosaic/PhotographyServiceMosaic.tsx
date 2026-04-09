import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Assets
import mansionImg from '../../assets/img/services/mansion.png';
import portraitImg from '../../assets/img/services/portrait_bw.png';
import opticsImg from '../../assets/img/photography/mosaic_optics.png';

import './PhotographyServiceMosaic.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyServiceMosaic: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.mosaic-card');
        
        cards.forEach((card: any, i: number) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: true,
                },
                x: i % 2 === 0 ? -150 : 150,
                opacity: 0,
                scale: 0.9,
                rotateY: i % 2 === 0 ? 15 : -15,
                ease: "power2.out"
            });
        });

        const cardElements = gsap.utils.toArray('.mosaic-card');
        cardElements.forEach((card: any) => {
            const img = card.querySelector('img');
            const overlay = card.querySelector('.prism-overlay');
            
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (clientX - left - width / 2) * 0.15;
                const y = (clientY - top - height / 2) * 0.15;

                gsap.to(img, { x: x, y: y, scale: 1.15, duration: 0.6, ease: "power2.out" });
                gsap.to(overlay, { 
                    x: x * 1.5, 
                    y: y * 1.5, 
                    opacity: 0.4, 
                    duration: 0.6, 
                    ease: "power2.out" 
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(img, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.out" });
                gsap.to(overlay, { x: 0, y: 0, opacity: 0, duration: 1, ease: "power2.out" });
            });
        });

    }, { scope: mainRef });

    return (
        <section className="service-mosaic" ref={mainRef}>
            
            <div className="mosaic-watermark">BOUTIQUE // SERVICES</div>
            <div className="focus-crosshair top-left"></div>
            <div className="focus-crosshair top-right"></div>
            <div className="focus-crosshair bottom-left"></div>
            <div className="focus-crosshair bottom-right"></div>

            <div className="section-header">
                <span className="eyebrow">SERVICES // 02</span>
                <h2 className="section-title">CHASING <span>THE</span> LIGHT.</h2>
            </div>

            <div className="mosaic-grid">
                
                <div className="mosaic-card architectural large">
                    <div className="card-image-wrap">
                        <img src={mansionImg} alt="Architectural Storytelling" />
                        <div className="prism-overlay" />
                    </div>
                    <div className="card-content">
                        <span className="card-index">01</span>
                        <h3>ARCHITECTURAL<br/>NARRATIVE</h3>
                        <p>We capture the soul of spaces through a brutalist lens, emphasizing raw geometry and the interplay of shadow.</p>
                        <div className="card-cta">EXPLORE SUITE</div>
                    </div>
                </div>

                <div className="mosaic-card portrait medium">
                    <div className="card-image-wrap">
                        <img src={portraitImg} alt="Editorial Portraits" />
                        <div className="prism-overlay" />
                    </div>
                    <div className="card-content">
                        <span className="card-index">02</span>
                        <h3>EDITORIAL<br/>SOUL</h3>
                        <p>Grain, emotion, and the purity of monochrome. Capturing the untold stories between the frames.</p>
                        <div className="card-cta">VIEW GALLERY</div>
                    </div>
                </div>

                <div className="mosaic-card technical medium">
                    <div className="card-image-wrap">
                        <img src={opticsImg} alt="Optical Artistry" />
                        <div className="prism-overlay" />
                    </div>
                    <div className="card-content">
                        <span className="card-index">03</span>
                        <h3>OPTICAL<br/>ARTISTRY</h3>
                        <p>The science of focus. Using radioactive glass and prism refraction to bend reality into art.</p>
                        <div className="card-cta">THE LAB</div>
                    </div>
                </div>

                <div className="mosaic-label absolute-tl">PRISMATIC // FOCUS</div>
                <div className="mosaic-label absolute-br">ISO // SENSITIVITY</div>
            </div>
        </section>
    );
};

export default PhotographyServiceMosaic;
