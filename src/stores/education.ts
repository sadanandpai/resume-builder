import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import { EducationItem, EducationStore, allAcademics } from './education.interface';

const addEducation =
  (set: SetState<EducationStore>) =>
  ({ academyName, degree, grade, startDate, isStudyingHere, endDate, id }: EducationItem) =>
    set(
      produce((state: EducationStore) => {
        state.academics.push({
          academyName,
          degree,
          grade,
          startDate,
          isStudyingHere,
          endDate,
          id,
        });
      })
    );

const removeEducation = (set: SetState<EducationStore>) => (index: number) =>
  set((state) => ({
    academics: state.academics.slice(0, index).concat(state.academics.slice(index + 1)),
  }));

const setEducation = (set: SetState<EducationStore>) => (values: EducationItem[]) => {
  set({
    academics: values,
  });
};

const getEducation = (get: GetState<EducationStore>) => (index: number) => {
  return get().academics[index];
};

const onMoveUp = (set: SetState<EducationStore>) => (index: number) => {
  set(
    produce((state: EducationStore) => {
      if (index > 0) {
        let currentExperience = state.academics[index];
        state.academics[index] = state.academics[index - 1];
        state.academics[index - 1] = currentExperience;
      }
    })
  );
};
const onMoveDown = (set: SetState<EducationStore>) => (index: number) => {
  set(
    produce((state: EducationStore) => {
      const totalExp = state.academics.length;
      if (index < totalExp - 1) {
        let currentExperience = state.academics[index];
        state.academics[index] = state.academics[index + 1];
        state.academics[index + 1] = currentExperience;
      }
    })
  );
};

export const useEducations = create<EducationStore>((set, get) => ({
  academics: allAcademics,
  add: addEducation(set),
  get: getEducation(get),
  remove: removeEducation(set),
  set: setEducation(set),
  onmoveup: onMoveUp(set),
  onmovedown: onMoveDown(set),
}));
