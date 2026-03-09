import { useLayoutEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RandomRectangles.scss';

gsap.registerPlugin(ScrollTrigger);

export interface RectangleData {
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    scale: number;
}

export const RandomRectangles = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const rectsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Generate random data for rectangles on mount
    const rectangles = useMemo(() => {
        const colors = [
            'rgba(99, 102, 241, 0.4)',  // Indigo
            'rgba(236, 72, 153, 0.4)',  // Pink
            'rgba(34, 211, 238, 0.3)',  // Cyan
            'rgba(251, 146, 60, 0.3)',  // Orange
            'rgba(168, 85, 247, 0.4)',  // Purple
            'rgba(52, 211, 153, 0.3)',  // Emerald
        ];

        return Array.from({ length: 24 }).map((_, i) => ({
            id: i,
            width: Math.random() * 200 + 80,
            height: Math.random() * 100 + 40,
            x: Math.random() * 120 - 10, // -10% to 110% for wider spread
            y: Math.random() * 120 - 10,
            color: colors[i % colors.length],
            rotation: (Math.random() - 0.5) * 60,
            scale: 0.5 + Math.random() * 1.5
        }));
    }, []);

    useLayoutEffect(() => {
        // Force manual scroll restoration
        window.history.scrollRestoration = 'manual';

        // Timeout to ensure we beat the browser's native scroll restoration
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.refresh();
        }, 50);

        const ctx = gsap.context(() => {
            const validRects = rectsRef.current.filter(r => r !== null);

            // 1. Initial Intro Animation
            gsap.set(validRects, {
                opacity: 0,
                scale: 0,
                xPercent: -50,
                yPercent: -50,
                rotation: () => (Math.random() - 0.5) * 180,
                top: (i: number) => `${rectangles[i].y}%`,
                left: (i: number) => `${rectangles[i].x}%`,
            });

            // 1. Initial Intro Animation
            const intro = gsap.fromTo(validRects,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: (i: number) => rectangles[i].rotation,
                    duration: 1.5,
                    stagger: { amount: 1, from: "random" },
                    ease: "expo.out",
                    delay: 0.2 // Small delay to ensure everything is ready
                }
            );

            // 2. Black Hole Scroll Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Only force completion if we actually moved the scroll
                        if (self.progress > 0.005 && intro.isActive()) {
                            intro.progress(1);
                        }
                    }
                }
            });

            // Phase 1: Move Rectangles to center
            tl.to(validRects, {
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                rotation: (i: number) => rectangles[i].rotation * 5,
                scale: 0.15,
                stagger: {
                    amount: 2.5,
                    from: "random"
                },
                ease: "power2.inOut",
                immediateRender: false
            });

            // Phase 2: Rectangles disappear BEFORE title
            tl.to(validRects, {
                opacity: 0,
                scale: 0,
                duration: 0.6,
                ease: "power2.in"
            }, ">");

            // Phase 3: Slower Title shrink
            tl.fromTo(".content-overlay",
                { scale: 1, opacity: 1 },
                {
                    scale: 0.2,
                    opacity: 0.8,
                    duration: 4.5,
                    ease: "power1.inOut",
                    immediateRender: false
                },
                0
            );

            // Phase 4: Title fades out LAST
            tl.to(".content-overlay", {
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "power2.in"
            }, ">");

        }, sectionRef);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, [rectangles]);

    return (
        <section ref={sectionRef} className="random-rectangles-wrapper">
            <div ref={containerRef} className="random-rectangles-showcase">
                <div className="rectangles-container">
                    {rectangles.map((rect: RectangleData, i: number) => (
                        <div
                            key={rect.id}
                            ref={el => { rectsRef.current[i] = el; }}
                            className="rectangle"
                            style={{
                                width: rect.width,
                                height: rect.height,
                                top: `${rect.y}%`,
                                left: `${rect.x}%`,
                                backgroundColor: rect.color,
                                zIndex: i
                            }}
                        />
                    ))}
                </div>

                <div className="content-overlay">
                    <h1>Event Horizon</h1>
                    <p>Scroll to witness the gravitational collapse of geometric fragments into the center.</p>
                </div>
            </div>
        </section>
    );
};

export default RandomRectangles;
