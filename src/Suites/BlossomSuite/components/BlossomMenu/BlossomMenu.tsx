import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './BlossomMenu.scss';

import img1 from '../../../../assets/img/Space_1.webp';
import img2 from '../../../../assets/img/Character_2.webp';
import img3 from '../../../../assets/img/Background_3.webp';
import img4 from '../../../../assets/img/Character_1.webp';

const menuItems = [
    { num: '01', title: 'Bloom', image: img1, color: '#ff3a00' },    
    { num: '02', title: 'Nature', image: img2, color: '#1e00fa' },   
    { num: '03', title: 'Spirit', image: img3, color: '#00ccff' },  
    { num: '04', title: 'Petals', image: img4, color: '#050505' }, 
];

gsap.registerPlugin(useGSAP);

export const BlossomMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .to('.blossom-toggle-text', { autoAlpha: 0, scale: 0.5, duration: 0.2, ease: 'power2.in' })
            .to('.blossom-toggle-icon', { autoAlpha: 0, rotate: 90, duration: 0.2, ease: 'power2.in' }, '<')
            
            .to('.blossom-bg', { 
                width: '50px', 
                borderRadius: '50px', 
                duration: 0.35, 
                ease: 'back.in(1.2)' 
            })
            
            .to('.blossom-bg', { 
                top: 0, 
                height: '100vh', 
                borderRadius: 0, 
                duration: 0.4, 
                ease: 'power4.in' 
            })
            
            .to('.blossom-bg', { 
                right: 0, 
                width: '100vw', 
                duration: 0.5, 
                ease: 'power4.out' 
            })
            
            .set('.blossom-menu-content', { visibility: 'visible', pointerEvents: 'auto' })
            .fromTo('.blossom-nav li',
                { autoAlpha: 0, x: -60, filter: 'blur(10px)' },
                { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.08, ease: 'power3.out' },
                '-=0.2'
            )
            .fromTo('.blossom-gallery-wrapper',
                { autoAlpha: 0, x: 60 },
                { autoAlpha: 1, x: 0, duration: 1.2, ease: 'power2.out' },
                '-=0.6'
            )
            
            .to('.blossom-toggle-close', { 
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

    const dynamicCanvasColor = isOpen ? menuItems[hoverIndex].color : '#050505';

    return (
        <div ref={containerRef} className="blossom-menu-wrapper">
            <div 
                className="blossom-bg" 
                style={{ backgroundColor: dynamicCanvasColor }}
            ></div>
            
            <button className={`blossom-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                <div className="blossom-toggle-text">Menu</div>
                <div className="blossom-toggle-icon">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="blossom-toggle-close"></div>
            </button>

            <div className={`blossom-menu-content ${isOpen ? 'is-active' : ''}`}>
                <div className="blossom-nav-container">
                    <ul className="blossom-nav">
                        {menuItems.map((item, index) => (
                            <li 
                                key={index} 
                                onMouseEnter={() => setHoverIndex(index)}
                                onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                            >
                                <span className="blossom-num">{item.num}</span>
                                <span className="blossom-text">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="blossom-footer-meta">
                        <span>Blossom Suite</span>
                        <span>Interactive Harmony</span>
                    </div>
                </div>

                <div className="blossom-gallery-wrapper">
                    {menuItems.map((item, index) => (
                        <img 
                            key={index}
                            src={item.image} 
                            className={`blossom-gallery-image ${hoverIndex === index ? 'active' : ''}`}
                            alt={item.title} 
                        />
                    ))}
                    <div className="blossom-texture-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default BlossomMenu;
