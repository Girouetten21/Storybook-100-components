import type { Meta, StoryObj } from '@storybook/react';
import { CinematicMenu } from './CinematicMenu';

const meta = {
  title: 'Navigation/CinematicMenu',
  component: CinematicMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CinematicMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#e0e0e0' }}>
      <h1 style={{ padding: '10vw', fontSize: '3rem', fontFamily: 'Inter, sans-serif' }}>
        Scroll down to test overlay capabilities.
      </h1>
      <CinematicMenu />
    </div>
  ),
};
