import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ImportSavedResume } from './ImportSavedResume';
const state = vi.hoisted(() => ({
  ready: false,
  path: '/builder/550e8400-e29b-41d4-a716-446655440000',
  apply: vi.fn(),
}));
vi.mock('next/navigation', () => ({ usePathname: () => state.path }));
vi.mock('../BuilderStateHydration', () => ({ useBuilderStateReady: () => state.ready }));
vi.mock('./applyImportedResume', () => ({ applyImportedResumeJson: state.apply }));
beforeEach(() => {
  state.ready = false;
  state.apply.mockReset();
  window.history.replaceState(null, '', state.path);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
const props = () => ({
  controllerRef: { current: null as AbortController | null },
  onResult: vi.fn(),
});
it('waits for hydration then fetches and populates saved data', async () => {
  const json = { basics: { name: 'Sadanand' } };
  const fetch = vi.fn().mockResolvedValue(Response.json(json));
  vi.stubGlobal('fetch', fetch);
  const p = props();
  const view = render(<ImportSavedResume {...p} />);
  expect(fetch).not.toHaveBeenCalled();
  state.ready = true;
  view.rerender(<ImportSavedResume {...p} />);
  await waitFor(() => expect(state.apply).toHaveBeenCalledWith(json));
  expect(fetch.mock.calls[0][0]).toBe('/api/resumes/550e8400-e29b-41d4-a716-446655440000');
});
it('shows missing resume errors without replacing editor data', async () => {
  state.ready = true;
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(Response.json({ error: 'Resume not found.' }, { status: 404 }))
  );
  const p = props();
  render(<ImportSavedResume {...p} />);
  await waitFor(() => expect(p.onResult).toHaveBeenCalledWith('Resume not found.'));
  expect(state.apply).not.toHaveBeenCalled();
});
it('does not apply a response after unmount', async () => {
  state.ready = true;
  let resolve!: (response: Response) => void;
  vi.stubGlobal(
    'fetch',
    vi.fn(
      () =>
        new Promise<Response>((r) => {
          resolve = r;
        })
    )
  );
  const view = render(<ImportSavedResume {...props()} />);
  view.unmount();
  await act(async () => resolve(Response.json({ basics: {} })));
  expect(state.apply).not.toHaveBeenCalled();
});

it('loads saved data in production', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  state.ready = true;
  const json = { basics: { name: 'Sadanand' } };
  const fetch = vi.fn().mockResolvedValue(Response.json(json));
  vi.stubGlobal('fetch', fetch);
  const p = props();
  render(<ImportSavedResume {...p} />);
  await waitFor(() => expect(state.apply).toHaveBeenCalledWith(json));
  expect(p.onResult).toHaveBeenCalledWith('Saved resume loaded successfully.');
});
