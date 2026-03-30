import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './RevealingTestimonial.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Import new images
import image1 from './img/1.webp';
import image2 from './img/2.webp';

export const RevealingTestimonial = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftImageRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped floating doors separation
    useGSAP(() => {
        // A single, continuous timeline for the entire scroll journey
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Single smooth movement for the Left Image
        tl.fromTo(leftImageRef.current,
            { left: "50%", rotate: 0, scale: 1.15 },
            {
                left: "5%",
                rotate: -3,
                scale: 0.95,
                ease: "power1.inOut",
                duration: 3
            },
            0
        );

        // Single smooth movement for the Right Image
        tl.fromTo(rightImageRef.current,
            { left: "50%", rotate: 0, scale: 1.15 },
            {
                left: "95%",
                rotate: 3,
                scale: 0.95,
                ease: "power1.inOut",
                duration: 3
            },
            0
        );

        // Synchronized text reveal
        tl.fromTo(textRef.current,
            { autoAlpha: 0, y: 30, scale: 0.98 },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                duration: 1.5
            },
            1.2
        );

    }, { scope: wrapperRef });

    return (
        <div ref={wrapperRef} className="testimonial-sticky-wrapper">
            <div ref={sectionRef} className="revealing-testimonial-container">
                <div ref={textRef} className="content-wrapper">
                    <div className="stars">
                        {"✦✦✦✦✦".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <div className="author-info">COSMIC PERSPECTIVE</div>
                    <h2 className="testimonial-text">
                        The floating doors drifted silently through the void, gateways to
                        undiscovered dimensions where gravity is but a distant memory
                        and the stars are your only guide.
                    </h2>
                    <div className="actions">
                        <button className="view-btn">Explore Space</button>
                        <div className="arrow-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    ref={leftImageRef}
                    className="floating-image left"
                    style={{ backgroundImage: `url(${image1})` }}
                />
                <div
                    ref={rightImageRef}
                    className="floating-image right"
                    style={{ backgroundImage: `url(${image2})` }}
                />
            </div>
        </div>
    );
};

export default RevealingTestimonial;
