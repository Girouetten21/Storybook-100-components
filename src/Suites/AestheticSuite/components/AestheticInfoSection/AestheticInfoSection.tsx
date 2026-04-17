import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticInfoSection.scss';
import infoImg from '../../assets/gallery_1.png';

export const AestheticInfoSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.info-image', {
            clipPath: 'inset(100% 0 0 0)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.info-image',
                start: 'top 80%'
            }
        });

        gsap.from('.info-text > *', {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.info-text',
                start: 'top 75%'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-info-section">
            <div className="info-content">
                <div className="info-text">
                    <span className="info-tag">The Philosophy</span>
                    <h2 className="info-title">The Art of <i>Simplicity</i></h2>
                    <p className="info-desc">
                        We believe that beauty lies in the quiet moments. Our design approach is rooted in the soft textures, 
                        gentle shadows, and peaceful atmospheres that surround us every day.
                    </p>
                    <button className="info-cta">Learn More</button>
                </div>
                <div className="info-visual">
                    <div className="image-frame">
                        <div className="info-image" style={{ backgroundImage: `url(${infoImg})` }}></div>
                        <div className="frame-decoration"></div>
                    </div>
                </div>
            </div>
            
            <div className="background-shapes">
                <div className="shape shape-1"></div>
            </div>
        </section>
    );
};

export default AestheticInfoSection;
