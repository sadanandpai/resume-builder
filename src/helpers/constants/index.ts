import dynamic from 'next/dynamic';
import { ThemeObject, ThemeIDs, ITemplate } from './index.interface';

export const THEME_IDS: ThemeIDs = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  TERTIARY: 'TERTIARY',
  CUSTOM: 'CUSTOM',
};

export const SYSTEM_THEME_OBJECT: ThemeObject = {
  PRIMARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#0019FD',
    secondaryColor: '#22B34B',
  },
  SECONDARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#9F0808',
    primaryColor: '#000000',
    secondaryColor: '#F1A91E',
  },
  TERTIARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#217503',
    secondaryColor: '#F556E5',
  },
};

export const AVAILABLE_TEMPLATES: ITemplate[] = [
  {
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('src/templates/modern/MordernTemplate'), { ssr: false }),
  },
  {
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('src/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
];

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
