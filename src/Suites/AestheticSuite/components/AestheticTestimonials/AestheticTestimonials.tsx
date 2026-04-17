import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './AestheticTestimonials.scss';

const TESTIMONIALS = [
    { name: "Sophie", role: "Creative Director", text: "Finding beauty in simplicity has changed the way I live. This suite is pure magic." },
    { name: "Leo", role: "Architect", text: "The attention to detail and the soft transitions are exactly what my soul needed today." },
    { name: "Emma", role: "Dreamer", text: "It feels like a warm hug for your eyes. Simply stunning and incredibly peaceful." }
];

export const AestheticTestimonials: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = containerRef.current?.querySelectorAll('.testimonial-card');
        if (!cards) return;

        gsap.from(cards, {
            y: 30,
            stagger: 0.2,
            duration: 1.2,
            delay: 0.6,
            ease: 'expo.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="aesthetic-testimonials">
            <div className="decorations">
                <div className="deco-blob blob-1"></div>
                <div className="deco-blob blob-2"></div>
            </div>

            <div className="testimonials-header">
                <span className="eyebrow">Kind Words</span>
                <h2 className="title">Community <i>Love</i></h2>
            </div>

            <div className="testimonials-grid">
                {TESTIMONIALS.map((item, i) => (
                    <div key={i} className="testimonial-card">
                        <div className="quote-icon">“</div>
                        <p className="testimonial-text">{item.text}</p>
                        <div className="testimonial-author">
                            <span className="name">{item.name}</span>
                            <span className="role">{item.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AestheticTestimonials;
