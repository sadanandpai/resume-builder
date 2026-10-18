const BASE_URL = (process.env.RESUME_APP_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export class ResumeApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ResumeApiError';
  }
}

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error ?? `Request failed with status ${response.status}.`;
  } catch {
    return `Request failed with status ${response.status}.`;
  }
}

// Creates a new saved resume. Mirrors POST /api/resumes with no ?id.
export async function createResumeRemote(resume: unknown): Promise<{ id: string; code: string }> {
  const response = await fetch(`${BASE_URL}/api/resumes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resume),
  });
  if (!response.ok) throw new ResumeApiError(response.status, await readError(response));
  return (await response.json()) as { id: string; code: string };
}

// Updates an existing saved resume. Mirrors POST /api/resumes?id=... with X-Resume-Code.
export async function updateResumeRemote(
  id: string,
  code: string,
  resume: unknown
): Promise<{ id: string }> {
  const response = await fetch(`${BASE_URL}/api/resumes?id=${encodeURIComponent(id)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Resume-Code': code },
    body: JSON.stringify(resume),
  });
  if (!response.ok) throw new ResumeApiError(response.status, await readError(response));
  return (await response.json()) as { id: string };
}

// Reads a saved resume. Mirrors GET /api/resumes/[id].
export async function getResumeRemote(id: string): Promise<Record<string, unknown>> {
  const response = await fetch(`${BASE_URL}/api/resumes/${encodeURIComponent(id)}`);
  if (!response.ok) throw new ResumeApiError(response.status, await readError(response));
  return (await response.json()) as Record<string, unknown>;
}

export function builderUrl(id: string): string {
  return `${BASE_URL}/builder/${id}`;
}

export function builderEditUrl(id: string, code: string): string {
  return `${BASE_URL}/builder/${id}?code=${code}`;
}
