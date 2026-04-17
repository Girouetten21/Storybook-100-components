import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BlossomFooter.scss';

gsap.registerPlugin(ScrollTrigger);

const SVGFlower = () => (
    <svg className="footer-svg-flower" viewBox="0 0 100 100" fill="none">
        {[...Array(12)].map((_, i) => (
            <path
                key={i}
                d="M50 50 Q70 10 50 0 Q30 10 50 50"
                stroke="currentColor"
                strokeWidth="0.5"
                transform={`rotate(${i * 30} 50 50)`}
                opacity={0.3}
            />
        ))}
        <circle cx="50" cy="50" r="2" fill="currentColor" opacity={0.5} />
    </svg>
);

export const BlossomFooter: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const flowerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.footer-section-reveal', {
            y: 50,
            autoAlpha: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            }
        });

        // Slow cinematic rotation for the botanical watermark
        gsap.to('.footer-svg-flower', {
            rotate: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });

        gsap.from('.footer-giant-outline', {
            x: -80,
            autoAlpha: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
            }
        });
    }, { scope: containerRef });

    return (
        <footer ref={containerRef} className="blossom-footer">
            <div className="footer-grain-overlay"></div>
            
            {/* Minimalist Watermark SVG */}
            <div ref={flowerRef} className="footer-bg-flower-wrap">
                <SVGFlower />
            </div>

            <div className="footer-main-container">
                <div className="footer-branding footer-section-reveal">
                    <svg className="footer-brand-svg" viewBox="0 0 1000 250">
                        <text 
                            x="0" 
                            y="180" 
                            className="footer-giant-svg-text"
                        >
                            BLOSSOM
                        </text>
                    </svg>
                </div>

                <div className="footer-grid">
                    <div className="footer-col footer-section-reveal">
                        <span className="col-label">EXPLORE</span>
                        <ul className="footer-links">
                            <li><a href="#">THE GARDEN</a></li>
                            <li><a href="#">OUR PHILOSOPHY</a></li>
                            <li><a href="#">BOTANICAL JOURNAL</a></li>
                            <li><a href="#">EXHIBITIONS</a></li>
                        </ul>
                    </div>

                    <div className="footer-col footer-section-reveal">
                        <span className="col-label">CONNECT</span>
                        <ul className="footer-links">
                            <li><a href="#">INSTAGRAM</a></li>
                            <li><a href="#">PINTEREST</a></li>
                            <li><a href="#">BEHANCE</a></li>
                        </ul>
                    </div>

                    <div className="footer-col footer-section-reveal">
                        <span className="col-label">OFFICES</span>
                        <ul className="footer-links">
                            <li>MADRID / TOKYO</li>
                            <li>PARIS / LONDON</li>
                        </ul>
                    </div>

                    <div className="footer-col footer-section-reveal contact-col">
                        <span className="col-label">INQUIRIES</span>
                        <div className="footer-newsletter">
                            <p>JOIN THE BLOSSOM ATELIER FOR EXCLUSIVE SELECTIONS.</p>
                            <div className="footer-input-wrap">
                                <input type="email" placeholder="YOUR EMAIL" />
                                <button className="footer-submit">SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-row footer-section-reveal">
                    <div className="copyright">
                        © 2026 BLOSSOM SUITE / HARMONY THROUGH NATURE
                    </div>
                    <div className="footer-utility">
                        <a href="#">PRIVACY POLICY</a>
                        <a href="#">TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BlossomFooter;
