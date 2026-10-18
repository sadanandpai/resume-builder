// Single source of truth for the rich text allow-list, shared by the browser
// sanitizer (sanitize.ts) and the MCP server's Node-native sanitizer.
export const ALLOWED_TAGS = ['P', 'DIV', 'BR', 'B', 'STRONG', 'I', 'EM', 'UL', 'OL', 'LI', 'A'];

export const DISCARD_TAGS = [
  'SCRIPT',
  'STYLE',
  'IFRAME',
  'OBJECT',
  'EMBED',
  'SVG',
  'MATH',
  'TEMPLATE',
];

export const ALLOWED_LINK_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'];
