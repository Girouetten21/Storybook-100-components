import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Images
import forestImg from '../../assets/img/villas/forest.png';
import desertImg from '../../assets/img/villas/desert.png';
import coastalImg from '../../assets/img/villas/coastal.png';

import './ElysiumEstateShowcase.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Estate {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  features: string[];
  image: string;
}

const ESTATES: Estate[] = [
  {
    id: '01',
    title: 'AURELIA FOREST',
    location: 'Norway // Pine Canopy',
    price: '$8.4M',
    area: '6,200 SQFT',
    features: ['Solar Glass', 'Natural Geothermal', 'Infinity Canopy'],
    image: forestImg
  },
  {
    id: '02',
    title: 'DESERT MIRAGE',
    location: 'Utah // Red Cliff',
    price: '$12.2M',
    area: '9,450 SQFT',
    features: ['Brutalist Stone', 'Hidden Atrium', 'Canyon View'],
    image: desertImg
  },
  {
    id: '03',
    title: 'AZUREA MARINA',
    location: 'Amalfi // Sea Cliff',
    price: '$15.5M',
    area: '11,200 SQFT',
    features: ['Direct Bay Access', 'Stone Terrace', 'Marine Lounge'],
    image: coastalImg
  }
];

const ElysiumEstateShowcase: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Cinematic Reveal
        gsap.from('.estate-strip', {
            height: 0,
            duration: 2,
            stagger: 0.2,
            ease: "expo.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true
            }
        });

        gsap.from('.floating-title h2', {
             opacity: 0,
             y: 50,
             duration: 1.5,
             delay: 1,
             ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <section className="elysium-cinematic" ref={containerRef}>
            
            {/* 🏷️ FIXED FLOATING TITLE */}
            <div className="floating-title">
                <span className="eyebrow">THE LUXURY COLLECTION</span>
                <h2>ELYSIUM ESTATES</h2>
            </div>

            <div className="gallery-container">
                {ESTATES.map((estate, index) => (
                    <div 
                        key={estate.id}
                        className={`estate-strip ${activeIndex === index ? 'is-active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* 🖼️ IMMERSIVE BACKGROUND */}
                        <div className="strip-bg">
                            <img src={estate.image} alt={estate.title} />
                            <div className="vignette" />
                        </div>

                        {/* 📝 EDITORIAL CONTENT */}
                        <div className="strip-content">
                            <div className="content-inner">
                                <div className="id-marker">{estate.id}</div>
                                
                                <div className="main-info">
                                    <h3 className="estate-name">{estate.title}</h3>
                                    <p className="estate-loc">{estate.location}</p>
                                </div>

                                <div className="expanded-data">
                                    <div className="feature-list">
                                        {estate.features.map(f => <span key={f}>{f}</span>)}
                                    </div>
                                    <div className="stats-block">
                                        <div className="stat">
                                            <label>Acquisition</label>
                                            <p>{estate.price}</p>
                                        </div>
                                        <div className="stat">
                                            <label>Volume</label>
                                            <p>{estate.area}</p>
                                        </div>
                                    </div>
                                    <button className="cta-button">EXPLORE RESIDENCE</button>
                                </div>
                            </div>
                        </div>

                        {/* 🖱️ INTERACTION GUIDE */}
                        <div className="strip-label">
                            <span>{estate.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ElysiumEstateShowcase;
