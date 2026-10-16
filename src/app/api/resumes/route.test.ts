// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue(
    JSON.stringify({
      type: 'service_account',
      client_email: 'test@example.com',
      private_key: 'test-key',
    })
  ),
}));

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  doc: vi.fn(),
  collection: vi.fn(),
  runTransaction: vi.fn(),
}));
vi.mock('@google-cloud/firestore', () => ({
  FieldValue: { increment: (value: number) => ({ increment: value }) },
  Firestore: class {
    collection = mocks.collection;
    runTransaction = mocks.runTransaction;
  },
}));
import { POST } from './route';
import { hashResumeCode } from '@/helpers/resumeEditAccess';

const request = (body: string) =>
  new Request('http://localhost/api/resumes', { method: 'POST', body });

describe('resume export storage', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'resume-builder-db-storage');
    vi.stubEnv('GOOGLE_APPLICATION_CREDENTIALS', '/test/credentials.json');
    mocks.collection.mockReturnValue({ doc: mocks.doc });
    mocks.doc.mockReturnValue({ create: mocks.create, update: mocks.update });
    mocks.create.mockResolvedValue(undefined);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it.each(['development', 'production'])(
    'stores the complete JSON using a Nano ID in %s',
    async (environment) => {
      vi.stubEnv('NODE_ENV', environment);
      const resume = { basics: { name: 'Sadanand' }, work: [], __metadata: { template: 'modern' } };
      const response = await POST(request(JSON.stringify(resume)));
      expect(response.status).toBe(201);
      const { id, code } = await response.json();
      expect(code).toMatch(/^[A-Za-z0-9]{4}$/);
      expect(response.headers.get('Cache-Control')).toBe('no-store');
      expect(id).toMatch(/^[A-Za-z0-9_-]{21}$/);
      expect(mocks.collection).toHaveBeenCalledWith('resume');
      expect(mocks.doc).toHaveBeenCalledWith(id);
      expect(mocks.create).toHaveBeenCalledWith({
        json: resume,
        viewCount: 0,
        editCount: 0,
        codeHash: hashResumeCode(id, code),
      });
    }
  );

  it('rejects invalid input without writing', async () => {
    expect((await POST(request('{'))).status).toBe(400);
    expect((await POST(request('[]'))).status).toBe(400);
    expect((await POST(request('x'.repeat(900_001)))).status).toBe(413);
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('reports credential or database failures', async () => {
    mocks.create.mockRejectedValue(new Error('credentials unavailable'));
    expect((await POST(request('{"basics":{}}'))).status).toBe(503);
  });

  it('reports denied access without exposing implementation details', async () => {
    mocks.create.mockRejectedValue({ code: 7, message: 'sensitive internal details' });
    const response = await POST(request('{"basics":{}}'));
    expect(response.status).toBe(503);
    const result = await response.json();
    expect(result.error).toBe('Could not save your resume. Please try again later.');
    expect(result.error).not.toContain('sensitive');
  });

  it('returns a generic error when service account credentials are missing', async () => {
    vi.stubEnv('GOOGLE_APPLICATION_CREDENTIALS', '');
    const response = await POST(request('{"basics":{}}'));
    expect(response.status).toBe(503);
    expect((await response.json()).error).toBe(
      'Could not save your resume. Please try again later.'
    );
    expect(mocks.create).not.toHaveBeenCalled();
  });
});

it.each(['development', 'production'])(
  'updates an existing ID in %s without creating a new document',
  async (environment) => {
    vi.stubEnv('NODE_ENV', environment);
    vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'test');
    vi.stubEnv('GOOGLE_APPLICATION_CREDENTIALS', '/test/credentials.json');
    mocks.collection.mockReturnValue({ doc: mocks.doc });
    mocks.doc.mockReturnValue({ update: mocks.update });
    mocks.runTransaction.mockImplementation(async (callback) =>
      callback({
        get: vi
          .fn()
          .mockResolvedValueOnce({
            exists: true,
            data: () => ({ codeHash: hashResumeCode('abcdefghijklmnopqrstu', 'a7B2') }),
          })
          .mockResolvedValueOnce({ data: () => undefined }),
        update: (_document: unknown, data: unknown) => mocks.update(data),
      })
    );
    const id = 'abcdefghijklmnopqrstu';
    const resume = { basics: { name: 'Updated' } };
    const response = await POST(
      new Request(`http://localhost/api/resumes?id=${id}`, {
        method: 'POST',
        headers: { 'X-Resume-Code': 'a7B2' },
        body: JSON.stringify(resume),
      })
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id });
    expect(mocks.doc).toHaveBeenCalledWith(id);
    expect(mocks.update).toHaveBeenCalledWith({ json: resume, editCount: { increment: 1 } });
    vi.unstubAllEnvs();
  }
);
