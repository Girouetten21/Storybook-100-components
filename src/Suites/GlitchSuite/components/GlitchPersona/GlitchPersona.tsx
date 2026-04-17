import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlitchPersona.scss';
import portraitImg from '../../img/glitch_portrait.png';

gsap.registerPlugin(ScrollTrigger);

export const GlitchPersona: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const slices = gsap.utils.toArray<HTMLElement>('.persona-slice');
        
        slices.forEach((slice, i) => {
            gsap.to(slice, {
                x: i % 2 === 0 ? '-30%' : '30%',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        gsap.from('.persona-meta-item', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%"
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="glitch-persona">
            <div className="persona-layout">
                <div className="persona-info-side">
                    <div className="persona-id-group">
                        <span className="persona-id">ENTITY_ID: 0X_FRACTAL</span>
                        <div className="persona-tag">STATUS: FRAGMENTED</div>
                    </div>
                    
                    <h2 className="persona-headline">GHOSTS<br />OF THE<br /><span>MACHINE</span></h2>
                    
                    <div className="persona-meta">
                        <div className="persona-meta-item">
                            <span>MEMORY_BLOCK</span>
                            <span>#402-DELTA</span>
                        </div>
                        <div className="persona-meta-item">
                            <span>RECOVERY_RATE</span>
                            <span>42%_ERROR</span>
                        </div>
                    </div>
                </div>

                <div className="persona-visual-side">
                    <div className="persona-slices-container">
                        {[...Array(6)].map((_, i) => (
                            <div 
                                key={i} 
                                className="persona-slice"
                                style={{ 
                                    backgroundImage: `url(${portraitImg})`,
                                    backgroundPosition: `0 ${i * 20}%`,
                                    backgroundSize: 'cover'
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="persona-glitch-overlay"></div>
                </div>
            </div>

            <div className="persona-abstract-description">
                <p>The digital footprint reflects a reality that no longer exists. Each pixel is a fragment of a lost narrative, flickering between existence and the void. To see the whole, one must embrace the shatter.</p>
            </div>
        </section>
    );
};

export default GlitchPersona;
