import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticLoader.scss';

export const AestheticLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // Lock scroll while loading using a style tag to ensure high specificity
    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'loader-scroll-lock';
        style.innerHTML = `
            html, body {
                overflow: hidden !important;
                height: 100% !important;
                touch-action: none !important;
                -ms-touch-action: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const lock = document.getElementById('loader-scroll-lock');
            if (lock) lock.remove();
        };
    }, []);

    // Unlock when finished
    useEffect(() => {
        if (progress === 100) {
            // Delay the unlock slightly to match the curtain lift
            const timeout = setTimeout(() => {
                const lock = document.getElementById('loader-scroll-lock');
                if (lock) lock.remove();
            }, 1200); // Sincronizado con la animación de salida
            return () => clearTimeout(timeout);
        }
    }, [progress]);

    // 1. Initial Setup and Entrance
    useGSAP(() => {
        const timer = setInterval(() => {
            setProgress(prev => (prev < 100 ? prev + 1 : 100));
        }, 40); // Slightly slower for better feel

        gsap.from('.loader-heart', {
            scale: 0,
            opacity: 0,
            duration: 1.8,
            ease: 'elastic.out(1, 0.4)'
        });

        return () => clearInterval(timer);
    }, { scope: containerRef });

    // 2. Pulse and Exit
    useGSAP(() => {
        if (progress < 100) {
            // Heartbeat effect
            gsap.to('.loader-heart', {
                scale: 1.15,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'back.inOut(2)'
            });
        } else {
            const tl = gsap.timeline();
            
            tl.to('.loader-content', { 
                opacity: 0, 
                y: -40, 
                duration: 0.8, 
                ease: 'power2.inOut' 
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.6,
                ease: 'expo.inOut'
            }, '-=0.4')
            .to('.curve-2', {
                yPercent: 400, // Even more down for a safe exit
                duration: 1.6,
                ease: 'expo.inOut'
            }, '<'); // Start at the same time as the parent lift
        }
    }, { scope: containerRef, dependencies: [progress === 100] });

    return (
        <div ref={containerRef} className="aesthetic-loader">
            <div className="loader-content">
                <div className="heart-wrapper">
                    <svg className="loader-heart" viewBox="0 0 32 32">
                        <path d="M16 28.5L14.1 26.8C7.33 20.6 3 16.7 3 11.9C3 8.04 6.04 5 9.9 5C12.1 5 14.1 6 15.4 7.5L16 8.2L16.6 7.5C17.9 6 19.9 5 22.1 5C25.96 5 29 8.04 29 11.9C29 16.7 24.67 20.6 17.9 26.8L16 28.5Z" />
                        <path 
                            className="heart-fill" 
                            style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                            d="M16 28.5L14.1 26.8C7.33 20.6 3 16.7 3 11.9C3 8.04 6.04 5 9.9 5C12.1 5 14.1 6 15.4 7.5L16 8.2L16.6 7.5C17.9 6 19.9 5 22.1 5C25.96 5 29 8.04 29 11.9C29 16.7 24.67 20.6 17.9 26.8L16 28.5Z" 
                        />
                    </svg>
                </div>
                <div className="loader-text">
                    <span className="percentage">{progress}%</span>
                    <p className="status">Creating sweetness...</p>
                </div>
            </div>
            
            <div className="loader-curves">
                <div className="curve curve-1"></div>
                <div className="curve curve-2"></div>
            </div>
        </div>
    );
};

export default AestheticLoader;
