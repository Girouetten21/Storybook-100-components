import React from 'react';
import { GemInfinityScroll } from './Components/GemInfinityScroll/GemInfinityScroll';
import { GemReflectiveSection } from './Components/GemReflectiveSection/GemReflectiveSection';
import { GemRefractionSection } from './Components/GemRefractionSection/GemRefractionSection';

export const GemSuite: React.FC = () => {
  return (
    <div className="gemsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <GemInfinityScroll />
      <GemReflectiveSection />
      <GemRefractionSection />
    </div>
  );
};

export default GemSuite;
