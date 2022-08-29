import create, { SetState, GetState } from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware';
import resumeData from 'src/helpers/constants/resume-data.json';
import { VolunteeringItem, VolunteeringStore } from './volunteering.interface';

const addVolunteering =
  (set: SetState<VolunteeringStore>) =>
  ({
    organization,
    position,
    startDate,
    isVolunteeringNow,
    endDate,
    summary,
    id,
    url = '',
    highlights = [],
  }: VolunteeringItem) =>
    set(
      produce((state: VolunteeringStore) => {
        state.volunteeredExps.push({
          id,
          organization,
          position,
          startDate,
          isVolunteeringNow,
          endDate,
          summary,
          url,
          highlights,
        });
      })
    );

const removeVolunteeringExp = (set: SetState<VolunteeringStore>) => (index: number) =>
  set((state) => ({
    volunteeredExps: state.volunteeredExps
      .slice(0, index)
      .concat(state.volunteeredExps.slice(index + 1)),
  }));

const setVolunteeringExps = (set: SetState<VolunteeringStore>) => (values: VolunteeringItem[]) => {
  set({
    volunteeredExps: values,
  });
};

const updatedVolunteeringExp =
  (set: SetState<VolunteeringStore>) => (index: number, updatedInfo: VolunteeringItem) => {
    set(
      produce((state: VolunteeringStore) => {
        state.volunteeredExps[index] = updatedInfo;
      })
    );
  };

const getVolunteeringExp = (get: GetState<VolunteeringStore>) => (index: number) => {
  return get().volunteeredExps[index];
};

const onMoveUp = (set: SetState<VolunteeringStore>) => (index: number) => {
  set(
    produce((state: VolunteeringStore) => {
      if (index > 0) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index - 1];
        state.volunteeredExps[index - 1] = currentExperience;
      }
    })
  );
};

const onMoveDown = (set: SetState<VolunteeringStore>) => (index: number) => {
  set(
    produce((state: VolunteeringStore) => {
      const totalExp = state.volunteeredExps.length;
      if (index < totalExp - 1) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index + 1];
        state.volunteeredExps[index + 1] = currentExperience;
      }
    })
  );
};

export const useVoluteeringStore = create<VolunteeringStore>(
  devtools((set, get) => ({
    volunteeredExps: resumeData.volunteer,
    add: addVolunteering(set),
    get: getVolunteeringExp(get),
    remove: removeVolunteeringExp(set),
    reset: setVolunteeringExps(set),
    onmoveup: onMoveUp(set),
    onmovedown: onMoveDown(set),
    updatedVolunteeringExp: updatedVolunteeringExp(set),
  }))
);
