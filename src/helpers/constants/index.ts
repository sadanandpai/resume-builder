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
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '',
    component: dynamic(() => import('@/templates/minimal/MinimalTemplate'), { ssr: false }),
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    thumbnail: '',
    component: dynamic(() => import('@/templates/timeline/TimelineTemplate'), { ssr: false }),
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    thumbnail: '',
    component: dynamic(() => import('@/templates/compact/CompactTemplate'), { ssr: false }),
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    thumbnail: '',
    component: dynamic(() => import('@/templates/executive/ExecutiveTemplate'), { ssr: false }),
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
  playful: {
    id: 'playful',
    name: 'Playful',
    thumbnail: '',
    component: dynamic(() => import('@/templates/playful/PlayfulTemplate'), { ssr: false }),
  },
  artistic: {
    id: 'artistic',
    name: 'Artistic',
    thumbnail: '',
    component: dynamic(() => import('@/templates/artistic/ArtisticTemplate'), { ssr: false }),
  },
  inspired: {
    id: 'inspired',
    name: 'Inspired',
    thumbnail: '',
    component: dynamic(() => import('@/templates/inspired/InspiredTemplate'), { ssr: false }),
  },
  versatile: {
    id: 'versatile',
    name: 'Versatile',
    thumbnail: '',
    component: dynamic(() => import('@/templates/versatile/VersatileTemplate'), { ssr: false }),
  },
  straightforward: {
    id: 'straightforward',
    name: 'Straightforward',
    thumbnail: '',
    component: dynamic(() => import('@/templates/straightforward/StraightforwardTemplate'), {
      ssr: false,
    }),
  },
  accessible: {
    id: 'accessible',
    name: 'Accessible',
    thumbnail: '',
    component: dynamic(() => import('@/templates/accessible/AccessibleTemplate'), { ssr: false }),
  },
  plain: {
    id: 'plain',
    name: 'Plain',
    thumbnail: '',
    component: dynamic(() => import('@/templates/plain/PlainTemplate'), { ssr: false }),
  },
  instinctive: {
    id: 'instinctive',
    name: 'Instinctive',
    thumbnail: '',
    component: dynamic(() => import('@/templates/instinctive/InstinctiveTemplate'), { ssr: false }),
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant',
    thumbnail: '',
    component: dynamic(() => import('@/templates/elegant/ElegantTemplate'), { ssr: false }),
  },
  modernized: {
    id: 'modernized',
    name: 'Modernized',
    thumbnail: '',
    component: dynamic(() => import('@/templates/modernized/ModernizedTemplate'), { ssr: false }),
  },
  sleek: {
    id: 'sleek',
    name: 'Sleek',
    thumbnail: '',
    component: dynamic(() => import('@/templates/sleek/SleekTemplate'), { ssr: false }),
  },
  classy: {
    id: 'classy',
    name: 'Classy',
    thumbnail: '',
    component: dynamic(() => import('@/templates/classy/ClassyTemplate'), { ssr: false }),
  },
  distinguished: {
    id: 'distinguished',
    name: 'Distinguished',
    thumbnail: '',
    component: dynamic(() => import('@/templates/distinguished/DistinguishedTemplate'), {
      ssr: false,
    }),
  },
  expressive: {
    id: 'expressive',
    name: 'Expressive',
    thumbnail: '',
    component: dynamic(() => import('@/templates/expressive/ExpressiveTemplate'), { ssr: false }),
  },
  'simple-ats': {
    id: 'simple-ats',
    name: 'Simple ATS',
    thumbnail: '',
    component: dynamic(() => import('@/templates/simple-ats/SimpleAtsTemplate'), { ssr: false }),
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate',
    thumbnail: '',
    component: dynamic(() => import('@/templates/corporate/CorporateTemplate'), { ssr: false }),
  },
  'split-header': {
    id: 'split-header',
    name: 'Split Header',
    thumbnail: '',
    component: dynamic(() => import('@/templates/split-header/SplitHeaderTemplate'), {
      ssr: false,
    }),
  },
  'precision-ats': {
    id: 'precision-ats',
    name: 'Precision ATS',
    thumbnail: '',
    component: dynamic(() => import('@/templates/precision-ats/PrecisionAtsTemplate'), {
      ssr: false,
    }),
  },
  'asymmetric-ats': {
    id: 'asymmetric-ats',
    name: 'Asymmetric ATS',
    thumbnail: '',
    component: dynamic(() => import('@/templates/asymmetric-ats/AsymmetricAtsTemplate'), {
      ssr: false,
    }),
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced',
    thumbnail: '',
    component: dynamic(() => import('@/templates/balanced/BalancedTemplate'), { ssr: false }),
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
