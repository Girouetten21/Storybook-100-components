import type { Meta, StoryObj } from '@storybook/react';
import { FashionAtelierHero } from './FashionAtelierHero';

const meta = {
  title: 'Heros/FashionAtelierHero',
  component: FashionAtelierHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FashionAtelierHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Luxury Fashion Atelier Revelation
export const Default: Story = {
  render: () => (
    <div style={{ background: '#f9f7f2', minHeight: '100vh', width: '100vw' }}>
      <FashionAtelierHero />
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
    <div style={{ background: '#f9f7f2', minHeight: '100vh', width: '100vw' }}>
      <FashionAtelierHero />
    </div>
  ),
};
