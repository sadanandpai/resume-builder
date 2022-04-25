import create, { SetState } from 'zustand';
import produce from 'immer';
import { SkillItemIntf, SkillStateIntf } from './skill.interface';
import ResumeData from 'src/helpers/constants/resume-data.json';

const addSkill =
  (set: SetState<SkillStateIntf>) =>
  ({ name, level }: SkillItemIntf) =>
    set(
      produce((state: SkillStateIntf) => {
        state.values.push({ name, level });
      })
    );

const removeSkill = (set: SetState<SkillStateIntf>) => (index: number) =>
  set(
    produce((state: SkillStateIntf) => {
      state.values.splice(index, 1);
    })
  );

const setSkills = (set: SetState<SkillStateIntf>) => (values: SkillItemIntf[]) =>
  set(() => ({ values }));

export const useLanguages = create<SkillStateIntf>((set) => ({
  title: 'Languages',
  hasLevel: true,
  values: ResumeData.skills.languages,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useFrameworks = create<SkillStateIntf>((set) => ({
  title: 'Frameworks',
  hasLevel: true,
  values: ResumeData.skills.frameworks,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useTechnologies = create<SkillStateIntf>((set) => ({
  title: 'Technologies',
  hasLevel: false,
  values: ResumeData.skills.technologies,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useLibraries = create<SkillStateIntf>((set) => ({
  title: 'Libraries',
  hasLevel: false,
  values: ResumeData.skills.libraries,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useDatabases = create<SkillStateIntf>((set) => ({
  title: 'Databases',
  hasLevel: false,
  values: ResumeData.skills.databases,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const usePractices = create<SkillStateIntf>((set) => ({
  title: 'Practices',
  hasLevel: false,
  values: ResumeData.skills.practices,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useTools = create<SkillStateIntf>((set) => ({
  title: 'Tools',
  hasLevel: false,
  values: ResumeData.skills.tools,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));
