import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatedElementComponent } from '../templates/components/skills/RatedBars';

export default {
  title: 'Resume/RatingBar',
  component: RatedElementComponent,
} as ComponentMeta<typeof RatedElementComponent>;

const Template: ComponentStory<typeof RatedElementComponent> = (args) => (
  <RatedElementComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  itemLabel: 'JavaScript',
  itemRating: 3,
};
