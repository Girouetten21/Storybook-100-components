import type { Meta, StoryObj } from '@storybook/react';
import { CrystallineInfinityScroll } from './CrystallineInfinityScroll';

const meta = {
  title: 'Scroll/CrystallineInfinityScroll',
  component: CrystallineInfinityScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CrystallineInfinityScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ paddingBottom: '100vh', background: '#000' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontFamily: 'sans-serif' }}>
        Scroll Down
      </div>
      <CrystallineInfinityScroll />
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontFamily: 'sans-serif' }}>
        End of Experience
      </div>
    </div>
  ),
};
