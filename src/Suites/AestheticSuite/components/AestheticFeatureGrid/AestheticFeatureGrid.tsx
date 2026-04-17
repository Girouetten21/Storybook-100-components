import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticFeatureGrid.scss';
import img1 from '../../assets/gallery_1.png';
import img2 from '../../assets/gallery_2.png';

export const AestheticFeatureGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.feature-item', {
            opacity: 0,
            y: 40,
            rotation: (i) => i % 2 === 0 ? -5 : 5,
            stagger: 0.2,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-feature-grid">
            <div className="grid-header">
                <span className="eyebrow">The Details</span>
                <h2 className="title">Little Things, <i>Big Love</i></h2>
            </div>

            <div className="features-container">
                <div className="feature-item item-1">
                    <div className="item-visual" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="item-info">
                        <h3>Curated Materials</h3>
                        <p>We select only the softest textures for your peace of mind.</p>
                    </div>
                </div>

                <div className="feature-item item-2">
                    <div className="item-visual" style={{ backgroundImage: `url(${img2})` }}></div>
                    <div className="item-info">
                        <h3>Handcrafted Care</h3>
                        <p>Every piece tells a story of patience and dedication.</p>
                    </div>
                    <div className="item-sticker">✨</div>
                </div>

                <div className="feature-item item-3">
                    <div className="item-info">
                        <h3>Organic Shapes</h3>
                        <p>Finding harmony in the natural flow of life and design.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AestheticFeatureGrid;
