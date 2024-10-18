import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SetState } from './store.interface';
import { IBasicDetailsItem, IBasicDetailsStore } from './basic.interface';
import resumeData from '@/helpers/constants/resume-data.json';

const onChangeText = (set: SetState<IBasicDetailsStore>) => (values: IBasicDetailsItem) =>
  set({ values });

export const useBasicDetails = create<IBasicDetailsStore>()(
  persist(
    (set) => ({
      values: resumeData.basics,
      reset: onChangeText(set),
    }),
    { name: 'basic' }
  )
);
