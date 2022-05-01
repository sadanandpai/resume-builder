import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import { ExperienceItem, ExperienceStore, allWorks } from './experience.interface';

const addExperience =
  (set: SetState<ExperienceStore>) =>
  ({ companyName, position, startDate, isWorkingHere, endDate, summary, id }: ExperienceItem) =>
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
        });
      })
    );

const removeExperience = (set: SetState<ExperienceStore>) => (index: number) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }));

const setExperience = (set: SetState<ExperienceStore>) => (values: ExperienceItem[]) => {
  set({
    experiences: values,
  });
};

const getExperience = (get: GetState<ExperienceStore>) => (index: number) => {
  return get().experiences[index];
};

const onMoveUp = (set: SetState<ExperienceStore>) => (index: number) => {
  set(
    produce((state: ExperienceStore) => {
      if (index > 0) {
        let currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index - 1];
        state.experiences[index - 1] = currentExperience;
      }
    })
  );
};
const onMoveDown = (set: SetState<ExperienceStore>) => (index: number) => {
  set(
    produce((state: ExperienceStore) => {
      const totalExp = state.experiences.length;
      if (index < totalExp - 1) {
        let currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index + 1];
        state.experiences[index + 1] = currentExperience;
      }
    })
  );
};

export const useExperiences = create<ExperienceStore>((set, get) => ({
  experiences: allWorks,
  add: addExperience(set),
  get: getExperience(get),
  remove: removeExperience(set),
  set: setExperience(set),
  onmoveup: onMoveUp(set),
  onmovedown: onMoveDown(set),
}));
