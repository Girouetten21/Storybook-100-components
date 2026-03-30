import type { Meta, StoryObj } from '@storybook/react';
import WhisperingPoetryScroll from './WhisperingPoetryScroll';

const meta: Meta<typeof WhisperingPoetryScroll> = {
  title: 'Sections/WhisperingPoetryScroll',
  component: WhisperingPoetryScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WhisperingPoetryScroll>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#f5f5f0' }}>
      {/* Intro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0c0c0c',
        color: '#fff'
      }}>
        <h1 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '4rem', textAlign: 'center' }}>
          Silence. <br/> <span style={{ opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.8em', textTransform: 'uppercase' }}>Whisper of the page</span>
        </h1>
      </section>

      <WhisperingPoetryScroll />

      {/* Outro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff',
        color: '#000'
      }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.6em', opacity: 0.2 }}>THE POETRY ARCHIVE 2026</h2>
      </section>
    </div>
  ),
};
