import React from 'react';
import { PaperFolioScroll } from './Components/PaperFolioScroll/PaperFolioScroll';
import { PaperStackScroll } from './Components/PaperStackScroll/PaperStackScroll';
import { PaperMenu } from './Components/PaperMenu/PaperMenu';
import { PaperGateHero } from './Components/PaperGateHero/PaperGateHero';
import { PaperPoetrySection } from './Components/PaperPoetrySection/PaperPoetrySection';

export const PaperSuite: React.FC = () => {
  return (
    <div className="papersuite-wrapper" style={{ overflowX: 'hidden' }}>
      <PaperFolioScroll />
      <PaperStackScroll />
      <PaperMenu />
      <PaperGateHero />
      <PaperPoetrySection />
    </div>
  );
};

export default PaperSuite;
