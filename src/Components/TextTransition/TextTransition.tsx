import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextTransition.scss';

gsap.registerPlugin(ScrollTrigger);

export const TextTransition = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const nextContentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Reset scroll memory for consistency
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
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
            // Scale needs to be very large (e.g., 60-100) to effectively "enter" the letter
            tl.to(textRef.current, {
                scale: 80,
                opacity: 2, // Keep it solid
                ease: "power2.in",
            });

            // Fade in the content of the next section as we zoom into the transition color
            tl.to(nextContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.2");

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

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
