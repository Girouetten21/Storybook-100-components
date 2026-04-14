import type { Meta, StoryObj } from '@storybook/react';
import { PaperStackScroll } from './PaperStackScroll';

const meta = {
  title: 'Scroll/PaperStackScroll',
  component: PaperStackScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PaperStackScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0c0a09' }}>
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f7f4ec', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em', opacity: 0.5 }}>
        APPROACH THE DESK
      </div>
      <PaperStackScroll />
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f7f4ec', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em', opacity: 0.5 }}>
        CLOSE THE ARCHIVE
      </div>
    </div>
  ),
};
