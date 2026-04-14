import type { Meta, StoryObj } from '@storybook/react';
import { CinematicLoader } from './CinematicLoader';

const meta = {
  title: 'Loaders/CinematicLoader',
  component: CinematicLoader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CinematicLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#f0f0f0', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontFamily: 'sans-serif', color: '#111', fontSize: '3rem', letterSpacing: '-0.02em' }}>
        THE APP CONTENT LIVES HERE.
      </h1>
      <CinematicLoader />
    </div>
  ),
};
