import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomDeck.scss';

import img1 from '../../../../assets/img/Background_1.webp';
import img2 from '../../../../assets/img/Space_1.webp';
import img3 from '../../../../assets/img/Character_1.webp';
import img4 from '../../../../assets/img/Background_2.webp';
import img5 from '../../../../assets/img/Character_2.webp';
import img6 from '../../../../assets/img/Space_2.webp';
import img7 from '../../../../assets/img/Background_3.webp';
import img8 from '../../../../assets/img/Background_4.webp';
import img9 from '../../../../assets/img/Character_3.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export const BlossomDeck: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.blossom-deck-card') as HTMLElement[];

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2500", 
                scrub: 1.5, 
                pin: true,
            }
        });

        gsap.set(cards, {
            xPercent: () => gsap.utils.random(-30, 30), 
            yPercent: () => gsap.utils.random(-30, 30), 
            rotation: () => gsap.utils.random(-40, 40), 
            autoAlpha: 0,
            scale: 0.1 
        });
        
        gsap.set('.blossom-deck-title', { xPercent: -50, yPercent: -50, x: 0, y: 0 });

        tl.to(cards, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.out"
        });

        tl.to('.blossom-deck-title', {
            yPercent: -180, 
            autoAlpha: 0,
            scale: 0.8,
            duration: 2,
            ease: "expo.inOut" 
        }, "deal"); 

        cards.forEach((card, i) => {
            const col = (i % 3) - 1; 
            const row = Math.floor(i / 3) - 1; 
            const destX = col * 115; 
            const destY = row * 115; 
            const organicTilt = gsap.utils.random(-4, 4);

            tl.to(card, {
                xPercent: destX,
                yPercent: destY,
                rotation: organicTilt,
                duration: 2.5, 
                ease: "expo.inOut"
            }, "deal");
        });

    }, { scope: sectionRef });

    return (
        <section className="blossom-deck-wrapper" ref={sectionRef}>
            <div className="blossom-deck-title">
                <p>Witness the</p>
                <h2>Full Blossom</h2>
            </div>

            <div className="blossom-deck-scene">
                {images.map((img, index) => (
                    <div className="blossom-deck-card" key={index}>
                        <img src={img} alt={`Blossom piece ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlossomDeck;
