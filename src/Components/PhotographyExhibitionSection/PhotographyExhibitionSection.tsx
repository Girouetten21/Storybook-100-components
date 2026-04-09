import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Assets
import lensImg from '../../assets/img/photography/lens.png';
import fashionImg from '../../assets/img/photography/fashion.png';
import archImg from '../../assets/img/photography/arch.png';

import './PhotographyExhibitionSection.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhotographyExhibitionSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP((_, contextSafe) => {
        if (!sectionRef.current || !contextSafe) return;

        // 🎨 Entrance reveals
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                once: true
            }
        });

        tl.from('.photo-hero-text h2', { opacity: 0, y: 50, duration: 1.2, ease: "power4.out" })
          .from('.skew-image-wrapper', {
              opacity: 0,
              scale: 0.9,
              rotateY: 15,
              stagger: 0.1,
              duration: 1.5,
              ease: "expo.out"
          }, "-=0.8");

        // 🖱️ MAGNETIC TILT (Powered by contextSafe for performance)
        const onMouseMove = contextSafe((e: MouseEvent, target: HTMLElement) => {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            gsap.to(target, {
                rotateY: rotateY,
                rotateX: rotateX,
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            });
        });

        const onMouseLeave = contextSafe((target: HTMLElement) => {
            // Revert to original skewed state
            const isPMain = target.classList.contains('p-main');
            const isPFashion = target.classList.contains('p-fashion');
            
            gsap.to(target, {
                rotateY: isPMain ? -25 : (isPFashion ? 30 : 15),
                rotateX: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.75)",
                overwrite: true
            });
        });

        const wrappers = sectionRef.current.querySelectorAll('.skew-image-wrapper');
        wrappers.forEach((el) => {
            const target = el as HTMLElement;
            const moveHandler = (e: Event) => onMouseMove(e as MouseEvent, target);
            const leaveHandler = () => onMouseLeave(target);

            target.addEventListener('mousemove', moveHandler);
            target.addEventListener('mouseleave', leaveHandler);

            // Store for cleanup
            (target as any)._moveHandler = moveHandler;
            (target as any)._leaveHandler = leaveHandler;
        });

        // Parallax floating
        gsap.to('.skew-image-wrapper', {
            y: (i) => (i + 1) * -40,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        return () => {
            wrappers.forEach((el) => {
                const target = el as any;
                target.removeEventListener('mousemove', target._moveHandler);
                target.removeEventListener('mouseleave', target._leaveHandler);
            });
        };

    }, { scope: sectionRef });

    return (
        <section className="photography-exhib" ref={sectionRef}>
            
            <div className="photo-layout">
                {/* 📝 LEFT: EDITORIAL COPY */}
                <div className="photo-editorial">
                    <div className="photo-hero-text">
                        <span className="eyebrow">THE CHRONOS STUDIO // VOL. 04</span>
                        <h2>THE ART OF THE <span>CAPTURED</span> FRAME.</h2>
                        <div className="separator" />
                        <p>
                            In the intersection of light and silence, we find the truth of the form. 
                            Our practice is dedicated to the preservation of the architectural soul 
                            and the transient beauty of high-fashion movement.
                        </p>
                    </div>

                    <div className="service-grid">
                        <div className="service-item">
                            <label>01</label>
                            <h4>EDITORIAL</h4>
                            <p>Visual storytelling for elite editorial publications and luxury fashion houses.</p>
                        </div>
                        <div className="service-item">
                            <label>02</label>
                            <h4>ARCHITECTURAL</h4>
                            <p>Documenting the geometry of brutalist and minimalist structures worldwide.</p>
                        </div>
                    </div>
                </div>

                {/* 🖼️ RIGHT: FOLDED 3D IMAGES */}
                <div className="photo-visuals">
                    <div className="skew-image-wrapper p-main">
                        <img src={lensImg} alt="Macro Lens" />
                        <div className="photo-tag">MACRO .01</div>
                    </div>
                    
                    <div className="skew-image-wrapper p-fashion">
                        <img src={fashionImg} alt="Fashion Model" />
                        <div className="photo-tag">FASHION .02</div>
                    </div>

                    <div className="skew-image-wrapper p-arch">
                        <img src={archImg} alt="Architecture" />
                        <div className="photo-tag">GEOMETRY .03</div>
                    </div>
                </div>
            </div>

            {/* 🎞️ BACKGROUND DECOR */}
            <div className="film-marker top-left">ISO 100 // 35MM</div>
            <div className="film-marker bottom-right">© CHRONOS MMXXIV</div>
        </section>
    );
};

export default PhotographyExhibitionSection;
