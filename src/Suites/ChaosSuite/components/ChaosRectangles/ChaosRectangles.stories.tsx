import type { Meta, StoryObj } from '@storybook/react';
import { ChaosRectangles } from './ChaosRectangles';

const meta = {
    title: 'Components/ChaosRectangles',
    component: ChaosRectangles,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChaosRectangles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div style={{ height: '300vh', background: '#0a0a0c' }}>
                <Story />
            </div>
        ),
    ],
};
