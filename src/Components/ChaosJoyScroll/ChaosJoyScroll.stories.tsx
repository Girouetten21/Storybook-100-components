import type { Meta, StoryObj } from '@storybook/react';
import ChaosJoyScroll from './ChaosJoyScroll';

const meta: Meta<typeof ChaosJoyScroll> = {
  title: 'Sections/ChaosJoyScroll',
  component: ChaosJoyScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ChaosJoyScroll>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#000' }}>
      {/* Intro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff',
        color: '#000'
      }}>
        <h1 style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '5rem', textAlign: 'center' }}>
          FEEL IT? <br/> <span style={{ color: '#FF00FF' }}>SCROLL IT.</span>
        </h1>
      </section>

      <ChaosJoyScroll />

      {/* Outro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.4em', opacity: 0.3 }}>CHAOS JOY ARCHIVE 2026</h2>
      </section>
    </div>
  ),
};
