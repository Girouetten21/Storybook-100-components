import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticHeroDoor.scss';
import heroImg from '../../assets/hero_door.png';

export const AestheticHeroDoor: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=100%',
                pin: true,
                scrub: 1
            }
        });

        // Split Door Opening
        tl.to('.door-panel.left', { xPercent: -100, ease: 'power2.inOut' }, 0)
          .to('.door-panel.right', { xPercent: 100, ease: 'power2.inOut' }, 0)
          .from('.hero-text-content', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 1, 
            ease: 'back.out(1.7)' 
          }, 0.2);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-hero-door">
            <div className="hero-background" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-text-content">
                    <span className="hero-eyebrow">Welcome to our world</span>
                    <h1 className="hero-title">Beauty in <i>Softness</i></h1>
                    <p className="hero-subtitle">Designed with love and attention to every detail.</p>
                </div>
            </div>

            <div className="door-panels">
                <div className="door-panel left">
                    <div className="panel-design">
                        <div className="ornament"></div>
                    </div>
                </div>
                <div className="door-panel right">
                    <div className="panel-design">
                        <div className="ornament"></div>
                    </div>
                </div>
                
                {/* Manual Scroll Hint */}
                <div className="scroll-hint">
                    <span className="hint-text">Scroll to Open</span>
                    <div className="hint-line"></div>
                </div>
            </div>
        </section>
    );
};

export default AestheticHeroDoor;
