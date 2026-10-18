import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getResumeRemote: vi.fn(),
  updateResumeRemote: vi.fn(),
  builderUrl: vi.fn((id: string) => `http://localhost:3000/builder/${id}`),
}));

vi.mock('../httpClient', () => mocks);

import { updateResume, updateResumeInputSchema } from './updateResume';

// The MCP SDK validates tool arguments against inputSchema before invoking
// the handler (filling in Zod defaults along the way), so tests parse
// through the same schema rather than calling updateResume with raw objects.
function input(raw: unknown) {
  return updateResumeInputSchema.parse(raw);
}

const currentResume = {
  basics: { name: 'Jane Doe', summary: '<p>Old summary</p>' },
  skills: {
    languages: [],
    frameworks: [],
    libraries: [],
    databases: [],
    technologies: [],
    practices: [],
    tools: [],
  },
  work: [{ id: 'w1', name: 'Acme', summary: '<p>Old job</p>', highlights: [] }],
  education: [],
  volunteer: [],
  awards: [],
  activities: { involvements: '', achievements: '' },
};

describe('updateResume', () => {
  it('replaces only the patched sections, converting their Markdown to HTML', async () => {
    mocks.getResumeRemote.mockResolvedValue(currentResume);
    mocks.updateResumeRemote.mockResolvedValue({ id: 'abc123' });

    const result = await updateResume(
      input({
        id: 'abc123',
        code: 'WXYZ',
        patch: { basics: { name: 'Jane Doe', summary: '**New summary**' } },
      })
    );

    expect(mocks.updateResumeRemote).toHaveBeenCalledTimes(1);
    const [id, code, sentResume] = mocks.updateResumeRemote.mock.calls[0];
    expect(id).toBe('abc123');
    expect(code).toBe('WXYZ');
    expect(sentResume.basics.summary).toContain('<strong>New summary</strong>');
    // work was not in the patch, so it must be carried over unchanged (still HTML, not re-converted)
    expect(sentResume.work[0].summary).toBe('<p>Old job</p>');

    expect(result).toEqual({ id: 'abc123', url: 'http://localhost:3000/builder/abc123' });
  });

  it('replaces a touched array section wholesale, not merged item-by-item', async () => {
    mocks.getResumeRemote.mockResolvedValue(currentResume);
    mocks.updateResumeRemote.mockResolvedValue({ id: 'abc123' });

    await updateResume(
      input({
        id: 'abc123',
        code: 'WXYZ',
        patch: { work: [{ id: 'w2', name: 'NewCo', summary: 'New role' }] },
      })
    );

    const sentResume = mocks.updateResumeRemote.mock.calls[0][2];
    expect(sentResume.work).toHaveLength(1);
    expect(sentResume.work[0].name).toBe('NewCo');
  });
});
