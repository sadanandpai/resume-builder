import create, { SetState, GetState } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IExperienceItem, IExperienceStore } from './experience.interface';

const addExperience =
  (set: SetState<IExperienceStore>) =>
  ({
    name,
    position,
    startDate,
    isWorkingHere,
    endDate,
    years,
    summary,
    id,
    url = '',
    highlights = [],
  }: IExperienceItem) =>
    set(
      produce((state: IExperienceStore) => {
        state.experiences.push({
          id,
          name,
          position,
          startDate,
          isWorkingHere,
          endDate,
          summary,
          url,
          years,
          highlights,
        });
      })
    );

const removeExperience = (set: SetState<IExperienceStore>) => (index: number) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }));

const setExperience = (set: SetState<IExperienceStore>) => (values: IExperienceItem[]) => {
  set({
    experiences: values,
  });
};

const updateExperience =
  (set: SetState<IExperienceStore>) => (index: number, updatedInfo: IExperienceItem) => {
    set(
      produce((state: IExperienceStore) => {
        state.experiences[index] = updatedInfo;
      })
    );
  };

const getExperience = (get: GetState<IExperienceStore>) => (index: number) => {
  return get().experiences[index];
};

const onMoveUp = (set: SetState<IExperienceStore>) => (index: number) => {
  set(
    produce((state: IExperienceStore) => {
      if (index > 0) {
        const currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index - 1];
        state.experiences[index - 1] = currentExperience;
      }
    })
  );
};

const onMoveDown = (set: SetState<IExperienceStore>) => (index: number) => {
  set(
    produce((state: IExperienceStore) => {
      const totalExp = state.experiences.length;
      if (index < totalExp - 1) {
        const currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index + 1];
        state.experiences[index + 1] = currentExperience;
      }
    })
  );
};

export const useExperiences = create<IExperienceStore>(
  persist(
    (set, get) => ({
      experiences: resumeData.work,
      add: addExperience(set),
      get: getExperience(get),
      remove: removeExperience(set),
      reset: setExperience(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateExperience: updateExperience(set),
    }),
    { name: 'experience' }
  )
);
