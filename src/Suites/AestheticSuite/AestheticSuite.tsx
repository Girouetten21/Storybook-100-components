import React from 'react';
import { AestheticLoader } from './Components/AestheticLoader/AestheticLoader';
import { AestheticTextMenu } from './Components/AestheticTextMenu/AestheticTextMenu';

export const AestheticSuite: React.FC = () => {
  return (
    <div className="aestheticsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <AestheticLoader />
      <AestheticTextMenu />
    </div>
  );
};

export default AestheticSuite;
