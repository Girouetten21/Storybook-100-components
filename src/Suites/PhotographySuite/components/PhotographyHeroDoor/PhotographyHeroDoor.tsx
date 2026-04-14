import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Assets
import heroMainImg from '../../img/hero_main.png';
import lensAct1Img from '../../img/menu_silhouette.png';
import lensAct3Img from '../../img/lens_act3.png';

import './PhotographyHeroDoor.scss';

interface PhotographyHeroDoorProps {
    onUnlock?: () => void;
}

const PhotographyHeroDoor: React.FC<PhotographyHeroDoorProps> = ({ onUnlock }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 🔒 Aggressive Scroll Block logic
    useEffect(() => {
        const preventScroll = (e: Event) => {
            if (!isUnlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        if (!isUnlocked) {
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        }

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            document.body.style.overflow = '';
        };
    }, [isUnlocked]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const frameTexts = gsap.utils.toArray('.frame-text');
        frameTexts.forEach((text: any) => {
            const spans = text.querySelectorAll('span');
            gsap.to(spans, {
                xPercent: -100,
                duration: 30,
                repeat: -1,
                ease: "none",
            });
        });

        const unlock = () => {
            setIsUnlocked(true);
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onUnlock) onUnlock();
                }
            });
            tl.to('.central-door', { scale: 0.9, opacity: 0, duration: 0.8, ease: "power4.in" })
                .to('.split-half.left', { xPercent: -100, rotate: -5, duration: 1.2, ease: "power4.inOut" }, "-=0.4")
                .to('.split-half.right', { xPercent: 100, rotate: 5, duration: 1.2, ease: "power4.inOut" }, "<")
                .to('.hero-frame', { opacity: 0, scale: 1.1, stagger: 0.1, duration: 1 }, "-=0.8")
                .to('.photography-hero-door', { pointerEvents: 'none', visibility: 'hidden', duration: 0.5 });
        };

        const btn = containerRef.current.querySelector('.door-cta');
        btn?.addEventListener('click', unlock);

        const door = containerRef.current.querySelector('.central-door');
        const moveDoor = (e: MouseEvent) => {
            if (!door) return;
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) / 40;
            const y = (clientY - window.innerHeight / 2) / 40;
            gsap.to(door, { x: x, y: y, duration: 2, ease: "power2.out" });
        };
        window.addEventListener('mousemove', moveDoor);

        return () => {
            window.removeEventListener('mousemove', moveDoor);
            btn?.removeEventListener('click', unlock);
        };
    }, { scope: containerRef });

    return (
        <section className="photography-hero-door" ref={containerRef}>

            <div className="hero-bg-split">
                <div className="split-half left">
                    <img src={lensAct1Img} alt="The Observer" />
                </div>
                <div className="split-half right">
                    <img src={lensAct3Img} alt="The Capture" />
                </div>
            </div>

            <div className="hero-frame top">
                <div className="frame-text">
                    <span>CURATED // ARCHITECTURAL // NARRATIVE // BOUTIQUE // PORTFOLIO // PURE // FOCUS // </span>
                    <span>CURATED // ARCHITECTURAL // NARRATIVE // BOUTIQUE // PORTFOLIO // PURE // FOCUS // </span>
                    <span>CURATED // ARCHITECTURAL // NARRATIVE // BOUTIQUE // PORTFOLIO // PURE // FOCUS // </span>
                </div>
            </div>
            <div className="hero-frame right">
                <div className="frame-text vertical">
                    <span>EDITORIAL // SOUL // REACTION // </span>
                    <span>EDITORIAL // SOUL // REACTION // </span>
                    <span>EDITORIAL // SOUL // REACTION // </span>
                </div>
            </div>
            <div className="hero-frame bottom">
                <div className="frame-text">
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG // SOUL // MECHANICAL // PRECISION // </span>
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG // SOUL // MECHANICAL // PRECISION // </span>
                    <span>© 2026 // TECHNICAL ARTISTRY // ANALOG // SOUL // MECHANICAL // PRECISION // </span>
                </div>
            </div>
            <div className="hero-frame left">
                <div className="frame-text vertical">
                    <span>RAW // EMOTION // SILENCE // </span>
                    <span>RAW // EMOTION // SILENCE // </span>
                    <span>RAW // EMOTION // SILENCE // </span>
                </div>
            </div>

            <div className="hero-hud top-right">
                <div className="hud-line">F/1.4</div>
                <div className="hud-line">1/250s</div>
            </div>
            <div className="hero-hud bottom-left">
                <div className="hud-line">ISO 64</div>
                <div className="hud-line">35MM</div>
            </div>

            <div className="central-door">
                <div className="door-image-container">
                    <img src={heroMainImg} alt="The Photographer" />
                    <div className="door-overlay" />
                    <div className="door-label">THE ART OF FOCUS</div>
                </div>
                <div className="door-info">
                    <h2>SILENT<br /><span>ECHOES</span></h2>
                    <p>Capturing the geometry of modern existence.</p>
                    <button className="door-cta">READ // STORY</button>
                </div>
            </div>

        </section>
    );
};

export default PhotographyHeroDoor;
