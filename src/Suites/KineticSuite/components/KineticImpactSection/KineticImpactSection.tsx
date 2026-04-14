import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './KineticImpactSection.scss';

// Industrial Impact Assets
import foundationImg from '../../img/generated_6.png';
import velocityImg from '../../img/generated_7.png';
import precisionImg from '../../img/generated_8.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ImpactSection {
  id: string;
  tag: string;
  headline: string;
  description: string;
  detailLabel: string;
  detailValue: string;
  image: string;
}

const IMPACT_DATA: ImpactSection[] = [
  {
    id: '01',
    tag: 'FOUNDATION',
    headline: 'STRUCTURAL INTEGRITY',
    description: 'The core architecture is built upon a resilient framework designed to withstand high-velocity data throughput and complex state mutations.',
    detailLabel: 'UPTIME',
    detailValue: '99.99%',
    image: foundationImg
  },
  {
    id: '02',
    tag: 'VELOCITY',
    headline: 'KINETIC PERFORMANCE',
    description: 'Leveraging hardware acceleration and sub-millisecond rendering cycles to deliver an experience that keeps pace with cognitive intent.',
    detailLabel: 'LATENCY',
    detailValue: '0.04ms%',
    image: velocityImg
  },
  {
    id: '03',
    tag: 'PRECISION',
    headline: 'ATOMIC ACCURACY',
    description: 'Every pixel, every transition, and every mathematical constant is calculated to a precision that ensures seamless visual harmony across all viewports.',
    detailLabel: 'ERROR RATIO',
    detailValue: ' < 0.001',
    image: precisionImg
  }
];

export const KineticImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray('.impact-section');

    sections.forEach((section: any) => {
      const bgText = section.querySelector('.bg-impact-text');
      const content = section.querySelector('.impact-content');
      const imgWrap = section.querySelector('.impact-image-wrap');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Parallax for the massive background text
      tl.fromTo(bgText,
        { y: '20%' },
        { y: '-20%', ease: 'none' }
      );

      // Animation for the foreground content
      gsap.fromTo(content,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true
          }
        }
      );

      // Reveal for the image on the right
      gsap.fromTo(imgWrap,
        { clipPath: 'inset(0% 100% 0% 0%)', x: 100, autoAlpha: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          autoAlpha: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 10%',
            scrub: true
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div className="kinetic-impact-section" ref={containerRef}>
      {IMPACT_DATA.map((section) => (
        <section key={section.id} className="impact-section">
          <div className="bg-impact-text">{section.headline}</div>

          <div className="impact-container">
            <div className="impact-content">
              <div className="impact-tag">
                <span className="dot"></span>
                {section.tag}
              </div>

              <h2 className="impact-headline">{section.headline}</h2>
              <p className="impact-description">{section.description}</p>

              <div className="impact-footer">
                <div className="detail-item">
                  <span className="label">{section.detailLabel}</span>
                  <span className="value">{section.detailValue}</span>
                </div>
                <button className="impact-cta">EXPLORE LOGS</button>
              </div>
            </div>

            <div className="impact-image-wrap">
              <img src={section.image} alt={section.headline} />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div className="geometric-grid"></div>
        </section>
      ))}
    </div>
  );
};

export default KineticImpactSection;
