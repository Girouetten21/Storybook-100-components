import React from 'react';
import { CoffeePourMenu } from './Components/CoffeePourMenu/CoffeePourMenu';

export const CoffeSuite: React.FC = () => {
  return (
    <div className="coffesuite-wrapper" style={{ overflowX: 'hidden' }}>
      <CoffeePourMenu />
    </div>
  );
};

export default CoffeSuite;
