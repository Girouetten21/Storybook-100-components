import { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ChaosRectangles.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export const ChaosRectangles = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const rectsRef = useRef<(HTMLDivElement | null)[]>([]);

    const rectangles = useMemo(() => {
        const colors = [
            'rgba(99, 102, 241, 0.4)',  
            'rgba(236, 72, 153, 0.4)',  
            'rgba(34, 211, 238, 0.3)',  
            'rgba(251, 146, 60, 0.3)',  
            'rgba(168, 85, 247, 0.4)',  
            'rgba(52, 211, 153, 0.3)',  
        ];

        return Array.from({ length: 24 }).map((_, i) => ({
            id: i,
            width: Math.random() * 200 + 80,
            height: Math.random() * 100 + 40,
            x: Math.random() * 120 - 10, 
            y: Math.random() * 120 - 10,
            color: colors[i % colors.length],
            rotation: (Math.random() - 0.5) * 60,
            scale: 0.5 + Math.random() * 1.5
        }));
    }, []);

    // POWERED BY GSAP-SKILLS: Scoped gravitational collapse and intro
    useGSAP(() => {
        window.history.scrollRestoration = 'manual';

        const validRects = rectsRef.current.filter(r => r !== null);

        // Initial setup for the Event Horizon
        gsap.set(validRects, {
            autoAlpha: 0,
            scale: 0,
            xPercent: -50,
            yPercent: -50,
            rotation: () => (Math.random() - 0.5) * 180,
            top: (i: number) => `${rectangles[i].y}%`,
            left: (i: number) => `${rectangles[i].x}%`,
        });

        // 1. Initial Intro Animation
        const intro = gsap.fromTo(validRects,
            { autoAlpha: 0, scale: 0 },
            {
                autoAlpha: 1,
                scale: 1,
                rotation: (i: number) => rectangles[i].rotation,
                duration: 1.5,
                stagger: { amount: 1, from: "random" },
                ease: "expo.out",
                delay: 0.2 
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
                    if (self.progress > 0.005 && intro.isActive()) {
                        intro.progress(1);
                    }
                }
            }
        });

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

        tl.to(validRects, {
            autoAlpha: 0,
            scale: 0,
            duration: 0.6,
            ease: "power2.in"
        }, ">");

        tl.fromTo(".content-overlay",
            { scale: 1, autoAlpha: 1 },
            {
                scale: 0.2,
                autoAlpha: 0.8,
                duration: 4.5,
                ease: "power1.inOut",
                immediateRender: false
            },
            0
        );

        tl.to(".content-overlay", {
            autoAlpha: 0,
            scale: 0,
            duration: 1,
            ease: "power2.in"
        }, ">");

    }, { scope: sectionRef, dependencies: [rectangles] });

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.refresh();
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} className="chaos-rectangles-wrapper">
            <div ref={containerRef} className="chaos-rectangles-showcase">
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

export default ChaosRectangles;
