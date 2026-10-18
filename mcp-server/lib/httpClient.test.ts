import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  builderEditUrl,
  builderUrl,
  createResumeRemote,
  getResumeRemote,
  ResumeApiError,
  updateResumeRemote,
} from './httpClient';

describe('httpClient', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    // BASE_URL is read from RESUME_APP_BASE_URL once at module load, so it
    // can't be stubbed per-test; these tests rely on its unset default
    // (http://localhost:3000), which matches the URLs asserted below.
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('createResumeRemote POSTs to /api/resumes with no id', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ id: 'abc', code: 'WXYZ' }), { status: 201 })
    );
    const result = await createResumeRemote({ basics: { name: 'Jane' } });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/resumes',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result).toEqual({ id: 'abc', code: 'WXYZ' });
  });

  it('updateResumeRemote POSTs to /api/resumes?id=... with X-Resume-Code', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: 'abc' }), { status: 200 }));
    const result = await updateResumeRemote('abc', 'WXYZ', { basics: { name: 'Jane' } });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://localhost:3000/api/resumes?id=abc');
    expect(init.headers['X-Resume-Code']).toBe('WXYZ');
    expect(result).toEqual({ id: 'abc' });
  });

  it('getResumeRemote GETs /api/resumes/[id]', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ basics: { name: 'Jane' } }), { status: 200 })
    );
    const result = await getResumeRemote('abc');
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/resumes/abc');
    expect(result).toEqual({ basics: { name: 'Jane' } });
  });

  it('throws ResumeApiError with the server error message on failure', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ error: 'A valid edit code is required.' }), { status: 403 })
    );
    await expect(updateResumeRemote('abc', 'WRNG', {})).rejects.toMatchObject({
      status: 403,
      message: 'A valid edit code is required.',
    });
    await expect(updateResumeRemote('abc', 'WRNG', {})).rejects.toBeInstanceOf(ResumeApiError);
  });

  it('builds builder URLs', () => {
    expect(builderUrl('abc')).toBe('http://localhost:3000/builder/abc');
    expect(builderEditUrl('abc', 'WXYZ')).toBe('http://localhost:3000/builder/abc?code=WXYZ');
  });
});
