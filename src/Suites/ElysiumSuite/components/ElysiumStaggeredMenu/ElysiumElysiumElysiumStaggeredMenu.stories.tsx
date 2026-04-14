import type { Meta, StoryObj } from '@storybook/react';
import { ElysiumElysiumElysiumStaggeredMenu } from './ElysiumElysiumElysiumStaggeredMenu';

const meta = {
  title: 'Navigation/ElysiumElysiumElysiumStaggeredMenu',
  component: ElysiumElysiumElysiumStaggeredMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElysiumElysiumElysiumStaggeredMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#0a0a0c', color: 'white' }}>
      <h1 style={{ padding: '10vw', fontSize: '4rem', fontFamily: 'Syne, sans-serif' }}>
        Click the menu on the top right.
      </h1>
      <p style={{ padding: '0 10vw', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, color: '#aaa' }}>
        The button uses mix-blend-mode so it adapts its color automatically against bright or dark content. The menu reveals itself using a column-based staggering effect, heavily inspired by modern agency portfolios.
      </p>
      <ElysiumElysiumElysiumStaggeredMenu />
    </div>
  ),
};
