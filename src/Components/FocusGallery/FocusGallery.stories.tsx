import type { Meta, StoryObj } from '@storybook/react';
import { FocusGallery } from './FocusGallery';

const meta = {
    title: 'Components/FocusGallery',
    component: FocusGallery,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FocusGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// The default story with just the component itself
export const Default: Story = {
    args: {},
};

// Scroll tester
export const WithScrollTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0, background: '#111' }}>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                Scroll Down for 1x1 Focus 👇
            </div>
            
            <FocusGallery />
            
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontFamily: 'inter, sans-serif' }}>
                End of Gallery
            </div>
        </div>
    ),
};
