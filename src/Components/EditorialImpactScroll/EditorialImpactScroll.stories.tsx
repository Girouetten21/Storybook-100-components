import type { Meta, StoryObj } from '@storybook/react';
import EditorialImpactScroll from './EditorialImpactScroll';

const meta: Meta<typeof EditorialImpactScroll> = {
  title: 'Sections/EditorialImpactScroll',
  component: EditorialImpactScroll,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof EditorialImpactScroll>;

export const Default: Story = {
  render: () => (
    <div style={{ background: '#0d0d0d' }}>
      {/* Intro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff',
        color: '#000'
      }}>
        <h1 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '5rem', textAlign: 'center' }}>
          VOLUME ONE <br/> <span style={{ opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.8em', textTransform: 'uppercase', fontStyle: 'normal' }}>The Editorial Collective</span>
        </h1>
      </section>

      <EditorialImpactScroll />

      {/* Outro spacer */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0d0d0d',
        color: '#fff'
      }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.6em', opacity: 0.2 }}>END OF EDITION 2026</h2>
      </section>
    </div>
  ),
};
