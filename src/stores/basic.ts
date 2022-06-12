import create, { SetState } from 'zustand';
import resumeData from 'src/helpers/constants/resume-data.json';
import { BasicDetailsItem, BasicDetailsStore } from './basic.interface';

const onChangeText = (set: SetState<BasicDetailsStore>) => (values: BasicDetailsItem) =>
  set({ values });

export const useBasicDetails = create<BasicDetailsStore>((set) => ({
  values: resumeData.basics,
  set: onChangeText(set),
}));
