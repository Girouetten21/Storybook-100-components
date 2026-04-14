import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ElysiumNarrativeSection.scss';

// Reuse same Villa Assets
import forestImg from '../../img/generated_4.png';
import desertImg from '../../img/generated_5.png';
import coastalImg from '../../img/generated_6.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ElysiumNarrativeSection: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!mainRef.current) return;

        // 🎨 REVEAL LOGIC (Reset to maximum reliability)
        const blocks = gsap.utils.toArray<HTMLElement>('.narrative-block');
        
        blocks.forEach((block) => {
            const content = block.querySelectorAll('.vision-flex, .m-tag, h2, .m-showcase, .legacy-content');
            
            gsap.from(content, {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top bottom-=100px", // 🟢 Ensure visibility as soon as possible
                    toggleActions: "play none none none",
                    once: true
                }
            });
        });

        // 🖼️ IMAGE PARALLAX
        gsap.to('.vision-image img', {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.vision-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.m-image img', {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.m-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // 📊 STATS COUNTER
        const stats = gsap.utils.toArray<HTMLElement>('.stat-num');
        stats.forEach((stat) => {
            const targetValue = parseInt(stat.getAttribute('data-target') || '0');
            gsap.to(stat, {
                innerText: targetValue,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 95%'
                }
            });
        });

        // 🚀 ENSURE REFRESH AFTER ALL STYLES RENDER
        setTimeout(() => ScrollTrigger.refresh(), 100);

    }, { scope: mainRef });

    return (
        <div className="elysium-narrative" ref={mainRef}>
            
            {/* 🌲 BLOCK 1: THE VISION */}
            <section className="narrative-block vision-block">
                <div className="vision-flex">
                    <div className="vision-image">
                        <img src={forestImg} alt="Forest Villa Vision" />
                    </div>
                    <div className="vision-text">
                        <h2>Crafting the <span>Future</span> of Architecture.</h2>
                        <p>
                            Elysium estates are not merely dwellings; they are manifestations of a new architectural epoch. 
                            We believe in the symbiosis of raw terrain and refined structural engineering, 
                            creating homes that breathe with the environment they occupy.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🏜️ BLOCK 2: MATERIALITY */}
            <section className="narrative-block material-block light">
                <span className="m-tag">Material Intelligence // 🧪</span>
                <h2>SENSORY PERFECTION</h2>

                <div className="m-showcase">
                    <div className="m-stats">
                        <div className="stat-item">
                            <h4><span className="stat-num" data-target="98">98</span>%</h4>
                            <label>Efficiency Rating</label>
                        </div>
                        <div className="stat-item">
                            <h4><span className="stat-num" data-target="240">240</span>+</h4>
                            <label>Days of Sunlight</label>
                        </div>
                        <div className="stat-item">
                            <h4><span className="stat-num" data-target="100">100</span>%</h4>
                            <label>Renewable Materials</label>
                        </div>
                    </div>
                    <div className="m-image">
                        <img src={desertImg} alt="Desert Materiality" />
                    </div>
                </div>
            </section>

            {/* 🌊 BLOCK 3: COASTAL LEGACY */}
            <section className="narrative-block legacy-block">
                <div className="legacy-bg-img">
                    <img src={coastalImg} alt="Coastal Legacy" />
                </div>
                <div className="legacy-content">
                    <h3>ESTABLISHING <br />A LEGACY.</h3>
                    <div className="l-footer">
                        <div className="l-item">
                            <h5>THE LOCATION</h5>
                            <p>Hand-selected topographical sites that offer total privacy and unyielding 360-degree views.</p>
                        </div>
                        <div className="l-item">
                            <h5>THE BUILD</h5>
                            <p>Utilizing high-torsion prestressed concrete and smart-glass windows for extreme shoreline durability.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ElysiumNarrativeSection;
