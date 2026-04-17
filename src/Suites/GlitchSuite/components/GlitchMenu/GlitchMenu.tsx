import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './GlitchMenu.scss';

const preventScroll = (e: Event) => e.preventDefault();

export const GlitchMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const menuItems = ['HOME', 'ARCHIVE', 'REVELATION', 'SYSTEM', 'EXIT'];

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set('.menu-overlay', { visibility: 'visible' })
            .to('.menu-bar', { 
                x: '0%', 
                stagger: { amount: 0.4, from: "center" },
                duration: 0.6, 
                ease: "power4.inOut" 
            })
            .from('.menu-link', {
                x: -30,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.2")
            .from('.menu-footer-info', {
                autoAlpha: 0,
                y: 20,
                duration: 0.4
            }, "-=0.4");
    }, { scope: menuRef });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    React.useLayoutEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            tlRef.current?.play();
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            tlRef.current?.reverse();
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className={`glitch-menu-system ${isOpen ? 'is-open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                <div className="toggle-line top"></div>
                <div className="toggle-line bottom"></div>
                <span className="toggle-label">{isOpen ? 'CLOSE' : 'MENU'}</span>
            </button>

            <div className="menu-overlay">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`menu-bar ${i % 2 === 0 ? 'left' : 'right'}`}></div>
                ))}
                <div className="menu-noise"></div>
                <nav className="menu-nav">
                    {menuItems.map((item, i) => (
                        <div key={i} className="menu-link-wrap">
                            <a href="#" className="menu-link" data-text={item}>
                                {item}
                                <span className="link-glitch"></span>
                            </a>
                        </div>
                    ))}
                </nav>
                
                <div className="menu-footer-info">
                    <div className="info-block">
                        <span>VERSION</span>
                        <span>v2.0.4 - STABLE_ENTROPY</span>
                    </div>
                    <div className="info-block">
                        <span>ESTABLISHED</span>
                        <span>2026.GLITCH_CORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlitchMenu;
