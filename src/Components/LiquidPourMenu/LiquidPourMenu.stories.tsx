import type { Meta, StoryObj } from '@storybook/react';
import { LiquidPourMenu } from './LiquidPourMenu';

const meta = {
  title: 'Navigation/LiquidPourMenu',
  component: LiquidPourMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LiquidPourMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// The Espresso Pour Physics Simulator
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#2a1409', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '20px' }}>
          Physics Based Liquid Physics.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', fontFamily: 'Outfit, sans-serif' }}>
          An immersive interaction replacing static block overlays with simulated fluid dynamics. A stream drops mimicking gravity; immediately followed by heavy volumetric SVG-free CSS waves splashing violently upwards to encapsulate the viewport in coffee.
        </p>
      </div>
      <LiquidPourMenu />
    </div>
  ),
};
