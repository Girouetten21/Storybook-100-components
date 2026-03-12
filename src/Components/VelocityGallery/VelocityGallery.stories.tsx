import type { Meta, StoryObj } from '@storybook/react';
import { VelocityGallery } from './VelocityGallery';

const meta = {
    title: 'Components/VelocityGallery',
    component: VelocityGallery,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof VelocityGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// The default story with just the component itself
export const Default: Story = {
    args: {},
};

// Story demonstrating the scroll effect with surrounding space
export const WithScrollTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0 }}>
            <div style={{ height: '100vh', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                Scroll Down to Enter the Cinematic Gallery 👇
            </div>
            
            <VelocityGallery />
            
            <div style={{ height: '100vh', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                End of Gallery. Keep scrolling!
            </div>
        </div>
    ),
};
