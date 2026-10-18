import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createResumeRemote: vi.fn(),
  builderUrl: vi.fn((id: string) => `http://localhost:3000/builder/${id}`),
  builderEditUrl: vi.fn(
    (id: string, code: string) => `http://localhost:3000/builder/${id}?code=${code}`
  ),
}));

vi.mock('../httpClient', () => mocks);

import { createResume } from './createResume';

describe('createResume', () => {
  it('validates input, converts Markdown to sanitized HTML, and returns the create result', async () => {
    mocks.createResumeRemote.mockResolvedValue({ id: 'abc123', code: 'WXYZ' });

    const result = await createResume({ basics: { name: 'Jane Doe', summary: '**Bold**' } });

    expect(mocks.createResumeRemote).toHaveBeenCalledTimes(1);
    const sentResume = mocks.createResumeRemote.mock.calls[0][0];
    expect(sentResume.basics.name).toBe('Jane Doe');
    expect(sentResume.basics.summary).toContain('<strong>Bold</strong>');

    expect(result).toEqual({
      id: 'abc123',
      code: 'WXYZ',
      url: 'http://localhost:3000/builder/abc123',
      editUrl: 'http://localhost:3000/builder/abc123?code=WXYZ',
    });
  });

  it('rejects input missing basics.name before calling the remote API', async () => {
    mocks.createResumeRemote.mockClear();
    await expect(createResume({ basics: { name: '' } })).rejects.toThrow();
    expect(mocks.createResumeRemote).not.toHaveBeenCalled();
  });
});
