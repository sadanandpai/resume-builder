// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ get: vi.fn(), update: vi.fn(), doc: vi.fn() }));
vi.mock('@/helpers/firestore', () => ({
  getResumeFirestore: async () => ({ collection: () => ({ doc: mocks.doc }) }),
}));
import { GET } from './route';
const id = '550e8400-e29b-41d4-a716-446655440000';
const load = (key = id) =>
  GET(new Request('http://localhost/api/resumes/' + key), { params: Promise.resolve({ id: key }) });
beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'development');
  mocks.get.mockReset();
  mocks.update.mockReset().mockResolvedValue(undefined);
  mocks.doc.mockReset().mockReturnValue({ get: mocks.get, update: mocks.update });
});
afterEach(() => vi.unstubAllEnvs());
it.each(['development', 'production'])(
  'returns saved JSON without caching in %s',
  async (environment) => {
    vi.stubEnv('NODE_ENV', environment);
    const json = { basics: { name: 'Sadanand' }, __metadata: { template: 'modern' } };
    mocks.get.mockResolvedValue({
      exists: true,
      data: () => ({
        json,
        codeHash: 'private-hash',
        code: 'private-code',
        viewCount: 42,
        editCount: 5,
      }),
    });
    const response = await load();
    expect(await response.json()).toEqual(json);
    expect(mocks.update).toHaveBeenCalledTimes(1);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  }
);
it('rejects invalid IDs before querying', async () => {
  expect((await load('invalid')).status).toBe(400);
  expect(mocks.get).not.toHaveBeenCalled();
});
it('returns 404 for missing resumes', async () => {
  mocks.get.mockResolvedValue({ exists: false });
  expect((await load()).status).toBe(404);
  expect(mocks.update).not.toHaveBeenCalled();
});
it('handles database failure', async () => {
  mocks.get.mockRejectedValue(new Error('database unavailable'));
  const response = await load();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({
    error: 'Could not load your resume. Please try again later.',
  });
});

it('preserves case when loading a Nano ID', async () => {
  const nanoId = 'V1StGXR8_Z5jdHi6B-myT';
  const json = { basics: { name: 'Sadanand' } };
  mocks.get.mockResolvedValue({
    exists: true,
    data: () => ({
      json,
      codeHash: 'private-hash',
      code: 'private-code',
      viewCount: 42,
      editCount: 5,
    }),
  });
  const response = await load(nanoId);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(json);
  expect(mocks.doc).toHaveBeenCalledWith(nanoId);
});

it('continues normalizing uppercase legacy UUIDs', async () => {
  mocks.get.mockResolvedValue({ exists: true, data: () => ({ json: { basics: {} } }) });
  expect((await load(id.toUpperCase())).status).toBe(200);
  expect(mocks.doc).toHaveBeenCalledWith(id);
});

it.each(['a'.repeat(20), 'a'.repeat(22), 'a'.repeat(20) + '!'])(
  'rejects malformed Nano IDs: %s',
  async (key) => {
    expect((await load(key)).status).toBe(400);
    expect(mocks.doc).not.toHaveBeenCalled();
  }
);

it('serves resume JSON even when the view counter write fails', async () => {
  const json = { basics: {} };
  mocks.get.mockResolvedValue({ exists: true, data: () => ({ json }) });
  mocks.update.mockRejectedValue(new Error('counter unavailable'));
  const response = await load();
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(json);
});
