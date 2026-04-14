import type { Meta, StoryObj } from '@storybook/react';
import { KineticPixelMenu } from './KineticPixelMenu';

const meta = {
  title: 'Menus/KineticPixelMenu',
  component: KineticPixelMenu,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KineticPixelMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper displaying a bright color simply to mathematically prove the blackout capability of the Matrix.
export const Default: Story = {
  render: () => (
    <div style={{ background: '#e0e0e0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontFamily: 'sans-serif', opacity: 0.2 }}>MOCKUP SYSTEM ENVIRONMENT</h1>
      <KineticPixelMenu />
    </div>
  ),
};
