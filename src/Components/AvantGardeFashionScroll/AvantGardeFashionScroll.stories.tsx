import type { Meta, StoryObj } from '@storybook/react';
import { AvantGardeFashionScroll } from './AvantGardeFashionScroll';

const meta = {
  title: 'Scroll/AvantGardeFashionScroll',
  component: AvantGardeFashionScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AvantGardeFashionScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#080808' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5e5e5', fontSize: '1rem', fontFamily: 'sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Scroll to Reveal Collection
      </div>
      <AvantGardeFashionScroll />
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5e5e5', fontSize: '1rem', fontFamily: 'sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        End of Exhibition
      </div>
    </div>
  ),
};
