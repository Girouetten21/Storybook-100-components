import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlitchGateHero.scss';
import glitchAsset from '../../img/glitch_asset.png';

gsap.registerPlugin(ScrollTrigger);

const preventScroll = (e: Event) => e.preventDefault();

export const GlitchGateHero: React.FC = () => {
    const [isBreached, setIsBreached] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isBreached) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [isBreached]);

    const handleBreach = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsBreached(true);
                document.documentElement.classList.add('is-glitch-breached');
                document.body.classList.add('is-glitch-breached');
            }
        });

        tl.to('.breach-btn', { 
            scale: 1.5,
            skewX: 20,
            autoAlpha: 0,
            duration: 0.2,
            ease: "steps(4)"
        })
        .to('.gate-content', { 
            scale: 0.8,
            filter: 'blur(20px) contrast(2)',
            autoAlpha: 0, 
            duration: 0.4,
            ease: "power2.in"
        }, "<")
        .to('.gate-overlay', {
            autoAlpha: 0,
            duration: 0.6,
            ease: "steps(6)"
        })
        .fromTo('.revealed-content', 
            { autoAlpha: 0, scale: 1.5, filter: 'hue-rotate(90deg) blur(50px)' },
            { 
                autoAlpha: 1, 
                scale: 1, 
                filter: 'hue-rotate(0deg) blur(0px)', 
                duration: 1.2, 
                ease: "expo.out",
                // Flicker effect
                onStart: () => {
                    gsap.fromTo('.revealed-content', { opacity: 0 }, { opacity: 1, repeat: 5, duration: 0.05 });
                }
            },
            "-=0.4"
        );
    };

    return (
        <div ref={containerRef} className="glitch-gate-hero">
            {!isBreached && (
                <div className="gate-overlay">
                    <div className="gate-noise"></div>
                    <div className="gate-wall top"></div>
                    <div className="gate-wall bottom"></div>
                    
                    <div className="gate-content">
                        <div className="glitch-title" data-text="SYSTEM_VOID">
                            SYSTEM_VOID
                        </div>
                        <p className="gate-warning">WARNING: UNAUTHORIZED ENTROPY DETECTED</p>
                        <button className="breach-btn" onClick={handleBreach}>
                            <span className="btn-glitch-layer">BREACH_SYSTEM</span>
                            <span className="btn-glitch-layer">BREACH_SYSTEM</span>
                            BREACH_SYSTEM
                        </button>
                    </div>
                </div>
            )}

            <div className={`revealed-content ${isBreached ? 'active' : ''}`}>
                <div className="hero-bg-asset" style={{ backgroundImage: `url(${glitchAsset})` }}></div>
                <div className="hero-typography">
                    <h1 className="main-title">CONTROLLED<br /><span>ENTROPY</span></h1>
                    <div className="hero-details">
                        <div className="detail-item">
                            <span>ARCHIVE_TYPE</span>
                            <span>POST-DIGITAL_GLITCH</span>
                        </div>
                        <div className="detail-item">
                            <span>STABILITY_LEVEL</span>
                            <span className="status-low">CRITICAL_FLUX</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlitchGateHero;
