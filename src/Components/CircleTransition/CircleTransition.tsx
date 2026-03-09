import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CircleTransition.scss';

gsap.registerPlugin(ScrollTrigger);

export const CircleTransition = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Ensure manual scroll restoration to avoid flickering on refresh
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            // Animation: Circle grows to cover the whole screen
            tl.to(circleRef.current, {
                scale: 40,
                ease: "power2.inOut",
                duration: 3
            });

            // Letter behavior: Starts fading gradually much earlier
            tl.to(letterRef.current, {
                opacity: 0,
                duration: 2.5,
                ease: "power1.out"
            }, 0.2); // Starts much almost at the beginning (0.5s into the 3s total)

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="circle-transition-wrapper">
            <section ref={sectionRef} className="section-container">
                {/* The circle that expands */}
                <div ref={circleRef} className="expanding-circle" />

                {/* The letter that stays the same size */}
                <div ref={letterRef} className="center-letter-container">
                    <span className="center-letter">G</span>
                </div>

                <div className="next-section-hint">
                    Scroll to Enter
                </div>
            </section>

            {/* Visual spacer to allow for scrolling after the transition */}
            <div style={{ height: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: '#ffffff', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    New Dimension
                </h2>
            </div>
        </div>
    );
};

export default CircleTransition;
