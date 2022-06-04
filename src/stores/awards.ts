import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { AwardItem, AwardsStore } from './awards.interface';

const addAward =
  (set: SetState<AwardsStore>) =>
  ({ title, awarder, date, summary }: AwardItem) =>
    set(
      produce((state: AwardsStore) => {
        state.awards.push({
          title,
          awarder,
          date,
          summary,
        });
      })
    );

const removeAward = (set: SetState<AwardsStore>) => (index: number) =>
  set((state) => ({
    awards: state.awards.slice(0, index).concat(state.awards.slice(index + 1)),
  }));

const setAllAwards = (set: SetState<AwardsStore>) => (values: AwardItem[]) => {
  set({
    awards: values,
  });
};

const getAllAwards = (get: GetState<AwardsStore>) => (index: number) => {
  return get().awards[index];
};

const onMoveUp = (set: SetState<AwardsStore>) => (index: number) => {
  set(
    produce((state: AwardsStore) => {
      if (index > 0) {
        const currentAward = state.awards[index];
        state.awards[index] = state.awards[index - 1];
        state.awards[index - 1] = currentAward;
      }
    })
  );
};
const onMoveDown = (set: SetState<AwardsStore>) => (index: number) => {
  set(
    produce((state: AwardsStore) => {
      const totalExp = state.awards.length;
      if (index < totalExp - 1) {
        const currentAward = state.awards[index];
        state.awards[index] = state.awards[index + 1];
        state.awards[index + 1] = currentAward;
      }
    })
  );
};

export const useAwards = create<AwardsStore>((set, get) => ({
  awards: resumeData.awards,
  add: addAward(set),
  get: getAllAwards(get),
  remove: removeAward(set),
  set: setAllAwards(set),
  onmoveup: onMoveUp(set),
  onmovedown: onMoveDown(set),
}));
