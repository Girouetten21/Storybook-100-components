import type { Meta, StoryObj } from '@storybook/react';
import { AestheticTypographicLoader } from './AestheticTypographicLoader';

const meta = {
  title: 'Loaders/AestheticTypographicLoader',
  component: AestheticTypographicLoader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AestheticTypographicLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'sans-serif', color: '#fff', fontSize: '3rem', letterSpacing: '-0.02em', opacity: 0.5 }}>
        THE LUXURY BRAND CONTENT REVEALS HERE.
      </h1>
      <AestheticTypographicLoader />
    </div>
  ),
};
