import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useExperiences } from '@/stores/experience';
import { useAwards } from '@/stores/awards';
import { useEducations } from '@/stores/education';
import { useVoluteeringStore } from '@/stores/volunteering';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';
import { EditScrollSection } from './EditScrollSection';

afterEach(() => vi.restoreAllMocks());

describe('Modern editor integration', () => {
  const groups = {
    work: [useExperiences],
    awards: [useAwards],
    education: [useEducations],
    volunteer: [useVoluteeringStore],
    skills: [
      useLanguages,
      useFrameworks,
      useLibraries,
      usePractices,
      useDatabases,
      useTechnologies,
      useTools,
    ],
  };
  it.each(Object.keys(groups) as (keyof typeof groups)[])(
    'scrolls on %s edits and unsubscribes on unmount',
    (source) => {
      const listeners: (() => void)[] = [];
      const cleanups = groups[source].map(
        (store: { subscribe: (listener: () => void) => () => void }) => {
          const cleanup = vi.fn();
          vi.spyOn(store, 'subscribe').mockImplementation((listener) => {
            listeners.push(listener);
            return cleanup;
          });
          return cleanup;
        }
      );
      const { container, unmount } = render(
        <EditScrollSection source={source}>Section</EditScrollSection>
      );
      const scroll = vi.fn();
      container.firstElementChild!.scrollIntoView = scroll;
      listeners.forEach((listener) => listener());
      expect(scroll).toHaveBeenCalledTimes(groups[source].length);
      expect(scroll).toHaveBeenCalledWith({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      unmount();
      cleanups.forEach((cleanup) => expect(cleanup).toHaveBeenCalledOnce());
    }
  );
});
