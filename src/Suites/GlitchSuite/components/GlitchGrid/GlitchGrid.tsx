import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './GlitchGrid.scss';

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
    { id: 1, type: 'text', content: 'SYSTEM_FAILURE', size: 'large', color: '#ccff00' },
    { id: 2, type: 'image', content: 'GLITCH_01', size: 'medium' },
    { id: 3, type: 'text', content: 'ENTROPY_V02', size: 'small', color: '#ff00ff' },
    { id: 4, type: 'text', content: 'NULL_POINTER', size: 'medium' },
    { id: 5, type: 'image', content: 'DISRUPT_0X', size: 'large' },
    { id: 6, type: 'text', content: 'LOST_DATA', size: 'small' },
];

export const GlitchGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>('.grid-item');

        items.forEach((item, i) => {
            gsap.from(item, {
                x: i % 2 === 0 ? -100 : 100,
                y: 100,
                rotation: i % 2 === 0 ? -15 : 15,
                autoAlpha: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "top 40%",
                    scrub: 1,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="glitch-grid-section">
            <div className="grid-header">
                <span className="terminal-prompt">&gt; ls ./entropy_archives</span>
            </div>

            <div className="glitch-bento-grid">
                {gridItems.map((item) => (
                    <div key={item.id} className={`grid-item ${item.size}`} style={{ borderColor: item.color }}>
                        {item.type === 'text' ? (
                            <div className="grid-text-content">
                                <span className="id-tag">REF:00{item.id}</span>
                                <h3>{item.content}</h3>
                            </div>
                        ) : (
                            <div className="grid-image-placeholder">
                                <div className="glitch-overlay"></div>
                                <span>{item.content}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GlitchGrid;
