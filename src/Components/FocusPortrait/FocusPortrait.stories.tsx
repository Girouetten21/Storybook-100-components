import type { Meta, StoryObj } from '@storybook/react';
import { FocusPortrait } from './FocusPortrait';
import bgPhoto from './Photos/background.webp';

const meta = {
  title: 'Components/FocusPortrait',
  component: FocusPortrait,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    animationDuration: {
      control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
    },
    initialWidth: { control: { type: 'number' } },
    initialHeight: { control: { type: 'number' } },
    zoomedWidth: { control: { type: 'number' } },
    zoomedHeight: { control: { type: 'number' } },
  },
  decorators: [
    (Story) => (
      <main 
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof FocusPortrait>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPortrait: Story = {
  args: {
    title: 'Radiant Serenity',
    description: 'The scarlet eyes are the dramatic focal point, offering a vibrant contrast to the sunlit tones. The technique is ethereal and painterly, suggesting great energy and an expression of radiant serenity under dramatic lighting.',
    animationDuration: 1.2,
  },
};
