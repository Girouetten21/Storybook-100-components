import React from 'react';
import { GlitchLoader } from './components/GlitchLoader/GlitchLoader';
import { GlitchGateHero } from './components/GlitchGateHero/GlitchGateHero';
import { GlitchGrid } from './components/GlitchGrid/GlitchGrid';
import { GlitchTerminalCarousel } from './components/GlitchTerminalCarousel/GlitchTerminalCarousel';
import { GlitchMenu } from './components/GlitchMenu/GlitchMenu';
import { GlitchFooter } from './components/GlitchFooter/GlitchFooter';
import { GlitchShowcase } from './components/GlitchShowcase/GlitchShowcase';
import { GlitchTechnical } from './components/GlitchTechnical/GlitchTechnical';
import { GlitchPersona } from './components/GlitchPersona/GlitchPersona';

export const GlitchSuite: React.FC = () => {
  return (
    <div className="glitch-suite" style={{ background: '#000' }}>
      <GlitchLoader />
      <GlitchMenu />

      <GlitchGateHero />

      {/* NARRATIVE FLOW */}
      <GlitchPersona />
      <GlitchShowcase />
      <GlitchGrid />
      <GlitchTechnical />
      <GlitchTerminalCarousel />

      <GlitchFooter />
    </div>
  );
};

export default GlitchSuite;
