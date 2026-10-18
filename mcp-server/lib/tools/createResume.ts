import { z } from 'zod';
import { createResumeRemote, builderUrl, builderEditUrl } from '../httpClient';
import { markdownFieldsToHtml } from '../richTextFields';
import { ResumeInputSchema, parseResumeInput } from '../shared/resumeSchema';

export const createResumeInputSchema = ResumeInputSchema;

export const createResumeAnnotations = {
  title: 'Create resume',
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: false,
};

export const createResumeDescription =
  'Creates a brand-new saved resume and returns a link to open it in the builder. ' +
  'Rich text fields (summaries, objective, award/activity descriptions) accept Markdown; ' +
  'highlights and course lists are plain text, not Markdown. The returned "code" is a ' +
  '4-character edit code shown ONLY this once -- tell the user to save it if they want to ' +
  'edit this resume later (via update_resume), since there is no way to recover a lost code.';

export async function createResume(
  input: z.input<typeof ResumeInputSchema>
): Promise<{ id: string; code: string; url: string; editUrl: string }> {
  const parsed = parseResumeInput(input);
  const withHtml = markdownFieldsToHtml(parsed);
  const { id, code } = await createResumeRemote(withHtml);
  return { id, code, url: builderUrl(id), editUrl: builderEditUrl(id, code) };
}
