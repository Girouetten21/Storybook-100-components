import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticJournal.scss';
import img1 from '../../assets/gallery_1.png';
import img3 from '../../assets/gallery_3.png';
import img4 from '../../assets/hero_door.png';

export const AestheticJournal: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.journal-post', {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%'
            }
        });

        // Floating petals animation
        gsap.to('.petal', {
            y: 30,
            x: 10,
            rotation: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                amount: 1,
                from: 'random'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-journal">
            <div className="decorations">
                <div className="petal p-1">🌸</div>
                <div className="petal p-2">✨</div>
                <div className="journal-blob"></div>
            </div>

            <div className="journal-header">
                <span className="eyebrow">The Editorial</span>
                <h2 className="title">Soft Stories & <br/><i>Inspirations</i></h2>
            </div>

            <div className="journal-stack">
                <article className="journal-entry">
                    <div className="entry-num">01</div>
                    <div className="entry-content">
                        <div className="post-date">April 12, 2026</div>
                        <h3 className="post-title">The morning light in Kyoto</h3>
                        <p className="post-excerpt">Capturing the exact moment when the sun hits the paper walls of old traditional houses.</p>
                        <a href="#" className="post-link">Explore the Archive</a>
                    </div>
                    <div className="entry-visual" style={{ backgroundImage: `url(${img4})` }}></div>
                </article>

                <article className="journal-entry reverse">
                    <div className="entry-visual" style={{ backgroundImage: `url(${img3})` }}></div>
                    <div className="entry-content">
                        <div className="post-date">April 08, 2026</div>
                        <h3 className="post-title">Color Palettes for the Soul</h3>
                        <p className="post-excerpt">Why pastel pink and mint green are more than just colors for the heart and mind.</p>
                        <a href="#" className="post-link">Read Entry</a>
                    </div>
                    <div className="entry-num">02</div>
                </article>

                <article className="journal-entry">
                    <div className="entry-num">03</div>
                    <div className="entry-content">
                        <div className="post-date">April 05, 2026</div>
                        <h3 className="post-title">Serenity in the City</h3>
                        <p className="post-excerpt">How to find quiet moments of peace amidst the noise of the modern world.</p>
                        <a href="#" className="post-link">Learn More</a>
                    </div>
                    <div className="entry-visual" style={{ backgroundImage: `url(${img1})` }}></div>
                </article>
            </div>
        </section>
    );
};

export default AestheticJournal;
