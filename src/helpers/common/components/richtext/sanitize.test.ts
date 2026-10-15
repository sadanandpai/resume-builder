import { expect, it } from 'vitest';
import { sanitizeRichText } from './sanitize';

it('keeps toolbar formatting while removing pasted typography and unsupported elements', () => {
  expect(
    sanitizeRichText(
      '<h1 style="font-size:40px">Title</h1><p class="word" style="color:red"><span style="background:yellow"><strong>Bold</strong> <em>Italic</em></span></p><ul style="color:blue"><li><u>Item</u></li></ul>'
    )
  ).toBe('<div>Title</div><p><strong>Bold</strong> <em>Italic</em></p><ul><li>Item</li></ul>');
});

it('removes embedded content and unsafe link attributes', () => {
  expect(
    sanitizeRichText(
      '<style>p{color:red}</style><script>alert(1)</script><img src="x"><a href="javascript:alert(1)" onclick="bad()">Link</a>'
    )
  ).toBe('<a>Link</a>');
  expect(sanitizeRichText('<ol><li><a href="https://example.com">Site</a><br>More</li></ol>')).toBe(
    '<ol><li><a href="https://example.com">Site</a><br>More</li></ol>'
  );
});

it('treats missing fields in older resumes as empty text', () => {
  expect(sanitizeRichText(undefined)).toBe('');
  expect(sanitizeRichText(null)).toBe('');
  expect(sanitizeRichText('')).toBe('');
});
