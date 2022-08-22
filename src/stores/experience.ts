import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import resumeData from 'src/helpers/constants/resume-data.json';
import { ExperienceItem, ExperienceStore } from './experience.interface';

const addExperience =
  (set: SetState<ExperienceStore>) =>
  ({
    name,
    position,
    startDate,
    isWorkingHere,
    endDate,
    summary,
    id,
    url = '',
    highlights = [],
  }: ExperienceItem) =>
    set(
      produce((state: ExperienceStore) => {
        state.experiences.push({
          id,
          name,
          position,
          startDate,
          isWorkingHere,
          endDate,
          summary,
          url,
          highlights,
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

const updateExperience =
  (set: SetState<ExperienceStore>) => (index: number, updatedInfo: ExperienceItem) => {
    set(
      produce((state: ExperienceStore) => {
        state.experiences[index] = updatedInfo;
      })
    );
  };

const getExperience = (get: GetState<ExperienceStore>) => (index: number) => {
  return get().experiences[index];
};

const onMoveUp = (set: SetState<ExperienceStore>) => (index: number) => {
  set(
    produce((state: ExperienceStore) => {
      if (index > 0) {
        const currentExperience = state.experiences[index];
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
        const currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index + 1];
        state.experiences[index + 1] = currentExperience;
      }
    })
  );
};

export const useExperiences = create<ExperienceStore>(
  devtools((set, get) => ({
    experiences: resumeData.work,
    add: addExperience(set),
    get: getExperience(get),
    remove: removeExperience(set),
    set: setExperience(set),
    onmoveup: onMoveUp(set),
    onmovedown: onMoveDown(set),
    updateExperience: updateExperience(set),
  }))
);
