import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import { ExperienceItem, ExperienceStore, allWorks } from './experience.interface';

const addExperience =
  (set: SetState<ExperienceStore>) =>
  ({
    companyName,
    position,
    startDate,
    isWorkingHere,
    endDate,
    summary,
    id,
    isEnabled,
  }: ExperienceItem) =>
    set(
      produce((state: ExperienceStore) => {
        state.experiences.push({
          companyName,
          position,
          startDate,
          isWorkingHere,
          endDate,
          summary,
          id,
          isEnabled,
        });
      })
    );

const removeExperience = (set: SetState<ExperienceStore>) => (index: number) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }));

const setExperience = (set: SetState<ExperienceStore>) => (values: ExperienceItem[]) =>
  set(() => ({ experiences: values }));

const getExperience = (get: GetState<ExperienceStore>) => (index: number) => {
  return get().experiences[index];
};

const setIsEnabled = (set: SetState<ExperienceStore>) => (index: number, isEnabled: boolean) => {
  set(
    produce((state: ExperienceStore) => {
      state.experiences[index].isEnabled = isEnabled;
    })
  );
};

export const useExperiences = create<ExperienceStore>((set, get) => ({
  experiences: allWorks,
  add: addExperience(set),
  get: getExperience(get),
  remove: removeExperience(set),
  set: setExperience(set),
  setIsEnabled: setIsEnabled(set),
}));
