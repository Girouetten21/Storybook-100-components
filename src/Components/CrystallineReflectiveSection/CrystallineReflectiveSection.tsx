import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CrystallineReflectiveSection.scss';

// Crystalline Assets
import prismBg from '../../assets/img/gems/prism.png';
import sapphireCube from '../../assets/img/gems/sapphire_cube.png';
import diamondImg from '../../assets/img/gems/diamond.png';
import emeraldImg from '../../assets/img/gems/emerald.png';
import rubyImg from '../../assets/img/gems/ruby.png';
import amethystImg from '../../assets/img/gems/amethyst.png';
import quartzImg from '../../assets/img/gems/quartz.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CRYSTAL_ITEMS = [
    { title: "KASHMIRI SAPPHIRE", desc: "Reflections of the eternal blue peaks.", img: sapphireCube },
    { title: "RAW EMERALD", desc: "Tactile glass and raw texture.", img: emeraldImg },
    { title: "OBSIDIAN DIAMOND", desc: "Refraction beyond clarity.", img: diamondImg },
    { title: "BLOOD RUBY", desc: "The intense fire of a lost era.", img: rubyImg },
    { title: "ROYAL AMETHYST", desc: "A spiritual echo of purple hues.", img: amethystImg },
    { title: "CRYSTAL QUARTZ", desc: "The absolute source of clarity.", img: quartzImg }
];

export const CrystallineReflectiveSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // ✨ HEADER REVEAL
        gsap.from('.c-tag', { opacity: 0, y: 20, duration: 1, delay: 0.2, ease: "power2.out" });
        gsap.from('.c-title', { opacity: 0, y: 30, duration: 1.2, delay: 0.4, ease: "power3.out" });

        // ✨ ELEGANT ENTRANCE ANIMATION (Pedestals)
        gsap.from('.glass-card', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.crystalline-grid',
                start: "top 85%",
                once: true
            }
        });

        // 🌀 AMBIENT PRISM MOTION (Slow Background)
        gsap.to('.ambient-prism', {
            x: 100, y: -50, scale: 1.2, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

        // 🖱️ REFINED INTERACTIVE TILT (Unified for stability)
        const cards = gsap.utils.toArray<HTMLElement>('.glass-card');
        cards.forEach((card) => {
            const handleEnter = () => gsap.to(card, { translateZ: 30, duration: 0.6, ease: "power2.out" });
            const handleMove = (e: MouseEvent) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                gsap.to(card, { rotationY: x * 8, rotationX: -y * 8, duration: 0.8, ease: "power2.out" });
            };
            const handleLeave = () => gsap.to(card, { rotationY: 0, rotationX: 0, translateZ: 0, duration: 1, ease: "elastic.out(1, 0.3)" });

            card.addEventListener('mouseenter', handleEnter);
            card.addEventListener('mousemove', handleMove);
            card.addEventListener('mouseleave', handleLeave);
        });

    }, { scope: sectionRef });

    return (
        <section className="crystalline-wrapper" ref={sectionRef}>
            
            <div className="ambient-prism" style={{ backgroundImage: `url(${prismBg})` }}></div>

            <div className="crystalline-header">
                <span className="c-tag">CRYSTALLINE COLLECTION // 2026</span>
                <h1 className="c-title">REFLECTIONS OF <span>PURITY</span></h1>
            </div>

            <div className="crystalline-grid">
                {CRYSTAL_ITEMS.map((item, idx) => (
                    <div key={idx} className="glass-card">
                        <div className="card-bg-layer">
                            <div className="card-shine"></div>
                        </div>

                        <div className="img-box">
                            <img src={item.img} alt={item.title} />
                        </div>
                        
                        <div className="info-box">
                            <h2 className="title">{item.title}</h2>
                            <p className="desc">{item.desc}</p>
                            <span className="view-link">DISCOVER MIRROR +</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🎞️ ELEGANT FOOTER */}
            <div className="crystalline-footer">
                <div className="c-separator"></div>
                <p className="c-footer-text">THE ARCHIVES OF CLARITY // VOLUME I</p>
            </div>

        </section>
    );
};

export default CrystallineReflectiveSection;
