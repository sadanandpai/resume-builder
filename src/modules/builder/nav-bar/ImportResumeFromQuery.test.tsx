import { StrictMode } from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ImportResumeFromQuery } from './ImportResumeFromQuery';

const state = vi.hoisted(() => ({ ready: true, query: '', pathname: '/builder', apply: vi.fn() }));
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(state.query),
  usePathname: () => state.pathname,
}));
vi.mock('../BuilderStateHydration', () => ({ useBuilderStateReady: () => state.ready }));
vi.mock('./applyImportedResume', () => ({ applyImportedResumeJson: state.apply }));

function location(query: string, hash = '#preview') {
  state.query = query;
  window.history.replaceState(null, '', '/builder' + (query ? '?' + query : '') + hash);
}
function pendingResponse() {
  let finish!: (response: Response) => void;
  const promise = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  return { promise, finish: (body = '{}') => finish(new Response(body)) };
}
function props() {
  return { controllerRef: { current: null as AbortController | null }, onResult: vi.fn() };
}
beforeEach(() => {
  state.ready = true;
  state.pathname = '/builder';
  state.apply.mockReset();
  location('');
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('App Router query import lifecycle', () => {
  it('waits for persistence, takes the first URL, preserves repeated params/hash/history', async () => {
    state.ready = false;
    location(
      'importUrl=https%3A%2F%2Fexample.com%2Ffirst&importUrl=https%3A%2F%2Fexample.com%2Fsecond&tag=a&tag=b'
    );
    const request = pendingResponse();
    const fetchMock = vi.fn((_url: string, _options?: RequestInit) => request.promise);
    vi.stubGlobal('fetch', fetchMock);
    const p = props();
    const view = render(<ImportResumeFromQuery {...p} />);
    expect(fetchMock).not.toHaveBeenCalled();
    state.ready = true;
    view.rerender(<ImportResumeFromQuery {...p} />);
    expect(fetchMock.mock.calls[0][0]).toBe('https://example.com/first');
    const historyLength = window.history.length;
    // Query-only changes during the fetch must also survive cleanup.
    window.history.replaceState(
      null,
      '',
      window.location.href.replace('#preview', '&extra=1#preview')
    );
    await act(async () => request.finish());
    await waitFor(() => expect(state.apply).toHaveBeenCalledTimes(1));
    expect(p.onResult).toHaveBeenCalledWith('Resume data was successfully imported.');
    expect(window.location.search).toBe('?tag=a&tag=b&extra=1');
    expect(window.location.hash).toBe('#preview');
    expect(window.history.length).toBe(historyLength);
  });
  it.each(['', 'importUrl=', 'importUrl=&importUrl=https%3A%2F%2Fexample.com'])(
    'leaves missing/empty first values untouched: %s',
    (query) => {
      location(query);
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      render(<ImportResumeFromQuery {...props()} />);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(window.location.search).toBe(query ? '?' + query : '');
    }
  );
  it('reports a failed attempt and cleans only the import parameter', async () => {
    location('importUrl=ftp%3A%2F%2Fexample.com&other=1');
    const p = props();
    render(<ImportResumeFromQuery {...p} />);
    await waitFor(() =>
      expect(p.onResult).toHaveBeenCalledWith('Only http and https URLs are allowed.')
    );
    expect(window.location.search).toBe('?other=1');
    expect(state.apply).not.toHaveBeenCalled();
  });
  it('aborts replaced requests without applying stale data or clearing the newer URL', async () => {
    const first = pendingResponse(),
      second = pendingResponse();
    const fetchMock = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    vi.stubGlobal('fetch', fetchMock);
    location('importUrl=https%3A%2F%2Fexample.com%2Ffirst');
    const p = props(),
      view = render(<ImportResumeFromQuery {...p} />);
    const old = p.controllerRef.current!;
    location('importUrl=https%3A%2F%2Fexample.com%2Fsecond');
    view.rerender(<ImportResumeFromQuery {...p} />);
    expect(old.signal.aborted).toBe(true);
    await act(async () => first.finish('{"basics":{"name":"Old"}}'));
    expect(state.apply).not.toHaveBeenCalled();
    expect(p.onResult).not.toHaveBeenCalled();
    expect(window.location.search).toContain('second');
    await act(async () => second.finish('{"basics":{"name":"New"}}'));
    expect(state.apply).toHaveBeenCalledWith({ basics: { name: 'New' } });
    expect(p.onResult).toHaveBeenCalledTimes(1);
  });
  it.each(['file', 'unmount', 'live route change'])(
    'ignores late results after %s',
    async (reason) => {
      const request = pendingResponse();
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, _options?: RequestInit) => request.promise)
      );
      location('importUrl=https%3A%2F%2Fexample.com');
      const p = props(),
        view = render(<ImportResumeFromQuery {...p} />);
      if (reason === 'file') p.controllerRef.current!.abort();
      if (reason === 'unmount') view.unmount();
      if (reason === 'live route change') window.history.replaceState(null, '', '/');
      await act(async () => request.finish());
      expect(state.apply).not.toHaveBeenCalled();
      expect(p.onResult).not.toHaveBeenCalled();
    }
  );
  it('restarts after Strict Mode cleanup and applies/toasts once', async () => {
    const requests: ReturnType<typeof pendingResponse>[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(() => {
        const request = pendingResponse();
        requests.push(request);
        return request.promise;
      })
    );
    location('importUrl=https%3A%2F%2Fexample.com');
    const p = props();
    render(
      <StrictMode>
        <ImportResumeFromQuery {...p} />
      </StrictMode>
    );
    expect(requests).toHaveLength(2);
    await act(async () => {
      requests.forEach((request) => request.finish());
    });
    expect(state.apply).toHaveBeenCalledTimes(1);
    expect(p.onResult).toHaveBeenCalledTimes(1);
  });
});
