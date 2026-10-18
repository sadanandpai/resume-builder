import sanitizeHtmlLib from 'sanitize-html';
import { ALLOWED_TAGS, ALLOWED_LINK_SCHEMES } from './shared/sanitizeConfig';

// Node-native equivalent of the browser's sanitizeRichText (which needs a DOM
// and cannot run in this process). Same allow-list, same block-boundary
// preservation for headings/pasted containers that aren't on the allow-list.
const BLOCK_TAGS_TO_DIV = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'pre',
  'section',
  'article',
  'tr',
];

const allowedTags = ALLOWED_TAGS.map((tag) => tag.toLowerCase());

export function sanitizeHtmlField(html: string | null | undefined): string {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags,
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ALLOWED_LINK_SCHEMES.map((scheme) => scheme.replace(':', '')),
    transformTags: {
      ...Object.fromEntries(BLOCK_TAGS_TO_DIV.map((tag) => [tag, 'div'])),
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
      }),
    },
  });
}
