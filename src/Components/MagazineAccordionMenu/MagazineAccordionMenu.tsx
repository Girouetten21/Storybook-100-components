import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import './MagazineAccordionMenu.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Space_2.webp';
import img4 from '../../assets/img/Background_2.webp';

const strips = [
    { title: 'Collections', num: '01', image: img1, links: ['Autumn / Winter 26', 'Spring / Summer 26', 'Resort Capsule', 'Bridal Couture'] },
    { title: 'Editorials', num: '02', image: img2, links: ['Campaigns', 'Lookbooks', 'Runway Archives', 'Behind the Scenes'] },
    { title: 'The Maison', num: '03', image: img3, links: ['Our Heritage', 'The Atelier', 'Craftsmanship', 'Sustainability'] },
    { title: 'Boutiques', num: '04', image: img4, links: ['Paris Flagship', 'Milan', 'New York', 'Tokyo'] }
];

export const MagazineAccordionMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                .fromTo('.mag-overlay', 
                    // Dramatic "elevator door" upwards clip
                    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.2, ease: 'power4.inOut' }
                )
                .fromTo('.mag-strip',
                    { yPercent: 100 },
                    { yPercent: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
                    '-=0.9'
                )
                .fromTo('.mag-strip-bg img',
                    { scale: 1.4, filter: 'blur(10px)' },
                    { scale: 1.1, filter: 'blur(0px)', duration: 1.5, stagger: 0.1, ease: 'power2.out' },
                    '-=0.8'
                )
                .fromTo('.mag-shrunk-content',
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
                    '-=1'
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
            tlRef.current?.timeScale(1.8).reverse().then(() => setIsOpen(false));
        }
    };

    return (
        <div ref={containerRef} className="mag-accordion-wrapper">
            {/* Elegant Fixed Toggle */}
            <button className={`mag-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                <span className="mag-toggle-text">{isOpen ? 'Close' : 'Explore'}</span>
            </button>

            {/* The Fullscreen Overlay */}
            <div className={`mag-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="mag-strips-container">
                    {strips.map((strip, i) => (
                        <div className="mag-strip" key={i}>
                            <div className="mag-strip-bg">
                                <img src={strip.image} alt={strip.title} />
                                <div className="mag-dark-veil"></div>
                            </div>

                            {/* Default Shrunk Vertical Content */}
                            <div className="mag-shrunk-content">
                                <span className="mag-num">{strip.num}</span>
                                <h2 className="mag-title-vertical">{strip.title}</h2>
                            </div>

                            {/* Expanded Hover Content */}
                            <div className="mag-expanded-content">
                                <div className="mag-expanded-inner">
                                    <span className="mag-expanded-num">Issue {strip.num}</span>
                                    <h2 className="mag-expanded-title">{strip.title}</h2>
                                    <ul className="mag-links">
                                        {strip.links.map((link, j) => (
                                            <li key={j}><a href="#">{link}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MagazineAccordionMenu;
