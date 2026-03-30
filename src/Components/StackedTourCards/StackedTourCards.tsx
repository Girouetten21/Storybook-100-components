import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './StackedTourCards.scss';

import bg1 from '../../assets/img/Background_1.webp';
import bg2 from '../../assets/img/Background_2.webp';
import bg3 from '../../assets/img/Background_3.webp';
import bg4 from '../../assets/img/Background_4.webp';

const toursData = [
    {
        id: '1',
        category: 'WALKING TOURS',
        title: 'Walk in the footsteps of Emily',
        image: bg1,
        duration: '2.5HOURS',
        price: 'FROM 52€'
    },
    {
        id: '2',
        category: 'CULINARY EXPERIENCES',
        title: 'Taste the hidden gems of Parisian Patisseries',
        image: bg2,
        duration: '3.0HOURS',
        price: 'FROM 75€'
    },
    {
        id: '3',
        category: 'ART & CULTURE',
        title: 'Exclusive twilight tour of the Louvre',
        image: bg3,
        duration: '2.0HOURS',
        price: 'FROM 120€'
    },
    {
        id: '4',
        category: 'NIGHTLIFE',
        title: 'Midnight jazz and wine by the Seine',
        image: bg4,
        duration: '4.0HOURS',
        price: 'FROM 90€'
    }
];

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const StackedTourCards: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containersRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // POWERED BY GSAP-SKILLS: Scoped stacking and optical blur orchestration
    useGSAP(() => {
        containersRef.current.forEach((container, i) => {
            if (!container) return;
            const card = cardsRef.current[i];
            
            // 1. Zoom Out and True Optical Blur Effect
            if (card) {
                gsap.to(card, {
                    scale: 0.88,
                    filter: "blur(8px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom top", 
                        scrub: true,
                    }
                });
            }

            // 2. Entrance Animation for Texts
            const elementsToAnimate = container.querySelectorAll(
                '.category-tag, .title, .details-pills .pill, .actions button'
            );
            
            gsap.fromTo(elementsToAnimate, 
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%", 
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: wrapperRef });

    return (
        <div className="stacked-tours-wrapper">
            {toursData.map((tour, index) => (
                <div 
                    className="tour-sticky-container" 
                    key={tour.id} 
                    style={{ zIndex: index }}
                    ref={el => { containersRef.current[index] = el; }}
                >
                    <div 
                        className="tour-card" 
                        ref={el => { cardsRef.current[index] = el; }}
                        style={{ backgroundImage: `url(${tour.image})` }}
                    >
                        <div className="card-content">
                            <div className="category-tag">
                                {tour.category}
                            </div>
                            
                            <h2 className="title">
                                {tour.title}
                            </h2>

                            <div className="bottom-row">
                                <div className="details-pills">
                                    <span className="pill">{tour.duration}</span>
                                    <span className="pill">{tour.price}</span>
                                </div>
                                
                                <div className="actions">
                                    <button className="explore-btn">Explore More</button>
                                    <button className="arrow-btn" aria-label="Explore link">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StackedTourCards;
