import type { Meta, StoryObj } from '@storybook/react';
import { MinimalistMenu } from './MinimalistMenu';

const meta = {
  title: 'Navigation/MinimalistMenu',
  component: MinimalistMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MinimalistMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#e0dfdb', color: '#1a1a1a' }}>
      <h1 style={{ padding: '10vh 10vw', fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>
        An elegant editorial experience.
      </h1>
      <MinimalistMenu />
    </div>
  ),
};
