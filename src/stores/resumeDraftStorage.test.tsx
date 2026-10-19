import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import {
  DRAFT_KEY,
  readDraft,
  readDraftBaseline,
  savedResumeKey,
  saveDraftBaseline,
} from './resumeDraftStorage';

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.resetModules();
});

it('restores edits after refresh and resets to the last cloud save without detaching', async () => {
  const { BuilderStateHydration } = await import('@/modules/builder/BuilderStateHydration');
  const { useBasicDetails } = await import('./basic');
  const { useCloudResumeStore } = await import('./useCloudResumeStore');
  const { resetDraftChanges } = await import('./useResumeStore');
  const savedResume = { id: 'saved', code: 'a7B2', data: { basics: { name: 'Cloud version' } } };
  function Probe() {
    return <div>{useBasicDetails((s) => s.values.name)}</div>;
  }
  const view = render(
    <BuilderStateHydration savedResume={savedResume}>
      <Probe />
    </BuilderStateHydration>
  );
  await screen.findByText('Cloud version');
  act(() =>
    useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Local edit' })
  );
  view.unmount();
  // Remount executes the same saved-resume hydration path as a page refresh.
  render(
    <BuilderStateHydration savedResume={{ ...savedResume }}>
      <Probe />
    </BuilderStateHydration>
  );
  await screen.findByText('Local edit');
  await act(async () => {
    await resetDraftChanges();
  });
  expect(screen.getByText('Cloud version')).toBeInTheDocument();
  expect(useCloudResumeStore.getState().id).toBe('saved');
  expect(useCloudResumeStore.getState().code).toBe('a7B2');
  expect(localStorage.getItem('basic')).toBeNull();
  expect(localStorage.getItem(DRAFT_KEY)).not.toContain('a7B2');
});

it('discards the previous baseline and restores defaults when creating new', async () => {
  const { useBasicDetails } = await import('./basic');
  const { useCloudResumeStore } = await import('./useCloudResumeStore');
  const { resetResumeStore } = await import('./useResumeStore');
  const defaults = (await import('@/helpers/constants/resume-data.json')).default;
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Cloud version' });
  saveDraftBaseline('saved');
  useCloudResumeStore.getState().setId('saved', 'a7B2');
  resetResumeStore();
  expect(useBasicDetails.getState().values.name).toBe(defaults.basics.name);
  expect(useCloudResumeStore.getState().id).toBeNull();
  expect(readDraft().resumeId).toBeNull();
  expect(readDraftBaseline('saved')).toBeUndefined();
});

it('retains edits made during a cloud save while recording the saved baseline', async () => {
  const { useBasicDetails } = await import('./basic');
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Sent to cloud' });
  const sent = readDraft().current;
  useBasicDetails
    .getState()
    .reset({ ...useBasicDetails.getState().values, name: 'Edited during save' });
  saveDraftBaseline('saved', sent);
  expect(JSON.stringify(readDraft().current)).toContain('Edited during save');
  expect(JSON.stringify(readDraftBaseline('saved'))).toContain('Sent to cloud');
});

it('loads the persisted draft in a fresh module instance instead of the cloud snapshot', async () => {
  const first = await import('@/modules/builder/BuilderStateHydration');
  await first.hydrateBuilderState();
  const { useBasicDetails } = await import('./basic');
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Saved name' });
  saveDraftBaseline('saved');
  useBasicDetails
    .getState()
    .reset({ ...useBasicDetails.getState().values, name: 'Survives reload' });
  vi.resetModules();
  const { BuilderStateHydration } = await import('@/modules/builder/BuilderStateHydration');
  const { useBasicDetails: freshBasic } = await import('./basic');
  function Probe() {
    return <div>{freshBasic((s) => s.values.name)}</div>;
  }
  render(
    <BuilderStateHydration
      savedResume={{ id: 'saved', code: 'a7B2', data: { basics: { name: 'Saved name' } } }}
    >
      <Probe />
    </BuilderStateHydration>
  );
  await screen.findByText('Survives reload');
  expect(localStorage.length).toBe(2);
  expect(localStorage.getItem(savedResumeKey('saved'))).not.toBeNull();
  expect(JSON.parse(localStorage.getItem(DRAFT_KEY)!)).not.toHaveProperty('baseline');
  expect(Object.keys(readDraft().current)).toContain('education');
});

it('migrates legacy sections into the single document without losing values', async () => {
  localStorage.setItem(
    'basic',
    JSON.stringify({ state: { values: { name: 'Existing draft' } }, version: 0 })
  );
  localStorage.setItem('selectedTemplateId', 'classic');
  const { draftStorage } = await import('./resumeDraftStorage');
  expect(JSON.parse(draftStorage.getItem('basic')!).state.values.name).toBe('Existing draft');
  expect(draftStorage.getItem('selectedTemplateId')).toBe('classic');
  expect(localStorage.length).toBe(1);
  expect(localStorage.key(0)).toBe(DRAFT_KEY);
});

it('splits the previous combined draft without losing edits or the reset baseline', () => {
  const current = { basic: { state: { values: { name: 'Local edit' } }, version: 0 } };
  const baseline = { basic: { state: { values: { name: 'Saved version' } }, version: 0 } };
  localStorage.setItem(
    DRAFT_KEY,
    JSON.stringify({ version: 1, resumeId: 'saved', current, baseline })
  );
  expect(readDraft().current).toEqual(current);
  expect(JSON.parse(localStorage.getItem(DRAFT_KEY)!)).toEqual({
    version: 1,
    resumeId: 'saved',
    data: current,
  });
  expect(readDraftBaseline('saved')).toEqual(baseline);
  expect(localStorage.length).toBe(2);
});

it('keeps only the active saved snapshot when switching resume IDs', () => {
  saveDraftBaseline('first', { basic: { name: 'First' } });
  saveDraftBaseline('second', { basic: { name: 'Second' } });
  expect(localStorage.getItem(savedResumeKey('first'))).toBeNull();
  expect(readDraftBaseline('second')).toEqual({ basic: { name: 'Second' } });
  expect(readDraft().resumeId).toBe('second');
  expect(localStorage.length).toBe(2);
});

it('resets to a complete default draft and removes the cloud association and local baseline', async () => {
  const { hydrateBuilderState } = await import('@/modules/builder/BuilderStateHydration');
  const { useBasicDetails } = await import('./basic');
  const { useCloudResumeStore } = await import('./useCloudResumeStore');
  const { useResumeStyleStore } = await import('./useResumeStyleStore');
  const { resetResumeDefaults } = await import('./useResumeStore');
  const defaults = (await import('@/helpers/constants/resume-data.json')).default;
  await hydrateBuilderState();
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Cloud version' });
  useResumeStyleStore.getState().commit({ density: 'compact' });
  saveDraftBaseline('saved');
  useCloudResumeStore.getState().setId('saved', 'a7B2');
  resetResumeDefaults();
  expect(useBasicDetails.getState().values.name).toBe(defaults.basics.name);
  expect(useResumeStyleStore.getState().settings).toEqual({});
  expect(useCloudResumeStore.getState().id).toBeNull();
  expect(useCloudResumeStore.getState().code).toBeNull();
  expect(readDraft().resumeId).toBeNull();
  expect(localStorage.getItem(savedResumeKey('saved'))).toBeNull();
  await hydrateBuilderState(true);
  expect(useBasicDetails.getState().values).toEqual(defaults.basics);
  expect(useResumeStyleStore.getState().settings).toEqual({});
});

it('does not restore another tab’s resume into the active cloud resume', async () => {
  const { hydrateBuilderState } = await import('@/modules/builder/BuilderStateHydration');
  const { useBasicDetails } = await import('./basic');
  const { useCloudResumeStore } = await import('./useCloudResumeStore');
  const { resetDraftChanges } = await import('./useResumeStore');
  await hydrateBuilderState();
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Resume A' });
  saveDraftBaseline('a');
  useCloudResumeStore.getState().setId('a', 'codeA');
  // Another tab owns the shared draft now; this tab still edits A in memory.
  const other = { basic: { state: { values: { name: 'Resume B' } }, version: 0 } };
  saveDraftBaseline('b', other);
  await resetDraftChanges();
  expect(useBasicDetails.getState().values.name).toBe('Resume A');
  expect(useCloudResumeStore.getState().id).toBe('a');
  expect(readDraft().resumeId).toBe('b');
  // Even if A's snapshot remains, restoring must not replace B's shared draft.
  localStorage.setItem(savedResumeKey('a'), JSON.stringify({ version: 1, data: other }));
  await resetDraftChanges();
  expect(useBasicDetails.getState().values.name).toBe('Resume A');
  expect(readDraft().resumeId).toBe('b');
});

it.each([false, true])('refreshes the cloud baseline with local edits=%s', async (dirty) => {
  const { BuilderStateHydration } = await import('@/modules/builder/BuilderStateHydration');
  const { useBasicDetails } = await import('./basic');
  const { resetDraftChanges } = await import('./useResumeStore');
  function Probe() {
    return <div>{useBasicDetails((s) => s.values.name)}</div>;
  }
  const view = render(
    <BuilderStateHydration
      savedResume={{ id: 'saved', code: 'a7B2', data: { basics: { name: 'Old cloud' } } }}
    >
      <Probe />
    </BuilderStateHydration>
  );
  await screen.findByText('Old cloud');
  if (dirty)
    act(() =>
      useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Local edit' })
    );
  view.rerender(
    <BuilderStateHydration
      savedResume={{ id: 'saved', code: 'a7B2', data: { basics: { name: 'New cloud' } } }}
    >
      <Probe />
    </BuilderStateHydration>
  );
  await screen.findByText(dirty ? 'Local edit' : 'New cloud');
  expect(JSON.stringify(readDraftBaseline('saved'))).toContain('New cloud');
  await act(async () => {
    await resetDraftChanges();
  });
  expect(screen.getByText('New cloud')).toBeInTheDocument();
});
