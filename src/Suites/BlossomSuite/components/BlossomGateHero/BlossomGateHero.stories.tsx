import type { Meta, StoryObj } from '@storybook/react';
import { BlossomGateHero } from './BlossomGateHero';

const meta = {
  title: 'Heros/BlossomGateHero',
  component: BlossomGateHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlossomGateHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Elegant Botanical Entrance
export const Default: Story = {
  render: () => (
    <div style={{ background: '#fdfaf3', minHeight: '100vh', width: '100vw' }}>
      <BlossomGateHero />
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
    <div style={{ background: '#fdfaf3', minHeight: '100vh', width: '100vw' }}>
      <BlossomGateHero />
    </div>
  ),
};
