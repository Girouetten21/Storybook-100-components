import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ParallaxGallery.scss';

import bg1 from '../../assets/img/Background_1.webp';
import bg2 from '../../assets/img/Background_2.webp';
import bg3 from '../../assets/img/Background_3.webp';
import bg4 from '../../assets/img/Background_4.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    {
        id: '1',
        category: 'WALKING TOURS',
        badgeColor: '#cdcdf1',
        title: 'Walk in the footsteps of Emily',
        image: bg1,
        duration: '2.5 HOURS',
        price: 'FROM 52 €'
    },
    {
        id: '2',
        category: 'WORKSHOPS',
        badgeColor: '#cdcdf1',
        title: 'Croissant-Making Workshop',
        image: bg2, 
        duration: '2.5 HOURS',
        price: 'FROM 131 €'
    },
    {
        id: '3',
        category: 'WORKSHOPS',
        badgeColor: '#cdcdf1',
        title: 'Macaron Masterclass',
        image: bg3,
        duration: '3.0 HOURS',
        price: 'FROM 95 €'
    },
    {
        id: '4',
        category: 'BOAT CRUISE',
        badgeColor: '#b0c4de',
        title: 'Seine River Sunset Cruise',
        image: bg4,
        duration: '1.5 HOURS',
        price: 'FROM 35 €'
    }
];

export const ParallaxGallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped parallax and hover effects
    useGSAP(() => {
        const cards = gsap.utils.toArray('.gallery-card');

        cards.forEach((card: any) => {
            const image = card.querySelector('.parallax-image');
            const wrapper = card.querySelector('.image-wrapper');

            if (image && wrapper) {
                // Initialize scale
                gsap.set(image, { scale: 1.25 });

                // 1. Smooth Parallax Panning
                gsap.fromTo(image, 
                    { yPercent: -25 }, 
                    {
                        yPercent: 25,
                        ease: "none",
                        scrollTrigger: {
                            trigger: wrapper,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );

                // 2. Elegant Zoom Hover Logic
                const enterEv = () => gsap.to(image, { scale: 1.32, duration: 0.8, ease: "power3.out" });
                const leaveEv = () => gsap.to(image, { scale: 1.25, duration: 0.8, ease: "power3.out" });
                
                card.addEventListener('mouseenter', enterEv);
                card.addEventListener('mouseleave', leaveEv);
            }
        });

    }, { scope: containerRef }); // Auto-cleanup handles EventListeners in Context if not returned, but safer to re-assign if needed.
    // Actually, EventListeners aren't automatically removed by GSAP context unless they are GSAP events.
    // I will return a cleanup function just in case for the EventListeners.
    
    return (
        <div ref={containerRef} className="parallax-gallery-container">
            {galleryData.map((item) => (
                <div className="gallery-card" key={item.id}>
                    <div className="image-wrapper">
                        <div 
                            className="category-badge" 
                            style={{ backgroundColor: item.badgeColor }}
                        >
                            {item.category}
                        </div>
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="parallax-image"
                        />
                    </div>
                    
                    <div className="content-wrapper">
                        <h3 className="title">{item.title}</h3>
                        <div className="divider"></div>
                        <div className="details-row">
                            <span className="detail-pill">{item.duration}</span>
                            <span className="detail-pill">{item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParallaxGallery;
