import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ShapeShiftMenu.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Background_3.webp';
import img4 from '../../assets/img/Character_1.webp';

const menuItems = [
    { num: '01', title: 'Pioneers', image: img1, color: '#ff3a00' },    
    { num: '02', title: 'Framework', image: img2, color: '#1e00fa' },   
    { num: '03', title: 'Aesthetics', image: img3, color: '#00ccff' },  
    { num: '04', title: 'Foundations', image: img4, color: '#050505' }, 
];

gsap.registerPlugin(useGSAP);

export const ShapeShiftMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped multi-step metamorphosis logic
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .to('.shift-toggle-text', { autoAlpha: 0, scale: 0.5, duration: 0.2, ease: 'power2.in' })
            .to('.shift-toggle-icon', { autoAlpha: 0, rotate: 90, duration: 0.2, ease: 'power2.in' }, '<')
            
            .to('.shift-bg', { 
                width: '50px', 
                borderRadius: '50px', 
                duration: 0.35, 
                ease: 'back.in(1.2)' 
            })
            
            .to('.shift-bg', { 
                top: 0, 
                height: '100vh', 
                borderRadius: 0, 
                duration: 0.4, 
                ease: 'power4.in' 
            })
            
            .to('.shift-bg', { 
                right: 0, 
                width: '100vw', 
                duration: 0.5, 
                ease: 'power4.out' 
            })
            
            .set('.shift-menu-content', { visibility: 'visible', pointerEvents: 'auto' })
            .fromTo('.shift-nav li',
                { autoAlpha: 0, x: -60, filter: 'blur(10px)' },
                { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.08, ease: 'power3.out' },
                '-=0.2'
            )
            .fromTo('.shift-gallery-wrapper',
                { autoAlpha: 0, x: 60 },
                { autoAlpha: 1, x: 0, duration: 1.2, ease: 'power2.out' },
                '-=0.6'
            )
            
            .to('.shift-toggle-close', { 
                autoAlpha: 1, 
                scale: 1, 
                rotation: 180, 
                duration: 0.4, 
                ease: 'back.out(1.5)' 
            }, '-=0.4');
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
            tlRef.current?.timeScale(1.6).reverse().then(() => {
                setIsOpen(false);
                setHoverIndex(0); 
            });
        }
    });

    // Calculate dynamic background color for the `.shift-bg`
    // Ensures a fluid gradient background morph when hovering texts!
    const dynamicCanvasColor = isOpen ? menuItems[hoverIndex].color : '#050505';

    return (
        <div ref={containerRef} className="shape-shift-wrapper">
            
            {/* The Physical Expanding Geometry */}
            <div 
                className="shift-bg" 
                style={{ backgroundColor: dynamicCanvasColor }}
            ></div>
            
            {/* The Trigger Button overlapping the Geometry */}
            <button className={`shift-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                <div className="shift-toggle-text">Menu</div>
                <div className="shift-toggle-icon">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="shift-toggle-close"></div>
            </button>

            {/* The Hidden Content Domain */}
            <div className={`shift-menu-content ${isOpen ? 'is-active' : ''}`}>
                <div className="shift-nav-container">
                    <ul className="shift-nav">
                        {menuItems.map((item, index) => (
                            <li 
                                key={index} 
                                onMouseEnter={() => setHoverIndex(index)}
                                onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                            >
                                <span className="shift-num">{item.num}</span>
                                <span className="shift-text">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="shift-footer-meta">
                        <span>The Architect Library</span>
                        <span>Interactive Components</span>
                    </div>
                </div>

                {/* The Diagonal Blade Image Gallery */}
                <div className="shift-gallery-wrapper">
                    {menuItems.map((item, index) => (
                        <img 
                            key={index}
                            src={item.image} 
                            className={`shift-gallery-image ${hoverIndex === index ? 'active' : ''}`}
                            alt={item.title} 
                        />
                    ))}
                    {/* A digital dark noise layer over images for texture */}
                    <div className="shift-texture-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default ShapeShiftMenu;
