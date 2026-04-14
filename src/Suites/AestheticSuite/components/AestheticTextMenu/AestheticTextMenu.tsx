import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticTextMenu.scss';

import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';
import img4 from '../../img/generated_4.png';

const menuItems = [
    { title: 'Collections', category: 'High Fashion', image: img1 },
    { title: 'Editorials', category: 'Visual Archive', image: img2 },
    { title: 'The Maison', category: 'Our Legacy', image: img3 },
    { title: 'Boutiques', category: 'Global Presence', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const AestheticTextMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped spotlight reveal and split-item entrance
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .fromTo('.split-menu-overlay',
                { clipPath: 'circle(0% at 50% 50%)', backgroundColor: '#000' },
                { clipPath: 'circle(150% at 50% 50%)', backgroundColor: '#0a0a0c', duration: 1.2, ease: 'power4.inOut' }
            )
            .fromTo('.split-menu-item',
                { y: 50, autoAlpha: 0, rotateX: -15 },
                { y: 0, autoAlpha: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
                '-=0.7'
            )
            .fromTo('.split-footer',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                '-=0.5'
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
            tlRef.current?.timeScale(1.8).reverse().then(() => setIsOpen(false));
        }
    });

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

export default AestheticTextMenu;
