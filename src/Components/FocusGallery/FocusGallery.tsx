import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FocusGallery.scss';

import img1 from '../../assets/img/Space_1.webp';
import img2 from '../../assets/img/Background_1.webp';
import img3 from '../../assets/img/Character_2.webp';
import img4 from '../../assets/img/Space_2.webp';
import img5 from '../../assets/img/Background_2.webp';

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        if (!sectionRef.current || !pinRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>('.focus-gallery-item');

            // Set up a master timeline pinned to the huge wrapping section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    // Scroll distance based on the number of items
                    end: `+=${items.length * 100}%`,
                    pin: pinRef.current,
                    scrub: 1, // Smooth scrubbing
                }
            });

            // Initial animation for the first slide's text
            gsap.to(items[0].querySelectorAll('.focus-number, .focus-title'), {
                y: 0,
                opacity: 1,
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

            // Iterate over items to build the staggered wipe effect
            items.forEach((item, i) => {
                if (i === 0) return; // Skip the first one as it's already visible

                const img = item.querySelector('img');
                const texts = item.querySelectorAll('.focus-number, .focus-title');

                // Keep text hidden initially relative to timeline timeline
                gsap.set(texts, { opacity: 0, y: 30 });

                // The Wipe Reveal for the current card covering the previous one
                tl.to(item, {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    ease: "none",
                }, `slide${i}`)
                    // Parallax Zoom out slightly on the image as it wipes in
                    .to(img, {
                        scale: 1.05,
                        ease: "none"
                    }, `slide${i}`)
                    // Fade and float up the text exactly when the wipe finishes
                    .to(texts, {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "power2.out", // Notice we don't 'scrub' the text entrance perfectly linearly, we give it a pop
                    }, `slide${i}+=0.3`); // Offset slightly so it starts as the wipe is halfway done

                // Optional: Slightly dim and scale down the PREVIOUS item to give a depth feel
                const prevImg = items[i - 1].querySelector('img');
                tl.to(prevImg, {
                    scale: 0.95,
                    filter: "brightness(0.3)",
                    ease: "none"
                }, `slide${i}`);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

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
