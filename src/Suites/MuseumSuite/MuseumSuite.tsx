import React from 'react';
import { MuseumFocusPortrait } from './Components/MuseumFocusPortrait/MuseumFocusPortrait';
import { MuseumGateHero } from './Components/MuseumGateHero/MuseumGateHero';

export const MuseumSuite: React.FC = () => {
  return (
    <div className="museumsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <MuseumFocusPortrait />
      <MuseumGateHero />
    </div>
  );
};

export default MuseumSuite;
