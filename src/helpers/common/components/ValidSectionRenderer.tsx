import { Fragment, ReactNode, useMemo } from 'react';
import { IExperienceItem } from 'src/stores/experience.interface';
import { IEducationItem } from 'src/stores/education.interface';
import { IAwardItem } from 'src/stores/awards.interface';
import { IVolunteeringItem } from 'src/stores/volunteering.interface';
import { ISkillItem } from 'src/stores/skill.interface';

export const SectionValidator = ({
  value,
  children,
}: {
  value:
    | string
    | IExperienceItem[]
    | IEducationItem[]
    | IAwardItem[]
    | IVolunteeringItem[]
    | ISkillItem[];
  children: ReactNode;
}) => {
  const isValid = useMemo(() => {
    return (value || '').length > 0;
  }, [value]);

  if (!isValid) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
