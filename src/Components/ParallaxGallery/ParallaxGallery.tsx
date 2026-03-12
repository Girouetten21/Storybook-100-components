import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxGallery.scss';

import bg1 from '../../assets/img/Background_1.webp';
import bg2 from '../../assets/img/Background_2.webp';
import bg3 from '../../assets/img/Background_3.webp';
import bg4 from '../../assets/img/Background_4.webp';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
    {
        id: '1',
        category: 'WALKING TOURS',
        badgeColor: '#cdcdf1', // light purple
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
        // Assuming we use another background for variety
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
        badgeColor: '#b0c4de', // slightly different color for variety
        title: 'Seine River Sunset Cruise',
        image: bg4,
        duration: '1.5 HOURS',
        price: 'FROM 35 €'
    }
];

export const ParallaxGallery: React.FC = () => {
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        // Safe parallax effect application
        imagesRef.current.forEach((image) => {
            if (!image) return;
            
            // The image wrapper will be the trigger
            const wrapper = image.parentElement;
            
            if (wrapper) {
                // Initialize scale independently from the scroll tween
                gsap.set(image, { scale: 1.25 });

                // Smooth Parallax Panning (more intense -25% to 25%)
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

                // Elegant Zoom Hover Effect
                const card = wrapper.parentElement;
                if (card) {
                    const enterEv = () => gsap.to(image, { scale: 1.32, duration: 0.8, ease: "power3.out" });
                    const leaveEv = () => gsap.to(image, { scale: 1.25, duration: 0.8, ease: "power3.out" });
                    
                    card.addEventListener('mouseenter', enterEv);
                    card.addEventListener('mouseleave', leaveEv);
                    
                    // Clean up specific events just in case
                    (card as any)._cleanUpEvents = () => {
                        card.removeEventListener('mouseenter', enterEv);
                        card.removeEventListener('mouseleave', leaveEv);
                    };
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            // Cleanup custom event listeners
            imagesRef.current.forEach(image => {
                if (image?.parentElement?.parentElement) {
                    const card = image.parentElement.parentElement;
                    if ((card as any)._cleanUpEvents) (card as any)._cleanUpEvents();
                }
            });
        };
    }, []);

    return (
        <div className="parallax-gallery-container">
            {galleryData.map((item, index) => (
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
                            ref={el => { imagesRef.current[index] = el; }}
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
