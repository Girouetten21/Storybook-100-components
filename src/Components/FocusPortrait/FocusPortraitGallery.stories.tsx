import type { Meta, StoryObj } from '@storybook/react';
import { FocusPortraitGallery } from './FocusPortraitGallery';
import bgPhoto from './Photos/background.webp';
import photo1 from './Photos/1.webp';
import photo2 from './Photos/2.webp';
import photo3 from './Photos/3.webp';

const meta = {
  title: 'Components/FocusPortraitGallery',
  component: FocusPortraitGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    animationDuration: {
      control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
    },
  },
  decorators: [
    (Story) => (
      <main 
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 w-full h-full">
          <Story />
        </div>
      </main>
    ),
  ],
} satisfies Meta<typeof FocusPortraitGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultGallery: Story = {
  args: {
    animationDuration: 1.0,
    items: [
      {
        id: 1,
        title: "Radiant Serenity",
        description: "The scarlet eyes are the dramatic focal point, offering a vibrant contrast to the sunlit tones. The technique is ethereal and painterly, suggesting great energy and an expression of radiant serenity under dramatic lighting.",
        image: photo1,
        initialX: "25%",
        initialY: "40%",
        rotation: -12,
        zIndex: 10
      },
      {
        id: 2,
        title: "Queen of Hearts",
        description: "The face, with bright pink eyes, radiates a softness and sweetness, enhanced by a frontal and diffused light that softens the features and emphasizes the palette of spring colors.",
        image: photo2,
        initialX: "50%",
        initialY: "55%",
        rotation: 0,
        zIndex: 30
      },
      {
        id: 3,
        title: "White Chlorination",
        description: "The contrast is provided by the eyes, a deep pinkish-red, which add a touch of pain or emotional intensity. The composition includes Gothic or fantasy elements, such as dark vines and reddish flowers that hang at the sides and adorn the subject's head, suggesting a theme of winter royalty or ethereal fragility.",
        image: photo3,
        initialX: "75%",
        initialY: "35%",
        rotation: 15,
        zIndex: 20
      }
    ]
  },
};
