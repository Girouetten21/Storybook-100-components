import type { Meta, StoryObj } from '@storybook/react';
import { FibonacciGoldenMenu } from './FibonacciGoldenMenu';

const meta = {
  title: 'Menus/FibonacciGoldenMenu',
  component: FibonacciGoldenMenu,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FibonacciGoldenMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'serif', color: '#fff', fontSize: '3rem', letterSpacing: '-0.02em', opacity: 0.3 }}>
        VIRTUAL DOM EXPERIMENT <br /><br /> HIT THE MENU TOP-RIGHT
      </h1>
      <FibonacciGoldenMenu />
    </div>
  ),
};
