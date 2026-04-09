import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EthosMaterialSection.scss';

// Material Assets
import silkImg from '../../assets/img/ethos/silk.png';
import cashmereImg from '../../assets/img/ethos/cashmere.png';
import modelImg from '../../assets/img/ethos/model.png';
import drapeImg from '../../assets/img/ethos/drape.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ETHOS_FEATURES = [
    {
        title: "LUSTRE SILK",
        desc: "Organic mulberry fibers treated with a specialized washing process to enhance natural light refraction and tensile strength.",
        img: silkImg
    },
    {
        title: "KINETIC CASHMERE",
        desc: "A carbon-neutral weave designed for active thermal regulation, maintaining a constant micro-climate between skin and garment.",
        img: cashmereImg
    },
    {
        title: "ARCHITECTURAL DRAPE",
        desc: "Engineered weight distribution achieved through a high-torsion yarn structure that maintains its silhouette indefinitely.",
        img: drapeImg
    }
];

export const EthosMaterialSection: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!mainRef.current) return;

        // 📝 HEADER & TAG ANIMATION
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.ethos-header',
                start: 'top 85%',
            }
        });

        headerTl
            .from('.ethos-tag', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' })
            .from('.ethos-title', { opacity: 0, y: 40, duration: 1.2, ease: 'power4.out' }, '-=0.6');

        // 🧥 HERO PARALLAX & REVEAL
        gsap.from('.hero-img-box img', {
            scale: 1.15,
            scrollTrigger: {
                trigger: '.ethos-hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.from('.hero-desc-box > *', {
            opacity: 0,
            x: 50,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero-desc-box',
                start: 'top 80%',
            }
        });

        // 🧪 FEATURES STAGGER
        gsap.from('.feature-card', {
            opacity: 0,
            y: 60,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.ethos-features',
                start: 'top 85%',
            }
        });

        // 🌊 BACKGROUND FLOATING ELEMENTS
        gsap.to('.ethos-bg-text', {
            y: '-10vh',
            ease: 'none',
            scrollTrigger: {
                trigger: '.ethos-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.ethos-floating-marker.left', { y: '-20vh', scrollTrigger: { trigger: '.ethos-section', scrub: 2 } });
        gsap.to('.ethos-floating-marker.right', { y: '20vh', scrollTrigger: { trigger: '.ethos-section', scrub: 2 } });

    }, { scope: mainRef });

    return (
        <section className="ethos-section" ref={mainRef}>
            
            <div className="ethos-bg-text">FASHION</div>
            <div className="ethos-floating-marker left">MATERIAL PHILOSOPHY // 2026</div>
            <div className="ethos-floating-marker right">ETHOS // FASHION SYSTEM</div>

            <header className="ethos-header">
                <span className="ethos-tag">Service Philosophy</span>
                <h2 className="ethos-title">MATERIAL <span>INTELLIGENCE</span></h2>
            </header>

            <article className="ethos-hero">
                <div className="hero-img-box">
                    <img src={modelImg} alt="Ethos Editorial" />
                    <div className="img-overlay-text">01. THE SILHOUETTE</div>
                </div>
                <div className="hero-desc-box">
                    <h3>Defining the <br />Silent Sophisticate.</h3>
                    <p>
                        Our approach to garment service is rooted in a deep understanding of textile physics. 
                        Each feature is designed not just for aesthetic impact, but for a lifetime of kinetic performance.
                    </p>
                    <div className="ethos-cta">Explore the Weave</div>
                </div>
            </article>

            <div className="ethos-features">
                {ETHOS_FEATURES.map((feat, idx) => (
                    <div key={idx} className="feature-card">
                        <div className="f-icon-box">
                            <img src={feat.img} alt={feat.title} />
                        </div>
                        <h4>{feat.title}</h4>
                        <p>{feat.desc}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default EthosMaterialSection;
