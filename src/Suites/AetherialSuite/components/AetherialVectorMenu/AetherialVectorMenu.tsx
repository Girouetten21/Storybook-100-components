import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetherialVectorMenu.scss';

const menuItems = [
    { num: 'XI.', title: 'The Genesis', tag: 'Architecture' },
    { num: 'XII.', title: 'Onyx Vault', tag: 'Editorial' },
    { num: 'XIII.', title: 'Seduction', tag: 'Campaigns' },
    { num: 'XIV.', title: 'Labyrinth', tag: 'The Atelier' },
];

gsap.registerPlugin(useGSAP);

export const AetherialVectorMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped timeline and secure event handling
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set('.celestial-overlay', { visibility: 'visible', pointerEvents: 'auto' })
            .to('.c-toggle-wrapper', { autoAlpha: 0, scale: 0.8, duration: 0.4 })
            
            // 1. Dark Void Background
            .fromTo('.celestial-overlay', 
                { backgroundColor: 'rgba(6, 5, 5, 0)' },
                { backgroundColor: 'rgba(6, 5, 5, 1)', duration: 0.8 }
            )
            
            // 2. The Golden Lines drawing from centers
            .fromTo('.v-line',
                { scaleY: 0 },
                { scaleY: 1, duration: 1.4, stagger: 0.1, ease: 'expo.inOut' },
                '-=0.4'
            )
            .fromTo('.h-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, stagger: 0.1, ease: 'expo.inOut' },
                '-=1.2'
            )
            
            // 3. Astrolabe Orbits expand from the void
            .fromTo('.orbit',
                { scale: 0.2, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 2.2, stagger: 0.15, ease: 'power3.out' },
                '-=1.0'
            )
            
            // 4. Center Geometric Diamond
            .fromTo('.c-diamond',
                { scale: 0, rotation: -90 },
                { scale: 1, rotation: 45, duration: 1.2, ease: 'back.out(2)' },
                '-=1.5'
            )
            
            // 5. Typography rises symmetrically
            .fromTo('.celestial-nav li',
                { autoAlpha: 0, y: 40, filter: 'blur(10px)' },
                { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.08, ease: 'power2.out' },
                '-=1.2'
            )
            
            // 6. Close button fades in softly
            .fromTo('.c-close-btn', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.5');

    }, { scope: containerRef });

const preventStrictScroll = (e: Event) => e.preventDefault();

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            window.addEventListener('wheel', preventStrictScroll, { passive: false });
            window.addEventListener('touchmove', preventStrictScroll, { passive: false });
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            window.removeEventListener('wheel', preventStrictScroll);
            window.removeEventListener('touchmove', preventStrictScroll);
        }
        return () => { 
            document.body.style.overflow = ''; 
            document.body.style.paddingRight = '';
            window.removeEventListener('wheel', preventStrictScroll);
            window.removeEventListener('touchmove', preventStrictScroll);
        };
    }, [isOpen]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.timeScale(1).play();
        } else {
            tlRef.current?.timeScale(1.8).reverse().then(() => {
                setIsOpen(false);
                setHoverIndex(null); 
            });
        }
    });

    return (
        <div ref={containerRef} className="celestial-wrapper">
            
            <div className="c-toggle-wrapper">
                <button className="c-toggle" onClick={toggleMenu} aria-label="Open Menu">
                    <span className="dot"></span>
                    <span className="text">Explore</span>
                </button>
            </div>

            <div className={`celestial-overlay ${isOpen ? 'is-active' : ''}`}>
                
                <button className="c-close-btn" onClick={toggleMenu} aria-label="Close Menu">
                    <span className="icon">✕</span>
                </button>

                {/* --- GEOMETRIC BACKGROUND VECTORS --- */}
                <div className="vector-grid">
                    {/* Astronomical slow spinning rings */}
                    <div className="orbit orbit-1"></div>
                    <div className="orbit orbit-2"></div>
                    <div className="orbit orbit-3"></div>
                    <div className="orbit orbit-4"></div>

                    {/* Infinite intersecting hairlines */}
                    <div className="v-line line-1"></div>
                    <div className="v-line line-2"></div>
                    <div className="v-line line-3"></div>
                    <div className="h-line line-a"></div>
                    <div className="h-line line-b"></div>

                    {/* The core nexus core */}
                    <div className="c-diamond"></div>
                </div>

                {/* --- TYPOGRAPHY COMPOSITION --- */}
                <div className="celestial-content">
                    <ul 
                        className="celestial-nav"
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        {menuItems.map((item, index) => {
                            const isHovered = hoverIndex === index;
                            const isDimmed = hoverIndex !== null && hoverIndex !== index;
                            
                            return (
                                <li 
                                    key={index} 
                                    className={`nav-item ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                                >
                                    <div className="roman-wrapper">
                                        <div className="line-connector"></div>
                                        <span className="roman">{item.num}</span>
                                    </div>
                                    <span className="title">{item.title}</span>
                                    <span className="decorator">{isHovered ? '✦' : '✧'}</span>
                                    <span className="tag">{item.tag}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AetherialVectorMenu;
