import { describe, expect, it } from 'vitest';
import { sanitizeHtmlField } from './sanitizeHtml';

describe('sanitizeHtmlField', () => {
  it('keeps allow-listed formatting tags', () => {
    expect(sanitizeHtmlField('<p><strong>Bold</strong> <em>Italic</em></p>')).toBe(
      '<p><strong>Bold</strong> <em>Italic</em></p>'
    );
    expect(sanitizeHtmlField('<ul><li>Item</li></ul>')).toBe('<ul><li>Item</li></ul>');
  });

  it('removes scripts and unsafe link schemes', () => {
    const result = sanitizeHtmlField(
      '<script>alert(1)</script><a href="javascript:alert(1)">Link</a>'
    );
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('javascript:');
  });

  it('wraps disallowed block elements in a div instead of dropping their content', () => {
    expect(sanitizeHtmlField('<h1>Title</h1>')).toBe('<div>Title</div>');
    expect(sanitizeHtmlField('<blockquote>Quote</blockquote>')).toBe('<div>Quote</div>');
  });

  it('adds rel="noopener noreferrer" to target="_blank" links', () => {
    expect(sanitizeHtmlField('<a href="https://example.com" target="_blank">Site</a>')).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Site</a>'
    );
  });

  it('treats missing input as empty text', () => {
    expect(sanitizeHtmlField(undefined)).toBe('');
    expect(sanitizeHtmlField(null)).toBe('');
    expect(sanitizeHtmlField('')).toBe('');
  });
});
