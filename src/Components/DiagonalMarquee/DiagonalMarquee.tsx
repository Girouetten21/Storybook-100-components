import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './DiagonalMarquee.scss';

// Import local photos (keeping paths)
import photo1 from './img/1.webp';
import photo2 from './img/2.webp';
import photo3 from './img/3.webp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Global shared state for the scroll direction: 1 (Down/Normal), -1 (Up/Inverted)
const scrollState = { direction: 1 };

interface MarqueeBarProps {
    text: string;
    image: string;
    className: string;
    baseDirection: 'left' | 'right';
    speed: number;
}

const MarqueeBar: React.FC<MarqueeBarProps> = ({ text, image, className, baseDirection, speed }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const xPos = useRef(0);
    const currentSpeedMult = useRef(1);

    // POWERED BY GSAP-SKILLS: High-performance ticker management
    useGSAP(() => {
        const content = listRef.current;
        if (!content) return;

        let wrapWidth = 0;
        let baseVelocity = 0;
        const dirSign = baseDirection === 'left' ? -1 : 1;

        const calculateWidth = () => {
            const setEl = content.querySelector('.marquee-set') as HTMLDivElement;
            if (setEl) {
                const widthStyle = window.getComputedStyle(setEl).width;
                wrapWidth = parseFloat(widthStyle);
                baseVelocity = wrapWidth > 0 ? wrapWidth / (speed * 60) : 0;
            }
        };

        calculateWidth();

        const ro = new ResizeObserver(() => {
            calculateWidth();
        });
        ro.observe(content);

        const updateFn = () => {
            if (wrapWidth <= 0) return;

            const masterSign = scrollState.direction;

            // Interpolate speed multiplier
            currentSpeedMult.current += (masterSign - currentSpeedMult.current) * 0.05 * gsap.ticker.deltaRatio();

            // Calculate delta
            const delta = dirSign * currentSpeedMult.current * baseVelocity * gsap.ticker.deltaRatio();
            xPos.current += delta;

            // Mathematical wrap
            xPos.current = gsap.utils.wrap(-wrapWidth, 0, xPos.current);

            // Apply transform
            gsap.set(content, { x: xPos.current, force3D: true });
        };

        gsap.ticker.add(updateFn);

        return () => {
            gsap.ticker.remove(updateFn);
            ro.disconnect();
        };
    }, [baseDirection, speed]);

    const items = Array(8).fill(null).map((_, i) => (
        <div className="marquee-item" key={i}>
            <span className="text">{text}</span>
            <div className="circle-img">
                <img src={image} alt={text} />
            </div>
        </div>
    ));

    return (
        <div className={`marquee-bar ${className}`}>
            <div className="marquee-content" ref={listRef} style={{ willChange: 'transform' }}>
                <div className="marquee-set">{items}</div>
                <div className="marquee-set" aria-hidden="true">{items}</div>
            </div>
        </div>
    );
};

export const DiagonalMarquee: React.FC = () => {
    // POWERED BY GSAP-SKILLS: Master Scroll Controller
    useGSAP(() => {
        ScrollTrigger.create({
            onUpdate: (self) => {
                const currentDir = self.direction; // 1 (Down), -1 (Up)
                if (currentDir !== 0) {
                    scrollState.direction = currentDir;
                }
            }
        });
    });

    return (
        <div className="diagonal-marquee-container">
            <div className="marquee-wrapper">
                <MarqueeBar
                    text="FOOD TOUR"
                    image={photo1}
                    className="top-bar"
                    baseDirection="left"
                    speed={70}
                />
                <MarqueeBar
                    text="CHEESE & WINE"
                    image={photo2}
                    className="middle-bar"
                    baseDirection="right"
                    speed={60}
                />
                <MarqueeBar
                    text="MACARON TOUR"
                    image={photo3}
                    className="bottom-bar"
                    baseDirection="left"
                    speed={80}
                />
            </div>
        </div>
    );
};

export default DiagonalMarquee;
