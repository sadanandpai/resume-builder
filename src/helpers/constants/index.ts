import dynamic from 'next/dynamic';
import { IThemeColor, ITemplate } from './index.interface';

export const SYSTEM_COLORS: IThemeColor[] = [
  {
    backgroundColor: 'white',
    fontColor: 'black',
    titleColor: '#1890ff',
    highlighterColor: 'yellowgreen',
    id: 1,
  },
  {
    backgroundColor: 'white',
    fontColor: '#780650',
    titleColor: '#254000',
    highlighterColor: 'burlywood',
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

export const AVAILABLE_TEMPLATES: ITemplate = {
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    component: dynamic(() => import('@/templates/modern/MordernTemplate'), {
      ssr: false,
    }),
  },
  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    component: dynamic(() => import('@/templates/professional/ProfessionalTemplate'), {
      ssr: false,
    }),
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    thumbnail: '',
    component: dynamic(() => import('@/templates/classic/ClassicTemplate'), { ssr: false }),
  },
  'sidebar-left': {
    id: 'sidebar-left',
    name: 'Sidebar Left',
    thumbnail: '',
    component: dynamic(() => import('@/templates/sidebar-left/SidebarLeftTemplate'), {
      ssr: false,
    }),
  },
  'sidebar-right': {
    id: 'sidebar-right',
    name: 'Sidebar Right',
    thumbnail: '',
    component: dynamic(() => import('@/templates/sidebar-right/SidebarRightTemplate'), {
      ssr: false,
    }),
  },
  'header-band': {
    id: 'header-band',
    name: 'Header Band',
    thumbnail: '',
    component: dynamic(() => import('@/templates/header-band/HeaderBandTemplate'), { ssr: false }),
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    thumbnail: '',
    component: dynamic(() => import('@/templates/creative/CreativeTemplate'), { ssr: false }),
  },
  technical: {
    id: 'technical',
    name: 'Technical',
    thumbnail: '',
    component: dynamic(() => import('@/templates/technical/TechnicalTemplate'), { ssr: false }),
  },
  inspired: {
    id: 'inspired',
    name: 'Inspired',
    thumbnail: '',
    component: dynamic(() => import('@/templates/inspired/InspiredTemplate'), { ssr: false }),
  },
  plain: {
    id: 'plain',
    name: 'Plain',
    thumbnail: '',
    component: dynamic(() => import('@/templates/plain/PlainTemplate'), { ssr: false }),
  },
};

export const CUSTOM_THEME_COLOR: IThemeColor = {
  backgroundColor: 'white',
  fontColor: 'black',
  titleColor: 'green',
  highlighterColor: '#ff7875',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
