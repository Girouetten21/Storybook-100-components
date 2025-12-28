import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import photo1 from './Photos/1.webp';

export interface FocusPortraitProps {
  title?: string;
  description?: string;
  animationDuration?: number;
  initialWidth?: number;
  initialHeight?: number;
  zoomedWidth?: number;
  zoomedHeight?: number;
}

export const FocusPortrait = ({ 
  title, 
  description, 
  animationDuration = 1.2,
  initialWidth = 300,
  initialHeight = 450,
  zoomedWidth = 400,
  zoomedHeight = 600
}: FocusPortraitProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const comp = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const closeHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Initial state for desktop placement
    gsap.set(textRef.current, { opacity: 0, x: 40 });
    gsap.set(closeHintRef.current, { 
      opacity: 0, 
      y: 20, 
      left: "calc(50% - 250px)", 
      xPercent: -50, 
      bottom: "48px" 
    });
  }, []);

  const isAnimating = useRef(false);

  const handleFrameClick = useCallback(() => {
    if (isAnimating.current) return;
    
    const nextZoomedState = !isZoomed;
    setIsZoomed(nextZoomedState);
    isAnimating.current = true;
    
    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; }
    });

    if (nextZoomedState) {
      tl.to(frameRef.current, {
        width: zoomedWidth,
        height: zoomedHeight,
        x: -250,
        rotation: 0,
        duration: animationDuration,
        ease: "power3.inOut"
      })
      .to(textRef.current, {
        opacity: 1,
        x: 0,
        duration: animationDuration * 0.66,
        ease: "power2.out"
      }, "-=0.2")
      .to(closeHintRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    } else {
      tl.to(closeHintRef.current, { opacity: 0, y: 20, duration: 0.3 })
        .to(textRef.current, { 
          opacity: 0, 
          x: 40, 
          duration: animationDuration * 0.4 
        }, "-=0.2")
        .to(frameRef.current, {
          width: initialWidth,
          height: initialHeight,
          x: 0,
          rotation: 7,
          duration: animationDuration * 0.83,
          ease: "power3.inOut"
        }, "-=0.4");
    }
  }, [isZoomed, animationDuration, initialWidth, initialHeight, zoomedWidth, zoomedHeight]);

  return (
    <div ref={comp} className="flex flex-row items-center justify-center relative w-full h-full z-10 px-4">
      {/* INFO PANEL */}
      <div 
        ref={textRef} 
        className="absolute left-[calc(50%+90px)] w-full max-w-[400px] p-8 pointer-events-none text-left z-30"
      >
        <h2 className="font-serif text-4xl font-bold text-white mb-6 border-b border-white/20 pb-4">
          {title}
        </h2>
        <p className="font-serif text-lg text-gray-200 leading-relaxed italic">
          {description}
        </p>
      </div>

      {/* Close Hint */}
      <div 
        ref={closeHintRef}
        className="fixed text-white/30 text-xs tracking-[0.3em] font-light uppercase pointer-events-none z-50 text-center w-[400px]"
      >
        — Click on frame to close —
      </div>

      {/* FRAME */}
      <div 
        ref={frameRef}
        onClick={handleFrameClick}
        className="relative shadow-2xl rotate-[7deg] cursor-pointer shrink-0 z-20"
        style={{ width: initialWidth, height: initialHeight }}
      >
        <div className="absolute inset-0 border-[16px] border-[#4a3b2a] z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute inset-[16px] border-[8px] border-[#c0b8a0] z-10 pointer-events-none"></div>

        <img 
          src={photo1} 
          alt="Museum Portrait" 
          className="w-full h-full object-cover block"
        />
      </div>
    </div>
  );
};