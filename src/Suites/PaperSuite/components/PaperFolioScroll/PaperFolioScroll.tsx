import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './PaperFolioScroll.scss';

import img1 from '../../img/generated_1.png';
import img2 from '../../img/generated_2.png';
import img3 from '../../img/generated_3.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHRONICLE_DATA = [
    { 
        chapter: 'I', 
        title: 'The Prelude', 
        drop: 'I', 
        text: 'n the quiet corridors of time, stories map the architecture of our existence. Each memory is delicately pressed onto these pages, bound not by thread, but by the relentless passage of eras.',
        img: img1 
    },
    { 
        chapter: 'II', 
        title: 'The Great Ascendancy', 
        drop: 'A', 
        text: 's the ink dries, civilizations rise and fall within the margins. We document the triumphs of those who stood against the encroaching dark, etching their legacies into the permanent parchment of history.',
        img: img2 
    },
    { 
        chapter: 'III', 
        title: 'The Final Requiem', 
        drop: 'W', 
        text: 'hen the final chapter closes, what remains is the silent weight of the folio. The illustrations stare back into the void, a testament to everything that was, preserved forever in the grand archive.',
        img: img3 
    },
];

export const PaperFolioScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const textSlides = gsap.utils.toArray<HTMLElement>('.text-slide');
        const imgSlides = gsap.utils.toArray<HTMLElement>('.img-slide');

        if (textSlides.length === 0) return;

        // 1. Initial Setups
        // Hide subsequent texts
        gsap.set(textSlides[0], { autoAlpha: 1, y: 0 });
        gsap.set(textSlides.slice(1), { autoAlpha: 0, y: 40 });

        // Push subsequent images exactly outside the right viewport bounded box
        gsap.set(imgSlides.slice(1), { xPercent: 100 });

        // 2. Master Scroll Timeline
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${textSlides.length * 100}%`,
                pin: pinRef.current,
                scrub: 1, // Classic heavy paper feel
                anticipatePin: 1
            }
        });

        // 3. The Sequenced Page Turn
        textSlides.forEach((slide, i) => {
            if (i === 0) return;

            const prevText = textSlides[i - 1];
            const currText = textSlides[i];
            
            const prevImg = imgSlides[i - 1];
            const currImg = imgSlides[i];

            // Image slightly scaled out to give the incoming slide a cinematic reveal
            const currImgInner = currImg.querySelector('img');
            gsap.set(currImgInner, { scale: 1.15 });

            masterTl
                // --- Part A: Text crossfade (Reading continuity) ---
                .to(prevText, { 
                    y: -40, 
                    autoAlpha: 0, 
                    duration: 0.6, 
                    ease: 'power2.in' 
                }, `turn${i}`)
                .to(currText, { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.8, 
                    ease: 'power2.out' 
                }, `turn${i}+=0.3`)

                // --- Part B: The Physical Page Slide (Right to Left sweep) ---
                // Dim the old image slightly imitating depth seamlessly
                .to(prevImg, { 
                    scale: 0.95, 
                    autoAlpha: 0.4, 
                    duration: 1.2, 
                    ease: 'power2.inOut' 
                }, `turn${i}`)
                
                // The heavy new page physically drags horizontally into view, casting its shadow
                .to(currImg, { 
                    xPercent: 0, 
                    duration: 1.2, 
                    ease: 'power3.inOut' 
                }, `turn${i}`)
                
                // Un-zoom the illustration as it locks into place
                .to(currImgInner, { 
                    scale: 1, 
                    duration: 1.2, 
                    ease: 'power2.out' 
                }, `turn${i}`);
        });

    }, { scope: wrapperRef });

    return (
        <section className="chronicle-wrapper" ref={wrapperRef}>
            <div className="chronicle-pin" ref={pinRef}>

                {/* THE BOOK SPINE (Dividing Shadow) */}
                <div className="book-spine"></div>

                {/* LEFT FOLIO: The Immersive Manuscript */}
                <div className="left-folio">
                    <div className="folio-header">
                        <span className="volume">TOME I</span>
                        <span className="page-num">PAGE 42</span>
                    </div>

                    <div className="text-stack">
                        {CHRONICLE_DATA.map((item, index) => (
                            <div className="text-slide" key={`text-${index}`}>
                                <h4 className="chapter-marker">CHAPTER {item.chapter}</h4>
                                <h1 className="chapter-title">{item.title}</h1>
                                
                                <p className="manuscript-text">
                                    <span className="drop-cap">{item.drop}</span>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="folio-footer">
                        THE GRAND ARCHIVE
                    </div>
                </div>

                {/* RIGHT FOLIO: The Illustrations */}
                <div className="right-folio">
                    <div className="img-stack">
                        {CHRONICLE_DATA.map((item, index) => (
                            <div className="img-slide" key={`img-${index}`} style={{ zIndex: index + 1 }}>
                                <img src={item.img} alt={`Illustration for ${item.title}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PaperFolioScroll;
