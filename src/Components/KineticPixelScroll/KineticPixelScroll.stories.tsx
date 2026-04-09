import type { Meta, StoryObj } from '@storybook/react';
import { KineticPixelScroll } from './KineticPixelScroll';

const meta = {
  title: 'Scroll/KineticPixelScroll',
  component: KineticPixelScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KineticPixelScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic scaffolding allowing the developer to emulate a true downstream scroll track flow 
export const Default: Story = {
  render: () => (
    <div style={{ background: '#0a0a0a' }}>
      {/* Upper Space */}
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: 0.5 }}>
        ⬇ Scroll down to shatter the matrix ⬇
      </div>
      
      {/* Component Core */}
      <KineticPixelScroll />
      
      {/* Lower space */}
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: 0.5 }}>
        End of Transmission
      </div>
    </div>
  ),
};
