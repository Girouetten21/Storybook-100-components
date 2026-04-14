import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomStackedCards.scss';

import bg1 from '../../../../assets/img/Background_1.webp';
import bg2 from '../../../../assets/img/Background_2.webp';
import bg3 from '../../../../assets/img/Background_3.webp';
import bg4 from '../../../../assets/img/Background_4.webp';

const toursData = [
    {
        id: '1',
        category: 'SPRING WALKS',
        title: 'Morning Dew in the Garden',
        image: bg1,
        duration: '2.5HOURS',
        price: 'FROM 52€'
    },
    {
        id: '2',
        category: 'NATURE SESSIONS',
        title: 'Petal Meditation and Tea',
        image: bg2,
        duration: '3.0HOURS',
        price: 'FROM 75€'
    },
    {
        id: '3',
        category: 'FLORAL DESIGN',
        title: 'Create Your Eternal Bouquet',
        image: bg3,
        duration: '2.0HOURS',
        price: 'FROM 120€'
    },
    {
        id: '4',
        category: 'NIGHT BLOOMS',
        title: 'Moonlit Sakura Experience',
        image: bg4,
        duration: '4.0HOURS',
        price: 'FROM 90€'
    }
];

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const BlossomStackedCards: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containersRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        containersRef.current.forEach((container, i) => {
            if (!container) return;
            const card = cardsRef.current[i];
            
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

            const elementsToAnimate = container.querySelectorAll(
                '.blossom-tag, .blossom-title, .blossom-details .blossom-pill, .blossom-actions button'
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
        <div className="blossom-stacked-wrapper">
            {toursData.map((tour, index) => (
                <div 
                    className="blossom-sticky-container" 
                    key={tour.id} 
                    style={{ zIndex: index }}
                    ref={el => { containersRef.current[index] = el; }}
                >
                    <div 
                        className="blossom-card" 
                        ref={el => { cardsRef.current[index] = el; }}
                        style={{ backgroundImage: `url(${tour.image})` }}
                    >
                        <div className="blossom-card-content">
                            <div className="blossom-tag">
                                {tour.category}
                            </div>
                            
                            <h2 className="blossom-title">
                                {tour.title}
                            </h2>

                            <div className="blossom-bottom-row">
                                <div className="blossom-details">
                                    <span className="blossom-pill">{tour.duration}</span>
                                    <span className="blossom-pill">{tour.price}</span>
                                </div>
                                
                                <div className="blossom-actions">
                                    <button className="blossom-explore-btn">Explore More</button>
                                    <button className="blossom-arrow-btn" aria-label="Explore link">
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

export default BlossomStackedCards;
