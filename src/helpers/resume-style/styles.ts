import type { CSSProperties } from 'react';

export const bounds = {
  margin: [0, 25, 0.5],
  padding: [0, 48, 1],
  section: [0, 40, 1],
  entry: [0, 40, 1],
  column: [0, 40, 1],
  body: [9, 16, 0.5],
  heading: [10, 22, 0.5],
  name: [18, 40, 1],
  lineHeight: [1.1, 1.8, 0.05],
  secondaryColumnPercent: [20, 50, 1],
} as const;
export type Sides = { top: number; right: number; bottom: number; left: number };
export type StyleSettings = {
  pageMargins?: Sides;
  contentPadding?: Sides;
  spacing?: { section?: number; entry?: number; column?: number };
  typography?: {
    family?: 'sans' | 'serif' | 'mono';
    body?: number;
    heading?: number;
    name?: number;
    lineHeight?: number;
  };
  secondaryColumnPercent?: number;
  density?: 'compact' | 'spacious';
};
export type StyleGroup = keyof StyleSettings;
export function normalize(value: unknown, key: keyof typeof bounds) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  const [min, max] = bounds[key];
  return Math.min(max, Math.max(min, value));
}
export function validateStyles(input: unknown): StyleSettings {
  if (!input || typeof input !== 'object') return {};
  const v = input as Record<string, unknown>;
  const result: StyleSettings = {};
  for (const group of ['pageMargins', 'contentPadding'] as const) {
    const sides = v[group] as Record<string, unknown> | undefined;
    if (sides && typeof sides === 'object') {
      const values = ['top', 'right', 'bottom', 'left'].map((side) =>
        normalize(sides[side], group === 'pageMargins' ? 'margin' : 'padding')
      );
      if (values.every((n) => n !== undefined))
        result[group] = Object.fromEntries(
          ['top', 'right', 'bottom', 'left'].map((side, i) => [side, values[i]])
        ) as Sides;
    }
  }
  for (const group of ['spacing', 'typography'] as const) {
    const source = v[group] as Record<string, unknown> | undefined;
    if (!source || typeof source !== 'object') continue;
    const fields =
      group === 'spacing'
        ? ['section', 'entry', 'column']
        : ['body', 'heading', 'name', 'lineHeight'];
    const resolved: Record<string, unknown> = {};
    for (const field of fields) {
      const n = normalize(source[field], field as keyof typeof bounds);
      if (n !== undefined) resolved[field] = n;
    }
    if (group === 'typography' && ['sans', 'serif', 'mono'].includes(String(source.family)))
      resolved.family = source.family;
    if (Object.keys(resolved).length) result[group] = resolved;
  }
  const width = normalize(v.secondaryColumnPercent, 'secondaryColumnPercent');
  if (width !== undefined) result.secondaryColumnPercent = width;
  if (v.density === 'compact' || v.density === 'spacious') result.density = v.density;
  return result;
}
export const fontFamilies = {
  sans: 'Arial, Helvetica, sans-serif',
  serif: 'Georgia, Times New Roman, serif',
  mono: 'Courier New, monospace',
};
export const font = (original: string) => `var(--resume-font, ${original})`;
export const bodySize = (original: number) => `calc(var(--resume-body, 11px) * ${original / 11})`;
export const roleSize = (role: 'heading' | 'name', original: number) =>
  `var(--resume-${role}, ${original}px)`;
export const lineHeight = (original: number) =>
  `clamp(1.1, var(--resume-line-height, calc(${original} * var(--resume-line-factor, 1))), 1.8)`;
export const spacing = (role: 'section' | 'entry' | 'column', original: number) =>
  `clamp(0px, var(--resume-${role}, calc(${original}px * var(--resume-density, 1))), 40px)`;
export const padding = (original: CSSProperties['padding']) =>
  `var(--resume-padding, ${typeof original === 'number' ? `${original}px` : original})`;
export const sideString = (sides: Sides, unit: string) =>
  `${sides.top}${unit} ${sides.right}${unit} ${sides.bottom}${unit} ${sides.left}${unit}`;
export function styleVariables(s: StyleSettings): CSSProperties {
  const vars: Record<string, string | number> = {};
  if (s.contentPadding) vars['--resume-padding'] = sideString(s.contentPadding, 'px');
  if (s.typography?.family) vars['--resume-font'] = fontFamilies[s.typography.family];
  for (const key of ['body', 'heading', 'name'] as const)
    if (s.typography?.[key] !== undefined) vars[`--resume-${key}`] = `${s.typography[key]}px`;
  if (s.typography?.lineHeight !== undefined)
    vars['--resume-line-height'] = s.typography.lineHeight;
  for (const key of ['section', 'entry', 'column'] as const)
    if (s.spacing?.[key] !== undefined) vars[`--resume-${key}`] = `${s.spacing[key]}px`;
  if (s.density) {
    vars['--resume-density'] = s.density === 'compact' ? 0.8 : 1.2;
    vars['--resume-line-factor'] = s.density === 'compact' ? 0.95 : 1.05;
  }
  return vars as CSSProperties;
}
export function columns(original: string, secondaryLeft: boolean, percent?: number) {
  if (percent === undefined) return `var(--resume-column-tracks, ${original})`;
  const secondary = `minmax(0, ${percent}fr)`;
  const main = `minmax(0, ${100 - percent}fr)`;
  return secondaryLeft ? `${secondary} ${main}` : `${main} ${secondary}`;
}
