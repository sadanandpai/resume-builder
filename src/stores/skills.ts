import create, { GetState, SetState } from 'zustand';
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

const getSkills = (get: GetState<SkillStateIntf>) => () => get().isEnabled ? get().values : [];

const setIsEnabled = (set: SetState<SkillStateIntf>) => (isEnabled: boolean) =>
  set(() => ({ isEnabled }));

const getMethods = (set: SetState<SkillStateIntf>, get: GetState<SkillStateIntf>) => ({
  get: getSkills(get),
  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
  setIsEnabled: setIsEnabled(set),
});

export const useLanguages = create<SkillStateIntf>((set, get) => ({
  title: 'Languages',
  hasLevel: true,
  values: ResumeData.skills.languages,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useFrameworks = create<SkillStateIntf>((set, get) => ({
  title: 'Frameworks',
  hasLevel: true,
  values: ResumeData.skills.frameworks,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useTechnologies = create<SkillStateIntf>((set, get) => ({
  title: 'Technologies',
  hasLevel: false,
  values: ResumeData.skills.technologies,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useLibraries = create<SkillStateIntf>((set, get) => ({
  title: 'Libraries',
  hasLevel: false,
  values: ResumeData.skills.libraries,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useDatabases = create<SkillStateIntf>((set, get) => ({
  title: 'Databases',
  hasLevel: false,
  values: ResumeData.skills.databases,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const usePractices = create<SkillStateIntf>((set, get) => ({
  title: 'Practices',
  hasLevel: false,
  values: ResumeData.skills.practices,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useTools = create<SkillStateIntf>((set, get) => ({
  title: 'Tools',
  hasLevel: false,
  values: ResumeData.skills.tools,
  isEnabled: true,

  ...getMethods(set, get),
}));
