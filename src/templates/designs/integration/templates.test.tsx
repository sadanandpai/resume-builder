import { createContext, type ReactNode } from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResumeData from '@/templates/test-fixtures/resume-data.json';
import { TEMPLATE_REGISTRY } from '@/templates/designs/registry/templates';

const runtime = vi.hoisted(() => ({ regions: {} as Record<string, string[]> }));
vi.mock('@/modules/builder/resume/ResumeLayout', () => ({ StateContext: createContext(null) }));
vi.mock('@/helpers/section-layout', () => ({
  useSectionLayoutRuntime: () => runtime,
  SortableRegion: ({
    regionId,
    items,
    children,
    ...props
  }: {
    regionId: string;
    items: string[];
    children: (id: string) => ReactNode;
  }) => (
    <div {...props} data-testid={`region-${regionId}`}>
      {items.map(children)}
    </div>
  ),
  SortableTemplateSection: ({ id, children }: { id: string; children: ReactNode }) => (
    <div data-testid={`section-${id}`}>{children}</div>
  ),
}));
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { styleVariables } from '@/helpers/resume-style/styles';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';

const coverage: Record<string, Record<string, string[]>> = {
  spotlight: { main: ['work'], sidebar: ['skills', 'methodology', 'tools', 'education', 'awards'] },
  professional: {
    left: ['work', 'involvement', 'achievements'],
    right: [
      'summary',
      'objective',
      'tech_expertise',
      'skills_exposure',
      'methodology',
      'tools',
      'education',
    ],
  },
  modern: {
    left: ['work', 'involvement', 'achievements'],
    right: [
      'summary',
      'objective',
      'tech_expertise',
      'frameworks',
      'skills_exposure',
      'tools',
      'methodology',
      'education',
    ],
  },
  classic: {
    main: [
      'summary',
      'objective',
      'work',
      'involvement',
      'skills',
      'achievements',
      'awards',
      'education',
    ],
  },
};
const markers: Record<string, string> = {
  summary: 'summary-marker',
  objective: 'objective-marker',
  work: 'Company 1',
  volunteer: 'Company XYZ',
  awards: 'Certificate of exceptional bug finder',
  education: 'MIT, University',
  skills: 'JavaScript',
  tools: 'Git',
  involvement: 'projects-marker',
  achievements: 'achievements-marker',
  tech_expertise: 'JavaScript',
  frameworks: 'React',
  skills_exposure: 'Firebase',
  methodology: 'Agile methodology',
};
const data = {
  ...ResumeData,
  basics: { ...ResumeData.basics, summary: 'summary-marker', objective: 'objective-marker' },
  activities: { involvements: 'projects-marker', achievements: 'achievements-marker' },
};
const theme = createTheme();
Object.assign(theme, {
  backgroundColor: '#ffffff',
  fontColor: '#111111',
  titleColor: '#123456',
  highlighterColor: '#123456',
});

describe('template coverage and destination placement', () => {
  it('exposes only the four supported designs', () => {
    expect(Object.keys(TEMPLATE_REGISTRY).sort()).toEqual([
      'classic',
      'modern',
      'professional',
      'spotlight',
    ]);
  });
  for (const [id, defaults] of Object.entries(coverage)) {
    const entry = TEMPLATE_REGISTRY[id];
    it(`${id} preserves its persisted defaults and renders all default sections`, async () => {
      expect(entry.sectionLayout.defaults).toEqual(defaults);
      expect(entry.sectionRules.map((rule) => rule.sectionId).sort()).toEqual(
        Object.values(defaults).flat().sort()
      );
      runtime.regions = defaults;
      const { default: Template } = await entry.loadComponent();
      render(
        <StateContext.Provider value={data}>
          <ThemeProvider theme={theme}>
            <Template />
          </ThemeProvider>
        </StateContext.Provider>
      );
      for (const [region, ids] of Object.entries(defaults)) {
        for (const sectionId of ids) {
          const section = within(screen.getByTestId(`region-${region}`)).getByTestId(
            `section-${sectionId}`
          );
          expect(section).toHaveTextContent(markers[sectionId]);
        }
      }
    });
    for (const destination of Object.keys(defaults)) {
      it(`${id} renders every supported section moved into ${destination}`, async () => {
        const ids = Object.values(defaults).flat().reverse();
        runtime.regions = Object.fromEntries(
          Object.keys(defaults).map((region) => [region, region === destination ? ids : []])
        );
        const { default: Template } = await entry.loadComponent();
        render(
          <StateContext.Provider value={data}>
            <ThemeProvider theme={theme}>
              <Template />
            </ThemeProvider>
          </StateContext.Provider>
        );
        const target = screen.getByTestId(`region-${destination}`);
        for (const sectionId of ids) {
          const section = within(target).getByTestId(`section-${sectionId}`);
          expect(section).toHaveTextContent(markers[sectionId]);
        }
        expect([...target.children].map((child) => child.getAttribute('data-testid'))).toEqual(
          ids.map((sectionId) => `section-${sectionId}`)
        );
      });
    }
  }
  it('shows tools-only Classic skills', async () => {
    const skills = Object.fromEntries(Object.keys(data.skills).map((key) => [key, []]));
    for (const [id, sectionId, key, marker] of [['classic', 'skills', 'tools', 'Git']]) {
      const only = {
        ...data,
        skills: { ...skills, [key]: data.skills[key as keyof typeof data.skills] },
      };
      expect(
        TEMPLATE_REGISTRY[id].sectionRules.find((rule) => rule.sectionId === sectionId)?.when(only)
      ).toBe(true);
      const regions = TEMPLATE_REGISTRY[id].sectionLayout.regionKeys;
      runtime.regions = Object.fromEntries(
        regions.map((region, index) => [region, index === 0 ? [sectionId] : []])
      );
      const { default: Template } = await TEMPLATE_REGISTRY[id].loadComponent();
      const view = render(
        <StateContext.Provider value={only}>
          <ThemeProvider theme={theme}>
            <Template />
          </ThemeProvider>
        </StateContext.Provider>
      );
      expect(screen.getByTestId(`section-${sectionId}`)).toHaveTextContent(marker);
      view.unmount();
    }
  });
});

describe('template style integration', () => {
  beforeEach(() =>
    useResumeStyleStore.setState({ settings: {}, past: [], future: [], baseline: null })
  );
  for (const [id, entry] of Object.entries(TEMPLATE_REGISTRY)) {
    it(`${id} retains fallback styles and accepts the same global settings`, async () => {
      runtime.regions = entry.sectionLayout.defaults;
      const { default: Template } = await entry.loadComponent();
      const view = render(
        <StateContext.Provider value={data}>
          <ThemeProvider theme={theme}>
            <div data-testid="styles" style={styleVariables({})}>
              <Template />
            </div>
          </ThemeProvider>
        </StateContext.Provider>
      );
      const wrapper = screen.getByTestId('styles');
      expect(wrapper.style.getPropertyValue('--resume-body')).toBe('');
      expect(wrapper.querySelector('[style*="--resume-padding"]')).not.toBeNull();
      const settings = {
        typography: { body: 14, heading: 18, name: 35, family: 'mono' as const },
        contentPadding: { top: 5, right: 8, bottom: 10, left: 12 },
        spacing: { section: 9, entry: 7, column: 12 },
        secondaryColumnPercent: 25,
      };
      useResumeStyleStore.setState({ settings });
      view.rerender(
        <StateContext.Provider value={data}>
          <ThemeProvider theme={theme}>
            <div data-testid="styles" style={styleVariables(settings)}>
              <Template />
            </div>
          </ThemeProvider>
        </StateContext.Provider>
      );
      expect(wrapper.style.getPropertyValue('--resume-body')).toBe('14px');
      expect(wrapper.style.getPropertyValue('--resume-padding')).toBe('5px 8px 10px 12px');
      expect(wrapper.querySelector('[style*="--resume-name"]')).not.toBeNull();
      expect(wrapper.querySelector('[style*="--resume-heading"]')).not.toBeNull();
      if (entry.style.secondaryColumnPercent !== undefined)
        expect(wrapper.querySelector('[style*="25fr"]')).not.toBeNull();
      expect(useResumeStyleStore.getState().settings).toEqual(settings);
    });
  }
});

describe('Classic page fitting', () => {
  it('fits overflowing content and restores full size after content shrinks', async () => {
    let measure: () => void = () => {};
    let contentHeight = 1600;
    const height = vi
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockImplementation(() => contentHeight);
    const available = vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(1000);
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          measure = callback;
        }
        observe() {}
        disconnect() {}
      }
    );
    try {
      runtime.regions = TEMPLATE_REGISTRY.classic.sectionLayout.defaults;
      const { default: Template } = await TEMPLATE_REGISTRY.classic.loadComponent();
      const view = render(
        <StateContext.Provider value={data}>
          <ThemeProvider theme={theme}>
            <div className="resume-page-content">
              <Template />
            </div>
          </ThemeProvider>
        </StateContext.Provider>
      );
      const paper = view.container.querySelector('[style*="transform-origin"]') as HTMLElement;
      const scale = Number(paper.style.transform.slice(6, -1));
      expect(scale).toBeCloseTo(0.624375, 4);
      expect(parseFloat(paper.style.width) * scale).toBeCloseTo(100, 4);
      expect(parseFloat(paper.parentElement!.style.height)).toBeLessThanOrEqual(999);
      contentHeight = 800;
      act(() => measure());
      expect(paper.style.transform).toBe('scale(1)');
      expect(paper.parentElement?.style.height).toBe('800px');
      view.unmount();
    } finally {
      height.mockRestore();
      available.mockRestore();
      vi.unstubAllGlobals();
    }
  });
});
