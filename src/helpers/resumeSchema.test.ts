import { describe, expect, it } from 'vitest';
import { RESUME_SHAPE } from '@/modules/builder/nav-bar/normalizeImportedResume';
import { assertResumeShapeParity, parseResumeInput, ResumeInputSchema } from './resumeSchema';

describe('parseResumeInput', () => {
  it('fills in defaults for a minimal resume', () => {
    const resume = parseResumeInput({ basics: { name: 'Jane Doe' } });
    expect(resume.basics.name).toBe('Jane Doe');
    expect(resume.basics.summary).toBe('');
    expect(resume.work).toEqual([]);
    expect(resume.skills.languages).toEqual([]);
    expect(resume.activities).toEqual({ involvements: '', achievements: '' });
  });

  it('requires basics.name', () => {
    expect(() => parseResumeInput({ basics: { name: '' } })).toThrow();
    expect(() => parseResumeInput({})).toThrow();
  });

  it('passes __metadata through when present, and omits it when absent', () => {
    const withoutMetadata = parseResumeInput({ basics: { name: 'Jane Doe' } });
    expect(withoutMetadata).not.toHaveProperty('__metadata');

    const withMetadata = parseResumeInput({
      basics: { name: 'Jane Doe' },
      __metadata: {
        version: 1,
        template: { id: 'modern', name: 'Modern' },
        titles: {},
        layout: {},
        colors: {
          selectedTheme: {
            id: 1,
            backgroundColor: '#ffffff',
            fontColor: '#000000',
            titleColor: '#000000',
            highlighterColor: '#000000',
          },
          customTheme: {
            id: 2,
            backgroundColor: '#ffffff',
            fontColor: '#000000',
            titleColor: '#000000',
            highlighterColor: '#000000',
          },
        },
        styles: {},
      },
    });
    expect(withMetadata.__metadata?.template.id).toBe('modern');
  });

  it('delegates duplicate-id handling to normalizeImportedResume', () => {
    expect(() =>
      parseResumeInput({
        basics: { name: 'Jane Doe' },
        work: [
          { id: 'a', name: 'A' },
          { id: 'a', name: 'B' },
        ],
      })
    ).toThrow(/duplicate/i);
  });

  it('keeps ResumeInputSchema in sync with RESUME_SHAPE', () => {
    expect(() => assertResumeShapeParity()).not.toThrow();
    expect(
      Object.keys(ResumeInputSchema.shape)
        .filter((key) => key !== '__metadata')
        .sort()
    ).toEqual(Object.keys(RESUME_SHAPE).sort());
  });
});
