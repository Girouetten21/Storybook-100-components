import type { Meta, StoryObj } from '@storybook/react';
import AetherialMonolithHero from './AetherialMonolithHero';

const meta: Meta<typeof AetherialMonolithHero> = {
  title: 'Heros/AetherialMonolithHero',
  component: AetherialMonolithHero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialMonolithHero>;

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: '200vh', background: '#000' }}>
      <AetherialMonolithHero />
      
      {/* Simulation of page content below the hero */}
      <section style={{ 
        height: '100vh', 
        background: '#0a0a0c', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <h2 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.2 }}>
            Scroll Content Reveal
        </h2>
      </section>
    </div>
  ),
};
