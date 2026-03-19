import type { Meta, StoryObj } from '@storybook/react';
import { CelestialVectorMenu } from './CelestialVectorMenu';

const meta = {
  title: 'Navigation/CelestialVectorMenu',
  component: CelestialVectorMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CelestialVectorMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Golden Ratio Minimalist Vector Simulator
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, marginBottom: '20px' }}>
          Pure Seductive Mathematics.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', fontFamily: 'Jost, sans-serif' }}>
          Our absolute darkest, most luxurious, minimal interface yet. Zero photographs. Just immaculate 1px geometric grid-lines mapping out celestial orbits natively via CSS, illuminating hyper-sized italic typography tracking your movements softly.
        </p>
      </div>
      <CelestialVectorMenu />
    </div>
  ),
};
