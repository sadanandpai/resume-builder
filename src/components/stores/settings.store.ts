import create from "zustand";
import { ProfessionalTemplate } from "../../resume-templates/layouts/ProfessionalTemplate";
import { LegacyTemplate } from "../../resume-templates/layouts/LegacyTemplate";

const templates = [
  ProfessionalTemplate,
  LegacyTemplate
];

export const useTemplates = create((set) => ({
  template: templates[0],

  setTemplate: (index: number) => set({ template: templates[index]})
}));

export const useItems = create((set) => ({
  isPhotoDisplayed: true,

  setIsPhotoDisplayed: (isPhotoDisplayed: boolean) => set({ isPhotoDisplayed})
}));