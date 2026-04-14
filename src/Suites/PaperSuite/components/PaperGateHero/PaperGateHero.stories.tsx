import type { Meta, StoryObj } from '@storybook/react';
import { PaperGateHero } from './PaperGateHero';

const meta = {
  title: 'Heros/PaperGateHero',
  component: PaperGateHero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaperGateHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Luxury Envelope Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <PaperGateHero />
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
      <PaperGateHero />
    </div>
  ),
};
