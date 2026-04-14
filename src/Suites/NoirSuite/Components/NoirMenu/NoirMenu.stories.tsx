import type { Meta, StoryObj } from '@storybook/react';
import { NoirMenu } from './NoirMenu';

const meta = {
  title: 'Navigation/NoirMenu',
  component: NoirMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoirMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Aggressive Seductive Version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#050505', color: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Oswald, sans-serif', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase' }}>
          Provocative High-Contrast Mode.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
          "Un menú diseñado para impactar." A collision of bold, aggressive sans-serif typography with sensual, crimson italic undertones. 
        </p>
      </div>
      <NoirMenu />
    </div>
  ),
};
