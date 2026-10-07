import { createContext, useContext, type ReactNode } from 'react';
import Color from 'color';
import { useResumePalette, withAlpha, type ResumePalette } from './resumePalette';

export type Surface = 'page' | 'sidebar' | 'tinted' | 'accentTint';
export type Presentation =
  'standard' | 'underlined' | 'boxed' | 'editorial' | 'technical' | 'stacked';
const SurfaceContext = createContext<ResumePalette | null>(null);
const PresentationContext = createContext<Presentation>('standard');
export const EDITORIAL_FONT = 'Georgia, serif';
export const MONO_FONT = "'SFMono-Regular', Consolas, monospace";

function contrastColor(background: string, preferred: string) {
  try {
    if (Color(background).contrast(Color(preferred)) >= 4.5) return preferred;
    return Color(background).isLight() ? '#111827' : '#ffffff';
  } catch {
    return preferred;
  }
}

export function paletteForSurface(base: ResumePalette, surface: Surface): ResumePalette {
  if (surface === 'page') return base;
  const bg =
    surface === 'sidebar'
      ? base.sidebarBg
      : Color(surface === 'accentTint' ? base.accent : base.primary)
          .mix(Color(base.bg), 1 - (surface === 'accentTint' ? 0.12 : 0.08))
          .hex();
  const text = contrastColor(bg, surface === 'sidebar' ? base.sidebarText : base.text);
  return {
    ...base,
    bg,
    text,
    primary: contrastColor(bg, surface === 'sidebar' ? text : base.primary),
    primaryDark: contrastColor(bg, base.primaryDark),
    accent: contrastColor(bg, base.accent),
    muted: withAlpha(text, 0.72),
    divider: withAlpha(text, 0.22),
  };
}

/** Styling only: the nearest rendered region determines colors, including after a move. */
export function ResumeSurface({
  surface = 'page',
  children,
}: {
  surface?: Surface;
  children: ReactNode;
}) {
  const theme = useResumePalette();
  const parent = useContext(SurfaceContext);
  const palette = paletteForSurface(parent ?? theme, surface);
  return <SurfaceContext.Provider value={palette}>{children}</SurfaceContext.Provider>;
}
export function ResumePresentation({
  value,
  children,
}: {
  value: Presentation;
  children: ReactNode;
}) {
  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
}
export function useSurfacePalette() {
  const theme = useResumePalette();
  return useContext(SurfaceContext) ?? theme;
}
export const usePresentation = () => useContext(PresentationContext);
