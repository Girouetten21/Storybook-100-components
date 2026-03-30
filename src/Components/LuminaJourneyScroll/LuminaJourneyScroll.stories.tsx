import type { Meta, StoryObj } from '@storybook/react';
import LuminaJourneyScroll from './LuminaJourneyScroll';

const meta: Meta<typeof LuminaJourneyScroll> = {
  title: 'Sections/LuminaJourneyScroll',
  component: LuminaJourneyScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LuminaJourneyScroll>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0a0a0c' }}>
      {/* Intro section to have vertical space before triggers */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 10vw',
        background: '#0a0a0c',
        color: '#fff',
        fontFamily: 'sans-serif',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.6em', opacity: 0.2, fontSize: '0.7rem' }}>— Navigation Logic —</span>
          <h1 style={{ fontSize: '4rem', margin: '20px 0', fontFamily: 'serif', fontStyle: 'italic' }}>Scroll Down to Start the Journey.</h1>
        </div>
      </section>

      <LuminaJourneyScroll />

      {/* Outro section */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0c',
        color: '#fff',
        opacity: 0.1
      }}>
        <h2 style={{ fontSize: '10vw' }}>THE END.</h2>
      </section>
    </div>
  ),
};
