import React from 'react';
import { MinimalistMenu } from './Components/MinimalistMenu/MinimalistMenu';

export const MinimalistSuite: React.FC = () => {
  return (
    <div className="minimalistsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <MinimalistMenu />
    </div>
  );
};

export default MinimalistSuite;
