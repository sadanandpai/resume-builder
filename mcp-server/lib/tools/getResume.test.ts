import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getResumeRemote: vi.fn(),
  builderUrl: vi.fn((id: string) => `http://localhost:3000/builder/${id}`),
}));

vi.mock('../httpClient', () => mocks);

import { getResume } from './getResume';

describe('getResume', () => {
  it('fetches a resume and converts HTML rich text fields to Markdown', async () => {
    mocks.getResumeRemote.mockResolvedValue({
      basics: { name: 'Jane Doe', summary: '<p><strong>Bold</strong></p>' },
      work: [],
      education: [],
      volunteer: [],
      awards: [],
      skills: {},
      activities: { involvements: '', achievements: '' },
    });

    const result = await getResume({ id: 'abc123' });

    expect(mocks.getResumeRemote).toHaveBeenCalledWith('abc123');
    expect(result.basics.summary).toContain('**Bold**');
    expect(result.url).toBe('http://localhost:3000/builder/abc123');
  });

  it('allows an empty basics.name on read (not a write-time constraint)', async () => {
    mocks.getResumeRemote.mockResolvedValue({ basics: { name: '' } });
    const result = await getResume({ id: 'abc123' });
    expect(result.basics.name).toBe('');
  });
});
