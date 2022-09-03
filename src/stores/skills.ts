import create, { GetState, SetState } from 'zustand';
import produce from 'immer';
import { ISkillItem, ISkillState } from './skill.interface';
import resumeData from 'src/helpers/constants/resume-data.json';

const addSkill =
  (set: SetState<ISkillState>) =>
  ({ name, level }: ISkillItem) =>
    set(
      produce((state: ISkillState) => {
        state.values.push({ name, level });
      })
    );

const removeSkill = (set: SetState<ISkillState>) => (index: number) =>
  set(
    produce((state: ISkillState) => {
      state.values.splice(index, 1);
    })
  );

const setSkills = (set: SetState<ISkillState>) => (values: ISkillItem[]) => set(() => ({ values }));

const getSkills = (get: GetState<ISkillState>) => () => get().isEnabled ? get().values : [];

const setIsEnabled = (set: SetState<ISkillState>) => (isEnabled: boolean) =>
  set(() => ({ isEnabled }));

const getMethods = (set: SetState<ISkillState>, get: GetState<ISkillState>) => ({
  get: getSkills(get),
  add: addSkill(set),
  remove: removeSkill(set),
  reset: setSkills(set),
  setIsEnabled: setIsEnabled(set),
});

export const useLanguages = create<ISkillState>((set, get) => ({
  title: 'Languages',
  hasLevel: true,
  values: resumeData.skills.languages,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useFrameworks = create<ISkillState>((set, get) => ({
  title: 'Frameworks',
  hasLevel: true,
  values: resumeData.skills.frameworks,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useTechnologies = create<ISkillState>((set, get) => ({
  title: 'Technologies',
  hasLevel: false,
  values: resumeData.skills.technologies,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useLibraries = create<ISkillState>((set, get) => ({
  title: 'Libraries',
  hasLevel: false,
  values: resumeData.skills.libraries,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useDatabases = create<ISkillState>((set, get) => ({
  title: 'Databases',
  hasLevel: false,
  values: resumeData.skills.databases,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const usePractices = create<ISkillState>((set, get) => ({
  title: 'Practices',
  hasLevel: false,
  values: resumeData.skills.practices,
  isEnabled: true,

  ...getMethods(set, get),
}));

export const useTools = create<ISkillState>((set, get) => ({
  title: 'Tools',
  hasLevel: false,
  values: resumeData.skills.tools,
  isEnabled: true,

  ...getMethods(set, get),
}));
