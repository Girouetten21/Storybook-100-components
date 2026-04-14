import React from 'react';
import { GlassMenu } from './Components/GlassMenu/GlassMenu';

export const GlassSuite: React.FC = () => {
  return (
    <div className="glasssuite-wrapper" style={{ overflowX: 'hidden' }}>
      <GlassMenu />
    </div>
  );
};

export default GlassSuite;
