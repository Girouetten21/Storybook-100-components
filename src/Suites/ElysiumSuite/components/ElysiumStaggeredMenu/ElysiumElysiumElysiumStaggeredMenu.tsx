import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ElysiumElysiumElysiumStaggeredMenu.scss';

import img1 from '../../img/generated_10.png';
import img2 from '../../img/generated_11.png';
import img3 from '../../img/generated_12.png';
import img4 from '../../img/generated_13.png';

gsap.registerPlugin(useGSAP);

const menuItems = [
    { id: '01', title: 'PORTFOLIO', image: img1 },
    { id: '02', title: 'EXPERTISE', image: img2 },
    { id: '03', title: 'AGENCY', image: img3 },
    { id: '04', title: 'CONTACT', image: img4 },
];

export const ElysiumElysiumElysiumStaggeredMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const floatingImageRef = useRef<HTMLDivElement>(null);
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped timeline and quickTo mouse tracking
    const { contextSafe } = useGSAP(() => {
        // 1. Setup the main toggle animation
        tlRef.current = gsap.timeline({ paused: true })
            .set('.elysium-elysium-elysium-staggered-menu-overlay', { pointerEvents: 'auto' })
            .fromTo('.menu-blind', 
                { scaleY: 0 },
                { scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'power4.inOut', transformOrigin: 'top' }
            )
            .fromTo('.menu-link-inner', 
                { yPercent: 120, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=0.4'
            )
            .fromTo('.secondary-title, .secondary-link',
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
                '-=0.6'
            );

        // 2. Setup the mouse follower if floatingImageRef is available
        if (floatingImageRef.current) {
            const xTo = gsap.quickTo(floatingImageRef.current, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(floatingImageRef.current, "y", { duration: 0.4, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                xTo(e.clientX - 150); 
                yTo(e.clientY - 200); 
            };

            if (isOpen) {
                window.addEventListener('mousemove', handleMouseMove);
            }
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            setHoveredImg(null); 
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse().then(() => setIsOpen(false));
            setHoveredImg(null);
        }
    });

    return (
        <div ref={containerRef} className="elysium-elysium-elysium-staggered-menu-wrapper">
            <button className={`staggered-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="burger-text">{isOpen ? 'CLOSE' : 'MENU'}</div>
                <div className="burger-lines">
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div className={`elysium-elysium-elysium-staggered-menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="blinds-container">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="menu-blind"></div>
                    ))}
                </div>

                <div className="elysium-elysium-elysium-staggered-menu-content">
                    <nav className="main-nav">
                        {menuItems.map((item, index) => (
                            <div className="menu-link-anim-wrapper" key={index}>
                                <a 
                                    href="#" 
                                    className="menu-link-item"
                                    onMouseEnter={() => setHoveredImg(item.image)}
                                    onMouseLeave={() => setHoveredImg(null)}
                                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                                >
                                    <div className="menu-link-inner">
                                        <span className="link-num">{item.id}</span>
                                        <span className="link-title">{item.title}</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </nav>

                    <div className="secondary-nav">
                        <span className="secondary-title">Socials</span>
                        <a href="#" className="secondary-link">Instagram</a>
                        <a href="#" className="secondary-link">Twitter</a>
                        <a href="#" className="secondary-link">LinkedIn</a>
                        <a href="#" className="secondary-link">Behance</a>
                    </div>
                </div>

                {/* Floating Image element controlled by Mouse */}
                <div 
                    ref={floatingImageRef} 
                    className={`floating-image-wrapper ${hoveredImg ? 'visible' : ''}`}
                >
                    <img src={hoveredImg || img1} alt="Hover Preview" />
                </div>
            </div>
        </div>
    );
};

export default ElysiumElysiumElysiumStaggeredMenu;
