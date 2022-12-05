import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import { Skeleton } from './index';

export default {
  component: Skeleton.Base,
  title: 'Skeleton',
  decorators: [
    Story => (
      <div
        style={{
          padding: '24px',
          width: '100vw',
          height: '100vh',
        }}
      >
        {Story()}
      </div>
    ),
  ],
  argTypes: {
    loading: {
      options: [true, false],
      control: { type: 'switch' },
    },
  },
} as Meta;

const BaseTemplate: Story<ComponentProps<typeof Skeleton.Base>> = args => (
  <Skeleton.Base {...args} />
);
const AvatarTemplate: Story<ComponentProps<typeof Skeleton.Avatar>> = args => (
  <Skeleton.Avatar {...args} />
);
const ButtonTemplate: Story<ComponentProps<typeof Skeleton.Button>> = args => (
  <Skeleton.Button {...args} />
);
const InputTemplate: Story<ComponentProps<typeof Skeleton.Input>> = args => (
  <Skeleton.Input {...args} />
);
const ImageTemplate: Story<ComponentProps<typeof Skeleton.Image>> = args => (
  <Skeleton.Image {...args} />
);

export const Default = BaseTemplate.bind({});
export const Avatar = AvatarTemplate.bind({});
export const Button = ButtonTemplate.bind({});
export const Input = InputTemplate.bind({});
export const Image = ImageTemplate.bind({});
