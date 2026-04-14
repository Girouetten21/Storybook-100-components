import React from 'react';
import { ShatterCascadeMenu } from './Components/ShatterCascadeMenu/ShatterCascadeMenu';
import { ShatterSection01 } from './Components/ShatterSection01/ShatterSection01';
import { ShatterSection02 } from './Components/ShatterSection02/ShatterSection02';
import { ShatterVaultHero } from './Components/ShatterVaultHero/ShatterVaultHero';

export const ShatterSuite: React.FC = () => {
  return (
    <div className="shattersuite-wrapper" style={{ overflowX: 'hidden' }}>
      <ShatterCascadeMenu />
      <ShatterSection01 />
      <ShatterSection02 />
      <ShatterVaultHero />
    </div>
  );
};

export default ShatterSuite;
