import create from 'zustand';
import { ProfessionalTemplate } from 'src/templates/layouts/ProfessionalTemplate';
import { LegacyTemplate } from 'src/templates/layouts/LegacyTemplate';
import { Template3 } from 'src/templates/layouts/Template3';
import { Template4 } from 'src/templates/layouts/Template4';
import { Template5 } from 'src/templates/layouts/Template5';
import { Template6 } from 'src/templates/layouts/Template6';

import ProfessionalImg from 'public/images/professional.png';
import LegacyImg from 'public/images/legacy.png';
import FancyImg from 'public/images/fancy.png';
import NewImg from 'public/images/new.png';

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

export const useZoom = create((set) => ({
  zoom: 0,

  update: (value: number) => {
    const zoomLevel = +value.toFixed(1);

    set((state: any) => {
      if (zoomLevel > 0.5) state.zoom = 0.5;
      else if (zoomLevel < -0.5) state.zoom = -0.5;
      else state.zoom = zoomLevel;
    });
  },
}));
