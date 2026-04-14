import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './PaperMenu.scss';

import img1 from '../../img/generated_7.png';
import img2 from '../../img/generated_8.png';
import img3 from '../../img/generated_9.png';
import img4 from '../../img/generated_10.png';

const chapters = [
    { chapter: 'Chapter I', title: 'The Prologue', desc: 'Origins & Antiquity', image: img1 },
    { chapter: 'Chapter II', title: 'The Archives', desc: 'Forgotten Collections', image: img2 },
    { chapter: 'Chapter III', title: 'The Gallery', desc: 'Visual Imagery', image: img3 },
    { chapter: 'Chapter IV', title: 'The Epilogue', desc: 'Contact & Outcomes', image: img4 },
];

gsap.registerPlugin(useGSAP);

export const PaperMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // POWERED BY GSAP-SKILLS: Scoped 3D hinge and page flip logic
    useGSAP(() => {
        // Architecture of the Book: Establish 3D perspective and hinge logic
        gsap.set('.folio-book-container', { perspective: 2500 });
        gsap.set('.folio-cover', { transformOrigin: 'left center', transformStyle: 'preserve-3d' });

        tlRef.current = gsap.timeline({ paused: true })
            .to('.folio-toggle', { autoAlpha: 0, duration: 0.2 }) 
            .set('.folio-overlay', { visibility: 'visible', pointerEvents: 'auto' })
            .fromTo('.folio-leather-bg', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
            .fromTo('.folio-book-container', 
                { y: '10vh', autoAlpha: 0, rotationX: 10 }, 
                { y: 0, autoAlpha: 1, rotationX: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.2'
            )
            .to('.folio-cover', {
                rotationY: -180,
                duration: 1.2,
                ease: 'expo.inOut' 
            })
            .set('.folio-cover', { visibility: 'hidden' }) 
            .fromTo('.folio-index ul li',
                { autoAlpha: 0, x: -20 },
                { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo('.folio-plate',
                { autoAlpha: 0, filter: 'blur(5px)' },
                { autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
                '-=0.6'
            )
            .fromTo('.folio-close', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    }, { scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const toggleMenu = contextSafe(() => {
        if (!isOpen) {
            setIsOpen(true);
            tlRef.current?.timeScale(1).play();
        } else {
            tlRef.current?.timeScale(1.8).reverse().then(() => {
                setIsOpen(false);
                setHoverIndex(0); 
            });
        }
    });

    return (
        <div ref={containerRef} className="folio-wrapper">
            
            {/* Minimalist Tab Button */}
            <button className={`folio-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Open Book">
                Index.
            </button>

            {/* The Fullscreen Book Environment */}
            <div className={`folio-overlay ${isOpen ? 'is-active' : ''}`}>
                
                {/* Desk Background */}
                <div className="folio-leather-bg"></div>
                
                <div className="folio-book-container">
                     
                     {/* ---------------- The Inner Pages Spread ---------------- */}
                     <div className="folio-giant-page">
                          <button className="folio-close" onClick={toggleMenu} aria-label="Close Book">✕</button>

                          <div className="folio-content-grid">
                              
                              {/* Left Page: Table of Contents */}
                              <div className="folio-index">
                                 <h2 className="index-header">Table of Contents</h2>
                                 <ul>
                                     {chapters.map((ch, i) => (
                                         <li key={i} onMouseEnter={() => setHoverIndex(i)}>
                                             <span className="toc-chap">{ch.chapter}</span>
                                             <span className="toc-title">{ch.title}</span>
                                             <span className="toc-dots"></span>
                                             <span className="toc-page">{String(i * 12 + 1).padStart(2, '0')}</span>
                                         </li>
                                     ))}
                                 </ul>
                              </div>

                              {/* Right Page: The Photographic Plate */}
                              <div className="folio-plate">
                                 <div className="plate-frame">
                                    {chapters.map((ch, i) => (
                                        <img 
                                            key={i}
                                            src={ch.image} 
                                            className={`plate-img ${hoverIndex === i ? 'active' : ''}`}
                                            alt={ch.title}
                                        />
                                    ))}
                                 </div>
                                 <p className="plate-caption">
                                     <i>Fig {String(hoverIndex + 1).padStart(2, '0')}.</i> — {chapters[hoverIndex].desc}.
                                 </p>
                              </div>

                          </div>
                     </div>

                     {/* ---------------- The Physical Front Cover ---------------- */}
                     <div className="folio-cover">
                          <div className="cover-border">
                              <h1 className="cover-title">The Archives</h1>
                              <p className="cover-subtitle">Limited First Edition</p>
                          </div>
                     </div>

                </div>
            </div>
        </div>
    );
};

export default PaperMenu;
