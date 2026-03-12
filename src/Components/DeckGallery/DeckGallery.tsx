import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DeckGallery.scss';

// Import exactly 9 images to form a 3x3 grid perfectly!
import img1 from '../../assets/img/Background_1.webp';
import img2 from '../../assets/img/Space_1.webp';
import img3 from '../../assets/img/Character_1.webp';
import img4 from '../../assets/img/Background_2.webp';
import img5 from '../../assets/img/Character_2.webp';
import img6 from '../../assets/img/Space_2.webp';
import img7 from '../../assets/img/Background_3.webp';
import img8 from '../../assets/img/Background_4.webp';
import img9 from '../../assets/img/Character_3.webp';

gsap.registerPlugin(ScrollTrigger);

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export const DeckGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !sceneRef.current) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.deck-card');

            // Set up the GSAP Master Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500", // Control the speed of the layout expansion
                    scrub: 1.5, // Buttery smooth scrubbing
                    pin: true,
                }
            });

            // 1. Initial State: The Messy Pile
            // Cards start completely transparent and rotated chaotically in the center
            gsap.set(cards, {
                xPercent: () => gsap.utils.random(-30, 30), // Messy X distribution
                yPercent: () => gsap.utils.random(-30, 30), // Messy Y distribution
                rotation: () => gsap.utils.random(-40, 40), // Chaotic tilts
                opacity: 0,
                scale: 0.1 // Shrunk deeply in the background
            });
            
            // Re-center title cleanly via GSAP for later animation safety
            gsap.set('.deck-title', { xPercent: -50, yPercent: -50, x: 0, y: 0 });

            // 2. The Pop-in
            // As soon as the user starts scrolling, the cards fade in behind the text
            tl.to(cards, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.02,
                ease: "power2.out"
            });

            // 3. The Grand Reveal (Dealing the Deck)
            // Title moves up and scales down to give room
            tl.to('.deck-title', {
                yPercent: -180, 
                opacity: 0,
                scale: 0.8,
                duration: 2,
                ease: "expo.inOut" // Dramatic exponential ease
            }, "deal"); // Use the 'deal' label to synchronize animations

            // The cards majestically fly to their 3x3 positions
            cards.forEach((card, i) => {
                // Determine 3x3 Grid Matrix Coordinates
                // Columns: Left (-1), Middle (0), Right (1)
                const col = (i % 3) - 1; 
                // Rows: Top (-1), Middle (0), Bottom (1)
                const row = Math.floor(i / 3) - 1; 

                // 110% = 100% of the card's own width + 10% gap. 
                // This makes the layout 100% responsive without Javascript Resize Listeners!
                const destX = col * 115; 
                const destY = row * 115; 
                
                // Add a micro-imperfection rotation at the end to make it look artistic, not robotic
                const organicTilt = gsap.utils.random(-4, 4);

                tl.to(card, {
                    xPercent: destX,
                    yPercent: destY,
                    rotation: organicTilt,
                    duration: 2.5, // Matches the title's dramatic timing
                    ease: "expo.inOut"
                }, "deal");
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="deck-wrapper" ref={sectionRef}>
            
            {/* The Floating Title */}
            <div className="deck-title">
                <p>Enter the</p>
                <h2>Immersion</h2>
            </div>

            {/* The Invisible Anchor that holds the Cards */}
            <div className="deck-scene" ref={sceneRef}>
                {images.map((img, index) => (
                    <div className="deck-card" key={index}>
                        <img src={img} alt={`Gallery grid piece ${index + 1}`} />
                    </div>
                ))}
            </div>

        </section>
    );
};

export default DeckGallery;
