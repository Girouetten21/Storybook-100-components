import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FullscreenMenu.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Character_2.webp';
import img3 from '../../assets/img/Space_2.webp';
import img4 from '../../assets/img/Background_2.webp';

const menuLinks = [
    { label: 'HOME', image: img1 },
    { label: 'PROJECTS', image: img2 },
    { label: 'STUDIO', image: img3 },
    { label: 'CONTACT', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const FullscreenMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [activeImage, setActiveImage] = useState(menuLinks[0].image);

    // POWERED BY GSAP-SKILLS: Scoped timeline and dynamic background logic
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .to('.menu-overlay', {
                duration: 0.8,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'power3.inOut',
            })
            .to('.menu-bg-img', {
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
            }, '-=0.5')
            .fromTo('.menu-link-item', 
                { yPercent: 120, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 
                '-=0.8'
            )
            .fromTo('.menu-socials span', 
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 
                '-=0.6'
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
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse().then(() => setIsOpen(false));
        }
    });

    const handleHover = contextSafe((image: string) => {
        if (activeImage === image) return;
        
        gsap.to('.menu-bg-img', {
            autoAlpha: 0,
            duration: 0.3,
            onComplete: () => {
                setActiveImage(image);
                gsap.to('.menu-bg-img', {
                    autoAlpha: 1,
                    duration: 0.4,
                });
            }
        });
    });

    return (
        <div ref={containerRef} className="fullscreen-menu-wrapper">
            {/* Hamburger Button */}
            <button className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <div className="hamburger">
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Overlay Menu */}
            <div className={`menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="menu-bg">
                    <img className="menu-bg-img" src={activeImage} alt="Menu Background" />
                    <div className="menu-bg-gradient"></div>
                </div>
                
                <div className="menu-content">
                    <nav className="menu-nav">
                        {menuLinks.map((link, i) => (
                            <div className="menu-link-wrapper" key={i}>
                                <a 
                                    href="#" 
                                    className="menu-link-item"
                                    onMouseEnter={() => handleHover(link.image)}
                                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                                >
                                    <span className="link-number">0{i + 1}</span>
                                    <span className="link-text">{link.label}</span>
                                </a>
                            </div>
                        ))}
                    </nav>

                    <div className="menu-footer">
                        <div className="menu-socials">
                            <span>INSTAGRAM</span>
                            <span>AWARDS</span>
                            <span>DRIBBBLE</span>
                        </div>
                        <div className="menu-socials">
                            <span>INFO@AWWWARDS.COM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullscreenMenu;
