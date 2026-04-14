import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import './IrisFeatureGallery.scss';

// Let's use 3 distinct images to act as variations/angles of a product
import img1 from '../../img/generated_2.png';
import img2 from '../../img/generated_3.png';
import img3 from '../../img/generated_4.png';

gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);

const productFeatures = [
    {
        id: 'feat1',
        title: 'Aerospace Architecture',
        desc: 'Forged with military-grade precision, the outer titanium shell provides unyielding protection without compromising the strikingly sleek profile. Designed for the extremes.',
        specs: [
            { value: '3.2g', label: 'Weight Core' },
            { value: 'Titanium', label: 'Alloy Material' },
            { value: 'IP68', label: 'Resistance' }
        ],
        image: img1,
        hotspots: [
            { id: 'h1_1', top: '35%', left: '45%', label: 'Thermal Sensor' },
            { id: 'h1_2', top: '70%', left: '25%', label: 'Titanium Shell' }
        ]
    },
    {
        id: 'feat2',
        title: 'Cognitive Interface',
        desc: 'Our proprietary neural engine processes environmental data at the speed of light, rendering real-time analytics directly onto your optic nerve.',
        specs: [
            { value: '0.1ms', label: 'Latency' },
            { value: '120Hz', label: 'Refresh Rate' },
            { value: 'OLED', label: 'Display Matrix' }
        ],
        image: img2,
        hotspots: [
            { id: 'h2_1', top: '25%', left: '60%', label: 'Optic Transmitter' },
            { id: 'h2_2', top: '50%', left: '30%', label: 'Neural Link' }
        ]
    },
    {
        id: 'feat3',
        title: 'Perpetual Core',
        desc: 'Powered by a micro-fusion reactor, it delivers theoretical limitless energy, ensuring your journey never halts in the dark reaches of the unknown.',
        specs: [
            { value: '∞', label: 'Battery Life' },
            { value: 'Zero', label: 'Emissions' },
            { value: '300kW', label: 'Peak Output' }
        ],
        image: img3,
        hotspots: [
            { id: 'h3_1', top: '60%', left: '30%', label: 'Fusion Cell' },
            { id: 'h3_2', top: '40%', left: '70%', label: 'Cooling Vent' }
        ]
    }
];

export const IrisFeatureGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // POWERED BY GSAP-SKILLS: Scoped product trap and intent-based navigation
    useGSAP(() => {
        let currentIndex = 0;
        let isAnimating = false;

        // 1. Setup Initial States for all elements
        productFeatures.forEach((_, i) => {
            if (i !== 0) {
                gsap.set(`.wrapper-${i}`, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', pointerEvents: 'none' });
                gsap.set(`.text-${i}`, { y: 150, autoAlpha: 0, pointerEvents: 'none' });
            } else {
                gsap.set(`.wrapper-0`, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'auto' });
                gsap.set(`.text-0`, { yPercent: -50, y: 0, autoAlpha: 1, pointerEvents: 'auto' });
            }
            gsap.set(`.hotspot-group-${i}`, { scale: 0, autoAlpha: 0 });
            gsap.set(`.hotspot-group-${i} .line`, { width: 0 });
        });

        // Animate first hotspots automatically upon page load
        gsap.to(`.hotspot-group-0`, { scale: 1, autoAlpha: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)", stagger: 0.2 });
        gsap.to(`.hotspot-group-0 .line`, { width: 60, duration: 0.8, delay: 0.8, ease: "power2.out", stagger: 0.2 });

        const gotoSlide = (index: number, direction: number) => {
            if (index < 0 || index >= productFeatures.length || isAnimating) return;
            isAnimating = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1000); 
                }
            });

            const outIdx = currentIndex;

            // Animate Out Current
            tl.to(`.wrapper-${outIdx}`, {
                yPercent: direction > 0 ? -15 : 15,
                autoAlpha: 0,
                pointerEvents: 'none',
                filter: "blur(10px)",
                scale: 0.95,
                duration: 0.8,
            }, 0)
                .to(`.text-${outIdx}`, {
                    y: direction > 0 ? -150 : 150,
                    autoAlpha: 0,
                    pointerEvents: 'none', 
                    filter: "blur(5px)",
                    duration: 0.8,
                }, 0)
                .to(`.hotspot-group-${outIdx}`, {
                    scale: 0,
                    autoAlpha: 0,
                    duration: 0.4
                }, 0);

            // Animate In Next
            tl.fromTo(`.wrapper-${index}`,
                { autoAlpha: 1, filter: "blur(0px)", scale: 1, yPercent: direction > 0 ? 15 : -15, clipPath: direction > 0 ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)', pointerEvents: 'none' },
                { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', yPercent: 0, duration: 1, ease: "power3.inOut", pointerEvents: 'auto' },
                0
            )
                .fromTo(`.text-${index}`,
                    { y: direction > 0 ? 150 : -150, yPercent: -50, autoAlpha: 0, filter: "blur(5px)", pointerEvents: 'none' },
                    { y: 0, autoAlpha: 1, pointerEvents: 'auto', filter: "blur(0px)", duration: 1, ease: "power3.out" },
                    0.2
                )
                .fromTo(`.hotspot-group-${index}`,
                    { scale: 0, autoAlpha: 0 },
                    { scale: 1, autoAlpha: 1, stagger: 0.2, duration: 0.6, ease: "back.out(2)" },
                    0.5
                )
                .fromTo(`.hotspot-group-${index} .line`,
                    { width: 0 },
                    { width: 60, stagger: 0.2, duration: 0.6 },
                    0.6
                );

            currentIndex = index;
        };

        const forceSlide = (index: number) => {
            isAnimating = false;
            currentIndex = index;
            productFeatures.forEach((_, i) => {
                if (i === index) {
                    gsap.set(`.wrapper-${i}`, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', yPercent: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", pointerEvents: 'auto' });
                    gsap.set(`.text-${i}`, { y: 0, yPercent: -50, autoAlpha: 1, filter: "blur(0px)", pointerEvents: 'auto' });
                    gsap.set(`.hotspot-group-${i}`, { scale: 1, autoAlpha: 1 });
                    gsap.set(`.hotspot-group-${i} .line`, { width: 60 });
                } else {
                    gsap.set(`.wrapper-${i}`, { clipPath: i < index ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', yPercent: i < index ? -15 : 15, autoAlpha: 0, scale: 0.95, filter: "blur(10px)", pointerEvents: 'none' });
                    gsap.set(`.text-${i}`, { y: i < index ? -150 : 150, autoAlpha: 0, filter: "blur(5px)", pointerEvents: 'none' });
                    gsap.set(`.hotspot-group-${i}`, { scale: 0, autoAlpha: 0 });
                }
            });
        };

        const handleDirection = (dir: number) => {
            if (isAnimating) return;

            if (dir > 0) {
                if (currentIndex < productFeatures.length - 1) {
                    gotoSlide(currentIndex + 1, 1);
                } else {
                    disableObservers();
                    const st = ScrollTrigger.getById("productPin");
                    if (st) {
                        window.scrollTo({ top: st.end + 50, behavior: 'instant' });
                    }
                }
            } else {
                if (currentIndex > 0) {
                    gotoSlide(currentIndex - 1, -1);
                } else {
                    disableObservers();
                    const st = ScrollTrigger.getById("productPin");
                    if (st) {
                        window.scrollTo({ top: Math.max(0, st.start - 50), behavior: 'instant' });
                    }
                }
            }
        };

        const intentObserver = Observer.create({
            target: window,
            type: "wheel,touch",
            preventDefault: true, 
            tolerance: 15,
            onDown: () => handleDirection(1),
            onUp: () => handleDirection(-1)
        });

        const dragObserver = Observer.create({
            target: sectionRef.current?.querySelector(".showcase-images-col") || window,
            type: "pointer",
            preventDefault: true, 
            tolerance: 15,
            onDown: () => handleDirection(1),
            onUp: () => handleDirection(-1)
        });

        const enableObservers = () => {
            intentObserver.enable();
            dragObserver.enable();
        };

        const disableObservers = () => {
            intentObserver.disable();
            dragObserver.disable();
        };

        disableObservers();

        ScrollTrigger.create({
            id: "productPin",
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: "+=3000", 
            anticipatePin: 1,
            onEnter: (self) => {
                if (intentObserver.isEnabled) return;
                self.scroll(self.start + 1500);
                forceSlide(0);
                enableObservers();
            },
            onEnterBack: (self) => {
                if (intentObserver.isEnabled) return;
                self.scroll(self.start + 1500);
                forceSlide(productFeatures.length - 1);
                enableObservers();
            },
            onUpdate: (self) => {
                if (!intentObserver.isEnabled) return;
                if (self.progress > 0.85 || self.progress < 0.15) {
                    self.scroll(self.start + 1500);
                }
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="product-showcase-wrapper" ref={sectionRef}>
            <div className="showcase-pin">

                {/* Visuals Column (Left) */}
                <div className="showcase-images-col">
                    {productFeatures.map((feat, index) => (
                        <div className={`showcase-img-wrapper wrapper-${index}`} key={`img-${feat.id}`}>
                            <img src={feat.image} alt={feat.title} />

                            {/* The Decorative Hotspots */}
                            {feat.hotspots.map((hotspot) => (
                                <div className={`hotspot hotspot-group-${index}`} key={hotspot.id} style={{ top: hotspot.top, left: hotspot.left }}>
                                    <div className="ping"></div>
                                    <div className="line"></div>
                                    <span className="label">{hotspot.label}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Typography & Specs Column (Right) */}
                <div className="showcase-texts-col">
                    {productFeatures.map((feat, index) => (
                        <div className={`showcase-text-block text-${index}`} key={`txt-${feat.id}`}>
                            <h3>{feat.title}</h3>
                            <p>{feat.desc}</p>

                            <div className="specs">
                                {feat.specs.map((spec, sIndex) => (
                                    <div className="spec" key={sIndex}>
                                        <h4>{spec.value}</h4>
                                        <span>{spec.label}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="action-btn">Discover Model</button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default IrisFeatureGallery;
