import type { Meta, StoryObj } from '@storybook/react';
import { MuseumGateHero } from './MuseumGateHero';

const meta = {
  title: 'Heros/MuseumGateHero',
  component: MuseumGateHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MuseumGateHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Urban Espresso Reveal Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#120c0a', minHeight: '100vh', width: '100vw' }}>
      <MuseumGateHero />
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
    <div style={{ background: '#120c0a', minHeight: '100vh', width: '100vw' }}>
      <MuseumGateHero />
    </div>
  ),
};
