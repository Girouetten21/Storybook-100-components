import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './FibonacciGoldenMenu.scss';

// Dynamic Assets
import imgCollection from '../../assets/img/Character_1.webp';
import imgAtelier from '../../assets/img/fibonacci_golden.png';
import imgCampaigns from '../../assets/img/Character_2.webp';
import imgBespoke from '../../assets/img/fashion-01.png';

gsap.registerPlugin(useGSAP);

const NAV_IMAGES: Record<string, string> = {
    'COLLECTION': imgCollection,
    'THE ATELIER': imgAtelier,
    'CAMPAIGNS': imgCampaigns,
    'BESPOKE SUITING': imgBespoke
};

export const FibonacciGoldenMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(imgCollection);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        // Hide the button initially to wait for the Loader to finish (approx 5s)
        gsap.fromTo('.menu-trigger-btn', 
            { autoAlpha: 0, y: -20 }, 
            { autoAlpha: 1, y: 0, duration: 1.2, delay: 5.5, ease: "expo.out" }
        );

        // Build the persistent timeline but keep it paused initially
        const tl = gsap.timeline({ paused: true });
        timelineRef.current = tl;

        // 1. Initial State: The wrapper is hidden, panels are compressed into their centers
        gsap.set('.fibonacci-wrapper', { autoAlpha: 0 });
        gsap.set('.grid-panel', { clipPath: 'inset(50%)' }); // Compresses each panel into an invisible dot
        gsap.set('.panel-inner', { autoAlpha: 0, y: 30 }); // Texts hidden below

        // The Menu Trigger Sequence
        // Step 1: Wrapper instantly visible
        tl.to('.fibonacci-wrapper', { autoAlpha: 1, duration: 0.1 });

        // Step 2: The Grid Explodes outward tracing the Fibonacci boxes
        tl.to('.grid-panel', {
            clipPath: 'inset(0%)',
            duration: 0.8,
            stagger: 0.1, // Staggers starting from the largest box down to the smallest
            ease: "expo.inOut"
        });

        // Step 3: Typography and internal layouts slide into position gracefully
        tl.to('.panel-inner', {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=0.4");

        // Step 4: The Golden Spiral is traced rapidly over the entire architecture
        tl.fromTo('.menu-spiral-path', 
            { strokeDashoffset: 3142 }, 
            { strokeDashoffset: 0, duration: 2, ease: "expo.out" }, 
        "-=0.6");

    }, { scope: containerRef });

    // Handle React State -> GSAP timeline sync
    useEffect(() => {
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        if (isOpen) {
            timelineRef.current?.play();
            
            // Absolutely lock the scroll using the strict engine
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            // Reverse at double speed so the user doesn't have to wait forever to close it
            timelineRef.current?.timeScale(1.8).reverse();
            
            // Safely restore user scroll on menu close
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        
        return () => { 
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = ''; 
        };
    }, [isOpen]);

    // ⚡ DYNAMIC IMAGE SWAP ANIMATION
    useEffect(() => {
        if (!imageRef.current) return;

        gsap.fromTo(imageRef.current, 
            { autoAlpha: 0, scale: 1.1, filter: 'blur(10px)' },
            { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" }
        );
    }, [activeImage]);

    const handleHover = (title: string) => {
        if (NAV_IMAGES[title]) {
            setActiveImage(NAV_IMAGES[title]);
        }
    };

    return (
        <div className="fibonacci-menu-container" ref={containerRef}>
            
            {/* The Trigger Button */}
            <button 
                className="menu-trigger-btn" 
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? 'CLOSE [X]' : 'MENU [=]'}
            </button>

            {/* The Golden Menu Overlay */}
            <div className="fibonacci-wrapper">
                
                {/* 13x8 Physical CSS Grid */}
                <div className="grid-layer">
                    
                    {/* Panel 8: The Massive Primary Navigation */}
                    <div className="grid-panel panel-8">
                        <div className="panel-inner primary-nav">
                            <h4 className="nav-heading">NAVIGATION</h4>
                            <ul>
                                <li onMouseEnter={() => handleHover('COLLECTION')}>
                                    <a href="#"><span className="idx">01</span><span>COLLECTION</span></a>
                                </li>
                                <li onMouseEnter={() => handleHover('THE ATELIER')}>
                                    <a href="#"><span className="idx">02</span><span>THE ATELIER</span></a>
                                </li>
                                <li onMouseEnter={() => handleHover('CAMPAIGNS')}>
                                    <a href="#"><span className="idx">03</span><span>CAMPAIGNS</span></a>
                                </li>
                                <li onMouseEnter={() => handleHover('BESPOKE SUITING')}>
                                    <a href="#"><span className="idx">04</span><span>BESPOKE SUITING</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Panel 5: Sub-feature Image Block */}
                    <div className="grid-panel panel-5">
                        <div className="panel-inner image-box">
                            {/* Dynamic highly-aesthetic editorial image */}
                            <img 
                                ref={imageRef}
                                src={activeImage} 
                                alt="Editorial" 
                            />
                            <div className="image-overlay-text">ARCHIVE VOL. II</div>
                        </div>
                    </div>

                    {/* The Remaining 5x3 quadrant */}
                    <div className="nested-5x3">
                        {/* Panel 3: Contact */}
                        <div className="grid-panel panel-3">
                            <div className="panel-inner contact-box">
                                42 Avenue Montaigne<br/>
                                75008 Paris<br/>
                                —<br/>
                                INQUIRIES@ATELIER.COM
                            </div>
                        </div>

                        {/* Panel 2: Social Links */}
                        <div className="grid-panel panel-2">
                            <div className="panel-inner social-box">
                                <a href="#">INSTAGRAM ↗</a>
                                <a href="#">LINKEDIN ↗</a>
                                <a href="#">X / TWITTER ↗</a>
                            </div>
                        </div>

                        {/* The Remaining 2x1 quadrant */}
                        <div className="nested-2x1">
                            {/* Panel 1a: Utility */}
                            <div className="grid-panel panel-1a">
                                <div className="panel-inner tiny-box text-center">
                                    TERMS
                                </div>
                            </div>
                            
                            {/* Panel 1b: Copyright */}
                            <div className="grid-panel panel-1b">
                                <div className="panel-inner tiny-box text-center">
                                    ©2026
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Divine Proportion Overlay Vector */}
                {/* preserveAspectRatio="none" stretches the 1300x800 raw SVG math perfectly across ANY screen size, snapping perfectly to our CSS Grid percentages */}
                <svg 
                    className="spiral-layer" 
                    viewBox="0 0 1300 800" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        className="menu-spiral-path" 
                        d="M 0 800 
                           A 800 800 0 0 1 800 0 
                           A 500 500 0 0 1 1300 500 
                           A 300 300 0 0 1 1000 800 
                           A 200 200 0 0 1 800 600 
                           A 100 100 0 0 1 900 500 
                           A 100 100 0 0 1 1000 600" 
                    />
                </svg>

            </div>
        </div>
    );
};

export default FibonacciGoldenMenu;
