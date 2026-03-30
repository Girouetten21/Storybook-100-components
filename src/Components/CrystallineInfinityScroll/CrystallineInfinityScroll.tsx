import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CrystallineInfinityScroll.scss';

// High-end abstract backgrounds (using existing project assets)
import bg1 from '../../assets/img/Background_1.webp';
import bg2 from '../../assets/img/Background_2.webp';
import bg3 from '../../assets/img/Background_3.webp';
import bg4 from '../../assets/img/Background_4.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CRYSTAL_DATA = [
    { 
        id: 1, 
        title: 'Prismatic Core', 
        subtitle: 'The Genesis', 
        text: 'Light bends through the facets of time, creating infinite possibilities within the architectural void.', 
        img: bg1 
    },
    { 
        id: 2, 
        title: 'Refraction', 
        subtitle: 'The Journey', 
        text: 'Scattered beams converge into a single, unbreakable focus of digital and physical energy.', 
        img: bg2 
    },
    { 
        id: 3, 
        title: 'Resonance', 
        subtitle: 'The Echo', 
        text: 'Vibrations through the crystalline structure echo across dimensions, defining new geometries.', 
        img: bg3 
    },
    { 
        id: 4, 
        title: 'Eternity', 
        subtitle: 'The Zenith', 
        text: 'A perfect geometric alignment transcending space, motion, and traditional user interfaces.', 
        img: bg4 
    },
];

export const CrystallineInfinityScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped diamond reveal and optical blurring
    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.crystal-slide');
        if (slides.length === 0) return;

        // Create the master pinned timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${slides.length * 120}%`, // Gives ample scroll space per slide
                pin: pinRef.current,
                scrub: 1.2, // Smooth, slightly heavy scrubbing for a luxurious feel
                anticipatePin: 1
            }
        });

        // Loop through slides (skipping the first one as it's already visible)
        slides.forEach((slide, i) => {
            if (i === 0) return;

            const prevSlide = slides[i - 1];
            const prevBg = prevSlide.querySelector('.slide-bg');
            const prevContent = prevSlide.querySelector('.glass-content');
            
            const currentBg = slide.querySelector('.slide-bg');
            const currentContent = slide.querySelectorAll('.slide-subtitle, .slide-title, .slide-text');

            // Set initial state for incoming text
            gsap.set(currentContent, { autoAlpha: 0, y: 40 });

            // 1. Sink and Blur the Previous Slide
            tl.to(prevBg, {
                scale: 1, // Scales down from 1.1
                filter: "blur(20px) brightness(0.4)",
                ease: "power2.inOut"
            }, `transition-${i}`)
            .to(prevContent, {
                autoAlpha: 0,
                y: -50,
                scale: 0.9,
                ease: "power2.in"
            }, `transition-${i}`);

            // 2. The Diamond Reveal (Clip Path Polygon Expand)
            // Starts small in center, expands way past the edges
            tl.fromTo(slide, 
                { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
                { 
                    clipPath: 'polygon(50% -150%, 250% 50%, 50% 250%, -150% 50%)',
                    ease: "power3.inOut"
                }, 
                `transition-${i}`
            );

            // 3. Current Slide Image gentle scale
            tl.fromTo(currentBg,
                { scale: 1.2 },
                { scale: 1.1, ease: "power2.out" }, // Settles to 1.1
                `transition-${i}`
            );

            // 4. Staggered Text Reveal in Glass Panel
            tl.to(currentContent, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out"
            }, `transition-${i}+=0.3`); // Starts slightly after diamond begins opening
        });

    }, { scope: wrapperRef }); // Scope strictly to the wrapper

    return (
        <section className="crystalline-wrapper" ref={wrapperRef}>
            <div className="crystalline-pin-container" ref={pinRef}>
                
                {CRYSTAL_DATA.map((item, index) => (
                    <div className="crystal-slide" key={item.id} style={{ zIndex: index + 1 }}>
                        <div 
                            className="slide-bg" 
                            style={{ backgroundImage: `url(${item.img})` }} 
                        />
                        <div className="slide-overlay" />
                        
                        <div className="glass-content">
                            <span className="slide-subtitle">{item.subtitle}</span>
                            <h2 className="slide-title">{item.title}</h2>
                            <p className="slide-text">{item.text}</p>
                        </div>
                    </div>
                ))}

                <div className="scroll-indicator-orb" />
            </div>
        </section>
    );
};

export default CrystallineInfinityScroll;
