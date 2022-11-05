import create, { SetState, GetState } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IEducationItem, IEducationStore } from './education.interface';

const addEducation =
  (set: SetState<IEducationStore>) =>
  ({
    institution,
    studyType,
    area,
    startDate,
    isStudyingHere,
    endDate,
    id,
    url,
    score,
    courses,
  }: IEducationItem) =>
    set(
      produce((state: IEducationStore) => {
        state.academics.push({
          institution,
          studyType,
          area,
          startDate,
          isStudyingHere,
          endDate,
          id,
          url,
          courses,
          score,
        });
      })
    );

const removeEducation = (set: SetState<IEducationStore>) => (index: number) =>
  set((state) => ({
    academics: state.academics.slice(0, index).concat(state.academics.slice(index + 1)),
  }));

const setEducation = (set: SetState<IEducationStore>) => (values: IEducationItem[]) => {
  set({
    academics: values,
  });
};

const getEducation = (get: GetState<IEducationStore>) => (index: number) => {
  return get().academics[index];
};

const onMoveUp = (set: SetState<IEducationStore>) => (index: number) => {
  set(
    produce((state: IEducationStore) => {
      if (index > 0) {
        const currentExperience = state.academics[index];
        state.academics[index] = state.academics[index - 1];
        state.academics[index - 1] = currentExperience;
      }
    })
  );
};
const onMoveDown = (set: SetState<IEducationStore>) => (index: number) => {
  set(
    produce((state: IEducationStore) => {
      const totalExp = state.academics.length;
      if (index < totalExp - 1) {
        const currentExperience = state.academics[index];
        state.academics[index] = state.academics[index + 1];
        state.academics[index + 1] = currentExperience;
      }
    })
  );
};

const updateEducation =
  (set: SetState<IEducationStore>) => (index: number, updatedInfo: IEducationItem) => {
    set(
      produce((state: IEducationStore) => {
        state.academics[index] = updatedInfo;
      })
    );
  };

export const useEducations = create<IEducationStore>(
  persist(
    (set, get) => ({
      academics: resumeData.education,
      add: addEducation(set),
      get: getEducation(get),
      remove: removeEducation(set),
      reset: setEducation(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateEducation: updateEducation(set),
    }),
    { name: 'education' }
  )
);
