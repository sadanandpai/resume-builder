'use client';

import type { Theme } from '@emotion/react';
import Color from 'color';
import { useTheme } from '@mui/material/styles';

/** Maps builder colour themes (IThemeColor on MUI Theme) to layout tokens */
export type ResumePalette = {
  primary: string;
  primaryDark: string;
  accent: string;
  text: string;
  muted: string;
  bg: string;
  divider: string;
  sidebarBg: string;
  sidebarText: string;
  headingFont: string;
  bodyFont: string;
};

const stack = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

export function useResumePalette(): ResumePalette {
  const t = useTheme() as Theme;
  const bg = t.backgroundColor ?? '#ffffff';
  const text = t.fontColor ?? '#111827';
  const primary = t.titleColor ?? '#1890ff';
  const accent = t.highlighterColor ?? primary;
  const cText = Color(text);
  let primaryDark = primary;
  try {
    primaryDark = Color(primary).darken(0.15).hex();
  } catch {
    /* keep primary */
  }
  return {
    primary,
    primaryDark,
    accent,
    text,
    muted: cText.alpha(0.62).rgb().string(),
    bg,
    divider: cText.alpha(0.14).rgb().string(),
    sidebarBg: primary,
    sidebarText: '#ffffff',
    headingFont: stack,
    bodyFont: stack,
  };
}

export function mergeResumePalette(
  base: ResumePalette,
  overrides: Partial<ResumePalette>
): ResumePalette {
  return { ...base, ...overrides };
}

export function withAlpha(hexOrRgb: string, alpha: number): string {
  try {
    return Color(hexOrRgb).alpha(alpha).rgb().string();
  } catch {
    return hexOrRgb;
  }
}
