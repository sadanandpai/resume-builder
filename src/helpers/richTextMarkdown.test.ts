import { describe, expect, it } from 'vitest';
import { htmlToMarkdown, markdownToHtml } from './richTextMarkdown';

describe('markdownToHtml', () => {
  it('converts common Markdown constructs to HTML', () => {
    expect(markdownToHtml('**Bold** and *italic*')).toContain('<strong>Bold</strong>');
    expect(markdownToHtml('**Bold** and *italic*')).toContain('<em>italic</em>');
    expect(markdownToHtml('- one\n- two')).toContain('<li>one</li>');
    expect(markdownToHtml('[site](https://example.com)')).toContain(
      '<a href="https://example.com">site</a>'
    );
  });

  it('handles empty input', () => {
    expect(markdownToHtml('')).toBe('');
  });
});

describe('htmlToMarkdown', () => {
  it('converts stored HTML back to Markdown', () => {
    expect(htmlToMarkdown('<p><strong>Bold</strong> and <em>italic</em></p>')).toContain(
      '**Bold**'
    );
    expect(htmlToMarkdown('<ul><li>one</li><li>two</li></ul>')).toContain('*   one');
    expect(htmlToMarkdown('<a href="https://example.com">site</a>')).toContain(
      '[site](https://example.com)'
    );
  });

  it('handles empty input', () => {
    expect(htmlToMarkdown('')).toBe('');
  });
});

describe('round-trip', () => {
  it('preserves bold, italic, lists, and links through markdown -> html -> markdown', () => {
    const original =
      '**Bold** and *italic* text.\n\n-   one\n-   two\n\n[site](https://example.com)';
    const roundTripped = htmlToMarkdown(markdownToHtml(original));
    expect(roundTripped).toContain('**Bold**');
    expect(roundTripped).toContain('_italic_');
    expect(roundTripped).toContain('one');
    expect(roundTripped).toContain('two');
    expect(roundTripped).toContain('[site](https://example.com)');
  });
});
