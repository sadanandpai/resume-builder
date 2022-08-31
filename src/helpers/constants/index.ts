import dynamic from 'next/dynamic';
import { ITemplate } from './index.interface';
import { ThemeColorIntf } from './index.interface';

export const SYSTEM_COLORS: ThemeColorIntf[] = [
  {
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
    titleColor: '#0019FD',
    highlighterColor: '#22B34B',
    id: 1,
  },
  {
    backgroundColor: '#FFFFFF',
    fontColor: '#9F0808',
    titleColor: '#000000',
    highlighterColor: '#F1A91E',
    id: 2,
  },
  {
    backgroundColor: '#FFFFFF',
    fontColor: '#000000',
    titleColor: '#217503',
    highlighterColor: '#F556E5',
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
  backgroundColor: '#FFFFFF',
  fontColor: '#000000',
  titleColor: '#0019FD',
  highlighterColor: '#22B34B',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
