import { marked } from 'marked';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

// Converts AI-authored Markdown into the HTML the rich text fields store.
// Does not sanitize -- sanitization is environment-specific (the browser
// sanitizer needs a DOM; callers outside the browser must sanitize separately).
export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

// Converts a stored HTML field back into Markdown, e.g. for an AI client reading a resume.
export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}
