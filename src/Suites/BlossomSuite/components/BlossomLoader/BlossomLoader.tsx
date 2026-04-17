import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './BlossomLoader.scss';

export const BlossomLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setInterval(() => {
            setProgress(prev => (prev < 100 ? prev + 1 : 100));
        }, 30);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useGSAP(() => {
        if (progress === 100) {
            const tl = gsap.timeline();
            tl.to('.loader-content', { 
                opacity: 0, 
                y: -20, 
                duration: 0.8, 
                ease: 'power2.inOut' 
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: 'expo.inOut'
            }, '-=0.3');
        }
    }, { scope: containerRef, dependencies: [progress === 100] });

    return (
        <div ref={containerRef} className="blossom-loader">
            <div className="loader-content">
                <div className="flower-icon">🌸</div>
                <div className="percentage-container">
                    <span className="percentage">{progress}%</span>
                    <div className="progress-bar-wrapper">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <p className="loading-text">Nurturing the beauty...</p>
            </div>
            <div className="loader-bg-decor"></div>
        </div>
    );
};

export default BlossomLoader;
