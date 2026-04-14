import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomParallax.scss';

import bg1 from '../../../../assets/img/Background_1.webp';
import bg2 from '../../../../assets/img/Background_2.webp';
import bg3 from '../../../../assets/img/Background_3.webp';
import bg4 from '../../../../assets/img/Background_4.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    {
        id: '1',
        category: 'SPRING TOURS',
        badgeColor: '#f8bbd0',
        title: 'Cherry Blossom Walk',
        image: bg1,
        duration: '2.5 HOURS',
        price: 'FROM 52 €'
    },
    {
        id: '2',
        category: 'WORKSHOPS',
        badgeColor: '#f8bbd0',
        title: 'Floral Arranging Masterclass',
        image: bg2, 
        duration: '2.5 HOURS',
        price: 'FROM 131 €'
    },
    {
        id: '3',
        category: 'WORKSHOPS',
        badgeColor: '#f8bbd0',
        title: 'Petal Tea Ceremony',
        image: bg3,
        duration: '3.0 HOURS',
        price: 'FROM 95 €'
    },
    {
        id: '4',
        category: 'BOAT CRUISE',
        badgeColor: '#f48fb1',
        title: 'Sakura River Cruise',
        image: bg4,
        duration: '1.5 HOURS',
        price: 'FROM 35 €'
    }
];

export const BlossomParallax: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.blossom-gallery-card');

        cards.forEach((card: any) => {
            const image = card.querySelector('.blossom-parallax-image');
            const wrapper = card.querySelector('.blossom-image-wrapper');

            if (image && wrapper) {
                gsap.set(image, { scale: 1.25 });

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

                const enterEv = () => gsap.to(image, { scale: 1.32, duration: 0.8, ease: "power3.out" });
                const leaveEv = () => gsap.to(image, { scale: 1.25, duration: 0.8, ease: "power3.out" });
                
                card.addEventListener('mouseenter', enterEv);
                card.addEventListener('mouseleave', leaveEv);
            }
        });

    }, { scope: containerRef }); 
    
    return (
        <div ref={containerRef} className="blossom-parallax-container">
            {galleryData.map((item) => (
                <div className="blossom-gallery-card" key={item.id}>
                    <div className="blossom-image-wrapper">
                        <div 
                            className="blossom-category-badge" 
                            style={{ backgroundColor: item.badgeColor }}
                        >
                            {item.category}
                        </div>
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="blossom-parallax-image"
                        />
                    </div>
                    
                    <div className="blossom-content-wrapper">
                        <h3 className="blossom-title">{item.title}</h3>
                        <div className="blossom-divider"></div>
                        <div className="blossom-details-row">
                            <span className="blossom-detail-pill">{item.duration}</span>
                            <span className="blossom-detail-pill">{item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlossomParallax;
