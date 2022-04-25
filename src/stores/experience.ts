import create, { SetState } from 'zustand';
import produce from 'immer';
import { ExperienceItem, ExperienceStore, allWorks } from './experience.interface';

const addExperience =
  (set: SetState<ExperienceStore>) =>
  ({ companyName, position, startDate, isWorkingHere, endDate, summary }: ExperienceItem) =>
    set(
      produce((state: ExperienceStore) => {
        state.experiences.push({
          companyName,
          position,
          startDate,
          isWorkingHere,
          endDate,
          summary,
        });
      })
    );

const removeExperience = (set: SetState<ExperienceStore>) => (index: number) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }));

const setExperience = (set: SetState<ExperienceStore>) => (values: ExperienceItem[]) =>
  set(() => ({ experiences: values }));

export const useExperiences = create<ExperienceStore>((set) => ({
  experiences: allWorks,
  add: addExperience(set),
  remove: removeExperience(set),
  set: setExperience(set),
}));
