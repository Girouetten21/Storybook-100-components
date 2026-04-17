import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlitchTerminalCarousel.scss';
import cityImg from '../../img/glitch_city.png';
import techImg from '../../img/glitch_tech.png';
import portraitImg from '../../img/glitch_portrait.png';

gsap.registerPlugin(ScrollTrigger);

const carouselData = [
    { 
        id: 'DATA_01', 
        img: cityImg, 
        title: 'URBAN_FRAGMENTS',
        desc: 'Analyzing architectural ghosting in neo-tokyo sectors. Visual data corrupted by 14% signal loss.'
    },
    { 
        id: 'DATA_02', 
        img: techImg, 
        title: 'TECHNICAL_VOID',
        desc: 'Synthesizing neural link latency. Protocol bypass initiated at 0400 hours. Secure channel active.'
    },
    { 
        id: 'DATA_03', 
        img: portraitImg, 
        title: 'ENTITY_OS',
        desc: 'Identity fragmentation detected. Reconstructing core consciousness from distributed cache nodes.'
    },
    { 
        id: 'DATA_04', 
        img: cityImg, 
        title: 'RECURSION_SCAN',
        desc: 'Executing infinite loop diagnostics. Sector 7 remains unreachable under current clearance levels.'
    },
];

export const GlitchTerminalCarousel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const wrapper = containerRef.current?.querySelector('.carousel-wrapper') as HTMLElement;
        if (!wrapper) return;

        gsap.to(wrapper, {
            x: () => -(wrapper.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                end: () => "+=" + (wrapper.scrollWidth - window.innerWidth)
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="glitch-terminal-carousel">
            <div className="carousel-pin-trigger">
                <div className="carousel-bg-noise"></div>
                <div className="carousel-bg-hud">
                    <div className="hud-line horizontal"></div>
                    <div className="hud-line vertical"></div>
                    <div className="hud-crosshair"></div>
                    <div className="hud-coordinates">
                        <span>LAT: 40.7128 N</span>
                        <span>LONG: 74.0060 W</span>
                    </div>
                </div>

                <div className="terminal-header">
                    <span className="dot"></span>
                    <span className="window-title">DATA_STREAM_GALLERY.EXE</span>
                </div>
                
                <div className="carousel-wrapper">
                    {carouselData.map((item) => (
                        <div key={item.id} className="carousel-card">
                            <div className="card-inner">
                                <div className="card-visual">
                                    <img src={item.img} alt={item.title} />
                                    <div className="card-glitch-layer"></div>
                                </div>
                                <div className="card-info">
                                    <span className="item-id">{item.id}</span>
                                    <h4>{item.title}</h4>
                                    <p className="item-desc">{item.desc}</p>
                                    <div className="system-bar">
                                        <div className="fill"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="terminal-footer">
                    <span>SCROLL_TO_DRIVE_STREAM</span>
                    <span>STATUS: STABLE_FLUX</span>
                </div>
            </div>
        </section>
    );
};

export default GlitchTerminalCarousel;
