import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import './LiquidGlassMenu.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Space_2.webp';
import img4 from '../../assets/img/Character_1.webp';

const menuItems = [
    { num: 'I', title: 'Luminescence', image: img1, colorTop: '#ff9a9e', colorBot: '#fecfef' },
    { num: 'II', title: 'Refraction', image: img2, colorTop: '#a1c4fd', colorBot: '#8fd3f4' },
    { num: 'III', title: 'Substance', image: img3, colorTop: '#ffecd2', colorBot: '#fcb69f' },
    { num: 'IV', title: 'Prism', image: img4, colorTop: '#cfd9df', colorBot: '#e2ebf0' },
];

export const LiquidGlassMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                .set('.ambient-liquid-layer', { display: 'block' })
                .fromTo('.ambient-liquid-layer', 
                    { opacity: 0 }, 
                    { opacity: 1, duration: 0.8, ease: 'power2.inOut' }
                )
                .fromTo('.glass-overlay',
                    // The Liquid Expansion Drop Reveal! Starts from the toggle button location
                    { clipPath: 'circle(0% at 90% 10%)' },
                    { clipPath: 'circle(150% at 90% 10%)', duration: 1.2, ease: 'power3.inOut' },
                    '-=0.6'
                )
                .fromTo('.glass-nav li',
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo('.liquid-window-container',
                    { scale: 0.7, opacity: 0 },
                    // Viscous Elastic Pop!
                    { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.7)' },
                    '-=0.8'
                );
        }, containerRef);
        
        return () => ctx.revert();
    }, []);

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

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.timeScale(1).play();
        } else {
            // Accelerate closure 
            tlRef.current?.timeScale(1.8).reverse().then(() => {
                setIsOpen(false);
                setTimeout(() => setActiveIndex(0), 400); // Reset safely
            });
        }
    };

    const currentItem = menuItems[activeIndex];

    return (
        <div ref={containerRef} className="liquid-glass-wrapper">
            
            {/* Elegant Glass Pill Toggle */}
            <button className={`glass-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                <span className="toggle-text">{isOpen ? 'Close' : 'Menu'}</span>
            </button>

            {/* Ambient Liquid Gradient Backdrop (Z-index behind the glass) */}
            <div className={`ambient-liquid-layer ${isOpen ? 'active' : ''}`}>
                <div 
                    className="ambient-orb orb-top" 
                    style={{ backgroundColor: currentItem.colorTop }}
                ></div>
                <div 
                    className="ambient-orb orb-bottom" 
                    style={{ backgroundColor: currentItem.colorBot }}
                ></div>
            </div>

            {/* The Master Glass Overlay Panel */}
            <div className={`glass-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="glass-content-grid">
                    
                    {/* Abstract Ethereal Navigation */}
                    <nav className="glass-nav">
                        <ul>
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index} 
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>
                                        <span className="glass-num">{item.num}</span>
                                        <span className="glass-title">{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* The Morphing Liquid Window */}
                    <div className="liquid-window-container">
                        <div className="liquid-blob">
                            {/* Layered Images to crossfade behind the gloss */}
                            {menuItems.map((item, index) => (
                                <img 
                                    key={index}
                                    src={item.image} 
                                    className={`liquid-img ${activeIndex === index ? 'active' : ''}`}
                                    alt={item.title} 
                                />
                            ))}
                            {/* Inner Refraction Glass Gloss Highlight */}
                            <div className="liquid-gloss"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LiquidGlassMenu;
