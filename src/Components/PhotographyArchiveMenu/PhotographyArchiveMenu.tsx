import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './PhotographyArchiveMenu.scss';

// Assets
import heroImg from '../../assets/img/photography/hero_main.png';
import silhouetteImg from '../../assets/img/photography/menu_silhouette.png';
import act1Img from '../../assets/img/photography/lens_act1.png';
import act2Img from '../../assets/img/photography/lens_act2.png';

const PhotographyArchiveMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // 🎞️ Dynamic Menu Images: Coherent Professional Storytelling
    const menuItems = [
        { id: '01', meta: 'TOP', label: 'THE GATEWAY', img: heroImg },
        { id: '02', meta: 'LENS', label: 'APERTURE EXH.', img: act2Img },
        { id: '03', meta: 'BOUTIQUE', label: 'LIGHT SERVICES', img: silhouetteImg },
        { id: '04', meta: 'ARCHIVE', label: 'CURATED LOGS', img: act1Img }
    ];

    const [activeImage, setActiveImage] = useState(menuItems[0].img);
    const menuRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);
    const { contextSafe } = useGSAP({ scope: menuRef });

    // 🔒 Bloqueo de Scroll cuando el Menú está abierto
    useEffect(() => {
        const preventScroll = (e: Event) => {
            if (isOpen) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        if (isOpen) {
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleHover = contextSafe((img: string) => {
        if (img === activeImage) return;

        // Efecto de Crossfade elegante
        gsap.to(bgImageRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.4,
            onComplete: () => {
                setActiveImage(img);
                gsap.to(bgImageRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });

    const toggleMenu = contextSafe(() => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            // Animación del Icono (Focus Lock)
            gsap.to('.trigger-icon svg', { rotate: 90, scale: 0.8, duration: 0.4, ease: 'back.out(2)' });
            gsap.to('.trigger-icon svg circle', { r: 4, fill: '#fff', duration: 0.2 });

            gsap.to('.menu-overlay', {
                clipPath: 'circle(150% at calc(100% - 6vw) 6vh)',
                duration: 1.2,
                ease: 'expo.inOut'
            });
            gsap.from('.menu-item', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                delay: 0.4,
                ease: 'power4.out'
            });
            gsap.from('.menu-bg-visual', {
                scale: 1.2,
                opacity: 0,
                duration: 2,
                ease: 'power2.out',
                delay: 0.2
            });
        } else {
            // Revertir Icono
            gsap.to('.trigger-icon svg', { rotate: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            gsap.to('.trigger-icon svg circle', { r: 2, fill: '#d4af37', duration: 0.4 });

            gsap.to('.menu-overlay', {
                clipPath: 'circle(0% at calc(100% - 6vw) 6vh)',
                duration: 1,
                ease: 'expo.inOut'
            });
        }
    });

    return (
        <nav className={`photo-menu-container ${isOpen ? 'menu-is-open' : ''}`} ref={menuRef}>

            {/* 🎯 TRIGGER */}
            <button className="menu-trigger" onClick={toggleMenu} aria-label="Toggle Menu">
                <div className="trigger-icon">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4H4V12" stroke="white" strokeWidth="1.5" />
                        <path d="M28 4H36V12" stroke="white" strokeWidth="1.5" />
                        <path d="M12 36H4V28" stroke="white" strokeWidth="1.5" />
                        <path d="M36 28V36H28" stroke="white" strokeWidth="1.5" />
                        <circle cx="20" cy="20" r="2" fill="#d4af37" />
                    </svg>
                </div>
                <span className="trigger-text">{isOpen ? 'CLOSE' : 'MENU'}</span>
            </button>

            {/* 🌑 OVERLAY */}
            <div className="menu-overlay">

                {/* 🎞️ DYNAMIC BACKGROUND VISUAL */}
                <div className="menu-bg-visual">
                    <div className="bg-vignette"></div>
                    <img
                        ref={bgImageRef}
                        src={activeImage}
                        alt="Photography preview"
                    />
                </div>

                <div className="menu-content">

                    <div className="menu-header">
                        <span className="label">TECHNICAL ARCHIVE // VOL. 01</span>
                        <div className="shutter-status">
                            <span className="dot"></span>
                            FOCUS LOCK ACTIVE
                        </div>
                    </div>

                    <div className="menu-list">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="menu-item"
                                onMouseEnter={() => handleHover(item.img)}
                            >
                                <span className="item-meta">{item.id} // {item.meta}</span>
                                <a href="#" className="menu-link" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>
                                    {item.label}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="menu-footer">
                        <div className="editorial-meta">
                            <span>TECHNICAL ARTISTRY // ANALOG SOUL</span>
                        </div>
                        <div className="social-outreach">
                            <a href="#" className="social-link">INSTAGRAM</a>
                            <a href="#" className="social-link">LINKEDIN</a>
                            <a href="#" className="social-link">TIKTOK</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PhotographyArchiveMenu;
