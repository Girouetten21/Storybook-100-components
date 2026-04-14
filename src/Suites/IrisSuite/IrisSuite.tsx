import React from 'react';
import { IrisFeatureGallery } from './Components/IrisFeatureGallery/IrisFeatureGallery';
import { IrisRevealHero } from './Components/IrisRevealHero/IrisRevealHero';

export const IrisSuite: React.FC = () => {
  return (
    <div className="irissuite-wrapper" style={{ overflowX: 'hidden' }}>
      <IrisFeatureGallery />
      <IrisRevealHero />
    </div>
  );
};

export default IrisSuite;
