import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { ITemplate, ITemplateContent } from 'src/helpers/constants/index.interface';
import create from 'zustand';

interface ITemplateStore {
  availableTemplate: ITemplate;
  activeTemplate: ITemplateContent | null;
  setTemplate: (template: ITemplateContent) => void;
}

export const useTemplates = create<ITemplateStore>((set) => ({
  availableTemplate: AVAILABLE_TEMPLATES,
  activeTemplate: null,

  setTemplate: (template: ITemplateContent) => {
    localStorage.setItem('selectedTemplateId', template.id);
    set({ activeTemplate: template });
  },
}));
