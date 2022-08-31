import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { ITemplate } from 'src/helpers/constants/index.interface';
import create, { SetState, GetState } from 'zustand';

interface ITemplateStore {
  index: number;
  availableTemplate: ITemplate[];
  activeTemplate: ITemplate;
  setTemplate: (id: number) => void;
}

export const useTemplates = create<ITemplateStore>(
  (set: SetState<ITemplateStore>, get: GetState<ITemplateStore>) => ({
    index: 0,
    availableTemplate: AVAILABLE_TEMPLATES,
    activeTemplate: AVAILABLE_TEMPLATES[0],

    setTemplate: (idx: number) => set({ index: idx, activeTemplate: get().availableTemplate[idx] }),
  })
);
