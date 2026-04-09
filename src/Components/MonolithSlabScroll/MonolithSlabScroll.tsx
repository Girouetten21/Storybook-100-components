import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './MonolithSlabScroll.scss';

// Material Textures
import marbleImg from '../../assets/img/marble_texture.png';
import woodImg from '../../assets/img/walnut_texture.png';
import stoneImg from '../../assets/img/stone_texture.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLABS = [
  {
    id: 'marble',
    title: 'CARRARA WHITE',
    subtitle: 'PURE. VEINED. ELEGANT.',
    description: 'Extracted from the heart of the Apuan Alps, our marble embodies timeless architectural perfection.',
    image: marbleImg,
    theme: 'light'
  },
  {
    id: 'wood',
    title: 'NOBLE WALNUT',
    subtitle: 'WARMTH. GRAIN. SOUL.',
    description: 'Fine walnut wood, meticulously treated to reveal the organic stories written in its rings.',
    image: woodImg,
    theme: 'dark'
  },
  {
    id: 'stone',
    title: 'OBSIDIAN BASALT',
    subtitle: 'STRENGTH. DEPTH. BOLD.',
    description: 'Volcanic basalt, a monolith of durability and raw texture for futuristic structural designs.',
    image: stoneImg,
    theme: 'dark'
  }
];

export const MonolithSlabScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const slabs = gsap.utils.toArray('.slab-layer');
        
        slabs.forEach((slab: any) => {
            
            // Pinning individual slabs to create the "uncovering" effect
            // end: '+=150%' offers a balanced scroll-to-content ratio
            ScrollTrigger.create({
                trigger: slab,
                start: "top 0%",
                end: "+=150%", 
                pin: true,
                pinSpacing: true, 
                scrub: 1,
                anticipatePin: 1, // Fixes the 'jump' on activation
                fastScrollEnd: true,
                refreshPriority: 1
            });

            // Animation for elements within the slab
            const content = slab.querySelector('.slab-content');
            const bg = slab.querySelector('.slab-bg');

            gsap.timeline({
                scrollTrigger: {
                    trigger: slab,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1
                }
            })
            // Initial 'Holding' phase: optimized for the 150% distance
            .to(bg, {
                scale: 1.1,
                opacity: 0.4,
                ease: 'none',
                duration: 1
            })
            .to(content, {
                y: '-40px',
                autoAlpha: 0,
                ease: 'power2.in',
                duration: 0.4
            }, ">-0.4"); // Starts closer to the end for a cleaner wipe
        });

    }, { scope: containerRef });

    return (
        <div className="monolith-slab-scroll" ref={containerRef}>
            {SLABS.map((slab) => (
                <section key={slab.id} className={`slab-layer theme-${slab.theme}`}>
                    <div 
                        className="slab-bg" 
                        style={{ backgroundImage: `url(${slab.image})` }}
                    />
                    <div className="slab-overlay" />
                    
                    <div className="slab-content">
                        <header className="slab-header">
                            <span className="slab-id">MAT_RES_{slab.id.toUpperCase()}</span>
                            <h2 className="slab-title">{slab.title}</h2>
                            <p className="slab-subtitle">{slab.subtitle}</p>
                        </header>
                        
                        <div className="slab-footer">
                            <p className="slab-description">{slab.description}</p>
                            <button className="slab-explorer">VIEW MONOLITH</button>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default MonolithSlabScroll;
