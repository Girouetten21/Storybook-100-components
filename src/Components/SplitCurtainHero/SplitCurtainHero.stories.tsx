import type { Meta, StoryObj } from '@storybook/react';
import { SplitCurtainHero } from './SplitCurtainHero';

const meta = {
  title: 'Heros/SplitCurtainHero',
  component: SplitCurtainHero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplitCurtainHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Gatekeeper Experience Simulator
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <SplitCurtainHero />
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
      <SplitCurtainHero />
    </div>
  ),
};
