import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './FibonacciGoldenSection.scss';

// Architectural Asset
import goldenImg from '../../img/generated_5.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const FibonacciGoldenSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray('.fibonacci-block');
    const spiralPath = spiralRef.current?.querySelector('path');

    // 1. ANIME SPIRAL TRACE (Mathematically timed to the sequence)
    if (spiralPath) {
      const length = spiralPath.getTotalLength();
      gsap.set(spiralPath, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(spiralPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      });
    }

    // 2. BLOCK REVEALS IN SEQUENCE
    // Sequential stagger following Fibonacci powers (0, 1, 1, 2, 3...)
    sections.forEach((block: any, i) => {
      const delay = [0, 0.2, 0.4, 0.8][i] || i * 0.5;
      
      gsap.fromTo(block,
        { autoAlpha: 0, scale: 0.95, y: 30 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Parallax for the images within the blocks
      const img = block.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });

  }, { scope: containerRef });

  return (
    <section className="fibonacci-wrapper" ref={containerRef}>
      
      {/* 🔮 THE GOLDEN SPIRAL OVERLAY */}
      <div className="spiral-overlay">
        <svg 
          viewBox="0 0 1000 618" 
          ref={spiralRef} 
          preserveAspectRatio="xMidYMid slice"
          className="golden-spiral-svg"
        >
          {/* An approximation of the Golden Spiral (Fibonacci curve) */}
          <path 
            d="M 1000 618 C 1000 376 775 0 382 0 C 146 0 0 146 0 382 C 0 528 88 618 236 618 C 328 618 382 563 382 472 C 382 416 348 382 292 382 C 257 382 236 403 236 438" 
            fill="none" 
            stroke="#d4af37" 
            strokeWidth="0.5" 
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      <div className="fibonacci-layout">
        
        {/* BLOCK A: The Golden Rectangle (1.618 x 1) - MAJOR VISUAL */}
        <div className="fibonacci-block block-major">
          <div className="block-inner">
            <img src={goldenImg} alt="Golden Ratio Architecture" />
            <div className="block-overlay"></div>
            <div className="block-label">0.618 // MAGNITUDE</div>
          </div>
        </div>

        {/* BLOCK B: THE REMAINING RECTANGLE (0.382) - SUBDIVIDED */}
        <div className="fibonacci-column-minor">
          
          {/* BLOCK B1: The Square (1 x 1 within its frame) */}
          <div className="fibonacci-block block-square">
            <div className="block-inner">
              <div className="content-pad">
                <span className="phi-symbol">φ</span>
                <h2 className="golden-title">STRUCTURAL SILENCE</h2>
                <p className="golden-desc">
                  Exploring the divine proportion in modern architectural systems. 
                  Where mathematics transcends pure logic into visual poetry.
                </p>
              </div>
            </div>
          </div>

          <div className="fibonacci-row-minor">
            {/* BLOCK B2 & B3: Final subdivisions */}
            <div className="fibonacci-block block-detail">
              <div className="block-inner">
                <div className="detail-tag">RATIO // 1.618</div>
                <h3 className="detail-value">99.9% ACCURACY</h3>
              </div>
            </div>

            <div className="fibonacci-block block-cta">
              <div className="block-inner">
                <button className="phi-button">
                  <span className="btn-text">EXPLORE RATIO</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative Fibonacci Grid Lines */}
      <div className="phi-grid-lines">
        <div className="line-h"></div>
        <div className="line-v"></div>
      </div>

    </section>
  );
};

export default FibonacciGoldenSection;
