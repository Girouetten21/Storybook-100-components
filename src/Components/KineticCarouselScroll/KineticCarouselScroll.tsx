import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './KineticCarouselScroll.scss';

// Utilize existing project assets for high-end preview
import img1 from '../../assets/img/Character_1.webp';
import img2 from '../../assets/img/Space_1.webp';
import img3 from '../../assets/img/Character_2.webp';
import img4 from '../../assets/img/Space_2.webp';
import img5 from '../../assets/img/Character_3.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CAROUSEL_DATA = [
    { id: 'I', title: 'The Genesis', category: 'PORTRAIT', desc: 'A study in elegant monochromatic contrast and raw physical form, separating light from deep shadow.', img: img1 },
    { id: 'II', title: 'Astral Plane', category: 'CONCEPT', desc: 'Navigating the profound silence between starlight and the overwhelming emptiness of the void.', img: img2 },
    { id: 'III', title: 'Silent Echoes', category: 'FASHION', desc: 'Resonances of a forgotten architectural silhouette standing defiant against the passage of time.', img: img3 },
    { id: 'IV', title: 'Dust & Frame', category: 'SPACE', desc: 'Capturing the flawless geometry of the universe, distilled into a single, breathtaking frame.', img: img4 },
    { id: 'V', title: 'Event Horizon', category: 'EDITORIAL', desc: 'The inevitable cinematic convergence of pure light, expansive space, and human perception.', img: img5 },
];

export const KineticCarouselScroll: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Fluid single-timeline sequence
    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>('.kinetic-slide');
        const track = trackRef.current;
        if (!track || slides.length === 0) return;

        // Clean slate: Set initial values BEFORE ScrollTrigger calculations to avoid flicker
        gsap.set(slides, { scale: 0.6, autoAlpha: 0.1 });
        gsap.set('.slide-meta', { autoAlpha: 0, scale: 0.9, y: 30 });

        const getTotalScroll = () => track.scrollWidth - window.innerWidth + (window.innerWidth * 0.5);

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: () => `+=${getTotalScroll()}`,
                pin: pinRef.current,
                scrub: 1.2,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    gsap.set('.kinetic-progress', { width: `${self.progress * 100}%` });
                    const velocity = self.getVelocity() / 150;
                    gsap.to('.kinetic-arrow', { 
                        rotation: Math.max(-30, Math.min(30, velocity * 15)), 
                        duration: 0.5, 
                        ease: "power2.out", 
                        overwrite: "auto" 
                    });
                }
            }
        });

        // Massive Background Parallax Subliminal Text
        masterTl.to('.kinetic-bg-text', {
            xPercent: -40,
            ease: "none"
        }, 0);

        // Move the track
        masterTl.to(track, {
            x: () => -getTotalScroll(),
            ease: "none"
        }, 0);

        // Individual slide physics driven by track movement
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            const meta = slide.querySelector('.slide-meta');

            // Internal Parallax
            gsap.to(img, {
                xPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: masterTl,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                }
            });

            // ULTIMATE FIX FOR FLICKER: 
            // Instead of competing ScrollTriggers, we use a single timeline spanning the whole screen trajectory.
            const slideTl = gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: masterTl,
                    start: "left 90%", // Start getting bigger early
                    end: "right 10%",  // Finish getting smaller late
                    scrub: true,
                }
            });

            // Phase 1: Enter -> Scale UP
            slideTl.to(slide, { 
                scale: 1, 
                autoAlpha: 1, 
                duration: 1, 
                ease: "sine.inOut" 
            })
            // Phase 2: Leave -> Scale DOWN
            .to(slide, { 
                scale: 0.6, 
                autoAlpha: 0.1, 
                duration: 1, 
                ease: "sine.inOut" 
            });

            // Meta Text Box Timeline
            const metaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: masterTl,
                    start: "left 65%",
                    end: "right 35%",
                    scrub: true,
                }
            });

            metaTl.to(meta, { 
                autoAlpha: 1, 
                scale: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power3.out" 
            })
            .to(meta, { 
                autoAlpha: 0, 
                scale: 0.9, 
                y: -30, 
                duration: 0.5, 
                ease: "power3.in" 
            }, "+=0.5");
        });

        // Reset arrow rotation gracefully strictly on user rest
        ScrollTrigger.addEventListener("scrollEnd", () => {
            gsap.to('.kinetic-arrow', { rotation: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
        });

    }, { scope: wrapperRef });

    return (
        <section className="kinetic-wrapper" ref={wrapperRef}>
            <div className="kinetic-pin" ref={pinRef}>
                
                {/* MASSIVE PREMIUM BACKGROUND TEXT */}
                <h1 className="kinetic-bg-text">
                    MAGAZINE &nbsp;&mdash;&nbsp; VOLUME XXVI &nbsp;&mdash;&nbsp; THE ARCHIVE &nbsp;&mdash;&nbsp; 2026
                </h1>

                <div className="kinetic-header">
                    <span className="kinetic-subtitle">Curated Exhibition</span>
                    <h2 className="kinetic-title">Visual Poetry</h2>
                    <p className="kinetic-desc">A journey through structural elegance, defining the boundary between motion and pure form.</p>
                </div>

                {/* The Floating Directional Arrow */}
                <div className="kinetic-arrow-container">
                    <div className="kinetic-arrow">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1">
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <polyline points="15 5 22 12 15 19"></polyline>
                        </svg>
                    </div>
                </div>

                <div className="kinetic-track" ref={trackRef}>
                    {CAROUSEL_DATA.map((item) => (
                        <div className="kinetic-slide" key={item.id}>
                            <div className="slide-image-container">
                                <img src={item.img} alt={item.title} />
                            </div>
                            
                            <div className="slide-meta">
                                <div className="meta-top">
                                    <span className="slide-number">{item.id}</span>
                                    <span className="slide-category">{item.category}</span>
                                </div>
                                <h3 className="slide-title">{item.title}</h3>
                                <p className="slide-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Global Progress Bar */}
                <div className="kinetic-progress" />
            </div>
        </section>
    );
};

export default KineticCarouselScroll;
