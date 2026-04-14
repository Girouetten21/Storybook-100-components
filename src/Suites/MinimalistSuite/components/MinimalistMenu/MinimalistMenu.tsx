import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MinimalistMenu.scss';

import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';
import img4 from '../../img/generated_4.png';

const menuItems = [
    { title: 'Collections', subtitle: 'Fall / Winter 2026', image: img1 },
    { title: 'Editorials', subtitle: 'Archive Publications', image: img2 },
    { title: 'Maison', subtitle: 'Our Heritage', image: img3 },
    { title: 'Boutiques', subtitle: 'Global Flagships', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const MinimalistMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [activeImage, setActiveImage] = useState(menuItems[0].image);

    // POWERED BY GSAP-SKILLS: Scoped minimalist opening and editorial crossfade
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set('.minimalist-menu-overlay', { pointerEvents: 'auto' })
            .fromTo('.minimalist-menu-bg',
                { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
            )
            .fromTo('.editorial-image-wrapper',
                { autoAlpha: 0, scale: 0.95, filter: 'blur(10px)' },
                { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' },
                '-=0.6'
            )
            .fromTo('.menu-line-item',
                { y: 50, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=1'
            )
            .fromTo('.menu-footer-item',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo('.rotating-badge, .editorial-meta, .frame-corner',
                { autoAlpha: 0, scale: 0.9 },
                { autoAlpha: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: 'power2.out' },
                '-=0.2'
            );
    }, { scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.timeScale(1).play();
        } else {
            tlRef.current?.timeScale(1.7).reverse().then(() => setIsOpen(false));
            setTimeout(() => setActiveImage(menuItems[0].image), 1000); 
        }
    });

    const handleHover = contextSafe((image: string) => {
        if (activeImage === image) return;
        
        gsap.to('.editorial-image', {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                setActiveImage(image);
                gsap.to('.editorial-image', {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    });

    return (
        <div ref={containerRef} className="minimalist-menu-wrapper">
            <button className={`minimalist-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="toggle-text">{isOpen ? 'Close' : 'Menu'}</span>
                <div className="lines">
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div className={`minimalist-menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="minimalist-menu-bg"></div>
                
                <div className="minimalist-menu-content">
                    {/* Left: Interactive Navigation */}
                    <div className="nav-column">
                        <nav className="nav-links">
                            {menuItems.map((item, index) => (
                                <div className="menu-line-wrapper" key={index}>
                                    <a 
                                        href="#" 
                                        className="menu-line-item"
                                        onMouseEnter={() => handleHover(item.image)}
                                        onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                                    >
                                        <span className="nav-subtitle">{item.subtitle}</span>
                                        <span className="nav-title">{item.title}</span>
                                    </a>
                                </div>
                            ))}
                        </nav>

                        <div className="nav-footer">
                            <div className="menu-footer-item">
                                <span className="label">Inquiries</span>
                                <a href="mailto:studio@maison.com">studio@maison.com</a>
                            </div>
                            <div className="menu-footer-item">
                                <span className="label">Social</span>
                                <div className="social-links">
                                    <a href="#">Instagram</a>
                                    <a href="#">Pinterest</a>
                                    <a href="#">Twitter</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Editorial Gallery Display */}
                    <div className="image-column">
                        <div className="editorial-frame">
                            {/* Decorative framing corners */}
                            <div className="frame-corner top-left"></div>
                            <div className="frame-corner bottom-right"></div>
                            
                            {/* Refactored Seal Badge (Bottom Left) */}
                            <div className="rotating-badge">
                                <svg viewBox="0 0 100 100" width="120" height="120">
                                    <defs>
                                        <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                                    </defs>
                                    {/* The Central Monogram */}
                                    <text x="50" y="56" textAnchor="middle" className="monogram">G</text>
                                    {/* The Rotating Outer Text */}
                                    <g className="spin-group">
                                        <text>
                                            <textPath href="#circlePath" startOffset="0%">
                                                ESTABLISHED IN PARIS • MAISON VISIONNAIRE •
                                            </textPath>
                                        </text>
                                    </g>
                                </svg>
                            </div>

                            {/* Floating Metadata */}
                            <div className="editorial-meta">
                                <span className="meta-label">Curated</span>
                                <span className="meta-value">N° 0{menuItems.findIndex(m => m.image === activeImage) + 1}</span>
                            </div>

                            <div className="editorial-image-wrapper">
                                <img src={activeImage} alt="Editorial presentation view" className="editorial-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinimalistMenu;
