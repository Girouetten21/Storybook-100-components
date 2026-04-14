import type { Meta, StoryObj } from '@storybook/react';
import { PaperFolioScroll } from './PaperFolioScroll';

const meta = {
  title: 'Scroll/PaperFolioScroll',
  component: PaperFolioScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PaperFolioScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#F8F5EF' }}>
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2F2D2A', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em' }}>
        OPEN THE CHRONICLE
      </div>
      <PaperFolioScroll />
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2F2D2A', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '0.4em' }}>
        END OF TOME
      </div>
    </div>
  ),
};
