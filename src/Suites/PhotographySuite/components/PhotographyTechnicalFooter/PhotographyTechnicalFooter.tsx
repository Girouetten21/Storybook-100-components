import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './PhotographyTechnicalFooter.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyTechnicalFooter: React.FC = () => {
    const footerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!footerRef.current) return;

        // 🎞️ EFECTO DE REVELADO PARALAX
        gsap.from('.footer-big-title span', {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
            }
        });

        // Animación sutil de los links
        gsap.from('.footer-column', {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".footer-links-grid",
                start: "top 95%",
            }
        });

    }, { scope: footerRef });

    return (
        <footer className="photography-footer" ref={footerRef}>
            <div className="footer-gradient-top"></div>

            <div className="footer-container">

                {/* 🎭 MASSIVE TITLE EXHIBITION */}
                <div className="footer-main-exhibit">
                    <h2 className="footer-big-title">
                        <span>THE ART OF</span> <span>LIGHT</span>
                    </h2>
                </div>

                {/* 🧱 TECHNICAL LINKS GRID */}
                <div className="footer-links-grid">
                    <div className="footer-column">
                        <span className="col-label">// NAVIGATION</span>
                        <ul className="footer-nav">
                            <li><a href="#exhibition">The Exhibition</a></li>
                            <li><a href="#archives">Film Archives</a></li>
                            <li><a href="#services">Boutique Services</a></li>
                            <li><a href="#approach">Technical Approach</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <span className="col-label">// CONNECTION</span>
                        <ul className="footer-nav">
                            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                            <li><a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a></li>
                            <li><a href="https://vimeo.com" target="_blank" rel="noreferrer">Vimeo</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">X / Twitter</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <span className="col-label">// STUDIO OFFICE</span>
                        <div className="studio-info">
                            <p>Fake Street 123</p>
                            <p>T: +00 1234 5678</p>
                            <a className="studio-email">Email Address</a>
                        </div>
                    </div>
                </div>

                {/* 📟 FINAL TECHNICAL RIBBON */}
                <div className="footer-bottom-ribbon">
                    <div className="ribbon-meta">
                        <span className="meta-item">EST. MMXXIV</span>
                        <span className="meta-item">FOCAL // 35MM FIXED</span>
                        <span className="meta-item">COLOR // D65 WHITE POINT</span>
                    </div>
                    <div className="ribbon-brand">
                        <span className="brand-copy">© 2024 OPTICAL NARRATIVE // ALL RIGHTS RESERVED</span>
                    </div>
                    <div className="ribbon-time">
                        <span className="time-val">UTC +01:00</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default PhotographyTechnicalFooter;
