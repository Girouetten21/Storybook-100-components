import type { Meta, StoryObj } from '@storybook/react';
import { IrisRevealHero } from './IrisRevealHero';

const meta = {
  title: 'Heros/IrisRevealHero',
  component: IrisRevealHero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IrisRevealHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Cinematic Diaphragm Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <IrisRevealHero />
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
      <IrisRevealHero />
    </div>
  ),
};
