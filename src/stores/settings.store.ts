import create from 'zustand';
import { ProfessionalTemplate } from 'src/templates/layouts/ProfessionalTemplate';
import { LegacyTemplate } from 'src/templates/layouts/LegacyTemplate';
import { Template3 } from 'src/templates/layouts/Template3';
import { Template4 } from 'src/templates/layouts/Template4';
import { Template5 } from 'src/templates/layouts/Template5';
import { Template6 } from 'src/templates/layouts/Template6';

import ProfessionalImg from 'src/assets/images/professional.jpg';
import LegacyImg from 'src/assets/images/legacy.jpg';
import FancyImg from 'src/assets/images/fancy.png';
import NewImg from 'src/assets/images/new.png';

export const templates = [
  ProfessionalTemplate,
  LegacyTemplate,
  Template3,
  Template4,
  Template5,
  Template6,
];
export const templatesSrc = [ProfessionalImg, LegacyImg, FancyImg, NewImg, NewImg, NewImg];
export const templatesName = [
  'Professional',
  'legacy',
  'template3',
  'template4',
  'template5',
  'template6',
];

export const useTemplates = create((set) => ({
  index: 0,
  template: templates[0],

  setTemplate: (index: number) => set({ index, template: templates[index] }),
}));

export const useItems = create((set) => ({
  isPhotoDisplayed: true,

  setIsPhotoDisplayed: (isPhotoDisplayed: boolean) => set({ isPhotoDisplayed }),
}));
