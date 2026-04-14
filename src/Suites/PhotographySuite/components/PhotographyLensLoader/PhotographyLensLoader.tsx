import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import './PhotographyLensLoader.scss';

interface PhotographyLensLoaderProps {
    onComplete?: () => void;
}

const PhotographyLensLoader: React.FC<PhotographyLensLoaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                const increment = Math.random() * 8;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        return () => clearInterval(timer);
    }, []);

    useGSAP(() => {
        if (!loaderRef.current) return;

        // 🎞️ Latido del diafragma
        gsap.to('.shutter-blade', {
            rotation: (i) => i * 45 + 10,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        // 🌈 Aberración cromática del porcentaje (Convergen al final)
        const deviation = (100 - progress) * 0.15;
        gsap.to('.pct-r', { x: -deviation, y: -deviation / 2, duration: 0.1 });
        gsap.to('.pct-b', { x: deviation, y: deviation / 2, duration: 0.1 });

        if (progress === 100) {
            const tl = gsap.timeline({
                onComplete: () => { if (onComplete) onComplete(); }
            });

            tl.to('.loader-center-piece', { scale: 1.1, opacity: 0, duration: 0.8, ease: "power4.in" })
              .to(loaderRef.current, { 
                yPercent: -100, 
                duration: 1.4, 
                ease: "power4.inOut" 
              }, "-=0.4");
        }
    }, [progress]);

    return (
        <div className="photography-lens-loader" ref={loaderRef}>
            {/* 🔳 BACKGROUND CALIBRATION GRID */}
            <div className="calibration-grid"></div>
            <div className="film-grain"></div>
            <div className="scan-line"></div>
            
            <div className="loader-container">
                
                {/* 🎯 MECHANICAL CORE */}
                <div className="loader-center-piece">
                    <div className="shutter-mechanical">
                        <svg viewBox="0 0 100 100">
                            {[...Array(8)].map((_, i) => (
                                <path
                                    key={i}
                                    className="shutter-blade"
                                    d="M50,50 L100,0 L100,100 Z"
                                    style={{ transform: `rotate(${i * 45}deg)` }}
                                />
                            ))}
                        </svg>
                        <div className="lens-glass">
                            <div className="lens-reflection"></div>
                        </div>
                    </div>

                    {/* 🌈 CHROMATIC PERCENTAGE */}
                    <div className="loader-percentage">
                        <span className="pct-layer pct-r">{Math.round(progress)}</span>
                        <span className="pct-layer pct-b">{Math.round(progress)}</span>
                        <span className="pct-layer pct-main">{Math.round(progress)}</span>
                        <span className="pct-unit">%</span>
                    </div>
                </div>

                {/* 📟 TECHNICAL HUD */}
                <div className="loader-footer-hud">
                    <div className="hud-row">
                        <span className="label">OPTICS</span>
                        <span className="value">{progress < 50 ? "DE-SQUEEZING..." : "CALIBRATED"}</span>
                    </div>
                    <div className="hud-row">
                        <span className="label">SENSOR</span>
                        <span className="value">{progress < 80 ? "INITIALIZING..." : "44x33MM ACTIVE"}</span>
                    </div>
                    <div className="hud-row">
                        <span className="label">SHUTTER</span>
                        <span className="value">MECHANICAL // 1/8000</span>
                    </div>
                </div>

            </div>

            {/* 📐 VIEW COORDINATES */}
            <div className="loader-meta-tags">
                <div className="tag tl">R:024 G:122 B:009</div>
                <div className="tag tr">REC ●</div>
                <div className="tag bl">3200K</div>
                <div className="tag br">F:2.8</div>
            </div>
        </div>
    );
};

export default PhotographyLensLoader;
