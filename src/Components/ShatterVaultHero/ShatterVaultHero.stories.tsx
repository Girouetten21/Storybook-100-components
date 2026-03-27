import type { Meta, StoryObj } from '@storybook/react';
import { ShatterVaultHero } from './ShatterVaultHero';

const meta = {
  title: 'Heros/ShatterVaultHero',
  component: ShatterVaultHero,
  parameters: {
    layout: 'fullscreen',
    viewport: {
        defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShatterVaultHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Industrial Shatter-Vault Experience
export const Default: Story = {
  render: () => (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw', perspective: '2500px' }}>
      <ShatterVaultHero />
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
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw', perspective: '2500px' }}>
      <ShatterVaultHero />
    </div>
  ),
};
