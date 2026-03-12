import type { Meta, StoryObj } from '@storybook/react';
import { DeckGallery } from './DeckGallery';

const meta = {
    title: 'Components/DeckGallery',
    component: DeckGallery,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DeckGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic standalone view
export const Default: Story = {
    args: {},
};

// Scroll tester
export const WithScrollTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0, background: '#111' }}>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                Scroll Down to Scatter the Deck 👇
            </div>
            
            <DeckGallery />
            
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                End of the Collage
            </div>
        </div>
    ),
};
