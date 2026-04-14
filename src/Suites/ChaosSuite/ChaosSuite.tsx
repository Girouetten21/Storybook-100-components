import React from 'react';
import { ChaosJoySection } from './Components/ChaosJoySection/ChaosJoySection';
import { ChaosRectangles } from './Components/ChaosRectangles/ChaosRectangles';

export const ChaosSuite: React.FC = () => {
  return (
    <div className="chaossuite-wrapper" style={{ overflowX: 'hidden' }}>
      <ChaosJoySection />
      <ChaosRectangles />
    </div>
  );
};

export default ChaosSuite;
