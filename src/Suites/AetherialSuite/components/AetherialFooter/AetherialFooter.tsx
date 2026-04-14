import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetherialFooter.scss';

export const AetherialFooter: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Staggered reveal of sections
        gsap.fromTo('.footer-reveal',
            { autoAlpha: 0, y: 50 },
            { 
                autoAlpha: 1, y: 0, 
                duration: 1.5, 
                stagger: 0.15, 
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%'
                }
            }
        );

        // 2. Continuous rotating background orbit
        gsap.to(orbitRef.current, {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: 'none'
        });

    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="aetherial-footer">
            
            {/* THE CELESTIAL ORBIT (BG) */}
            <div ref={orbitRef} className="footer-orbit-bg">
                <div className="orbit-ring ring-1"></div>
                <div className="orbit-ring ring-2"></div>
                <div className="orbit-axis axis-x"></div>
                <div className="orbit-axis axis-y"></div>
            </div>

            <div className="footer-main-grid">
                
                {/* 1. NEWSLETTER / ENTRY */}
                <div className="footer-section entry-module footer-reveal">
                    <span className="module-tag">Newsletter</span>
                    <h3 className="module-title">Join the <i>Collective</i></h3>
                    <div className="entry-field">
                        <input type="email" placeholder="Email Address" />
                        <button className="entry-submit">Subscribe</button>
                        <div className="entry-line"></div>
                    </div>
                    <p className="entry-note">Recieve our seasonal architectural manifestos.</p>
                </div>

                {/* 2. NAVIGATION LINKS */}
                <div className="footer-section links-module footer-reveal">
                    <span className="module-tag">Navigation</span>
                    <ul className="nav-links">
                        <li><a href="#hero">Genesis</a></li>
                        <li><a href="#matrix">Manifesto</a></li>
                        <li><a href="#details">The Detail</a></li>
                        <li><a href="#journey">Journey</a></li>
                    </ul>
                </div>

                {/* 3. SOCIALS / CONTACT */}
                <div className="footer-section contact-module footer-reveal">
                    <span className="module-tag">Connect</span>
                    <div className="contact-links">
                        <a href="#" className="social-node">Instagram ↗</a>
                        <a href="#" className="social-node">LinkedIn ↗</a>
                        <a href="#" className="social-node">Behance ↗</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom footer-reveal">
                <div className="footer-logo">
                    <h2>Aetherial<span>.</span></h2>
                </div>
                
                <div className="footer-metadata">
                    <div className="meta-box">
                        <span className="meta-label">Coordinates</span>
                        <span className="meta-val">48.8566° N, 2.3522° E</span>
                    </div>
                    <div className="meta-box">
                        <span className="meta-label">Revision</span>
                        <span className="meta-val">A.09-2026</span>
                    </div>
                </div>

                <div className="footer-copyright">
                    © 2026 LUMINA. ALL RIGHTS RESERVED.
                </div>
            </div>

            <div className="footer-gradient-bottom"></div>
        </footer>
    );
};

export default AetherialFooter;
