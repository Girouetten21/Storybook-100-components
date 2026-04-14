import type { Meta, StoryObj } from '@storybook/react';
import { PaperMenu } from './PaperMenu';

const meta = {
  title: 'Navigation/PaperMenu',
  component: PaperMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaperMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Editorial Archive Mode
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#161513', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, marginBottom: '20px' }}>
          The Editorial Folio.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', fontFamily: 'Playfair Display, serif' }}>
          Interacting with the index bookmark simulates opening a heavy leather-bound archive. The viewport plunges down onto a dark desk, and the physical left cover swings backwards mathematically in 3D to reveal parchment and classic editorial typography.
        </p>
      </div>
      <PaperMenu />
    </div>
  ),
};
