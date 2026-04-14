import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FashionImpactSection.scss';

// NEW ASSET IMPORTS FROM SRC/ASSETS/IMG
import img01 from '../../img/generated_4.png';
import img02 from '../../img/generated_5.png';
import img03 from '../../img/generated_6.png';

const IMAGES = [img01, img02, img03];

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EDITORIAL_DATA = [
    {
        id: "01",
        title: "MINIMAL",
        subtitle: "The Power of Less",
        imgMain: IMAGES[0],
        imgFloat: IMAGES[1],
        description: "In a world of noise, silence is the ultimate statement. A study of architectural couture and light.",
        bg: "#0d0d0d"
    },
    {
        id: "02",
        title: "GOLDEN",
        subtitle: "Liquid Embroidery",
        imgMain: IMAGES[1],
        imgFloat: IMAGES[2],
        description: "Where technology meets the silk of the sun. Exploring the intricate patterns of handcrafted excellence.",
        bg: "#1a1610"
    },
    {
        id: "03",
        title: "AVANT",
        subtitle: "Monolith Style",
        imgMain: IMAGES[2],
        imgFloat: IMAGES[0],
        description: "Breaking the silhouette of the ordinary. A journey into the geometry of shadow and movement.",
        bg: "#0d0d0d"
    }
];

export const FashionImpactSection: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.editorial-section');

        sections.forEach((section: any, i: number) => {
            const mainImg = section.querySelector('.main-parallax-img');
            const floatImg = section.querySelector('.floating-detail-img');
            const title = section.querySelector('.editorial-title');
            const subtitle = section.querySelector('.editorial-subtitle');
            const reveal = section.querySelector('.reveal-mask');

            // 1. REVEAL MASK (Page Turn Effect)
            gsap.fromTo(reveal, 
                { clipPath: "inset(100% 0% 0% 0%)" },
                { 
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 1
                    }
                }
            );

            // 2. MAIN IMAGE PARALLAX (Heavy & Slow)
            gsap.fromTo(mainImg,
                { yPercent: -15 },
                { 
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // 3. FLOATING IMAGE (Fast & Dynamic - Centered)
            gsap.fromTo(floatImg,
                { yPercent: 20 },
                { 
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            );

            // 4. TITLE & SUBTITLE PARALLAX (Horizontal drift)
            gsap.fromTo(title,
                { xPercent: i % 2 === 0 ? -10 : 10, autoAlpha: 0.5 },
                { 
                    xPercent: i % 2 === 0 ? 10 : -10,
                    autoAlpha: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2
                    }
                }
            );

            gsap.fromTo(subtitle,
                { autoAlpha: 0, x: i % 2 === 0 ? -30 : 30 },
                { 
                    autoAlpha: 1, x: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1
                    }
                }
            );
        });

    }, { scope: mainRef });

    return (
        <div ref={mainRef} className="editorial-wrapper">
            {EDITORIAL_DATA.map((item, index) => (
                <section 
                    key={index} 
                    className="editorial-section" 
                    style={{ backgroundColor: item.bg, color: item.bg === '#0d0d0d' ? '#fff' : '#0d0d0d' }}
                >
                    <div className="reveal-mask">
                        {/* PARALLAX BG */}
                        <div className="main-parallax-container">
                            <img src={item.imgMain} alt={item.title} className="main-parallax-img" />
                            <div className="vignette-overlay"></div>
                        </div>

                        {/* FLOATING CONTENT */}
                        <div className="editorial-content">
                            <div className="meta-info">
                                <span className="id-num">{item.id}</span>
                                <span className="category">EDITION // 2026</span>
                            </div>

                            <div className="text-container">
                                <h3 className="editorial-subtitle">{item.subtitle}</h3>
                                <h2 className="editorial-title">{item.title}</h2>
                                <p className="editorial-desc">{item.description}</p>
                            </div>
                        </div>

                        {/* THE WOW FLOATING ELEMENT */}
                        <div className="floating-detail-container">
                            <span className="float-meta">VIEW // DETAIL</span>
                            <img src={item.imgFloat} alt="Detail" className="floating-detail-img" />
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default FashionImpactSection;
