import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './GlitchLoader.scss';

const preventScroll = (e: Event) => e.preventDefault();

export const GlitchLoader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
        } else {
            document.body.style.overflow = '';
        }

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const next = prev + Math.floor(Math.random() * 10) + 2;
                return next > 100 ? 100 : next;
            });
        }, 150);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, [visible]);

    useEffect(() => {
        if (progress === 100) {
            gsap.to(loaderRef.current, {
                autoAlpha: 0,
                duration: 1,
                delay: 0.5,
                ease: "power4.inOut",
                onComplete: () => setVisible(false)
            });
        }
    }, [progress]);

    if (!visible) return null;

    return (
        <div ref={loaderRef} className="glitch-loader">
            <div className="loader-glitch-text" data-text={`${progress}%`}>
                {progress}%
            </div>
            <div className="loader-status-bar">
                <div className="bar-progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="loader-terminal-stream">
                <div>&gt; INITIALIZING_Glitch_KERNEL...</div>
                <div>&gt; BYPASSING_SYMMETRY_PROTOCOLS... [OK]</div>
                <div>&gt; INJECTING_ENTROPY_VECTORS... [OK]</div>
                <div>&gt; ESTABLISHING_VISUAL_DISRUPTION... [OK]</div>
                <div>&gt; SYSTEM_READY_FOR_BREACH.</div>
            </div>
        </div>
    );
};

export default GlitchLoader;
