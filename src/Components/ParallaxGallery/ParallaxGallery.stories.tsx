import type { Meta, StoryObj } from '@storybook/react';
import { ParallaxGallery } from './ParallaxGallery';

const meta = {
    title: 'Components/ParallaxGallery',
    component: ParallaxGallery,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ParallaxGallery>;

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
            <div style={{ height: '50vh', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem' }}>
                Scroll Down 👇
            </div>
            
            <ParallaxGallery />
            
            <div style={{ height: '50vh', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem' }}>
                Footer Section
            </div>
        </div>
    ),
};
