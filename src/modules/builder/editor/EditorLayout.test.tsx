import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import EditorLayout from './EditorLayout';
import { resetDraftChanges, resetResumeDefaults } from '@/stores/useResumeStore';

afterEach(() => {
  cleanup();
  useCloudResumeStore.getState().setId(null);
  window.history.replaceState(null, '', '/builder');
  vi.clearAllMocks();
});

vi.mock('./components/EditHeaders', () => ({ default: () => <div>Sections</div> }));
vi.mock('./components/EditSection', () => ({ default: () => null }));
vi.mock('@/stores/useResumeStore', () => ({
  resetResumeDefaults: vi.fn(() => useCloudResumeStore.getState().setId(null)),
  resetDraftChanges: vi.fn(),
}));

it('dismisses the reset dialog with Escape without resetting edits', () => {
  render(<EditorLayout onViewResume={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Reset defaults' }));
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
  expect(resetResumeDefaults).not.toHaveBeenCalled();
  expect(resetDraftChanges).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Reset defaults' }));
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
});

it('does not offer create new for a new resume', () => {
  window.history.replaceState(null, '', '/builder');
  render(<EditorLayout onViewResume={vi.fn()} />);
  expect(screen.queryByRole('button', { name: 'Create new' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Reset changes' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Reset defaults' })).toBeInTheDocument();
});

it('restores cloud changes separately, then resets defaults and clears the full URL', () => {
  const url = '/builder/saved?code=a7B2&other=keep#import';
  window.history.replaceState(null, '', url);
  useCloudResumeStore.getState().setId('saved', 'a7B2');
  render(<EditorLayout onViewResume={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Reset changes' }));
  expect(
    screen.getByText('Discard your edits and restore the last cloud-saved version?')
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
  expect(resetDraftChanges).toHaveBeenCalledOnce();
  expect(resetResumeDefaults).not.toHaveBeenCalled();
  expect(window.location.pathname + window.location.search + window.location.hash).toBe(url);
  fireEvent.click(screen.getByRole('button', { name: 'Reset defaults' }));
  expect(
    screen.getByText(
      /replace all resume content and appearance settings with the complete default resume/
    )
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(resetResumeDefaults).not.toHaveBeenCalled();
  expect(window.location.pathname + window.location.search + window.location.hash).toBe(url);
  fireEvent.click(screen.getByRole('button', { name: 'Reset defaults' }));
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
  expect(resetResumeDefaults).toHaveBeenCalledOnce();
  expect(window.location.pathname + window.location.search + window.location.hash).toBe('/builder');
  expect(useCloudResumeStore.getState().id).toBeNull();
  expect(useCloudResumeStore.getState().code).toBeNull();
  expect(screen.queryByRole('button', { name: 'Reset changes' })).not.toBeInTheDocument();
});
