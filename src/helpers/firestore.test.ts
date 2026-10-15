// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({ readFile: vi.fn() }));
const mocks = vi.hoisted(() => ({ initialize: vi.fn() }));
vi.mock('@google-cloud/firestore', () => ({
  Firestore: class {
    constructor(options: unknown) {
      mocks.initialize(options);
    }
  },
}));
const credentials = {
  type: 'service_account',
  client_email: 'test@example.com',
  private_key: 'test-key',
};
beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'test-project');
  vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_JSON', '');
  vi.stubEnv('GOOGLE_APPLICATION_CREDENTIALS', '');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
it.each(['GOOGLE_SERVICE_ACCOUNT_JSON', 'GOOGLE_APPLICATION_CREDENTIALS'])(
  'accepts inline JSON from %s without opening a file',
  async (name) => {
    vi.stubEnv(name, JSON.stringify(credentials));
    const { getResumeFirestore } = await import('./firestore');
    await getResumeFirestore();
    expect(readFile).not.toHaveBeenCalled();
    expect(mocks.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: 'test-project',
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      })
    );
  }
);
it('continues to load local credential files', async () => {
  vi.stubEnv('GOOGLE_APPLICATION_CREDENTIALS', '/local/key.json');
  vi.mocked(readFile).mockResolvedValue(JSON.stringify(credentials));
  const { getResumeFirestore } = await import('./firestore');
  await getResumeFirestore();
  expect(readFile).toHaveBeenCalledWith('/local/key.json', 'utf8');
});
it('does not expose invalid JSON contents in errors', async () => {
  vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_JSON', '{secret-invalid-json');
  const { getResumeFirestore } = await import('./firestore');
  await expect(getResumeFirestore()).rejects.toThrow('Could not read service account credentials.');
  expect(readFile).not.toHaveBeenCalled();
});
