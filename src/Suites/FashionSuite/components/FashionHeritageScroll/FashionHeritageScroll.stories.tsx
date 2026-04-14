import type { Meta, StoryObj } from '@storybook/react';
import { FashionHeritageScroll } from './FashionHeritageScroll';

const meta = {
  title: 'Scroll/FashionHeritageScroll',
  component: FashionHeritageScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FashionHeritageScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0b0d10' }}>
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em' }}>
        SCROLL TO ENTER ATELIER
      </div>
      <FashionHeritageScroll />
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em' }}>
        COLLECTION COMPLETE
      </div>
    </div>
  ),
};
