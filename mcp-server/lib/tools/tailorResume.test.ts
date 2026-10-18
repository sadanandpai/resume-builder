import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getResumeRemote: vi.fn(),
  builderUrl: vi.fn((id: string) => `http://localhost:3000/builder/${id}`),
}));

vi.mock('../httpClient', () => mocks);

import { tailorResume } from './tailorResume';

describe('tailorResume', () => {
  it('returns the current resume, the job description, and instructions -- without writing anything', async () => {
    mocks.getResumeRemote.mockResolvedValue({
      basics: { name: 'Jane Doe', summary: '<p>Summary</p>' },
    });

    const result = await tailorResume({ id: 'abc123', jobDescription: 'Senior Engineer role' });

    expect(result.currentResume.basics.name).toBe('Jane Doe');
    expect(result.jobDescription).toBe('Senior Engineer role');
    expect(result.instructions).toContain('create_resume');
    expect(result.currentResume).not.toHaveProperty('url');
  });
});
