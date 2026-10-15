import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import EditorLayout from './EditorLayout';
import { resetResumeStore } from '@/stores/useResumeStore';

vi.mock('./components/EditHeaders', () => ({ default: () => <div>Sections</div> }));
vi.mock('./components/EditSection', () => ({ default: () => null }));
vi.mock('@/stores/useResumeStore', () => ({ resetResumeStore: vi.fn() }));

it('dismisses the reset dialog with Escape without resetting edits', () => {
  render(<EditorLayout onViewResume={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Reset all edits' }));
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('button', { name: 'Confirm' })).not.toBeInTheDocument();
  expect(resetResumeStore).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Reset all edits' }));
  expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
});
