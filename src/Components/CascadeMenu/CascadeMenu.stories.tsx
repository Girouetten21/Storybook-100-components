import type { Meta, StoryObj } from '@storybook/react';
import { CascadeMenu } from './CascadeMenu';

const meta = {
  title: 'Navigation/CascadeMenu',
  component: CascadeMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CascadeMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Asymmetrical Reveal Mode
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 400, marginBottom: '20px' }}>
          Velvet Cascade Menu.
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, color: '#7a7a7a', fontFamily: 'Jost, sans-serif' }}>
          Five monolithic columns plummet from the ceiling. Interaction causes them to shrink asymmetrically, carving elegant geometric windows that unveil cinematic photography behind them.
        </p>
      </div>
      <CascadeMenu />
    </div>
  ),
};
