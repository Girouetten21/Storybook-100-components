import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import './StaggeredMenu.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Space_2.webp';
import img4 from '../../assets/img/Background_2.webp';

const menuItems = [
    { id: '01', title: 'PORTFOLIO', image: img1 },
    { id: '02', title: 'EXPERTISE', image: img2 },
    { id: '03', title: 'AGENCY', image: img3 },
    { id: '04', title: 'CONTACT', image: img4 },
];

export const StaggeredMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    
    // For hovering image effect
    const floatingImageRef = useRef<HTMLDivElement>(null);
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);
    
    useLayoutEffect(() => {
        if (!containerRef.current) return;
        
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                .set('.staggered-menu-overlay', { pointerEvents: 'auto' })
                .fromTo('.menu-blind', 
                    { scaleY: 0 },
                    { scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'power4.inOut', transformOrigin: 'top' }
                )
                .fromTo('.menu-link-inner', 
                    { yPercent: 120, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                    '-=0.4'
                )
                .fromTo('.secondary-title, .secondary-link',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
                    '-=0.6'
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
            setHoveredImg(null); // Reset floating image safely
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    // Track mouse for the floating image using quickTo for buttery smooth performance
    useEffect(() => {
        if (!isOpen || !floatingImageRef.current) return;
        
        const xTo = gsap.quickTo(floatingImageRef.current, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(floatingImageRef.current, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            // Center the image heavily offset from the cursor so it floats nicely
            xTo(e.clientX - 150); 
            yTo(e.clientY - 200); 
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isOpen]);

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse().then(() => setIsOpen(false));
            setHoveredImg(null);
        }
    };

    return (
        <div ref={containerRef} className="staggered-menu-wrapper">
            <button className={`staggered-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="burger-text">{isOpen ? 'CLOSE' : 'MENU'}</div>
                <div className="burger-lines">
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div className={`staggered-menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="blinds-container">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="menu-blind"></div>
                    ))}
                </div>

                <div className="staggered-menu-content">
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

export default StaggeredMenu;
