import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkRateLimit, clientIdFromRequest, RateLimitError } from './rateLimit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(() => checkRateLimit('write', 'client-a-under')).not.toThrow();
    }
  });

  it('throws RateLimitError once the write limit is exceeded', () => {
    const clientId = 'client-b-write-limit';
    for (let i = 0; i < 20; i++) checkRateLimit('write', clientId);
    expect(() => checkRateLimit('write', clientId)).toThrow(RateLimitError);
  });

  it('tracks read and write limits independently per client', () => {
    const clientId = 'client-c-independent';
    for (let i = 0; i < 20; i++) checkRateLimit('write', clientId);
    expect(() => checkRateLimit('write', clientId)).toThrow(RateLimitError);
    expect(() => checkRateLimit('read', clientId)).not.toThrow();
  });

  it('tracks limits independently per client id', () => {
    for (let i = 0; i < 20; i++) checkRateLimit('write', 'client-d');
    expect(() => checkRateLimit('write', 'client-e')).not.toThrow();
  });

  it('resets after the window elapses', () => {
    const clientId = 'client-f-window';
    for (let i = 0; i < 20; i++) checkRateLimit('write', clientId);
    expect(() => checkRateLimit('write', clientId)).toThrow(RateLimitError);
    vi.advanceTimersByTime(60 * 60 * 1000 + 1);
    expect(() => checkRateLimit('write', clientId)).not.toThrow();
  });
});

describe('clientIdFromRequest', () => {
  it('reads the first entry of x-forwarded-for', () => {
    const request = new Request('http://localhost/mcp', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(clientIdFromRequest(request)).toBe('1.2.3.4');
  });

  it('falls back to "unknown" when the header is missing', () => {
    expect(clientIdFromRequest(new Request('http://localhost/mcp'))).toBe('unknown');
  });
});
