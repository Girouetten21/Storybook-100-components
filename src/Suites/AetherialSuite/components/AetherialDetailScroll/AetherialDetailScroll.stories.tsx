import type { Meta, StoryObj } from '@storybook/react';
import AetherialDetailScroll from './AetherialDetailScroll';

const meta: Meta<typeof AetherialDetailScroll> = {
  title: 'Sections/AetherialDetailScroll',
  component: AetherialDetailScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialDetailScroll>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#f5f5f7' }}>
      {/* Intro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff' 
      }}>
        <h1 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '3rem' }}>The Atelier Reveal.</h1>
      </section>

      <AetherialDetailScroll />

      {/* Outro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0c',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.4em', opacity: 0.3 }}>FASHION ARCHIVE 2026</h2>
      </section>
    </div>
  ),
};
