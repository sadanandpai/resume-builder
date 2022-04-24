import create, { SetState } from 'zustand';
import produce from 'immer';
import {
  databases,
  frameworks,
  Item,
  languages,
  libraries,
  practices,
  SkillState,
  technologies,
  tools,
} from './skill.interface';

const addSkill =
  (set: SetState<SkillState>) =>
  ({ name, level }: Item) =>
    set(
      produce((state: SkillState) => {
        state.values.push({ name, level });
      })
    );

const removeSkill = (set: SetState<SkillState>) => (index: number) =>
  set((state) => ({
    values: state.values.slice(0, index).concat(state.values.slice(index + 1)),
  }));

const setSkills = (set: SetState<SkillState>) => (values: Item[]) => set(() => ({ values }));

export const useLanguages = create<SkillState>((set) => ({
  title: 'Languages',
  hasLevel: true,
  values: languages,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useFrameworks = create<SkillState>((set) => ({
  title: 'Frameworks',
  hasLevel: true,
  values: frameworks,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useTechnologies = create<SkillState>((set) => ({
  title: 'Technologies',
  hasLevel: false,
  values: technologies,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useLibraries = create<SkillState>((set) => ({
  title: 'Libraries',
  hasLevel: false,
  values: libraries,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useDatabases = create<SkillState>((set) => ({
  title: 'Databases',
  hasLevel: false,
  values: databases,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const usePractices = create<SkillState>((set) => ({
  title: 'Practices',
  hasLevel: false,
  values: practices,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));

export const useTools = create<SkillState>((set) => ({
  title: 'Tools',
  hasLevel: false,
  values: tools,

  add: addSkill(set),
  remove: removeSkill(set),
  set: setSkills(set),
}));
