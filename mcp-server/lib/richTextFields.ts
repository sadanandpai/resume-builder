import { htmlToMarkdown, markdownToHtml } from './shared/richTextMarkdown';
import { sanitizeHtmlField } from './sanitizeHtml';
import type { ParsedResumeInput } from './shared/resumeSchema';

// The resume fields that are rich text (stored as sanitized HTML), per
// src/helpers/common/components/richtext -- everything else (highlights,
// courses) is plain text, not Markdown. Markdown and HTML are both just
// `string` at the type level, so the same shape serves both directions.
export function markdownFieldsToHtml(resume: ParsedResumeInput): ParsedResumeInput {
  return {
    ...resume,
    basics: {
      ...resume.basics,
      summary: sanitizeHtmlField(markdownToHtml(resume.basics.summary)),
      objective: sanitizeHtmlField(markdownToHtml(resume.basics.objective)),
    },
    work: resume.work.map((item) => ({
      ...item,
      summary: sanitizeHtmlField(markdownToHtml(item.summary)),
    })),
    volunteer: resume.volunteer.map((item) => ({
      ...item,
      summary: sanitizeHtmlField(markdownToHtml(item.summary)),
    })),
    awards: resume.awards.map((item) => ({
      ...item,
      summary: sanitizeHtmlField(markdownToHtml(item.summary)),
    })),
    activities: {
      involvements: sanitizeHtmlField(markdownToHtml(resume.activities.involvements)),
      achievements: sanitizeHtmlField(markdownToHtml(resume.activities.achievements)),
    },
  };
}

export function htmlFieldsToMarkdown(resume: ParsedResumeInput): ParsedResumeInput {
  return {
    ...resume,
    basics: {
      ...resume.basics,
      summary: htmlToMarkdown(resume.basics.summary),
      objective: htmlToMarkdown(resume.basics.objective),
    },
    work: resume.work.map((item) => ({
      ...item,
      summary: htmlToMarkdown(item.summary),
    })),
    volunteer: resume.volunteer.map((item) => ({
      ...item,
      summary: htmlToMarkdown(item.summary),
    })),
    awards: resume.awards.map((item) => ({
      ...item,
      summary: htmlToMarkdown(item.summary),
    })),
    activities: {
      involvements: htmlToMarkdown(resume.activities.involvements),
      achievements: htmlToMarkdown(resume.activities.achievements),
    },
  };
}
