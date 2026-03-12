import type { Meta, StoryObj } from '@storybook/react';
import { ProductFeatureGallery } from './ProductFeatureGallery';

const meta = {
    title: 'Components/ProductFeatureGallery',
    component: ProductFeatureGallery,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProductFeatureGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// The default story with just the component itself
export const Default: Story = {
    args: {},
};

// Scroll tester
export const WithScrollTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0, background: '#f4f4f6' }}>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontSize: '2.5rem', fontFamily: 'Inter, sans-serif' }}>
                Scroll Down To Explore Features 👇
            </div>
            
            <ProductFeatureGallery />
            
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontSize: '2.5rem', fontFamily: 'Inter, sans-serif' }}>
                End of Product Showcase
            </div>
        </div>
    ),
};
