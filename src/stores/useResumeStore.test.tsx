import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  useLanguages,
  useFrameworks,
  useTechnologies,
  useLibraries,
  useDatabases,
  usePractices,
  useTools,
} from './skills';
import { useResumeStore } from './useResumeStore';

const categories = [
  ['languages', useLanguages],
  ['frameworks', useFrameworks],
  ['technologies', useTechnologies],
  ['libraries', useLibraries],
  ['databases', useDatabases],
  ['practices', usePractices],
  ['tools', useTools],
] as const;

afterEach(() => {
  act(() => categories.forEach(([, store]) => store.getState().setIsEnabled(true)));
  localStorage.clear();
});

describe('resume skill visibility', () => {
  it.each(categories)('keeps %s stable when hidden and restores it when enabled', (key, store) => {
    const values = store.getState().values;
    const { result, rerender } = renderHook(() => useResumeStore());
    expect(result.current.skills[key]).toBe(values);

    act(() => store.getState().setIsEnabled(false));
    expect(result.current.skills[key]).toEqual([]);
    const hiddenResume = result.current;
    rerender();
    expect(result.current).toBe(hiddenResume);

    act(() => store.getState().setIsEnabled(true));
    expect(result.current.skills[key]).toBe(values);
  });

  it('renders with a persisted hidden category', async () => {
    localStorage.setItem(
      'languages',
      JSON.stringify({
        state: { values: useLanguages.getState().values, isEnabled: false },
        version: 0,
      })
    );
    await act(async () => {
      await useLanguages.persist.rehydrate();
    });
    const { result, rerender } = renderHook(() => useResumeStore());
    expect(result.current.skills.languages).toEqual([]);
    const snapshot = result.current;
    rerender();
    expect(result.current).toBe(snapshot);
  });
});
