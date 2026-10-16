import { act, cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { ActiveResumeUrl } from './ActiveResumeUrl';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { resetResumeStore } from '@/stores/useResumeStore';
import { useBasicDetails } from '@/stores/basic';

vi.mock('next/navigation', () => ({ usePathname: () => window.location.pathname }));

afterEach(() => {
  cleanup();
  useCloudResumeStore.getState().setId(null);
  window.history.replaceState(null, '', '/');
});

it('restores the ID on builder re-entry without replacing local edits', () => {
  useCloudResumeStore.getState().setId('saved-id');
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Local edit' });
  window.history.replaceState(null, '', '/builder/saved-id');
  const view = render(<ActiveResumeUrl />);
  view.unmount();
  window.history.replaceState(null, '', '/');
  window.history.replaceState(null, '', '/builder?other=keep#preview');
  render(<ActiveResumeUrl />);
  expect(window.location.pathname + window.location.search + window.location.hash).toBe(
    '/builder/saved-id?other=keep#preview'
  );
  expect(useBasicDetails.getState().values.name).toBe('Local edit');
  act(() => resetResumeStore());
  expect(window.location.pathname).toBe('/builder');
  expect(useCloudResumeStore.getState().id).toBeNull();
});

it('leaves home alone and reflects newly saved IDs', () => {
  window.history.replaceState(null, '', '/');
  const view = render(<ActiveResumeUrl />);
  act(() => useCloudResumeStore.getState().setId('new-id'));
  expect(window.location.pathname).toBe('/');
  window.history.replaceState(null, '', '/builder');
  view.rerender(<ActiveResumeUrl />);
  expect(window.location.pathname).toBe('/builder/new-id');
});

it('adds and clears the edit code without losing existing query values or fragment', () => {
  window.history.replaceState(
    null,
    '',
    '/builder?other=one&other=two&mode=edit&importUrl=https%3A%2F%2Fexample.com%2Fr.json#preview'
  );
  useCloudResumeStore.getState().setId('saved-id', 'a7B2');
  render(<ActiveResumeUrl />);
  let url = new URL(window.location.href);
  expect(url.pathname).toBe('/builder/saved-id');
  expect(url.searchParams.get('code')).toBe('a7B2');
  expect(url.searchParams.getAll('other')).toEqual(['one', 'two']);
  expect(url.searchParams.get('mode')).toBe('edit');
  expect(url.searchParams.get('importUrl')).toBe('https://example.com/r.json');
  expect(url.hash).toBe('#preview');
  act(() => useCloudResumeStore.getState().setId(null));
  url = new URL(window.location.href);
  expect(url.pathname).toBe('/builder');
  expect(url.searchParams.has('code')).toBe(false);
  expect(url.searchParams.getAll('other')).toEqual(['one', 'two']);
  expect(url.hash).toBe('#preview');
});

it('keeps the supplied code on a view-only resume so a temporary verification failure does not lose the edit link', () => {
  window.history.replaceState(null, '', '/builder/saved-id?other=keep&code=a7B2#preview');
  useCloudResumeStore.getState().setId('saved-id');
  render(<ActiveResumeUrl />);
  expect(window.location.search).toBe('?other=keep&code=a7B2');
  expect(useCloudResumeStore.getState().code).toBeNull();
});
