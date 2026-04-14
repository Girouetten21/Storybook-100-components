import React from 'react';
import { CinematicCollageHero } from './Components/CinematicCollageHero/CinematicCollageHero';
import { CinematicLoader } from './Components/CinematicLoader/CinematicLoader';
import { CinematicMenu } from './Components/CinematicMenu/CinematicMenu';

export const CinematicSuite: React.FC = () => {
  return (
    <div className="cinematicsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <CinematicCollageHero />
      <CinematicLoader />
      <CinematicMenu />
    </div>
  );
};

export default CinematicSuite;
