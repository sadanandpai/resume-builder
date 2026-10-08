import { afterEach, describe, expect, it, vi } from 'vitest';
import sample from '@/helpers/constants/resume-data.json';
import { useBasicDetails } from '@/stores/basic';
import { useExperiences } from '@/stores/experience';
import { applyImportedResumeJson } from './applyImportedResume';
import { normalizeImportedResume } from './normalizeImportedResume';
import { fetchAndApplyResumeFromUrl } from './fetchResumeFromUrl';

afterEach(() => vi.unstubAllGlobals());

describe('resume import validation', () => {
  it('assigns unique IDs to incomplete collection entries', () => {
    const result = normalizeImportedResume({ work: [{ name: 'A' }, { name: 'B' }] });
    expect(result.work[0].id).toBeTruthy();
    expect(result.work[0].id).not.toBe(result.work[1].id);
  });
  it('accepts the exported sample and normalizes partial basics', () => {
    expect(normalizeImportedResume(sample)).toEqual(sample);
    const result = normalizeImportedResume({ basics: { name: 'Sam' } });
    expect(result.basics.location.city).toBe('');
    expect(result.basics.profiles).toEqual([]);
    expect(result.work).toEqual([]);
  });
  it.each([
    {},
    [],
    null,
    { basics: null },
    { work: {} },
    { work: [null] },
    { skills: { languages: [{ name: 'JS', level: '90' }] } },
    { basics: { location: { city: 42 } } },
    { activities: { achievements: [] } },
  ])('rejects malformed input without changing any store: %j', (input) => {
    const basics = useBasicDetails.getState().values;
    const work = useExperiences.getState().experiences;
    expect(() => applyImportedResumeJson(input)).toThrow();
    expect(useBasicDetails.getState().values).toBe(basics);
    expect(useExperiences.getState().experiences).toBe(work);
  });
});

it('does not apply a stale response even if fetch ignores cancellation', async () => {
  let resolveText!: (text: string) => void;
  const text = new Promise<string>((resolve) => {
    resolveText = resolve;
  });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, text: () => text }));
  const before = useBasicDetails.getState().values;
  const controller = new AbortController();
  const pending = fetchAndApplyResumeFromUrl('https://example.com/resume.json', controller.signal);
  controller.abort();
  resolveText(JSON.stringify(sample));
  await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  expect(useBasicDetails.getState().values).toBe(before);
});
