import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import photo1 from './Photos/1.webp';
import './MuseumFocusPortrait.scss';

export interface MuseumFocusPortraitProps {
  title?: string;
  description?: string;
  animationDuration?: number;
  initialWidth?: number;
  initialHeight?: number;
  zoomedWidth?: number;
  zoomedHeight?: number;
}

gsap.registerPlugin(useGSAP);

export const MuseumFocusPortrait = ({
  title,
  description,
  animationDuration = 1.2,
  initialWidth = 300,
  initialHeight = 450,
  zoomedWidth = 400,
  zoomedHeight = 600
}: MuseumFocusPortraitProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const comp = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const closeHintRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // POWERED BY GSAP-SKILLS: Scoped layout and secure interactions
  const { contextSafe } = useGSAP(() => {
    // Initial state for desktop placement
    gsap.set(textRef.current, { autoAlpha: 0, x: 40 });
    gsap.set(closeHintRef.current, {
      autoAlpha: 0,
      y: 20,
      left: "calc(50% - 250px)",
      xPercent: -50,
      bottom: "48px"
    });
  }, { scope: comp });

  const handleFrameClick = contextSafe(() => {
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
          autoAlpha: 1,
          x: 0,
          duration: animationDuration * 0.66,
          ease: "power2.out"
        }, "-=0.2")
        .to(closeHintRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
    } else {
      tl.to(closeHintRef.current, { autoAlpha: 0, y: 20, duration: 0.3 })
        .to(textRef.current, {
          autoAlpha: 0,
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
  });

  return (
    <div ref={comp} className="museum-focus-portrait-single">
      {/* INFO PANEL */}
      <div
        ref={textRef}
        className="info-panel"
      >
        <h2>
          {title}
        </h2>
        <p>
          {description}
        </p>
      </div>

      {/* Close Hint */}
      <div
        ref={closeHintRef}
        className="close-hint-single"
      >
        — Click on frame to close —
      </div>

      {/* FRAME */}
      <div
        ref={frameRef}
        onClick={handleFrameClick}
        className="frame"
        style={{ width: initialWidth, height: initialHeight }}
      >
        <div className="frame-outer"></div>
        <div className="frame-inner"></div>

        <img
          src={photo1}
          alt="Museum Portrait"
        />
      </div>
    </div>
  );
};
