import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AetherialTextMatrix.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MATRIX_DATA = [
    {
        number: '01',
        title: 'The Void',
        text: 'Space is not an absence, but an active participant. By curating the empty spaces, we define the parameters of emotional resonance within the architecture.'
    },
    {
        number: '02',
        title: 'Luminance',
        text: 'Light serves as the only true material. Every angle, every texture is deliberately positioned to capture, reflect, and bend the natural flow of photons.'
    },
    {
        number: '03',
        title: 'Structure',
        text: 'A profound respect for weight and gravity. The structural elements are laid bare, stripping away the superfluous to reveal the mathematical poetry beneath.'
    }
];

export const AetherialTextMatrix: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        // 1. Reveal top border
        tl.fromTo('.matrix-top-line',
            { scaleX: 0 },
            { scaleX: 1, duration: 1.5, ease: 'expo.inOut', transformOrigin: 'center' }
        )
        
        // 2. Reveal header typography
        .fromTo('.matrix-header .header-eyebrow',
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.8'
        )
        .fromTo('.matrix-header .header-title',
            { autoAlpha: 0, filter: 'blur(8px)', y: 30 },
            { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'power4.out' },
            '-=0.6'
        )

        // 3. Draw vertical column borders
        .fromTo('.matrix-v-line',
            { scaleY: 0 },
            { scaleY: 1, duration: 1.2, ease: 'expo.inOut', stagger: 0.2 },
            '-=0.8'
        )

        // 4. Fade in cards content sequentially
        .fromTo('.matrix-card-content',
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 },
            '-=0.8'
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aetherial-matrix-section">
            <div className="matrix-top-line"></div>
            
            <div className="matrix-header">
                <span className="header-eyebrow">The Manifesto</span>
                <h2 className="header-title">Architectural <i>Principles</i></h2>
            </div>

            <div className="matrix-grid">
                {MATRIX_DATA.map((item, index) => (
                    <div key={index} className="matrix-column">
                        {/* Internal vertical separator (last item doesn't need right border visually in CSS usually, or handled there) */}
                        {index > 0 && <div className="matrix-v-line left-border"></div>}
                        
                        <div className="matrix-card-content">
                            <span className="card-number">{item.number}</span>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-text">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="matrix-bottom-line"></div>
        </section>
    );
};

export default AetherialTextMatrix;
