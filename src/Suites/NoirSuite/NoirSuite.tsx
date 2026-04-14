import React from 'react';
import { NoirMenu } from './Components/NoirMenu/NoirMenu';
import { NoirCurtainHero } from './Components/NoirCurtainHero/NoirCurtainHero';

export const NoirSuite: React.FC = () => {
  return (
    <div className="noirsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <NoirMenu />
      <NoirCurtainHero />
    </div>
  );
};

export default NoirSuite;
