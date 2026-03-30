import type { Meta, StoryObj } from '@storybook/react';
import { KineticCarouselScroll } from './KineticCarouselScroll';

const meta = {
  title: 'Scroll/KineticCarouselScroll',
  component: KineticCarouselScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KineticCarouselScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#f8f8f8' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '2rem', fontFamily: 'sans-serif' }}>
        Scroll Down
      </div>
      <KineticCarouselScroll />
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontSize: '2rem', fontFamily: 'sans-serif' }}>
        End of Gallery
      </div>
    </div>
  ),
};
