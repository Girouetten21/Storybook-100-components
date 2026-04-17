import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticMoodScrapbook.scss';

import img1 from '../../assets/gallery_1.png';
import img2 from '../../assets/gallery_2.png';
import img3 from '../../assets/gallery_3.png';
import img4 from '../../assets/hero_door.png';

export const AestheticMoodScrapbook: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.scrapbook-item', {
            opacity: 0,
            scale: 0.5,
            rotation: () => gsap.utils.random(-20, 20),
            y: 100,
            stagger: {
                amount: 1.5,
                from: 'random'
            },
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            }
        });

        // Soft floating for stamps and stickers
        gsap.to('.sticker', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.5
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-mood-scrapbook">
            <div className="scrapbook-header">
                <span className="eyebrow">The Collection</span>
                <h2 className="title">Visual <i>Moodboard</i></h2>
            </div>

            <div className="scrapbook-container">
                <div className="scrapbook-item polaroid-1">
                    <div className="image" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="caption">Soft Textures</div>
                </div>

                <div className="scrapbook-item polaroid-2">
                    <div className="image" style={{ backgroundImage: `url(${img2})` }}></div>
                    <div className="caption">Morning Tea</div>
                </div>

                <div className="scrapbook-item large-img">
                    <div className="image" style={{ backgroundImage: `url(${img3})` }}></div>
                    <div className="washi-tape"></div>
                </div>

                <div className="scrapbook-item card-note">
                    <div className="note-content">
                        <p>“Creativity is the soul's way of breathing.”</p>
                        <span>— Anonymous</span>
                    </div>
                </div>

                <div className="scrapbook-item mini-img">
                    <div className="image" style={{ backgroundImage: `url(${img4})` }}></div>
                </div>

                <div className="scrapbook-item polaroid-3">
                    <div className="image" style={{ backgroundImage: `url(${img3})` }}></div>
                    <div className="caption">Golden Hours</div>
                </div>

                <div className="scrapbook-item card-note-2">
                    <div className="note-content">
                        <p>Stay <i>Gentle</i></p>
                    </div>
                </div>

                {/* Stickers and Ornaments */}
                <div className="sticker s-1">✨</div>
                <div className="sticker s-2">🌸</div>
                <div className="sticker s-3">🫧</div>
                <div className="sticker s-4">🕊️</div>
                <div className="stamp">APR 2026</div>
            </div>
        </section>
    );
};

export default AestheticMoodScrapbook;
