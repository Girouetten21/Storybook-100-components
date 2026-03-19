import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import './SplitTextMenu.scss';

import img1 from '../../assets/img/Character_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Character_3.webp';
import img4 from '../../assets/img/Character_1.webp';

const menuItems = [
    { title: 'Collections', category: 'High Fashion', image: img1 },
    { title: 'Editorials', category: 'Visual Archive', image: img2 },
    { title: 'The Maison', category: 'Our Legacy', image: img3 },
    { title: 'Boutiques', category: 'Global Presence', image: img4 },
];

export const SplitTextMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true })
                .fromTo('.split-menu-overlay',
                    // Dramatic spotlight reveal from the very center of the page expanding into a circle
                    { clipPath: 'circle(0% at 50% 50%)', backgroundColor: '#000' },
                    { clipPath: 'circle(150% at 50% 50%)', backgroundColor: '#0a0a0c', duration: 1.2, ease: 'power4.inOut' }
                )
                .fromTo('.split-menu-item',
                    { y: 50, opacity: 0, rotateX: -15 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
                    '-=0.7'
                )
                .fromTo('.split-footer',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                    '-=0.5'
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
        <div ref={containerRef} className="split-menu-wrapper">
            <button className={`split-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <div className="split-hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div className={`split-menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="split-menu-content">
                    {menuItems.map((item, index) => (
                        <div className="split-menu-item" key={index}>
                            {/* Top Cut of the Word */}
                            <div className="split-slice top">
                                <span className="title-text">{item.title}</span>
                            </div>

                            {/* Panoramic Image Gap that expands on Hover */}
                            <div className="split-image-gap">
                                <div className="img-parallax-wrapper">
                                    <img src={item.image} alt={item.title} />
                                    <div className="gap-metadata">
                                        <span className="gap-index">0{index + 1}</span>
                                        <span className="gap-divider"></span>
                                        <span className="gap-category">{item.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Cut of the Word */}
                            <div className="split-slice bottom">
                                <span className="title-text">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="split-footer">
                    <span>Maison Visionnaire</span>
                    <span>© {new Date().getFullYear()}</span>
                    <span>Paris</span>
                </div>
            </div>
        </div>
    );
};

export default SplitTextMenu;
