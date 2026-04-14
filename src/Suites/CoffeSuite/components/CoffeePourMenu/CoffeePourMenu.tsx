import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CoffeePourMenu.scss';

import img1 from '../../img/generated_1.png'; 
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';
import img4 from '../../img/generated_4.png'; 

const menuItems = [
    { num: '01', title: 'The Roastery', desc: 'Sourcing the finest beans globally', image: img1 },
    { num: '02', title: 'Extraction', desc: 'Precision and thermodynamic science', image: img2 },
    { num: '03', title: 'Artisan Blend', desc: 'Our signature house combinations', image: img3 },
    { num: '04', title: 'The Baristas', desc: 'Masters of the craft and latte art', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const CoffeePourMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped physics theater and liquid accumulation
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set('.pour-overlay', { visibility: 'visible', pointerEvents: 'auto' })
            .to('.pour-toggle-text', { y: -20, autoAlpha: 0, duration: 0.3 }) 
            
            // 1. PHASE ONE - The Genesis (Pouring & Puddle Gathering)
            .fromTo('.coffee-stream',
                { height: 0, autoAlpha: 1, width: 15 },
                { height: '100vh', duration: 0.4, ease: 'power2.in' }, 
                '0'
            )
            .fromTo('.foam-wave', 
                { top: '150vh' },
                { top: '70vh', duration: 1.0, ease: 'expo.out' }, 
                '0'
            ) 
            .fromTo('.espresso-wave', 
                { top: '150vh' },
                { top: '75vh', duration: 1.0, ease: 'expo.out' }, 
                '0'
            )
            
            // 2. PHASE TWO - The Extraction Surge (Exploding upwards)
            .to('.foam-wave', { 
                top: '-150vh', 
                duration: 1.4, 
                ease: 'power3.inOut' 
            }, '1.0') 
            .to('.espresso-wave', { 
                top: '-150vh', 
                duration: 1.3, 
                ease: 'power3.inOut' 
            }, '1.1') 
            
            // 3. Cut the Stream
            .to('.coffee-stream', { width: 1, autoAlpha: 0, duration: 0.4 }, '1.2')
            
            // 4. Float up the Navigation Text
            .fromTo('.pour-nav-container',
                { y: 50, autoAlpha: 0, filter: 'blur(5px)' },
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
                '-=0.6'
            )
            
            // 5. The Aggressive Gallery Slam
            .fromTo('.gallery-frame',
                { x: '100%' },
                { x: '0%', duration: 1.2, ease: 'expo.out' },
                '-=0.8'
            )
            
            // 6. Present the close button
            .fromTo('.pour-toggle-close', 
                { y: 20, autoAlpha: 0 }, 
                { y: 0, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.5)' }, 
                '-=0.4'
            );
    }, { scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => { 
            document.body.style.overflow = ''; 
            document.body.style.paddingRight = '';
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
                setHoverIndex(0); 
            });
        }
    });

    return (
        <div ref={containerRef} className="liquid-pour-wrapper">
            
            {/* The Trigger Menu */}
            <button className={`pour-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="pour-toggle-text">Menu</span>
                <span className="pour-toggle-close">✕</span>
            </button>

            {/* The Cup (Screen) */}
            <div className={`pour-overlay ${isOpen ? 'is-active' : ''}`}>
                
                {/* ---------- THE PHYSICS THEATER ---------- */}
                <div className="liquid-theatre">
                    {/* The pouring stream */}
                    <div className="coffee-stream"></div>
                    
                    {/* CSS Wavy Expanding Blobs */}
                    <div className="coffee-wave foam-wave"></div>
                    <div className="coffee-wave espresso-wave"></div>
                </div>

                {/* ---------- THE CONTENT ON TOP ---------- */}
                <div className="pour-content-grid">
                    
                    {/* Left: Typography list */}
                    <div className="pour-nav-container">
                        <span className="cafe-tagline">Single Origin Selection.</span>
                        <ul className="pour-nav">
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index} 
                                    className={hoverIndex === index ? 'hovered' : ''}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                                >
                                    <div className="nav-details">
                                        <span className="num">{item.num}</span>
                                        <span className="title">{item.title}</span>
                                    </div>
                                    <p className="desc">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: The Brutalist Espresso Slider Gallery */}
                    <div className="pour-gallery">
                        <div className="gallery-frame">
                            {menuItems.map((item, index) => {
                                let positionClass = 'next';
                                if (index === hoverIndex) positionClass = 'active';
                                else if (index < hoverIndex) positionClass = 'prev';

                                return (
                                    <div key={index} className={`pour-slide ${positionClass}`}>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                );
                            })}
                            {/* Static overlay to melt images into the espresso theme */}
                            <div className="crema-overlay"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CoffeePourMenu;
