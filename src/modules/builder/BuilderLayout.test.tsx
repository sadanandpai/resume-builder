import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import BuilderLayout from './BuilderLayout';
import { applyImportedResumeJson } from './nav-bar/applyImportedResume';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(window.location.search),
  usePathname: () => window.location.pathname,
}));
vi.mock('./BuilderStateHydration', () => ({
  BuilderStateHydration: ({ children }: { children: ReactNode }) => children,
  useBuilderStateReady: () => true,
}));
vi.mock('./nav-bar/NavBarLayout', () => ({ default: () => <nav>Builder navigation</nav> }));
vi.mock('./editor/EditorLayout', () => ({
  default: ({ onViewResume }: { onViewResume: () => void }) => (
    <button onClick={onViewResume}>View Resume</button>
  ),
}));
vi.mock('./resume/components/ResumeHeader', () => ({ default: () => <div>Preview controls</div> }));
vi.mock('./resume/ResumeLayout', () => ({
  ResumeLayout: ({ readOnly }: { readOnly?: boolean }) => (
    <div role="region" aria-label="Resume" data-readonly={!!readOnly}>
      Resume content
    </div>
  ),
}));

vi.mock('./nav-bar/applyImportedResume', () => ({ applyImportedResumeJson: vi.fn() }));

afterEach(() => {
  window.history.replaceState(null, '', '/');
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('resume-only view', () => {
  it('returns to editing with Escape and preserves URL context', () => {
    window.history.replaceState(null, '', '/builder/saved-id?other=keep&view=true#resume');
    const { rerender } = render(<BuilderLayout />);
    fireEvent.keyDown(window, { key: 'Escape' });
    rerender(<BuilderLayout />);
    expect(window.location.pathname + window.location.search + window.location.hash).toBe(
      '/builder/saved-id?other=keep#resume'
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Edit' })).toHaveAttribute('aria-selected', 'true');
  });

  it.each(['/builder', '/builder/saved-id'])('toggles %s without losing URL context', (path) => {
    window.history.replaceState(null, '', `${path}?other=keep#resume`);
    const { rerender } = render(<BuilderLayout />);
    fireEvent.click(screen.getByRole('button', { name: 'View Resume' }));
    expect(window.location.search).toBe('?other=keep&view=true');
    rerender(<BuilderLayout />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByText('Preview controls')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Resume' })).toHaveAttribute('data-readonly', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Edit Resume' }));
    rerender(<BuilderLayout />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(window.location.pathname + window.location.search + window.location.hash).toBe(
      `${path}?other=keep#resume`
    );
  });

  it.each(['?view', '?view=true'])('opens directly with %s', (query) => {
    window.history.replaceState(null, '', `/builder${query}`);
    render(<BuilderLayout />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit Resume' })).toBeInTheDocument();
  });
});

describe('URL imports across views', () => {
  it.each([true, false])('completes an import starting with resume-only=%s', async (viewOnly) => {
    window.history.replaceState(
      null,
      '',
      `/builder?importUrl=https%3A%2F%2Fexample.com%2Fresume.json&other=keep${viewOnly ? '&view=true' : ''}#resume`
    );
    let finish!: (response: Response) => void;
    const fetchMock = vi.fn().mockReturnValue(
      new Promise<Response>((resolve) => {
        finish = resolve;
      })
    );
    vi.stubGlobal('fetch', fetchMock);
    const { rerender } = render(<BuilderLayout />);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;
    fireEvent.click(screen.getByRole('button', { name: viewOnly ? 'Edit Resume' : 'View Resume' }));
    rerender(<BuilderLayout />);
    expect(signal.aborted).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const data = { basics: { name: 'Imported resume' } };
    await act(async () => finish(Response.json(data)));
    await waitFor(() => expect(applyImportedResumeJson).toHaveBeenCalledWith(data));
    expect(applyImportedResumeJson).toHaveBeenCalledTimes(1);
    expect(window.location.search).toBe(viewOnly ? '?other=keep' : '?other=keep&view=true');
    expect(window.location.hash).toBe('#resume');
    expect(await screen.findByText('Resume data was successfully imported.')).toBeInTheDocument();
  });
});
