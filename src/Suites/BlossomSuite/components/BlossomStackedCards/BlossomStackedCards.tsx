import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomStackedCards.scss';

import bg1 from '../../img/blossom_1.png';
import bg2 from '../../img/blossom_2.png';
import bg3 from '../../img/blossom_3.png';
import bg4 from '../../img/blossom_4.png';

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
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.blossom-sticky-container');
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${cards.length * 100}%`,
                pin: true,
                scrub: 1,
            }
        });

        cards.forEach((card: any, i) => {
            if (i === cards.length - 1) return; // Last card stays visible at the end
            
            const position = i * 1;
            
            // Peel the current card UP to reveal the one underneath
            tl.to(card, {
                yPercent: -100, 
                ease: "none", 
                duration: 1
            }, position);

            // The card UNDERNEATH (i+1) starts dark and gets bright
            const nextCard = cards[i + 1] as HTMLElement;
            tl.fromTo(nextCard, 
                { filter: "brightness(0.4) blur(10px)", scale: 0.9 },
                { 
                    filter: "brightness(1) blur(0px)", 
                    scale: 1,
                    ease: "none", 
                    duration: 1 
                }, 
                position
            );
        });

    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="blossom-stacked-wrapper">
            <div ref={triggerRef} className="blossom-stacked-pin-area">
                {toursData.map((tour, index) => (
                    <div 
                        className="blossom-sticky-container" 
                        key={tour.id} 
                        style={{ zIndex: toursData.length - index }}
                    >
                        <div 
                            className="blossom-card" 
                            style={{ backgroundImage: `url(${tour.image})` }}
                        >
                            <div className="blossom-card-content">
                                <div className="blossom-tag">{tour.category}</div>
                                <h2 className="blossom-title">{tour.title}</h2>
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
        </div>
    );
};

export default BlossomStackedCards;
