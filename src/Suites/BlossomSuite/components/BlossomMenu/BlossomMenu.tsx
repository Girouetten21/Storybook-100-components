import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './BlossomMenu.scss';

import img1 from '../../img/blossom_1.png';
import img2 from '../../img/blossom_2.png';
import img3 from '../../img/blossom_3.png';
import img4 from '../../img/blossom_4.png';

const menuItems = [
    { num: '01', title: 'Bloom', image: img1, color: '#f06292' }, // Petal Pink
    { num: '02', title: 'Nature', image: img2, color: '#5d6a5d' }, // Sage
    { num: '03', title: 'Spirit', image: img3, color: '#2e3b2e' }, // Forest
    { num: '04', title: 'Refined', image: img4, color: '#b07d62' }, // Earth
];

gsap.registerPlugin(useGSAP);

interface BlossomMenuProps {
    isRevealed?: boolean;
}

export const BlossomMenu: React.FC<BlossomMenuProps> = ({ isRevealed = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // 1. Internal Toggle Logic
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
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
            );
    }, { scope: containerRef });

    // 2. Self-contained Entrance Animation
    useGSAP(() => {
        if (isRevealed) {
            gsap.fromTo(['.blossom-toggle', '.blossom-bg'], 
                { autoAlpha: 0, y: -20, scale: 0.8 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 1, delay: 0.4, ease: 'power4.out', stagger: 0 }
            );
        }
    }, { dependencies: [isRevealed], scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }, [isOpen]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.timeScale(1).play();
        } else {
            tlRef.current?.timeScale(1.8).reverse().then(() => {
                setIsOpen(false);
                setHoverIndex(0); 
            });
        }
    });

    const dynamicCanvasColor = isOpen ? menuItems[hoverIndex].color : '#2e3b2e';

    return (
        <div ref={containerRef} className="blossom-menu-wrapper">
            <div 
                className="blossom-bg" 
                style={{ 
                    backgroundColor: dynamicCanvasColor,
                    visibility: isRevealed ? 'visible' : 'hidden', 
                    pointerEvents: isRevealed ? 'auto' : 'none'
                }}
            ></div>
            
            <button 
                className={`blossom-toggle ${isOpen ? 'open' : ''}`} 
                onClick={toggleMenu} 
                aria-label="Toggle Navigation"
                style={{ 
                    visibility: isRevealed ? 'visible' : 'hidden', 
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    opacity: 0 // Handled by useGSAP
                }}
            >
                <div className="blossom-toggle-text">{isOpen ? 'CLOSE' : 'MENU'}</div>
                <div className="blossom-toggle-icon">
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                </div>
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
                        <span>BLOSSOM SUITE</span>
                        <span>INTERACTIVE HARMONY</span>
                    </div>
                </div>

                <div className="blossom-gallery-wrapper">
                    {menuItems.map((item, index) => (
                        <img 
                            key={index}
                            src={item.image} 
                            className={`blossom-gallery-image ${hoverIndex === index ? 'active' : ''}`}
                            alt={item.title} 
                            draggable="false"
                            style={{ pointerEvents: 'none', userSelect: 'none' }}
                        />
                    ))}
                    <div className="blossom-texture-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default BlossomMenu;
