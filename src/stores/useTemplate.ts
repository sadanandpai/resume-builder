import { create } from 'zustand';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { ITemplate, ITemplateContent } from '@/helpers/constants/index.interface';

interface ITemplateStore {
  availableTemplate: ITemplate;
  activeTemplate: ITemplateContent;
  setTemplate: (template: ITemplateContent) => void;
}

export const useTemplates = create<ITemplateStore>((set) => ({
  availableTemplate: AVAILABLE_TEMPLATES,
  activeTemplate: AVAILABLE_TEMPLATES['modern'],

  setTemplate: (template: ITemplateContent) => {
    localStorage.setItem('selectedTemplateId', template.id);
    set({ activeTemplate: template });
  },
}));
