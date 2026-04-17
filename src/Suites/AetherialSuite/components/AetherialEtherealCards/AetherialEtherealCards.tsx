import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AetherialEtherealCards.scss';

const CARDS_DATA = [
    {
        tag: "Inertia",
        title: "Weightless Presence",
        desc: "Architecture that defies its own mass, floating between the digital and physical planes.",
        parallax: 40
    },
    {
        tag: "Opacity",
        title: "Transparent Soul",
        desc: "Layers of translucent material that reveal the internal mathematical beauty of the structure.",
        parallax: -30
    },
    {
        tag: "Flux",
        title: "Dynamic Equilibrium",
        desc: "A constant state of movement, perfectly balanced in the silence of space.",
        parallax: 60
    }
];

export const AetherialEtherealCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Title Entrance
        gsap.fromTo('.ethereal-title',
            { autoAlpha: 0, y: 50, filter: 'blur(10px)' },
            { 
                autoAlpha: 1, y: 0, filter: 'blur(0px)', 
                duration: 1.5, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.ethereal-title',
                    start: 'top 85%'
                }
            }
        );

        // 2. Parallax and reveal for cards
        const cards = gsap.utils.toArray('.ethereal-card');
        cards.forEach((card: any, i: number) => {
            const parallaxVal = CARDS_DATA[i].parallax;
            const cardInnerContent = card.querySelectorAll('.card-glass-body, .card-bg-indicator');
            
            // Replaced `card` with `cardInnerContent` so the y-transforms don't fight
            gsap.fromTo(cardInnerContent,
                { autoAlpha: 0, y: 100 },
                { 
                    autoAlpha: 1, y: 0, 
                    duration: 1.2, 
                    delay: i * 0.1,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );

            // Continuous Parallax applied to the Outer wrapper
            gsap.to(card, {
                y: parallaxVal,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aetherial-ethereal-cards">
            
            <div className="ethereal-header">
                <h2 className="ethereal-title">Beyond the <i>Threshold</i></h2>
            </div>

            <div className="ethereal-grid">
                {CARDS_DATA.map((item, index) => (
                    <div key={index} className="ethereal-card">
                        <div className="card-glass-body">
                            <span className="card-tag">{item.tag}</span>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-desc">{item.desc}</p>
                            
                            <div className="card-ornament">
                                <div className="ornament-line"></div>
                                <div className="ornament-dot"></div>
                            </div>
                        </div>
                        {/* Decorative background numbers or shapes */}
                        <div className="card-bg-indicator">0{index + 1}</div>
                    </div>
                ))}
            </div>

            {/* Floating particles or atmospheric details */}
            <div className="ethereal-aura aura-1"></div>
            <div className="ethereal-aura aura-2"></div>
        </section>
    );
};

export default AetherialEtherealCards;
