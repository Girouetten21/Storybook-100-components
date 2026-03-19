import type { Meta, StoryObj } from '@storybook/react';
import { ShapeShiftMenu } from './ShapeShiftMenu';

const meta = {
  title: 'Navigation/ShapeShiftMenu',
  component: ShapeShiftMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShapeShiftMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Aggressive Kinetic Version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'Jost, sans-serif', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase' }}>
          Shape-Shift Kinetic Button.
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
          Clicking the menu triggers a multi-stage mathematical CSS expansion. The button geometrically mutates from a pill, into a circle, into a vertical laser, and finally forcefully sweeps the screen leftward to reveal the canvas.
        </p>
      </div>
      <ShapeShiftMenu />
    </div>
  ),
};
