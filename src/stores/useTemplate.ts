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
    try {
      localStorage.setItem('selectedTemplateId', template.id);
    } catch {
      // Template selection still works when browser storage is unavailable.
    }
    set({ activeTemplate: template });
  },
}));

export function restoreSavedTemplate(): void {
  let savedId: string | null = null;
  try {
    savedId = localStorage.getItem('selectedTemplateId');
  } catch {
    // Use the default when storage access is blocked.
  }
  const template =
    savedId && Object.hasOwn(AVAILABLE_TEMPLATES, savedId)
      ? AVAILABLE_TEMPLATES[savedId]
      : AVAILABLE_TEMPLATES.modern;
  useTemplates.getState().setTemplate(template);
}
