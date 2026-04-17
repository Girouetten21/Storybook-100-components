import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomGallery.scss';

import img1 from '../../img/blossom_1.png';
import img2 from '../../img/blossom_2.png';
import img3 from '../../img/blossom_3.png';
import img4 from '../../img/blossom_4.png';
import img5 from '../../img/blossom_hero.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    { id: '1', title: 'Eternal Sakura', image: img1 },
    { id: '2', title: 'Verdant Ivy', image: img2 },
    { id: '3', title: 'Wooden Grace', image: img3 },
    { id: '4', title: 'Zen Reflection', image: img4 },
    { id: '5', title: 'Majestic Gate', image: img5 },
];

export const BlossomGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>('.blossom-gallery-item');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${items.length * 100}%`,
                pin: pinRef.current,
                scrub: 1, 
            }
        });

        gsap.to(items[0].querySelectorAll('.blossom-number, .blossom-title'), {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
        
        gsap.to(items[0].querySelector('img'), {
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        });

        items.forEach((item, i) => {
            if (i === 0) return; 

            const img = item.querySelector('img');
            const texts = item.querySelectorAll('.blossom-number, .blossom-title');

            gsap.set(texts, { autoAlpha: 0, y: 30 });

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

            const prevImg = items[i - 1].querySelector('img');
            tl.to(prevImg, {
                scale: 0.95,
                filter: "brightness(0.3)",
                ease: "none"
            }, `slide${i}`);
        });

    }, { scope: sectionRef });

    return (
        <section className="blossom-gallery-wrapper" ref={sectionRef}>
            <div className="blossom-gallery-pin" ref={pinRef}>
                {galleryData.map((item, index) => (
                    <div className="blossom-gallery-item" key={item.id} style={{ zIndex: index }}>
                        <img src={item.image} alt={item.title} />
                        <div className="blossom-content">
                            <span className="blossom-number">0{index + 1} / 0{galleryData.length}</span>
                            <h2 className="blossom-title">{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlossomGallery;
