import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomTestimonial.scss';

import image1 from '../../img/blossom_2.png';
import image2 from '../../img/blossom_4.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const BlossomTestimonial = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const leftImageRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 40%",
                end: "bottom bottom",
                scrub: 1,
            }
        });

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
        <div ref={wrapperRef} className="blossom-sticky-wrapper">
            <div className="blossom-testimonial-container">
                <div ref={textRef} className="blossom-content-wrapper">
                    <div className="blossom-stars">
                        {"✦✦✦✦✦".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <div className="blossom-author-info">NATURE'S WHISPER</div>
                    <h2 className="blossom-testimonial-text">
                        The petals drifted silently through the air, carrying the scent of 
                        a thousand memories to the heart of the garden where time 
                        stands still and every bloom is a masterpiece.
                    </h2>
                    <div className="blossom-actions">
                        <button className="blossom-view-btn">Explore Nature</button>
                        <div className="blossom-arrow-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    ref={leftImageRef}
                    className="blossom-floating-image left"
                    style={{ backgroundImage: `url(${image1})` }}
                />
                <div
                    ref={rightImageRef}
                    className="blossom-floating-image right"
                    style={{ backgroundImage: `url(${image2})` }}
                />
            </div>
        </div>
    );
};

export default BlossomTestimonial;
