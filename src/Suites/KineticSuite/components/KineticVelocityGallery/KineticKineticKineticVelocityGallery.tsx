import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './KineticKineticKineticVelocityGallery.scss';

import img1 from '../../img/generated_9.png';
import img2 from '../../img/generated_10.png';
import img3 from '../../img/generated_11.png';
import img4 from '../../img/generated_12.png';
import img5 from '../../img/generated_13.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryItems = [
    { id: 1, image: img1, title: 'The Silent Muse', subtitle: 'Portrait Collection' },
    { id: 2, image: img2, title: 'Echoes of Space', subtitle: 'Architecture Series' },
    { id: 3, image: img3, title: 'Faded Memories', subtitle: 'Cinematic Stills' },
    { id: 4, image: img4, title: 'Urban Geometry', subtitle: 'Metropolitan Life' },
    { id: 5, image: img5, title: 'Golden Hour', subtitle: 'Editorial Vision' },
];

export const KineticKineticKineticVelocityGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Official useGSAP hook + scoping
    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const items = gsap.utils.toArray('.velocity-item');
        
        // Calculate how far the track needs to slide horizontally
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        // Clamp function to restrict the skew angle
        const clamp = gsap.utils.clamp(-20, 20);

        // 1. HORIZONTAL SCROLL ANIMATION (PINNED)
        gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                scrub: 1, // Smooth scrubbing
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // SKEW EFFECT BASED ON SCROLL VELOCITY
                    const velocity = self.getVelocity();
                    let angle = clamp(velocity / -300);
                    
                    // Apply to all items
                    gsap.to('.velocity-item', {
                        skewX: angle,
                        duration: 0.8,
                        overwrite: "auto",
                        ease: "power3.out"
                    });
                }
            }
        });

        // 2. INNER PARALLAX FOR IMAGES
        items.forEach((item: any) => {
            const imageContainer = item.querySelector('.image-container');
            gsap.to(imageContainer, {
                xPercent: -30, 
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
        });

        // 3. Ensure items naturally rest at 0 skew when scroll stops
        const onScrollEnd = () => {
            gsap.to('.velocity-item', {
                skewX: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        };

        ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
        
        // useGSAP handles custom listener cleanup if we return them or if they're standard GSAP
        return () => ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);

    }, { scope: sectionRef }); // AUTO CLEANUP & SCOPING

    return (
        <section className="kinetic-kinetic-kinetic-velocity-gallery-wrapper" ref={sectionRef}>
            <div className="gallery-intro">
                <h2>Cinematic<br/>Visions.</h2>
                <p>Scroll down to explore the gallery. The faster you scroll, the more the momentum warps the space.</p>
            </div>

            <div className="velocity-track-container">
                <div className="velocity-track" ref={trackRef}>
                    {galleryItems.map((item) => (
                        <div className="velocity-item" key={item.id}>
                            <div className="image-container">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="item-overlay">
                                <div className="item-subtitle">{item.subtitle}</div>
                                <div className="item-title">{item.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KineticKineticKineticVelocityGallery;
