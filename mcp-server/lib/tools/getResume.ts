import { z } from 'zod';
import { getResumeRemote, builderUrl } from '../httpClient';
import { htmlFieldsToMarkdown } from '../richTextFields';
import { normalizeStoredResume, type ParsedResumeInput } from '../shared/resumeSchema';

export const getResumeInputSchema = z.object({
  id: z.string().describe('The resume id, from a previous create_resume/update_resume response.'),
});

export const getResumeAnnotations = {
  title: 'Get resume',
  readOnlyHint: true,
  destructiveHint: false,
};

export const getResumeDescription =
  'Reads a saved resume by id. Rich text fields are returned as Markdown. ' +
  'Anyone with the id can read a resume -- no edit code is required for this.';

export async function getResume(
  input: z.infer<typeof getResumeInputSchema>
): Promise<ParsedResumeInput & { url: string }> {
  const raw = await getResumeRemote(input.id);
  const resume = normalizeStoredResume(raw);
  return { ...htmlFieldsToMarkdown(resume), url: builderUrl(input.id) };
}
