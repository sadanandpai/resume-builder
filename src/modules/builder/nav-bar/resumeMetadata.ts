import { TEMPLATE_REGISTRY } from '@/templates/designs/registry';
import type { IThemeColor } from '@/helpers/constants/index.interface';
import { validateStyles, type StyleSettings } from '@/helpers/resume-style/styles';
import { TEMPLATE_SECTION_TITLES } from '@/helpers/section-layout/sectionTitles';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';

export type ResumeMetadata = {
  version: 1;
  template: { id: string; name: string };
  titles: Record<string, string>;
  layout: Record<string, string[]>;
  colors: { selectedTheme: IThemeColor; customTheme: IThemeColor };
  styles: StyleSettings;
};

export function exportResumeMetadata(): ResumeMetadata {
  useSectionTitleStore.getState().hydrate();
  useResumeStyleStore.getState().hydrate();
  const { id, name } = useTemplates.getState().activeTemplate;
  const { selectedTheme, customTheme } = useThemes.getState();
  return {
    version: 1,
    template: { id, name },
    titles: useSectionTitleStore.getState().titles[id] ?? {},
    layout: useSectionLayoutStore.getState().layouts[id] ?? {},
    colors: { selectedTheme, customTheme },
    styles: useResumeStyleStore.getState().settings,
  };
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid resume metadata');
  }
  return value as Record<string, unknown>;
}

function theme(value: unknown): IThemeColor {
  const source = record(value);
  if (typeof source.id !== 'number' || !Number.isFinite(source.id)) {
    throw new Error('Invalid theme ID');
  }
  const result = { id: source.id } as IThemeColor;
  for (const key of ['backgroundColor', 'fontColor', 'titleColor', 'highlighterColor'] as const) {
    if (
      typeof source[key] !== 'string' ||
      !/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(source[key])
    ) {
      throw new Error('Invalid theme color');
    }
    result[key] = source[key];
  }
  return result;
}

export function normalizeResumeMetadata(input: unknown): ResumeMetadata | undefined {
  if (input === undefined) return undefined;
  const source = record(input);
  const template = record(source.template);
  if (
    source.version !== 1 ||
    typeof template.id !== 'string' ||
    !Object.hasOwn(TEMPLATE_REGISTRY, template.id)
  ) {
    throw new Error('Unsupported resume metadata or template');
  }
  const titles = Object.fromEntries(
    Object.entries(record(source.titles)).map(([key, value]) => {
      if (
        typeof value !== 'string' ||
        !Object.hasOwn(TEMPLATE_SECTION_TITLES[template.id as string] ?? {}, key)
      ) {
        throw new Error('Invalid section title');
      }
      return [key, value];
    })
  );
  const layout = Object.fromEntries(
    Object.entries(record(source.layout)).map(([key, value]) => {
      if (!Array.isArray(value) || !value.every((id) => typeof id === 'string')) {
        throw new Error('Invalid section layout');
      }
      return [key, value as string[]];
    })
  );
  const colors = record(source.colors);
  return {
    version: 1,
    template: { id: template.id, name: TEMPLATE_REGISTRY[template.id].name },
    titles,
    layout,
    colors: { selectedTheme: theme(colors.selectedTheme), customTheme: theme(colors.customTheme) },
    styles: validateStyles(record(source.styles)),
  };
}
