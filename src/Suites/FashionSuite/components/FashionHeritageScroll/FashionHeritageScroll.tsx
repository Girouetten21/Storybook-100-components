import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FashionHeritageScroll.scss';

import img1 from '../../img/generated_12.png';
import img2 from '../../img/generated_13.png';
import img3 from '../../img/generated_14.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TAILOR_DATA = [
    { 
        step: '01', 
        mark: 'MEASUREMENT',
        title: 'The Blueprint', 
        desc: 'Precision is the absolute foundation of elegance. Every angle mathematically considered down to the millimeter to ensure architectural harmony.',
        img: img1 
    },
    { 
        step: '02', 
        mark: 'DRAFT & CUT',
        title: 'Sartorial Shears', 
        desc: 'Heritage techniques woven into every motion. Cloth is separated not merely to divide, but to rebuild a localized structural silhouette.',
        img: img2 
    },
    { 
        step: '03', 
        mark: 'BESPOKE FITTING',
        title: 'Absolute Form', 
        desc: 'A silent dialogue between fine woven textiles and human form, culminating in a garment that moves flawlessly like a second skin.',
        img: img3 
    },
];

export const FashionHeritageScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.sartorial-slide');
        const metas = gsap.utils.toArray<HTMLElement>('.sartorial-meta-group');
        const imgContainers = slides.map(s => s.querySelector('.sartorial-img-mask') as HTMLElement);

        if (slides.length === 0) return;

        // 1. Initial setups
        // Instead of bottom wipe, we use a central horizontal "jacket curtain" open
        gsap.set(imgContainers.slice(1), { clipPath: 'inset(0% 50% 0% 50%)' });
        
        // Hide subsequent metadata
        gsap.set(metas[0], { autoAlpha: 1, y: 0 });
        gsap.set(metas.slice(1), { autoAlpha: 0, y: 30 });

        // Enter Animation for the Frame (Grid assembly)
        gsap.from('.frame-line', {
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.inOut',
            stagger: 0.1,
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top 80%',
            }
        });

        // 2. Master Scroll Timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${slides.length * 100}%`,
                pin: pinRef.current,
                scrub: 1, // Crisp, tailored scrub
                anticipatePin: 1
            }
        });

        // 3. Scroll Logic
        slides.forEach((slide, i) => {
            if (i === 0) return;

            const prevImgContainer = imgContainers[i - 1];
            const prevImg = slides[i - 1].querySelector('img');
            const prevMeta = metas[i - 1];

            const currImgContainer = imgContainers[i];
            const currImg = slide.querySelector('img');
            const currMeta = metas[i];

            gsap.set(currImg, { scale: 1.15 });

            masterTl
                // Depart old meta smoothly
                .to(prevMeta, { y: -30, autoAlpha: 0, duration: 0.6, ease: 'sine.inOut' }, `cut${i}`)
                
                // Old image remains vividly visible as the new cut wipes physically over top
                .to(prevImg, { scale: 0.95, duration: 1, ease: 'sine.inOut' }, `cut${i}`)

                // Force explicit fromTo for the mask to completely eradicate GSAP string-parsing jump bugs
                .fromTo(currImgContainer, 
                    { clipPath: 'inset(0% 50% 0% 50%)' },
                    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'sine.inOut' }, 
                    `cut${i}`
                )
                // Image un-scaling gracefully
                .to(currImg, { 
                    scale: 1, 
                    duration: 1, 
                    ease: 'power2.out' 
                }, `cut${i}`)

                // Introduce new meta securely
                .to(currMeta, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, `cut${i}+=0.5`);
        });

    }, { scope: wrapperRef });

    return (
        <section className="sartorial-wrapper" ref={wrapperRef}>
            <div className="sartorial-pin" ref={pinRef}>

                {/* The Tailor's Grid (Background Structural Lines) */}
                <div className="tailor-grid">
                    <div className="frame-line horizontal top"></div>
                    <div className="frame-line horizontal bottom"></div>
                    <div className="frame-line vertical left"></div>
                    <div className="frame-line vertical right"></div>
                    
                    {/* Corner Crosshairs */}
                    <div className="crosshair tl"></div>
                    <div className="crosshair tr"></div>
                    <div className="crosshair bl"></div>
                    <div className="crosshair br"></div>
                </div>

                {/* Floating Identifiers */}
                <div className="ruler-text left">ATELIER ARCHIVE</div>
                <div className="ruler-text right">BESPOKE CUT</div>

                {/* Central Canvas Workspace */}
                <div className="canvas-workspace">
                    
                    {/* Image Stack Layer */}
                    <div className="sartorial-image-stack">
                        {TAILOR_DATA.map((item, index) => (
                            <div className="sartorial-slide" key={`slide-${index}`} style={{ zIndex: index + 1 }}>
                                <div className="sartorial-img-mask">
                                    <img src={item.img} alt={item.title} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Metadata Layer */}
                    <div className="sartorial-meta-stack">
                        {TAILOR_DATA.map((item, index) => (
                            <div className="sartorial-meta-container" key={`meta-${index}`} style={{ zIndex: index + 1 }}>
                                <div className="sartorial-meta-group">
                                    <div className="meta-mark">
                                        <span className="step">{item.step}</span>
                                        <div className="thread-line"></div>
                                        <span className="mark">{item.mark}</span>
                                    </div>
                                    <h2 className="title">{item.title}</h2>
                                    <p className="desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FashionHeritageScroll;
