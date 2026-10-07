import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useResumeStyleStore as store } from './useResumeStyleStore';
import { columns, styleVariables, validateStyles } from '@/helpers/resume-style/styles';

beforeEach(() => {
  localStorage.clear();
  store.setState({ settings: {}, past: [], future: [], baseline: null, hydrated: false });
});
describe('global resume styling', () => {
  it('starts with no rendering overrides', () => {
    expect(styleVariables(store.getState().settings)).toEqual({});
  });
  it('validates bounds and rejects non-finite and unknown fields', () => {
    expect(
      validateStyles({
        typography: { body: 99, name: NaN, family: 'evil', unknown: 1 },
        spacing: { section: -8, entry: Infinity },
        secondaryColumnPercent: 1,
        extra: true,
      })
    ).toEqual({ typography: { body: 16 }, spacing: { section: 0 }, secondaryColumnPercent: 20 });
    expect(validateStyles({ pageMargins: { top: 2, right: 2, bottom: 'bad', left: 2 } })).toEqual(
      {}
    );
  });
  it('keeps live drags out of storage and groups them into one undo step', () => {
    const write = vi.spyOn(Storage.prototype, 'setItem');
    for (let i = 9; i <= 16; i++) store.getState().preview({ typography: { body: i } });
    expect(write).not.toHaveBeenCalled();
    store.getState().commit();
    expect(store.getState().past).toHaveLength(1);
    store.getState().undo();
    expect(store.getState().settings).toEqual({});
    store.getState().redo();
    expect(store.getState().settings.typography?.body).toBe(16);
    store.getState().commit({ typography: { body: 12 } });
    expect(store.getState().future).toEqual([]);
    write.mockRestore();
  });
  it('persists only versioned settings, hydrates safely and limits history', () => {
    for (let i = 0; i < 60; i++) store.getState().commit({ spacing: { section: i % 40 } });
    expect(store.getState().past).toHaveLength(50);
    expect(Object.keys(JSON.parse(localStorage.getItem('resumeStyles')!))).toEqual([
      'version',
      'settings',
    ]);
    store.setState({ settings: {}, hydrated: false });
    store.getState().hydrate();
    expect(store.getState().settings.spacing?.section).toBe(19);
    localStorage.setItem('resumeStyles', 'invalid');
    store.setState({ hydrated: false });
    store.getState().hydrate();
    expect(store.getState().settings).toEqual({});
    localStorage.setItem(
      'resumeStyles',
      JSON.stringify({ version: 99, settings: { density: 'compact' } })
    );
    store.setState({ hydrated: false });
    store.getState().hydrate();
    expect(store.getState().settings).toEqual({});
  });
  it('presets are relative, idempotent, and preserve unrelated styles', () => {
    store.getState().commit({
      contentPadding: { top: 10, right: 10, bottom: 10, left: 10 },
      typography: { family: 'serif', body: 12, lineHeight: 1.8 },
      spacing: { section: 25 },
    });
    store.getState().preset('compact');
    const settings = store.getState().settings;
    store.getState().preset('compact');
    expect(store.getState().settings).toEqual(settings);
    expect(settings.spacing).toBeUndefined();
    expect(settings.typography).toEqual({ family: 'serif', body: 12 });
    store.getState().preset('balanced');
    expect(store.getState().settings.density).toBeUndefined();
    store.getState().resetGroup('typography');
    expect(store.getState().settings.typography).toBeUndefined();
    expect(store.getState().settings.contentPadding).toBeDefined();
    store.getState().reset();
    expect(store.getState().settings).toEqual({});
    store.getState().undo();
    expect(store.getState().settings.contentPadding).toBeDefined();
  });
  it('computes tracks over the remaining space and retains defaults', () => {
    expect(columns('original', false)).toBe('var(--resume-column-tracks, original)');
    expect(columns('original', true, 30)).toBe('minmax(0, 30fr) minmax(0, 70fr)');
    expect(columns('original', false, 30)).toBe('minmax(0, 70fr) minmax(0, 30fr)');
  });
});
