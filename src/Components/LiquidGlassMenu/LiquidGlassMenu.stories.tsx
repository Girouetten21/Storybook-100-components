import type { Meta, StoryObj } from '@storybook/react';
import { LiquidGlassMenu } from './LiquidGlassMenu';

const meta = {
  title: 'Navigation/LiquidGlassMenu',
  component: LiquidGlassMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LiquidGlassMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ethereal Liquid Morph Mode
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#0a0a0c', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 300, marginBottom: '20px' }}>
          Glassmorphism x Liquid Dynamics.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
          An ethereal full-screen intersection of liquid border-radius morphing geometry and heavy backdrop-filter glass. Hovering navigation links organically adjusts the surrounding ambient lighting.
        </p>
      </div>
      <LiquidGlassMenu />
    </div>
  ),
};
