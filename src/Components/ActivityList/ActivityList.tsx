import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ActivityList.scss';

// Import local photos
import photo1 from './Photos/1.webp';
import photo2 from './Photos/2.webp';
import photo3 from './Photos/3.webp';

gsap.registerPlugin(useGSAP);

interface Activity {
    id: number;
    title: string;
    tags: string[];
    image: string;
}

const activities: Activity[] = [
    {
        id: 1,
        title: 'Hypatia of Alexandria',
        tags: ['MATHEMATICS', 'PHILOSOPHY', 'ANCIENT WORLD'],
        image: photo1
    },
    {
        id: 2,
        title: 'Artemisia Gentileschi',
        tags: ['BAROQUE ART', 'PAINTER', 'STRENGTH'],
        image: photo2
    },
    {
        id: 3,
        title: 'Ada Lovelace',
        tags: ['COMPUTING', 'VISIONARY', '19TH CENTURY'],
        image: photo3
    },
    {
        id: 4,
        title: 'Marie Curie',
        tags: ['SCIENCE', 'NOBEL PRIZE', 'RADIOACTIVITY'],
        image: photo1
    },
];

export const ActivityList: React.FC = () => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped mouse tracking with quickTo
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
        <div ref={containerRef} className="activity-list-container" onMouseLeave={handleMouseLeave}>
            <div className="list-wrapper">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="activity-item"
                        onMouseEnter={() => handleMouseEnter(activity.id, activity.image)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="info-content">
                            <h2 className="title">{activity.title}</h2>
                            <div className="tags-container">
                                {activity.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="arrow-button">
                            {hoveredId === activity.id ? (
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
                className="floating-image-container"
                style={{ opacity: 0, visibility: activeImage ? 'visible' : 'hidden' }}
            >
                {activeImage && (
                    <>
                        <img src={activeImage} alt="Preview" />
                        <div className="explore-label">EXPLORE NOW</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivityList;
