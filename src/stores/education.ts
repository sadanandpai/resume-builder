import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { EducationItem, EducationStore } from './education.interface';

const addEducation =
  (set: SetState<EducationStore>) =>
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
  }: EducationItem) =>
    set(
      produce((state: EducationStore) => {
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
        const currentExperience = state.academics[index];
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
        const currentExperience = state.academics[index];
        state.academics[index] = state.academics[index + 1];
        state.academics[index + 1] = currentExperience;
      }
    })
  );
};

const updateEducation =
  (set: SetState<EducationStore>) => (index: number, updatedInfo: EducationItem) => {
    set(
      produce((state: EducationStore) => {
        state.academics[index] = updatedInfo;
      })
    );
  };

export const useEducations = create<EducationStore>((set, get) => ({
  academics: resumeData.education,
  add: addEducation(set),
  get: getEducation(get),
  remove: removeEducation(set),
  set: setEducation(set),
  onmoveup: onMoveUp(set),
  onmovedown: onMoveDown(set),
  updateEducation: updateEducation(set),
}));
