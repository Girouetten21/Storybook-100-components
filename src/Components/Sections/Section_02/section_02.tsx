import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import './section_02.scss'

gsap.registerPlugin(Observer)

const housesData = [
  {
    id: "i-curation-house",
    stepNumber: "I.",
    title: "CURATION HOUSE",
    description: "The meticulous process of selecting and preparing the foundation for excellence, ensuring only the finest hides move forward.",
    subSteps: [
      {
        title: "INSPECTION",
        description: "Rigorous quality checks to identify the unique character and integrity of each piece.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      },
      {
        title: "GRADING",
        description: "Classifying leather by grain density, weight, and its aesthetic potential for high-end products.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )
      },
      {
        title: "SELECTION",
        description: "Choosing the perfect hide that matches the specific design and functional requirements.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 2z" />
          </svg>
        )
      },
      {
        title: "PREPARATION",
        description: "Ensuring the surface is primed and stabilized, ready for the artisanal tanning stage.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        )
      }
    ]
  },

  {
    id: "ii-tanning-house",
    stepNumber: "II.",
    title: "TANNING HOUSE",
    description: "The stage where the hide is converted into leather, making it durable and resistant to decay.",
    subSteps: [
      {
        title: "PICKLING",
        description: "Adjusting the pH of the hides to prepare for the tanning agent penetration.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 7h-9m3 3H4m16 4h-9m3 3H4" />
          </svg>
        )
      },
      {
        title: "CHROME TANNING",
        description: "The most common method using chromium salts to stabilize the collagen.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        )
      },
      {
        title: "SAMMYING",
        description: "Mechanical process to remove excess moisture from the tanned leather.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M23 4v16M1 4v16M12 12h10M12 12H2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )
      },
      {
        title: "SHAVING",
        description: "The leather is shaved to achieve a uniform thickness across the entire hide.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16v16H4z" />
            <path d="M4 8h16M4 12h16M4 16h16" />
          </svg>
        )
      }
    ]
  },
  {
    id: "iii-finishing-house",
    stepNumber: "III.",
    title: "FINISHING HOUSE",
    description: "The final stage where the leather receives its definitive character, color, and surface properties.",
    subSteps: [
      {
        title: "DYEING",
        description: "Applying dyes to achieve the desired color throughout the entire thickness of the leather.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        )
      },
      {
        title: "FATLIQUORING",
        description: "Introducing oils into the leather to ensure softness, flexibility, and strength.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        )
      },
      {
        title: "DRYING",
        description: "Controlled removal of moisture to achieve the target moisture content for the final product.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )
      },
      {
        title: "COATING",
        description: "Applying protective surface layers to improve durability and aesthetic appeal.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )
      }
    ]
  }
];


export const Section_02 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const animating = useRef(false);

  useLayoutEffect(() => {
    const slides = gsap.utils.toArray<HTMLElement>('.house-slide');
    
    // Reset initial state
    gsap.set(slides, { yPercent: 100, opacity: 0, visibility: 'hidden' });
    if (slides[0]) {
      gsap.set(slides[0], { yPercent: 0, opacity: 1, visibility: 'visible' });
    }

    const goToSection = (index: number, direction: number) => {
      if (animating.current || index < 0 || index >= slides.length) return;

      animating.current = true;
      const prevIndex = currentIndexRef.current;
      currentIndexRef.current = index;
      
      const tl = gsap.timeline({
        onComplete: () => {
          animating.current = false;
          setCurrentIndex(index);
        }
      });

      // Animación de salida y entrada más rápida y directa
      tl.to(slides[prevIndex] as HTMLElement, {
        yPercent: direction > 0 ? -100 : 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        autoAlpha: 0
      })
      .fromTo(slides[index] as HTMLElement, 
        { yPercent: direction > 0 ? 100 : -100, opacity: 0, autoAlpha: 0 },
        { yPercent: 0, opacity: 1, autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' },
        "<"
      );
    };

    const obs = Observer.create({
      target: sectionRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => goToSection(currentIndexRef.current + 1, 1),
      onDown: () => goToSection(currentIndexRef.current - 1, -1),
      tolerance: 20,
      preventDefault: true
    });

    return () => obs.kill();
  }, []); // Solo se ejecuta una vez al montar

  return (
    <section ref={sectionRef} className="section-02">
      {/* Texto decorativo de fondo - Movido fuera de los slides para que sea siempre visible */}
      <div className="background-text">
        Houses
      </div>

      {/* Etiqueta vertical fija */}
      <div className="vertical-label">
        Meet the Houses
      </div>

      <div className="house-container">
        {housesData.map((house, idx) => (
          <div 
            key={house.id} 
            className={`house-slide ${idx === currentIndex ? 'active' : ''}`} 
            data-id={house.id}
          >
            <div className="main-content">
              <div className="title-group">
                <span className="step-number">{house.stepNumber}</span>
                <h2>{house.title}</h2>
              </div>
              <p className="description">
                {house.description}
              </p>
            </div>

            <div className="sub-steps-grid">
              {house.subSteps.map((subStep, index) => (
                <div key={index} className="sub-step">
                  <div className="icon-wrapper">
                    {subStep.icon}
                  </div>
                  <h4>{subStep.title}</h4>
                  <p>{subStep.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
