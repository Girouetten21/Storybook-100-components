import type { Meta, StoryObj } from '@storybook/react';
import { CinematicCollageHero } from './CinematicCollageHero';

const meta = {
  title: 'Heros/CinematicCollageHero',
  component: CinematicCollageHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CinematicCollageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Editorial Moodboard Montage Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw' }}>
      <CinematicCollageHero />
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
      <CinematicCollageHero />
    </div>
  ),
};
