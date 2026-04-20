import { applyImportedResumeJson } from './applyImportedResume';

export function assertFetchableHttpUrl(raw: string): URL {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error('Enter a URL to your resume JSON file.');
  }
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error('Invalid URL.');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only http and https URLs are allowed.');
  }
  return url;
}

export async function fetchAndApplyResumeFromUrl(urlString: string): Promise<void> {
  const fetchUrl = assertFetchableHttpUrl(urlString);
  const response = await fetch(fetchUrl.toString(), {
    credentials: 'omit',
    mode: 'cors',
  });
  if (!response.ok) {
    const detail = response.statusText ? ` ${response.statusText}` : '';
    throw new Error(`Server returned ${response.status}.${detail}`);
  }
  const text = await response.text();
  let data: unknown;
  try {
    data = JSON.parse(text) as unknown;
  } catch {
    throw new Error(
      'The response was not valid JSON. The URL may point to an error page or non-JSON content.'
    );
  }
  applyImportedResumeJson(data);
}

export function formatImportUrlError(e: unknown): string {
  if (e instanceof TypeError) {
    return e.message === 'Failed to fetch'
      ? 'Could not reach the URL (network error or CORS blocked the request).'
      : e.message;
  }
  if (e instanceof Error) {
    return e.message;
  }
  return 'Import failed. If the URL is correct, the host may block cross-origin requests (CORS).';
}
