import type { Meta, StoryObj } from '@storybook/react';
import { FibonacciHeroDoor } from './FibonacciHeroDoor';

const meta = {
  title: 'Heros/FibonacciHeroDoor',
  component: FibonacciHeroDoor,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FibonacciHeroDoor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'serif', color: '#fff', fontSize: '4rem', letterSpacing: '-0.02em', opacity: 0.8 }}>
        YOU HAVE SUCCESSFULLY UNLOCKED THE PAGE!
      </h1>
      <FibonacciHeroDoor />
    </div>
  ),
};
