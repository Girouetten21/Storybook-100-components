import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ShatterCascadeMenu.scss';

import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';
import img4 from '../../img/generated_4.png';

gsap.registerPlugin(useGSAP);

const menuItems = [
    { title: 'Essence', image: img1 },
    { title: 'Lookbook', image: img2 },
    { title: 'The Maison', image: img3 },
    { title: 'Concierge', image: img4 },
];

export const ShatterCascadeMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped timeline and safe interaction logic
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set('.cascade-overlay', { visibility: 'visible', pointerEvents: 'auto' })
            .fromTo('.cascade-bar',
                { yPercent: -100 },
                { yPercent: 0, duration: 0.75, stagger: 0.05, ease: 'power4.inOut' }
            )
            .fromTo('.cascade-solid-base',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.2 },
                '-=0.2'
            )
            .fromTo('.cascade-nav li',
                { y: 40, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
                '-=0.3'
            )
            .fromTo('.cascade-meta, .cascade-socials',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
                '-=0.4'
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
            // Speed up closure 
            tlRef.current?.timeScale(1.8).reverse().then(() => {
                setIsOpen(false);
                setHoveredIndex(null);
            });
        }
    });

    return (
        <div ref={containerRef} className="shatter-cascade-menu-wrapper">
            <button className={`cascade-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="toggle-label">{isOpen ? 'CLOSE' : 'MENU'}</span>
                <div className="toggle-circle"></div>
            </button>

            <div className={`cascade-overlay ${isOpen ? 'is-active' : ''}`}>
                
                {/* Cinematic Background Layer */}
                <div className="cascade-bg-container">
                    <div className="cascade-solid-base"></div>
                    {menuItems.map((item, index) => (
                        <div 
                            className={`cascade-bg-image ${hoveredIndex === index ? 'active' : ''}`} 
                            key={index}
                        >
                            <img src={item.image} alt={item.title} />
                            <div className="cascade-tint"></div>
                        </div>
                    ))}
                </div>

                {/* The Falling Bars (Hardware Optimized Architecture) */}
                <div className={`cascade-bars ${hoveredIndex !== null ? 'is-revealing' : ''}`}>
                    <div className="cascade-bar"></div>
                    <div className="cascade-bar"></div>
                    <div className="cascade-bar"></div>
                    <div className="cascade-bar"></div>
                    <div className="cascade-bar"></div>
                </div>

                {/* Foreground Content */}
                <div className="cascade-content">
                    <div className="cascade-meta">
                        <span>Aesthetics</span>
                    </div>

                    <nav className="cascade-nav">
                        <ul>
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index} 
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    // Optional: If you want background to linger, don't set to null on leave
                                    // onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>
                                        <span className="nav-num">0{index + 1}</span>
                                        <span className="nav-name">{item.title}</span>
                                        <span className="nav-arrow">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="cascade-socials">
                        <div className="social-links">
                            <a href="#">Instagram</a>
                            <a href="#">Pinterest</a>
                            <a href="#">Journal</a>
                        </div>
                        <span className="vol-text">Vol 01 / 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShatterCascadeMenu;
