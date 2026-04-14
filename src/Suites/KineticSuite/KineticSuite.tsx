import React from 'react';
import { KineticCarouselScroll } from './Components/KineticCarouselScroll/KineticCarouselScroll';
import { KineticImpactSection } from './Components/KineticImpactSection/KineticImpactSection';
import { KineticPixelMenu } from './Components/KineticPixelMenu/KineticPixelMenu';
import { KineticPixelScroll } from './Components/KineticPixelScroll/KineticPixelScroll';
import { KineticVelocityGallery } from './Components/KineticVelocityGallery/KineticVelocityGallery';

export const KineticSuite: React.FC = () => {
  return (
    <div className="kineticsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <KineticCarouselScroll />
      <KineticImpactSection />
      <KineticPixelMenu />
      <KineticPixelScroll />
      <KineticVelocityGallery />
    </div>
  );
};

export default KineticSuite;
