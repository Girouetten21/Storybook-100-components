import type { Meta, StoryObj } from '@storybook/react';
import { FullscreenMenu } from './FullscreenMenu';

const meta = {
  title: 'Navigation/FullscreenMenu',
  component: FullscreenMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullscreenMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#e0e0e0' }}>
      <h1 style={{ padding: '10vw', fontSize: '3rem', fontFamily: 'Inter, sans-serif' }}>
        Scroll down to test overlay capabilities.
      </h1>
      <FullscreenMenu />
    </div>
  ),
};
