import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatedPillElement } from '../templates/components/skills/RatedPills';

export default {
  title: 'Resume/RatedPill',
  component: RatedPillElement,
} as ComponentMeta<typeof RatedPillElement>;

const Template: ComponentStory<typeof RatedPillElement> = (args) => <RatedPillElement {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  itemLabel: 'JavaScript',
  itemRating: 3,
};
