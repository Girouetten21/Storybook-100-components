import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './BlossomTimeline.scss';

import photo1 from '../../../../assets/img/Space_1.webp';
import photo2 from '../../../../assets/img/Character_2.webp';
import photo3 from '../../../../assets/img/Background_3.webp';

gsap.registerPlugin(useGSAP);

interface BlossomEvent {
    id: number;
    title: string;
    tags: string[];
    image: string;
}

const events: BlossomEvent[] = [
    {
        id: 1,
        title: 'Floral Genesis',
        tags: ['ORIGIN', 'SPRING', 'NATURE'],
        image: photo1
    },
    {
        id: 2,
        title: 'Petal Synthesis',
        tags: ['GROWTH', 'BAROQUE', 'ART'],
        image: photo2
    },
    {
        id: 3,
        title: 'Esthetic Bloom',
        tags: ['VISION', 'BEAUTY', 'HARMONY'],
        image: photo3
    },
    {
        id: 4,
        title: 'Eternal Garden',
        tags: ['LEGACY', 'LIFE', 'SPIRIT'],
        image: photo1
    },
];

export const BlossomTimeline: React.FC = () => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageContainerRef.current) return;

        const xTo = gsap.quickTo(imageContainerRef.current, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(imageContainerRef.current, "y", { duration: 0.6, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, { scope: containerRef });

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleMouseEnter = contextSafe((id: number, image: string) => {
        setActiveImage(image);
        setHoveredId(id);
        if (imageContainerRef.current) {
            gsap.to(imageContainerRef.current, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    });

    const handleMouseLeave = contextSafe(() => {
        setHoveredId(null);
        if (imageContainerRef.current) {
            gsap.to(imageContainerRef.current, {
                autoAlpha: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in",
                overwrite: "auto",
                onComplete: () => {
                    setActiveImage(null);
                }
            });
        } else {
            setActiveImage(null);
        }
    });

    return (
        <div ref={containerRef} className="blossom-timeline-container" onMouseLeave={handleMouseLeave}>
            <div className="blossom-list-wrapper">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="blossom-event-item"
                        onMouseEnter={() => handleMouseEnter(event.id, event.image)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="blossom-info-content">
                            <h2 className="blossom-title">{event.title}</h2>
                            <div className="blossom-tags-container">
                                {event.tags.map((tag, index) => (
                                    <span key={index} className="blossom-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="blossom-arrow-button">
                            {hoveredId === event.id ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div
                ref={imageContainerRef}
                className="blossom-floating-image-container"
                style={{ opacity: 0, visibility: activeImage ? 'visible' : 'hidden' }}
            >
                {activeImage && (
                    <>
                        <img src={activeImage} alt="Preview" />
                        <div className="blossom-explore-label">EXPLORE NOW</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlossomTimeline;
