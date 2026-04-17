import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BlossomMarquee.scss';

import photo1 from '../../img/blossom_1.png';
import photo2 from '../../img/blossom_2.png';
import photo3 from '../../img/blossom_3.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

    useGSAP(() => {
        const content = listRef.current;
        if (!content) return;

        let wrapWidth = 0;
        let baseVelocity = 0;
        const dirSign = baseDirection === 'left' ? -1 : 1;

        const calculateWidth = () => {
            const setEl = content.querySelector('.blossom-marquee-set') as HTMLDivElement;
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
            currentSpeedMult.current += (masterSign - currentSpeedMult.current) * 0.05 * gsap.ticker.deltaRatio();
            const delta = dirSign * currentSpeedMult.current * baseVelocity * gsap.ticker.deltaRatio();
            xPos.current += delta;
            xPos.current = gsap.utils.wrap(-wrapWidth, 0, xPos.current);
            gsap.set(content, { x: xPos.current, force3D: true });
        };

        gsap.ticker.add(updateFn);

        return () => {
            gsap.ticker.remove(updateFn);
            ro.disconnect();
        };
    }, [baseDirection, speed]);

    const items = Array(8).fill(null).map((_, i) => (
        <div className="blossom-marquee-item" key={i}>
            <span className="blossom-text">{text}</span>
            <div className="blossom-circle-img">
                <img src={image} alt={text} />
            </div>
        </div>
    ));

    return (
        <div className={`blossom-marquee-bar ${className}`}>
            <div className="blossom-marquee-content" ref={listRef} style={{ willChange: 'transform' }}>
                <div className="blossom-marquee-set">{items}</div>
                <div className="blossom-marquee-set" aria-hidden="true">{items}</div>
            </div>
        </div>
    );
};

export const BlossomMarquee: React.FC = () => {
    useGSAP(() => {
        ScrollTrigger.create({
            onUpdate: (self) => {
                const currentDir = self.direction; 
                if (currentDir !== 0) {
                    scrollState.direction = currentDir;
                }
            }
        });
    });

    return (
        <div className="blossom-marquee-container">
            <div className="blossom-marquee-wrapper">
                <MarqueeBar
                    text="SPRING BLOSSOM"
                    image={photo1}
                    className="blossom-top-bar"
                    baseDirection="left"
                    speed={70}
                />
                <MarqueeBar
                    text="CHERRY PETALS"
                    image={photo2}
                    className="blossom-middle-bar"
                    baseDirection="right"
                    speed={60}
                />
                <MarqueeBar
                    text="NATURE HARMONY"
                    image={photo3}
                    className="blossom-bottom-bar"
                    baseDirection="left"
                    speed={80}
                />
            </div>
        </div>
    );
};

export default BlossomMarquee;
