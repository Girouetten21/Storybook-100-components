import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GemRefractionSection.scss';

// Curated Gem Assets
import emeraldImg from '../../img/generated_12.png';
import sapphireImg from '../../img/generated_13.png';
import diamondImg from '../../img/generated_14.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GEMS_DATA = [
    {
        id: 'emerald',
        name: 'RAW EMERALD',
        origin: 'Colombian Highlands',
        color: '#00A86B',
        hardness: '7.5 - 8.0',
        gravity: '2.76',
        refraction: '1.576',
        desc: 'Nature’s most vibrant green. A testament to geological pressure and time.',
        img: emeraldImg,
        bgText: 'GREEN CLARITY'
    },
    {
        id: 'sapphire',
        name: 'ROYAL SAPPHIRE',
        origin: 'Kashmiri Peaks',
        color: '#002366',
        hardness: '9.0',
        gravity: '4.00',
        refraction: '1.762',
        desc: 'Unrivaled depth. An intense blue flame captured within a crystal lattice.',
        img: sapphireImg,
        bgText: 'BLUE FLAME'
    },
    {
        id: 'diamond',
        name: 'PURE DIAMOND',
        origin: 'Obsidian Deposits',
        color: '#E5E4E2',
        hardness: '10.0',
        gravity: '3.51',
        refraction: '2.417',
        desc: 'Absolute clarity. The ultimate conductor of light and symbol of eternal value.',
        img: diamondImg,
        bgText: 'WHITE EMOTION'
    }
];

export const GemRefractionSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const gemRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // ✨ ENTRANCE ANIMATION
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from('.gem-title span', {
            y: 100,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out"
        })
            .from('.gem-viewer', {
                x: 100,
                autoAlpha: 0,
                duration: 1.5,
                ease: "expo.out"
            }, "-=0.8")
            .from('.gem-stats-row .stat-item', {
                autoAlpha: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.8
            }, "-=1")
            .from('.gem-bg-text', {
                autoAlpha: 0,
                duration: 2.5,
                ease: "power2.out"
            }, "-=1.5");

        // Ensure final opacity is 0.04
        gsap.set('.gem-bg-text', { autoAlpha: 0.04 });

        // 🌀 CONTINUOUS GEMA ROTATION
        gsap.to('.gem-image-current', {
            rotation: 15,
            y: -20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    // ✨ HANDLE GEM CHANGE ANIMATION
    const handleGemChange = (index: number) => {
        if (index === activeIndex) return;

        // Animate Out
        gsap.to(['.gem-image-current', '.gem-bg-text'], {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(index);
                // Animate In: Image to 1, Text to 0.04
                gsap.to('.gem-image-current', {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
                gsap.to('.gem-bg-text', {
                    autoAlpha: 0.04,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    };

    return (
        <section className="gem-section-wrapper" ref={containerRef}>
            <div className="gem-container">

                {/* 📝 LEFT: INFORMATION PANEL */}
                <div className="gem-info-panel">
                    <span className="section-tag">EL ARTE DE LA REFRACCIÓN // 2026</span>

                    <h1 className="gem-title">
                        <span>LUXURY</span>
                        <span className="outline">ELEMENTS</span>
                    </h1>

                    <nav className="gem-selector">
                        {GEMS_DATA.map((gem, idx) => (
                            <button
                                key={gem.id}
                                className={`gem-nav-btn ${idx === activeIndex ? 'active' : ''}`}
                                onMouseEnter={() => handleGemChange(idx)}
                                style={{ '--gem-color': gem.color } as React.CSSProperties}
                            >
                                <span className="idx">0{idx + 1}</span>
                                <span className="name">{gem.name}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="gem-description-box">
                        <p className="desc-text">{GEMS_DATA[activeIndex].desc}</p>
                        <span className="origin-label">ORIGIN: {GEMS_DATA[activeIndex].origin}</span>
                    </div>

                    <div className="gem-stats-row">
                        <div className="stat-item">
                            <span className="s-label">HARDNESS</span>
                            <span className="s-val">{GEMS_DATA[activeIndex].hardness}</span>
                        </div>
                        <div className="stat-item">
                            <span className="s-label">GRAVITY</span>
                            <span className="s-val">{GEMS_DATA[activeIndex].gravity}</span>
                        </div>
                        <div className="stat-item">
                            <span className="s-label">REFRACTION</span>
                            <span className="s-val">{GEMS_DATA[activeIndex].refraction}</span>
                        </div>
                    </div>

                </div>

                {/* 🎨 RIGHT: INTERACTIVE VIEWER */}
                <div className="gem-viewer" ref={gemRef}>
                    <div className="gem-glare"></div>
                    <div className="gem-image-container">
                        <img
                            src={GEMS_DATA[activeIndex].img}
                            alt={GEMS_DATA[activeIndex].name}
                            className="gem-image-current"
                        />
                    </div>
                </div>

            </div>

            {/* 💎 BACKGROUND OVERLAY TEXT */}
            <div className="gem-bg-text">
                {GEMS_DATA[activeIndex].bgText}
            </div>
        </section>
    );
};

export default GemRefractionSection;
