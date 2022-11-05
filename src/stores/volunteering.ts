import create, { SetState, GetState } from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from 'src/helpers/constants/resume-data.json';
import { IVolunteeringItem, IVolunteeringStore } from './volunteering.interface';

const addVolunteering =
  (set: SetState<IVolunteeringStore>) =>
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
  }: IVolunteeringItem) =>
    set(
      produce((state: IVolunteeringStore) => {
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

const removeVolunteeringExp = (set: SetState<IVolunteeringStore>) => (index: number) =>
  set((state) => ({
    volunteeredExps: state.volunteeredExps
      .slice(0, index)
      .concat(state.volunteeredExps.slice(index + 1)),
  }));

const setVolunteeringExps =
  (set: SetState<IVolunteeringStore>) => (values: IVolunteeringItem[]) => {
    set({
      volunteeredExps: values,
    });
  };

const updatedVolunteeringExp =
  (set: SetState<IVolunteeringStore>) => (index: number, updatedInfo: IVolunteeringItem) => {
    set(
      produce((state: IVolunteeringStore) => {
        state.volunteeredExps[index] = updatedInfo;
      })
    );
  };

const getVolunteeringExp = (get: GetState<IVolunteeringStore>) => (index: number) => {
  return get().volunteeredExps[index];
};

const onMoveUp = (set: SetState<IVolunteeringStore>) => (index: number) => {
  set(
    produce((state: IVolunteeringStore) => {
      if (index > 0) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index - 1];
        state.volunteeredExps[index - 1] = currentExperience;
      }
    })
  );
};

const onMoveDown = (set: SetState<IVolunteeringStore>) => (index: number) => {
  set(
    produce((state: IVolunteeringStore) => {
      const totalExp = state.volunteeredExps.length;
      if (index < totalExp - 1) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index + 1];
        state.volunteeredExps[index + 1] = currentExperience;
      }
    })
  );
};

export const useVoluteeringStore = create<IVolunteeringStore>(
  persist(
    (set, get) => ({
      volunteeredExps: resumeData.volunteer,
      add: addVolunteering(set),
      get: getVolunteeringExp(get),
      remove: removeVolunteeringExp(set),
      reset: setVolunteeringExps(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updatedVolunteeringExp: updatedVolunteeringExp(set),
    }),
    { name: 'volunteering' }
  )
);
