import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlitchShowcase.scss';
import cityImg from '../../img/glitch_city.png';

gsap.registerPlugin(ScrollTrigger);

export const GlitchShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.showcase-img', {
            scale: 1.5,
            filter: 'blur(20px) saturate(0)',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.from('.floating-label', {
            x: -100,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                scrub: 1
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="glitch-showcase">
            <div className="showcase-img-wrap">
                <img src={cityImg} alt="Glitch City" className="showcase-img" />
                <div className="img-overlay-glitch"></div>
            </div>
            
            <div className="showcase-content">
                <div className="labels-group">
                    <div className="floating-label">SYSTEM_OVERRIDE</div>
                </div>
                <h2 className="showcase-title">VISUALIZING<br /><span>ENTROPY</span></h2>
            </div>
        </section>
    );
};

export default GlitchShowcase;
