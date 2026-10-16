// @vitest-environment node
import { beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ load: vi.fn(), authorize: vi.fn() }));
vi.mock('@/helpers/loadSavedResume', () => ({ loadSavedResume: mocks.load }));
vi.mock('@/helpers/resumeEditAccess', () => ({ authorizeResumeEdit: mocks.authorize }));
import SavedBuilderPage from './page';
const id = 'V1StGXR8_Z5jdHi6B-myT';
const data = { basics: { name: 'Sadanand' } };
beforeEach(() => {
  vi.resetAllMocks();
  mocks.load.mockImplementation(async () => Response.json(data));
});

it('loads an ID-only resume without granting edit access', async () => {
  const page = await SavedBuilderPage({
    params: Promise.resolve({ id }),
    searchParams: Promise.resolve({ mode: 'edit', other: 'keep' }),
  });
  expect(page.props.savedResume).toEqual({ id, data, code: null });
  expect(mocks.authorize).not.toHaveBeenCalled();
});

it.each([200, 403, 404, 429])(
  'grants edit access only after successful verification (%s)',
  async (status) => {
    mocks.authorize.mockResolvedValue(status);
    const page = await SavedBuilderPage({
      params: Promise.resolve({ id }),
      searchParams: Promise.resolve({ code: 'a7B2', other: ['one', 'two'] }),
    });
    expect(mocks.authorize).toHaveBeenCalledWith(id, 'a7B2');
    expect(page.props.savedResume).toEqual({ id, data, code: status === 200 ? 'a7B2' : null });
  }
);

it('fails closed if verification is unavailable', async () => {
  mocks.authorize.mockRejectedValue(new Error('unavailable'));
  const page = await SavedBuilderPage({
    params: Promise.resolve({ id }),
    searchParams: Promise.resolve({ code: 'a7B2' }),
  });
  expect(page.props.savedResume.code).toBeNull();
});

it('rejects ambiguous repeated code parameters', async () => {
  const page = await SavedBuilderPage({
    params: Promise.resolve({ id }),
    searchParams: Promise.resolve({ code: ['a7B2', 'bad1'] }),
  });
  expect(page.props.savedResume.code).toBeNull();
  expect(mocks.authorize).not.toHaveBeenCalled();
});
