import dynamic from 'next/dynamic';
import { ITemplate } from './index.interface';
import { ThemeColorIntf } from './index.interface';

export const SYSTEM_COLORS: ThemeColorIntf[] = [
  {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#0019FD',
    secondaryColor: '#22B34B',
    id: 1,
  },
  {
    fontColor: '#FFFFFF',
    backgroundColor: '#9F0808',
    primaryColor: '#000000',
    secondaryColor: '#F1A91E',
    id: 2,
  },
  {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#217503',
    secondaryColor: '#F556E5',
    id: 3,
  },
];

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
export const CUSTOM_THEME_COLOR: ThemeColorIntf = {
  fontColor: '#FFFFFF',
  backgroundColor: '#000000',
  primaryColor: '#0019FD',
  secondaryColor: '#22B34B',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
