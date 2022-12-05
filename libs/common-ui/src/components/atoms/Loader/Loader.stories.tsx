import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import { Loader } from './index';

export default {
  component: Loader,
  title: 'Loader',
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
} as Meta;

const Template: Story<ComponentProps<typeof Loader>> = args => (
  <Loader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
