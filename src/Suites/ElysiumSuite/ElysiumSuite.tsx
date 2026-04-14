import React from 'react';
import { ElysiumNarrativeSection } from './Components/ElysiumNarrativeSection/ElysiumNarrativeSection';
import { ElysiumShowcase } from './Components/ElysiumShowcase/ElysiumShowcase';
import { ElysiumSlabScroll } from './Components/ElysiumSlabScroll/ElysiumSlabScroll';
import { ElysiumStaggeredMenu } from './Components/ElysiumStaggeredMenu/ElysiumStaggeredMenu';

export const ElysiumSuite: React.FC = () => {
  return (
    <div className="elysiumsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <ElysiumNarrativeSection />
      <ElysiumShowcase />
      <ElysiumSlabScroll />
      <ElysiumStaggeredMenu />
    </div>
  );
};

export default ElysiumSuite;
