import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FocusGallery.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Background_1.webp';
import img3 from '../../assets/img/Character_2.webp';
import img4 from '../../assets/img/Space_2.webp';
import img5 from '../../assets/img/Background_2.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    { id: '1', title: 'The Void', image: img1 },
    { id: '2', title: 'Awakening', image: img2 },
    { id: '3', title: 'Gaze', image: img3 },
    { id: '4', title: 'Nebula', image: img4 },
    { id: '5', title: 'Radiance', image: img5 },
];

export const FocusGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped wipe reveal logic
    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>('.focus-gallery-item');

        // Set up a master timeline pinned to the huge wrapping section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${items.length * 100}%`,
                pin: pinRef.current,
                scrub: 1, 
            }
        });

        // Initial animation for the first slide's text
        gsap.to(items[0].querySelectorAll('.focus-number, .focus-title'), {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
        
        // Initial parallax for first image
        gsap.to(items[0].querySelector('img'), {
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        });

        // Iterate over items for the staggered wipe effect
        items.forEach((item, i) => {
            if (i === 0) return; 

            const img = item.querySelector('img');
            const texts = item.querySelectorAll('.focus-number, .focus-title');

            gsap.set(texts, { autoAlpha: 0, y: 30 });

            // The Wipe Reveal for the current card covering the previous one
            tl.to(item, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: "none",
            }, `slide${i}`)
                .to(img, {
                    scale: 1.05,
                    ease: "none"
                }, `slide${i}`)
                .to(texts, {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                }, `slide${i}+=0.3`); 

            // Dim and scale down the PREVIOUS item 
            const prevImg = items[i - 1].querySelector('img');
            tl.to(prevImg, {
                scale: 0.95,
                filter: "brightness(0.3)",
                ease: "none"
            }, `slide${i}`);
        });

    }, { scope: sectionRef });

    return (
        // The wrapper gives us the scroll height necessary to scrub the pinned section
        <section className="focus-gallery-wrapper" ref={sectionRef}>
            <div className="focus-gallery-pin" ref={pinRef}>
                {galleryData.map((item, index) => (
                    <div className="focus-gallery-item" key={item.id} style={{ zIndex: index }}>
                        <img src={item.image} alt={item.title} />
                        <div className="focus-content">
                            <span className="focus-number">0{index + 1} / 0{galleryData.length}</span>
                            <h2 className="focus-title">{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FocusGallery;
