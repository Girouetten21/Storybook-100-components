import type { Meta, StoryObj } from '@storybook/react';
import { OrigamiGateHero } from './OrigamiGateHero';

const meta = {
  title: 'Heros/OrigamiGateHero',
  component: OrigamiGateHero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OrigamiGateHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Luxury Envelope Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <OrigamiGateHero />
    </div>
  ),
};

// Mobile View Simulation
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <OrigamiGateHero />
    </div>
  ),
};
