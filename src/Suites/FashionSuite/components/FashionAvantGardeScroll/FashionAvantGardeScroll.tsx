import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FashionAvantGardeScroll.scss';

// Utilize existing project assets (preferring characters/fashion models)
import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FASHION_DATA = [
    { 
        id: '01', 
        collection: 'FW / 26', 
        title: 'Silhouette', 
        desc: 'Redefining the boundaries of structural form and body architecture.',
        img: img1 
    },
    { 
        id: '02', 
        collection: 'SS / 27', 
        title: 'Avant-Garde', 
        desc: 'A brutalist approach to modern tailoring and asymmetrical draping.',
        img: img2 
    },
    { 
        id: '03', 
        collection: 'RESORT', 
        title: 'Noir Elegance', 
        desc: 'Midnight tones colliding with pure geometric starkness.',
        img: img3 
    },
];

export const FashionAvantGardeScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: High-Fashion Stacked Clip-Path Transitions
    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.avant-slide');
        const metas = gsap.utils.toArray<HTMLElement>('.avant-meta');
        const indices = gsap.utils.toArray<HTMLElement>('.massive-index');
        if (slides.length === 0) return;

        // 1. Precise GSAP Setup
        const imgContainers = slides.map(s => s.querySelector('.avant-img-container') as HTMLElement);
        
        gsap.set(imgContainers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        
        // Use autoAlpha for indices with small Y offset for a cleaner transition
        gsap.set(indices.slice(1), { y: 200, autoAlpha: 0 });

        // Lock metadata visibility
        gsap.set(metas[0], { y: 0, autoAlpha: 1 });
        gsap.set(metas.slice(1), { y: 60, autoAlpha: 0 });

        // 2. Master Pinned Timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${slides.length * 120}%`,
                pin: pinRef.current,
                scrub: 1.2,
                anticipatePin: 1
            }
        });

        // 3. Sequential Scene Chaining
        slides.forEach((slide, i) => {
            if (i === 0) return;

            const prevSlide = slides[i - 1];
            const prevIndex = indices[i - 1];
            const prevImg = prevSlide.querySelector('img');
            const prevMeta = metas[i - 1];

            const currIndex = indices[i];
            const currImgContainer = slide.querySelector('.avant-img-container');
            const currImg = slide.querySelector('img');
            const currMeta = metas[i];

            // Set incoming image deeply zoomed
            gsap.set(currImg, { scale: 1.25, transformOrigin: 'center bottom' });

            masterTl
                // --- Step A: Sweep away old index, bring in new giant index ---
                .to(prevIndex, { y: -200, autoAlpha: 0, duration: 1, ease: 'power3.inOut' }, `scene${i}`)
                .fromTo(currIndex, 
                    { y: 200, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.inOut' }, 
                    `scene${i}`
                )

                // --- Step B: Deconstruct the previous slide's metadata and image ---
                .to(prevMeta, { y: -50, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, `scene${i}`)
                .to(prevImg, { 
                    scale: 0.85, 
                    autoAlpha: 0.3, // Replaced jumpy CSS 'filter' with a fluid 60FPS opacity fade into solid black
                    duration: 1, 
                    ease: 'power2.inOut' 
                }, `scene${i}`)

                // --- Step C: Unmask the new Image Container (Flawless wipe without clipping text) ---
                .to(currImgContainer, { 
                    clipPath: 'inset(0% 0% 0% 0%)', 
                    duration: 1, 
                    ease: 'power3.inOut' 
                }, `scene${i}`)
                .to(currImg, { 
                    scale: 1, 
                    duration: 1, 
                    ease: 'power3.out' 
                }, `scene${i}`)

                // --- Step D: Introduce the new Slide Metadata floating box (from separate layer) ---
                .to(currMeta, { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.6, 
                    ease: 'power2.out' 
                }, `scene${i}+=0.5`);
        });

    }, { scope: wrapperRef });

    return (
        <section className="avant-garde-wrapper" ref={wrapperRef}>
            <div className="avant-pin" ref={pinRef}>
                
                {/* 1. THE MASSIVE INDEX LAYER */}
                <div className="avant-index-layer">
                    {FASHION_DATA.map((item, index) => (
                        <div className="massive-index" key={`index-${index}`}>
                            <span>{item.id}</span>
                        </div>
                    ))}
                </div>

                {/* 2. THE BACKGROUND IMAGE STACK LAYER */}
                <div className="avant-image-stack">
                    {FASHION_DATA.map((item, index) => (
                        <div className="avant-slide" key={`slide-${index}`} style={{ zIndex: index + 1 }}>
                            <div className="avant-img-container">
                                <div className="img-inner-mask">
                                    <img src={item.img} alt={item.title} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. THE HIGHEST Z-INDEX METADATA LAYER */}
                <div className="avant-meta-stack">
                    {FASHION_DATA.map((item, index) => (
                        <div className="avant-meta-container" key={`meta-container-${index}`} style={{ zIndex: index + 1 }}>
                            
                            <div className="avant-meta">
                                <div className="meta-header">
                                    <span className="meta-id">{item.id}.</span> 
                                    <span className="meta-collection">{item.collection}</span>
                                </div>
                                <h2 className="meta-title">{item.title}</h2>
                                <p className="meta-desc">{item.desc}</p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FashionAvantGardeScroll;
