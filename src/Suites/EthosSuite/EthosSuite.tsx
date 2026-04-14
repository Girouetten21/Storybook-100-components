import React from 'react';
import { EthosCollageSection } from './Components/EthosCollageSection/EthosCollageSection';
import { EthosMaterialSection } from './Components/EthosMaterialSection/EthosMaterialSection';

export const EthosSuite: React.FC = () => {
  return (
    <div className="ethossuite-wrapper" style={{ overflowX: 'hidden' }}>
      <EthosCollageSection />
      <EthosMaterialSection />
    </div>
  );
};

export default EthosSuite;
