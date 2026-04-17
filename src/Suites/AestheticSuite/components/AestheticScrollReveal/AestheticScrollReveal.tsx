import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AestheticScrollReveal.scss';

import img1 from '../../assets/gallery_1.png';
import img2 from '../../assets/gallery_2.png';
import img3 from '../../assets/gallery_3.png';
import img4 from '../../assets/hero_door.png';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    { title: "Cozy Details", tag: "Still Life", img: img2 },
    { title: "Dreamy Skies", tag: "Nature", img: img3 },
    { title: "Pure Softness", tag: "Concept", img: img1 },
    { title: "Morning Light", tag: "Archive", img: img4 },
    { title: "Serene Spaces", tag: "Architecture", img: img2 },
    { title: "Petal Dance", tag: "Floral", img: img3 },
];

export const AestheticScrollReveal: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const scrollTrack = triggerRef.current;
        if (!scrollTrack) return;

        // Force a refresh after a small delay to ensure all assets are measured
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        const totalWidth = scrollTrack.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollAmount = totalWidth - windowWidth + 50;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${scrollAmount}`,
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        });

        tl.to(scrollTrack, {
            x: -(totalWidth - windowWidth), // Only scroll to the edge
            ease: 'none',
        })
            // Empty space in timeline to represent the "delay"
            .to({}, { duration: 0.5 });

        // Parallax for card images (linked to the main horizontal movement)
        gsap.utils.toArray('.card-image').forEach((img: any) => {
            gsap.to(img, {
                x: 150,
                ease: 'none',
                scrollTrigger: {
                    trigger: img,
                    containerAnimation: tl,
                    start: 'left right',
                    end: 'right left',
                    scrub: true
                }
            });
        });

        return () => clearTimeout(timer);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="aesthetic-scroll-reveal">
            <div className="scroll-header">
                <span className="eyebrow">The Gallery</span>
                <h2 className="title">Moments in <i>Bloom</i></h2>
            </div>

            <div ref={triggerRef} className="scroll-track">
                {CARDS.map((card, i) => (
                    <div key={i} className="reveal-card">
                        <div className="card-inner">
                            <div className="card-visual">
                                <div className="card-image" style={{ backgroundImage: `url(${card.img})` }}></div>
                            </div>
                            <div className="card-content">
                                <span className="card-tag">{card.tag}</span>
                                <h3 className="card-title">{card.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Spacer to allow seeing the last card fully */}
                <div className="scroll-spacer"></div>
            </div>
        </section>
    );
};

export default AestheticScrollReveal;
