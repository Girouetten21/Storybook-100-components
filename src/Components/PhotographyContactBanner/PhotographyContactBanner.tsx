import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets
import bannerImg from '../../assets/img/photography/menu_silhouette.png';

import './PhotographyContactBanner.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyContactBanner: React.FC = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!bannerRef.current) return;

        // 🎞️ 1. REVEAL NARRATIVO (Focus-Pull)
        gsap.fromTo('.banner-bg img', 
            { scale: 1.15, filter: 'blur(20px) grayscale(1)' },
            { 
                scale: 1, 
                filter: 'blur(0px) grayscale(0)',
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: true
                }
            }
        );

        // 🔄 2. INFINITE HUD MARQUEES (Sincronización de Direcciones)
        const topSpans = bannerRef.current.querySelectorAll('.hud-track-top span');
        const bottomSpans = bannerRef.current.querySelectorAll('.hud-track-bottom span');

        // Arriba: HACIA LA IZQUIERDA ⬅️
        gsap.to(topSpans, {
            xPercent: -100,
            duration: 40,
            repeat: -1,
            ease: "none",
        });

        // Abajo: HACIA LA DERECHA ➡️
        gsap.fromTo(bottomSpans, 
            { xPercent: -100 }, 
            {
                xPercent: 0,
                duration: 50,
                repeat: -1,
                ease: "none",
            }
        );

        // 🖱️ 3. MAGNETIC CALL TO ACTION
        const cta = bannerRef.current.querySelector('.banner-cta-wrap');
        const handleTouch = (e: MouseEvent) => {
            if (!cta) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = cta.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * 0.3;
            const y = (clientY - (top + height / 2)) * 0.3;
            gsap.to(cta, { x, y, duration: 0.8, ease: "power3.out" });
        };

        const resetTouch = () => {
            gsap.to(cta, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
        };

        bannerRef.current.addEventListener('mousemove', handleTouch);
        bannerRef.current.addEventListener('mouseleave', resetTouch);

        return () => {
            bannerRef.current?.removeEventListener('mousemove', handleTouch);
            bannerRef.current?.removeEventListener('mouseleave', resetTouch);
        };
    }, { scope: bannerRef });

    return (
        <section className="photography-contact-banner" ref={bannerRef}>
            
            {/* 🔳 HUD FRAME OVERLAYS (Infinite Marquee) */}
            <div className="banner-hud hud-top">
                <div className="hud-track-top">
                    <span>FRAME // 048 // TRI-X 400 // KODAK // 35MM // SAFETY FILM // </span>
                    <span>FRAME // 048 // TRI-X 400 // KODAK // 35MM // SAFETY FILM // </span>
                    <span>FRAME // 048 // TRI-X 400 // KODAK // 35MM // SAFETY FILM // </span>
                </div>
            </div>

            <div className="banner-bg">
                <img src={bannerImg} alt="Contact Shoot" />
                <div className="banner-overlay"></div>
            </div>

            <div className="banner-content">
                <div className="content-inner">
                    <div className="meta-label">CONTACT SHEET // VOL. 01</div>
                    <h2 className="banner-title">READY TO <span>CAPTURE</span> YOUR STORY?</h2>
                    
                    <div className="banner-cta-wrap">
                        <button className="banner-cta">
                            <span className="cta-text">START PROJECT //</span>
                            <div className="cta-flash"></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="banner-hud hud-bottom">
                <div className="hud-track-bottom">
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG SOUL // EXPOSURE +0.5 // </span>
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG SOUL // EXPOSURE +0.5 // </span>
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG SOUL // EXPOSURE +0.5 // </span>
                </div>
            </div>

        </section>
    );
};

export default PhotographyContactBanner;
