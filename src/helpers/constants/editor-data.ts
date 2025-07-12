import ActivitiesLayout from '@/modules/builder/editor/modules/activities/ActivitiesLayout';
import AwardsLayout from '@/modules/builder/editor/modules/awards/AwardsLayout';
import BasicLayout from '@/modules/builder/editor/modules/basic/BasicLayout';
import EducationLayout from '@/modules/builder/editor/modules/education/EducationLayout';
import ExperienceLayout from '@/modules/builder/editor/modules/experience/ExperienceLayout';
import { ReactNode } from 'react';
import SkillsLayout from '@/modules/builder/editor/modules/skills/SkillsLayout';
import VolunteeringLayout from '@/modules/builder/editor/modules/volunteering/VolunteeringLayout';

export const headers: {
  [key: string]: { title: string; component: () => ReactNode };
} = {
  'basic-details': { title: 'Basic details', component: BasicLayout },
  'skills-and-expertise': {
    title: 'Skills and expertise',
    component: SkillsLayout,
  },
  education: { title: 'Education', component: EducationLayout },
  experience: { title: 'Experience', component: ExperienceLayout },
  activities: { title: 'Activities', component: ActivitiesLayout },
  volunteering: { title: 'Volunteering', component: VolunteeringLayout },
  awards: { title: 'Awards', component: AwardsLayout },
};
