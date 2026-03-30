import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './NoirMenu.scss';

import img1 from '../../assets/img/Background_1.webp';
import img2 from '../../assets/img/Background_2.webp';
import img3 from '../../assets/img/Background_3.webp';
import img4 from '../../assets/img/Background_4.webp';

const menuItems = [
    { id: '01', title: 'Intimates', italicTitle: 'Lingerie', image: img1 },
    { id: '02', title: 'Obsession', italicTitle: 'Fragrance', image: img2 },
    { id: '03', title: 'Provocateur', italicTitle: 'Couture', image: img3 },
    { id: '04', title: 'Midnight', italicTitle: 'Evening', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const NoirMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImg, setActiveImg] = useState<string>(menuItems[0].image);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped noir opening and brutalist slide
    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .fromTo('.noir-menu-overlay',
                { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
                { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.6, ease: 'power4.inOut' }
            )
            .fromTo('.noir-backgrounds',
                { scale: 1.05, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo('.noir-item',
                { x: 80, autoAlpha: 0, skewX: -10 },
                { x: 0, autoAlpha: 1, skewX: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
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
            tlRef.current?.timeScale(1).play();
        } else {
            tlRef.current?.timeScale(1.6).reverse().then(() => setIsOpen(false));
            setTimeout(() => setActiveImg(menuItems[0].image), 500);
        }
    });

    return (
        <div ref={containerRef} className="noir-menu-wrapper">
            <button className={`noir-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="toggle-text">{isOpen ? 'CLOSE' : 'MENU'}</span>
                <div className="blade-lines"></div>
            </button>

            <div className={`noir-menu-overlay ${isOpen ? 'is-active' : ''}`}>
                <div className="noir-backgrounds">
                    {menuItems.map((item, index) => (
                        <div
                            className={`noir-bg-img ${activeImg === item.image ? 'active' : ''}`}
                            key={index}
                        >
                            <img src={item.image} alt={item.title} />
                            <div className="noir-tint"></div>
                        </div>
                    ))}
                </div>

                <div className="noir-menu-content">
                    {menuItems.map((item, index) => (
                        <div
                            className="noir-item"
                            key={index}
                            onMouseEnter={() => setActiveImg(item.image)}
                            onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                        >
                            <span className="noir-id">{item.id}</span>
                            <div className="noir-title-container">
                                <span className="noir-title-sans">{item.title}</span>
                                <span className="noir-title-serif">{item.italicTitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="noir-footer">
                    <span className="noir-brand">L'OBSESSION</span>
                    <span className="noir-copy">© {new Date().getFullYear()} FORBIDDEN ARCHIVES</span>
                </div>
            </div>
        </div>
    );
};

export default NoirMenu;
