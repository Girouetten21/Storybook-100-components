import type { Meta, StoryObj } from '@storybook/react';
import { SplitTextMenu } from './SplitTextMenu';

const meta = {
  title: 'Navigation/SplitTextMenu',
  component: SplitTextMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplitTextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Preview Version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display, serif', fontWeight: 400, marginBottom: '20px' }}>
          Interactive Outline Slicing Mode.
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, color: '#7a7a7a', fontFamily: 'Jost, sans-serif' }}>
          An Awwwards-style architectural menu. On hover, the massive typography physically splits apart in half, revealing a panoramic cinematic image embedded directly inside the word.
        </p>
      </div>
      <SplitTextMenu />
    </div>
  ),
};
