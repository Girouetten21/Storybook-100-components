import React from 'react';
import MinimalistMenu from './components/MinimalistMenu/MinimalistMenu';
import MinimalistLoader from './components/MinimalistLoader/MinimalistLoader';

export const MinimalistSuite: React.FC = () => {
  return (
    <div className="minimalistsuite-wrapper" style={{ overflowX: 'hidden' }}>
      <MinimalistLoader />
      <MinimalistMenu />
    </div>
  );
};

export default MinimalistSuite;
