import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './TextTransition.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const TextTransition = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<SVGSVGElement>(null);
    const nextContentRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped massive zoom and bridge transition
    useGSAP(() => {
        // Reset scroll memory for consistency
        window.history.scrollRestoration = 'manual';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2500",
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Zoom the text until it fills everything
        tl.to(textRef.current, {
            scale: 80,
            autoAlpha: 2, 
            ease: "power2.in",
            force3D: true
        });

        // Fade in the content of the next section
        tl.to(nextContentRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");

    }, { scope: wrapperRef });

    return (
        <div ref={wrapperRef} className="text-transition-wrapper">
            <section ref={sectionRef} className="main-container">
                <div className="zoom-text-container">
                    {/* Using SVG for perfect sharpness at any scale */}
                    <svg
                        ref={textRef as any}
                        viewBox="0 0 600 200"
                        className="transition-svg-text"
                    >
                        <text
                            x="300"
                            y="106"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="svg-text-element"
                        >
                            Prisma
                        </text>
                    </svg>
                </div>

                <div className="scroll-indicator">
                    Scroll to Explore
                </div>
            </section>

            <section className="next-section">
                <div ref={nextContentRef} className="next-content">
                    <h2>Inside the Prisma</h2>
                    <p>
                        You just entered a new dimension through the lens of pure typography.
                        This effect creates a seamless bridge between worlds using the geometry
                        of language itself.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TextTransition;
