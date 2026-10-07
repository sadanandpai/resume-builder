import dynamic from 'next/dynamic';
import { TEMPLATE_REGISTRY } from '@/templates/designs/registry';
import { IThemeColor, ITemplate } from './index.interface';

export const SYSTEM_COLORS: IThemeColor[] = [
  {
    backgroundColor: 'white',
    fontColor: 'black',
    titleColor: '#1890ff',
    highlighterColor: 'yellowgreen',
    id: 1,
  },
];

/** Built from `src/templates/designs/registry/templates.ts` — add templates there. */
export const AVAILABLE_TEMPLATES: ITemplate = Object.fromEntries(
  Object.entries(TEMPLATE_REGISTRY).map(([key, entry]) => [
    key,
    {
      id: entry.id,
      name: entry.name,
      thumbnail: entry.thumbnail,
      component: dynamic(entry.loadComponent, { ssr: false }),
    },
  ])
) as ITemplate;

export const CUSTOM_THEME_COLOR: IThemeColor = {
  backgroundColor: '#ffffff',
  fontColor: '#1f2937',
  titleColor: '#1e3a5f',
  highlighterColor: '#0f766e',
  id: 4,
};

export const DATE_PICKER_FORMAT = 'DD/MM/YYYY';
