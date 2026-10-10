import type { Dayjs } from 'dayjs';
import type { IBasicDetailsItem } from '@/stores/basic.interface';
import type { IExperienceItem } from '@/stores/experience.interface';
import type { IEducationItem } from '@/stores/education.interface';
import type { IAwardItem } from '@/stores/awards.interface';
import type { ISkillItem } from '@/stores/skill.interface';

export type ResumeDate = string | Dayjs | null | undefined;
export type ExperienceItem = Omit<IExperienceItem, 'startDate' | 'endDate'> & {
  startDate: ResumeDate;
  endDate: ResumeDate;
};
export type EducationItem = Omit<IEducationItem, 'startDate' | 'endDate'> & {
  startDate: ResumeDate;
  endDate: ResumeDate;
};
export type AwardItem = Omit<IAwardItem, 'date'> & { date: ResumeDate };
export type SkillItem = ISkillItem;
export type ProfileBasics = Partial<Omit<IBasicDetailsItem, 'location'>> & {
  location?: { city?: string };
};
export type SectionProps = { title?: string; density?: 'comfortable' | 'compact' };
export type TextProps = SectionProps & { html?: string };
export type ItemsProps<T> = SectionProps & { items: readonly T[] };
