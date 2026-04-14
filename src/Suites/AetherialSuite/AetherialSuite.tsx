import React from 'react';
import AetherialDetailScroll from './components/AetherialDetailScroll/AetherialDetailScroll';
import AetherialJourneyScroll from './components/AetherialJourneyScroll/AetherialJourneyScroll';
import AetherialFocusGrid from './components/AetherialFocusGrid/AetherialFocusGrid';
import AetherialMonolithHero from './components/AetherialMonolithHero/AetherialMonolithHero';
import AetherialVectorMenu from './components/AetherialVectorMenu/AetherialVectorMenu';
import AetherialTextMatrix from './components/AetherialTextMatrix/AetherialTextMatrix';
import AetherialEtherealCards from './components/AetherialEtherealCards/AetherialEtherealCards';
import AetherialZenithCTA from './components/AetherialZenithCTA/AetherialZenithCTA';
import AetherialFooter from './components/AetherialFooter/AetherialFooter';

export const AetherialSuite: React.FC = () => {
  return (
    <div className="aetherialsuite-wrapper" style={{ overflowX: 'hidden', background: '#050505' }}>
      <AetherialVectorMenu />
      <AetherialMonolithHero />
      <AetherialTextMatrix />
      <AetherialEtherealCards />
      <AetherialDetailScroll />
      <AetherialFocusGrid />
      <AetherialJourneyScroll />
      <AetherialZenithCTA />
      <AetherialFooter />
    </div>
  );
};

export default AetherialSuite;
