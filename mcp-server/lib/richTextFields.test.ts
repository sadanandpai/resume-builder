import { describe, expect, it } from 'vitest';
import { htmlFieldsToMarkdown, markdownFieldsToHtml } from './richTextFields';
import { parseResumeInput } from './shared/resumeSchema';

describe('markdownFieldsToHtml', () => {
  it('converts and sanitizes rich text fields, leaving plain text fields alone', () => {
    const resume = parseResumeInput({
      basics: { name: 'Jane Doe', summary: '**Bold** summary', objective: '*Italic* objective' },
      work: [
        {
          id: 'w1',
          name: 'Acme',
          summary: '**Led** the team',
          highlights: ['Shipped **not markdown**'],
        },
      ],
      activities: { involvements: '- one\n- two', achievements: '**Won** an award' },
    });

    const html = markdownFieldsToHtml(resume);
    expect(html.basics.summary.trim()).toBe('<p><strong>Bold</strong> summary</p>');
    expect(html.basics.objective.trim()).toBe('<p><em>Italic</em> objective</p>');
    expect(html.work[0].summary.trim()).toBe('<p><strong>Led</strong> the team</p>');
    // highlights are plain text, never converted
    expect(html.work[0].highlights).toEqual(['Shipped **not markdown**']);
    expect(html.activities.involvements).toContain('<li>one</li>');
    expect(html.activities.achievements.trim()).toBe('<p><strong>Won</strong> an award</p>');
  });

  it('strips unsafe HTML even if a markdown field contains raw HTML', () => {
    const resume = parseResumeInput({
      basics: { name: 'Jane Doe', summary: '<script>alert(1)</script>Hello' },
    });
    const html = markdownFieldsToHtml(resume);
    expect(html.basics.summary).not.toContain('<script>');
  });
});

describe('htmlFieldsToMarkdown', () => {
  it('converts HTML fields back to Markdown', () => {
    const resume = parseResumeInput({
      basics: { name: 'Jane Doe', summary: '<p><strong>Bold</strong> summary</p>' },
      awards: [{ id: 'a1', title: 'Award', summary: '<p><em>Great</em> work</p>' }],
    });
    const markdown = htmlFieldsToMarkdown(resume);
    expect(markdown.basics.summary).toContain('**Bold**');
    expect(markdown.awards[0].summary).toContain('_Great_');
  });
});
