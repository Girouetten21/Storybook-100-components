import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VelocityGallery.scss';

import img1 from '../../assets/img/Character_1.webp';
import img2 from '../../assets/img/Space_1.webp';
import img3 from '../../assets/img/Character_2.webp';
import img4 from '../../assets/img/Space_2.webp';
import img5 from '../../assets/img/Character_3.webp';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
    { id: 1, image: img1, title: 'The Silent Muse', subtitle: 'Portrait Collection' },
    { id: 2, image: img2, title: 'Echoes of Space', subtitle: 'Architecture Series' },
    { id: 3, image: img3, title: 'Faded Memories', subtitle: 'Cinematic Stills' },
    { id: 4, image: img4, title: 'Urban Geometry', subtitle: 'Metropolitan Life' },
    { id: 5, image: img5, title: 'Golden Hour', subtitle: 'Editorial Vision' },
];

export const VelocityGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return;

        // Use GSAP Context for safe React cleanup
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const items = gsap.utils.toArray('.velocity-item');
            
            // Calculate how far the track needs to slide horizontally
            // It's the total width of the track minus the viewport width
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
                        // Adjust the divisor (e.g., 300) to control skew sensitivity
                        let angle = clamp(velocity / -300);
                        
                        // Apply the skew rotation to all gallery items
                        gsap.to('.velocity-item', {
                            skewX: angle,
                            duration: 0.8, // Smooth recovery
                            overwrite: "auto",
                            ease: "power3.out"
                        });
                    }
                }
            });

            // 2. INNER PARALLAX FOR IMAGES (Opposite direction sliding)
            items.forEach((item: any) => {
                const imageContainer = item.querySelector('.image-container');
                gsap.to(imageContainer, {
                    xPercent: -30, // Pan the image left inside its container
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
            ScrollTrigger.addEventListener("scrollEnd", () => {
                gsap.to('.velocity-item', {
                    skewX: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="velocity-gallery-wrapper" ref={sectionRef}>
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

export default VelocityGallery;
