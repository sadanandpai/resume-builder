// @vitest-environment node
import { beforeEach, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  documents: new Map<string, Record<string, unknown>>(),
  writes: vi.fn(),
}));
vi.mock('./firestore', () => ({
  getResumeFirestore: async () => ({
    collection: (name: string) => ({ doc: (id: string) => `${name}/${id}` }),
    runTransaction: async (callback: (transaction: unknown) => unknown) =>
      callback({
        get: async (key: string) => ({
          exists: state.documents.has(key),
          data: () => state.documents.get(key),
        }),
        set: (key: string, value: Record<string, unknown>) => {
          state.writes(key, value);
          state.documents.set(key, value);
        },
        update: (key: string, value: Record<string, unknown>) => {
          state.writes(key, value);
          state.documents.set(key, { ...state.documents.get(key), ...value });
        },
      }),
  }),
}));
import { FieldValue } from '@google-cloud/firestore';
import { authorizeResumeEdit, generateResumeCode, hashResumeCode } from './resumeEditAccess';
const id = 'V1StGXR8_Z5jdHi6B-myT';
const code = 'a7B2';

beforeEach(() => {
  vi.restoreAllMocks();
  state.documents.clear();
  state.writes.mockClear();
  state.documents.set(`resume/${id}`, { codeHash: hashResumeCode(id, code), json: { basics: {} } });
});

it('generates four base-62 characters and binds the hash to the resume ID', () => {
  for (let i = 0; i < 50; i++) expect(generateResumeCode()).toMatch(/^[a-zA-Z0-9]{4}$/);
  expect(hashResumeCode(id, code)).toMatch(/^[a-f0-9]{64}$/);
  expect(hashResumeCode('another-id', code)).not.toBe(hashResumeCode(id, code));
});

it.each([null, '', 'wrong', 'A7B2', 'a7b2', hashResumeCode(id, code)])(
  'rejects an unauthorized update: %s',
  async (supplied) => {
    expect(await authorizeResumeEdit(id, supplied, { basics: { name: 'Overwrite' } })).toBe(403);
    expect(state.documents.get(`resume/${id}`)?.json).toEqual({ basics: {} });
    expect(state.documents.get(`resume/${id}`)?.editCount).toBeUndefined();
  }
);

it('verifies access without changing the resume, then updates JSON without changing the credential', async () => {
  expect(await authorizeResumeEdit(id, code)).toBe(200);
  expect(state.writes).not.toHaveBeenCalled();
  const json = { basics: { name: 'Updated' } };
  expect(await authorizeResumeEdit(id, code, json)).toBe(200);
  expect(state.documents.get(`resume/${id}`)).toEqual({
    codeHash: hashResumeCode(id, code),
    json,
    editCount: FieldValue.increment(1),
  });
});

it('limits guessing across verification and update calls until the window expires', async () => {
  vi.spyOn(Date, 'now').mockReturnValue(1_000);
  for (let i = 0; i < 10; i++) {
    expect(await authorizeResumeEdit(id, 'bad1', i % 2 ? { basics: {} } : undefined)).toBe(403);
  }
  expect(await authorizeResumeEdit(id, 'bad2')).toBe(429);
  expect(await authorizeResumeEdit(id, code, { basics: {} })).toBe(429);
  vi.spyOn(Date, 'now').mockReturnValue(1_000 + 15 * 60 * 1000);
  expect(await authorizeResumeEdit(id, code, { basics: {} })).toBe(200);
});

it('rejects missing resumes and documents without an edit credential', async () => {
  expect(await authorizeResumeEdit('missing', code)).toBe(404);
  state.documents.set(`resume/${id}`, { json: { basics: {} } });
  expect(await authorizeResumeEdit(id, code, { basics: {} })).toBe(403);
});
