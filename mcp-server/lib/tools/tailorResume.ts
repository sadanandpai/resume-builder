import { z } from 'zod';
import { getResume } from './getResume';

export const tailorResumeInputSchema = z.object({
  id: z.string().describe('The resume id to tailor.'),
  jobDescription: z.string().describe('The job description to tailor the resume towards.'),
});

export const tailorResumeAnnotations = {
  title: 'Tailor resume (read-only)',
  readOnlyHint: true,
  destructiveHint: false,
};

export const tailorResumeDescription =
  'Reads a saved resume and returns it together with a job description and rewrite ' +
  'instructions. This tool does NOT write anything and does NOT call an LLM itself -- ' +
  'the calling model should rewrite the relevant fields itself and then call ' +
  'create_resume with the rewritten content to save it as a brand-new resume. The ' +
  'original resume is never overwritten.';

export async function tailorResume(input: z.infer<typeof tailorResumeInputSchema>) {
  const { url, ...currentResume } = await getResume({ id: input.id });
  return {
    currentResume,
    jobDescription: input.jobDescription,
    instructions:
      'Rewrite basics.summary, basics.objective, and the summary/highlights of the most ' +
      'relevant work, volunteer, and award entries to emphasize experience and skills ' +
      'relevant to the job description, while preserving factual accuracy -- do not invent ' +
      'experience, dates, or qualifications that are not supported by currentResume. Keep ' +
      'rich text fields as Markdown. Then call create_resume with the rewritten resume to ' +
      'save it as a new, separate resume; do not call update_resume on the original.',
  };
}
