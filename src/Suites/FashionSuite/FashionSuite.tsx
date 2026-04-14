import React from 'react';
import { FashionAccordionMenu } from './Components/FashionAccordionMenu/FashionAccordionMenu';
import { FashionAtelierHero } from './Components/FashionAtelierHero/FashionAtelierHero';
import { FashionAvantGardeScroll } from './Components/FashionAvantGardeScroll/FashionAvantGardeScroll';
import { FashionHeritageScroll } from './Components/FashionHeritageScroll/FashionHeritageScroll';
import { FashionImpactSection } from './Components/FashionImpactSection/FashionImpactSection';

export const FashionSuite: React.FC = () => {
  return (
    <div className="fashionsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <FashionAccordionMenu />
      <FashionAtelierHero />
      <FashionAvantGardeScroll />
      <FashionHeritageScroll />
      <FashionImpactSection />
    </div>
  );
};

export default FashionSuite;
