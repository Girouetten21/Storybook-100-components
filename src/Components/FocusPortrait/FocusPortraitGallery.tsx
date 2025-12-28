import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import photo1 from './Photos/1.webp';
import photo2 from './Photos/2.webp';
import photo3 from './Photos/3.webp';

export interface PortraitItem {
  id: number;
  title: string;
  description: string;
  image: string;
  initialX: string;
  initialY: string;
  rotation?: number;
  zIndex?: number;
}

export interface FocusPortraitGalleryProps {
  items?: PortraitItem[];
  animationDuration?: number;
}

export const FocusPortraitGallery = ({ 
  items = [
    { id: 1, title: "Retrato 1", description: "Desc 1", image: photo1, initialX: "20%", initialY: "50%", rotation: -7 },
    { id: 2, title: "Retrato 2", description: "Desc 2", image: photo2, initialX: "50%", initialY: "50%", rotation: 0 },
    { id: 3, title: "Retrato 3", description: "Desc 3", image: photo3, initialX: "80%", initialY: "50%", rotation: 7 },
  ],
  animationDuration = 1.0,
}: FocusPortraitGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const portraitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const infoContentRef = useRef<HTMLDivElement>(null);
  const closeHintRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Initialize: Hide info panel and hint
  useLayoutEffect(() => {
    gsap.set(infoPanelRef.current, { opacity: 0, x: 40, pointerEvents: "none" });
    gsap.set(closeHintRef.current, { opacity: 0, y: 20 });
  }, []);

  // Utility to hide all other frames
  const hideGallery = (excludeIndex: number, tl: gsap.core.Timeline) => {
    items.forEach((_, i) => {
      if (i !== excludeIndex) {
        tl.to(portraitsRef.current[i], {
          opacity: 0,
          scale: 0.8,
          pointerEvents: "none",
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);
      }
    });
  };

  // Utility to show all gallery frames
  const showGallery = (tl: gsap.core.Timeline) => {
    items.forEach((item, i) => {
      tl.to(portraitsRef.current[i], {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        zIndex: item.zIndex !== undefined ? item.zIndex : 20,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);
    });
  };

  const handlePortraitClick = useCallback((index: number) => {
    if (isAnimating.current) return;
    if (activeIndex !== null && activeIndex !== index) return;

    const isClosing = activeIndex === index;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { 
        if (isClosing) setActiveIndex(null);
        isAnimating.current = false; 
      }
    });

    if (!isClosing) {
      setActiveIndex(index);
      const frame = portraitsRef.current[index];

      hideGallery(index, tl);

      tl.to(frame, {
        top: "50%",
        left: "calc(50% - 250px)",
        xPercent: -50,
        yPercent: -50,
        width: 400,
        height: 600,
        rotation: 0,
        zIndex: 100,
        duration: animationDuration,
        ease: "power3.inOut"
      }, 0);

      tl.to(infoPanelRef.current, {
        opacity: 1,
        x: 0,
        pointerEvents: "auto",
        duration: 0.6,
      }, "-=0.4");

      tl.to(closeHintRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

    } else {
      const item = items[index];
      const frame = portraitsRef.current[index];

      tl.to(infoPanelRef.current, { opacity: 0, x: 40, duration: 0.4 });
      tl.to(closeHintRef.current, { opacity: 0, y: 20, duration: 0.3 }, 0);

      tl.to(frame, {
        top: item.initialY,
        left: item.initialX,
        xPercent: -50,
        yPercent: -50,
        width: 300,
        height: 450,
        rotation: item.rotation || 0,
        zIndex: item.zIndex !== undefined ? item.zIndex : 20,
        duration: animationDuration * 0.8,
        ease: "power3.inOut"
      }, "-=0.2");

      showGallery(tl);
    }
  }, [activeIndex, animationDuration, items]);

  const navigateTo = (newIndex: number) => {
    if (isAnimating.current || activeIndex === null) return;
    isAnimating.current = true;

    const oldIndex = activeIndex;
    const oldFrame = portraitsRef.current[oldIndex];
    const oldItem = items[oldIndex];
    const nextFrame = portraitsRef.current[newIndex];

    const tl = gsap.timeline({
      onComplete: () => { 
        isAnimating.current = false; 
      }
    });

    tl.to(infoContentRef.current, { opacity: 0, scale: 0.95, duration: 0.3 });

    tl.call(() => setActiveIndex(newIndex));

    tl.to(oldFrame, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      zIndex: oldItem.zIndex !== undefined ? oldItem.zIndex : 20,
    }, 0.2);

    tl.set(oldFrame, {
      top: oldItem.initialY,
      left: oldItem.initialX,
      width: 300,
      height: 450,
      rotation: oldItem.rotation || 0,
      xPercent: -50,
      yPercent: -50,
      pointerEvents: "none"
    });

    gsap.set(nextFrame, {
      top: "50%",
      left: "calc(50% - 250px)",
      xPercent: -50,
      yPercent: -50,
      width: 400,
      height: 600,
      rotation: 0,
      zIndex: 100,
      opacity: 0,
      scale: 1.1
    });

    tl.to(nextFrame, {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.2");

    tl.to(infoContentRef.current, { opacity: 1, scale: 1, duration: 0.4 });
  };

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      
      {/* SHARED INFO PANEL */}
      <div 
        ref={infoPanelRef}
        className="fixed top-1/2 left-[calc(50%+90px)] -translate-y-1/2 w-full max-w-[400px] p-8 pointer-events-none text-left z-30 flex flex-col"
      >
        <div ref={infoContentRef}>
          <h2 className="font-serif text-4xl font-bold text-white mb-6 border-b border-white/20 pb-4">
            {activeItem?.title}
          </h2>
          <p className="font-serif text-lg text-gray-200 leading-relaxed italic mb-8">
            {activeItem?.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex = (activeIndex! - 1 + items.length) % items.length;
              navigateTo(prevIndex);
            }}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all active:scale-95"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium tracking-wider uppercase">Back</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex = (activeIndex! + 1) % items.length;
              navigateTo(nextIndex);
            }}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all active:scale-95"
          >
            <span className="text-sm font-medium tracking-wider uppercase">Next</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Close Hint */}
      <div 
        ref={closeHintRef}
        className="fixed bottom-12 left-[calc(50%-250px)] -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] font-light uppercase pointer-events-none z-50 text-center w-[400px]"
      >
        — Click on frame to close —
      </div>

      {/* PORTRAIT FRAMES */}
      {items.map((item, index) => (
        <div 
          key={item.id}
          ref={el => { portraitsRef.current[index] = el; }}
          onClick={() => handlePortraitClick(index)}
          className="absolute shadow-2xl cursor-pointer shrink-0 transition-shadow hover:shadow-white/10 group/frame"
          style={{ 
            width: 300, 
            height: 450,
            top: item.initialY,
            left: item.initialX,
            transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
            zIndex: item.zIndex !== undefined ? item.zIndex : 20
          }}
        >
          {/* Frame decoration */}
          <div className="absolute inset-0 border-[16px] border-[#4a3b2a] z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute inset-[16px] border-[8px] border-[#c0b8a0] z-10 pointer-events-none"></div>
          
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover block"
          />
        </div>
      ))}
    </div>
  );
};