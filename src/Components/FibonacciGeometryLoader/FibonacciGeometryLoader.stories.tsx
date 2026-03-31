import type { Meta, StoryObj } from '@storybook/react';
import { FibonacciGeometryLoader } from './FibonacciGeometryLoader';

const meta = {
  title: 'Loaders/FibonacciGeometryLoader',
  component: FibonacciGeometryLoader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FibonacciGeometryLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'serif', color: '#fff', fontSize: '4rem', letterSpacing: '-0.02em', opacity: 0.3 }}>
        DIVINE PROPORTION <br /> (APP REVEAL)
      </h1>
      <FibonacciGeometryLoader />
    </div>
  ),
};
