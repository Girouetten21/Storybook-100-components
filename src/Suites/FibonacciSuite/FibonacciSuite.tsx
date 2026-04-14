import React from 'react';
import { FibonacciGeometryLoader } from './Components/FibonacciGeometryLoader/FibonacciGeometryLoader';
import { FibonacciGoldenMenu } from './Components/FibonacciGoldenMenu/FibonacciGoldenMenu';
import { FibonacciGoldenSection } from './Components/FibonacciGoldenSection/FibonacciGoldenSection';
import { FibonacciHeroDoor } from './Components/FibonacciHeroDoor/FibonacciHeroDoor';

export const FibonacciSuite: React.FC = () => {
  return (
    <div className="fibonaccisuite-wrapper" style={{ overflowX: 'hidden' }}>
      <FibonacciGeometryLoader />
      <FibonacciGoldenMenu />
      <FibonacciGoldenSection />
      <FibonacciHeroDoor />
    </div>
  );
};

export default FibonacciSuite;
