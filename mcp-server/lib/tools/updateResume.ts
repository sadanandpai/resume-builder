import { z } from 'zod';
import { getResumeRemote, updateResumeRemote, builderUrl } from '../httpClient';
import { markdownToHtml } from '../shared/richTextMarkdown';
import { sanitizeHtmlField } from '../sanitizeHtml';
import {
  parseResumeInput,
  activitiesObjectSchema,
  awardsArraySchema,
  basicsSchema,
  educationArraySchema,
  skillsObjectSchema,
  volunteerArraySchema,
  workArraySchema,
} from '../shared/resumeSchema';

// Built from the bare (default-less) schemas, each wrapped in plain
// `.optional()` -- NOT `ResumeInputSchema.partial()`. In zod v4, `.partial()`
// doesn't stop a field's own `.default(...)` from firing when the field is
// omitted, so a patch built from already-defaulted fields can't tell
// "omitted" apart from "explicitly empty" (see resumeSchema.ts's comment).
const patchSchema = z.object({
  basics: basicsSchema.optional(),
  skills: skillsObjectSchema.optional(),
  work: workArraySchema.optional(),
  education: educationArraySchema.optional(),
  volunteer: volunteerArraySchema.optional(),
  awards: awardsArraySchema.optional(),
  activities: activitiesObjectSchema.optional(),
  __metadata: z.unknown().optional(),
});
type Patch = z.infer<typeof patchSchema>;

export const updateResumeInputSchema = z.object({
  id: z.string().describe('The resume id to update.'),
  code: z
    .string()
    .length(4)
    .describe('The 4-character edit code returned when this resume was created.'),
  patch: patchSchema.describe(
    'Only the sections to change. Each included section fully replaces the existing one ' +
      '(arrays are replaced whole, not merged item-by-item). Sections left out are kept unchanged.'
  ),
});

export const updateResumeAnnotations = {
  title: 'Update resume',
  readOnlyHint: false,
  destructiveHint: true,
};

export const updateResumeDescription =
  'Overwrites one or more sections of an existing saved resume. Requires the edit code ' +
  'returned by create_resume. Sections you include fully replace the current ones (no ' +
  'item-level merging within an array); sections you omit are left untouched. Rich text ' +
  'fields accept Markdown.';

function markdownBasics(basics: NonNullable<Patch['basics']>) {
  return {
    ...basics,
    summary: sanitizeHtmlField(markdownToHtml(basics.summary)),
    objective: sanitizeHtmlField(markdownToHtml(basics.objective)),
  };
}

function markdownItems<T extends { summary: string }>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    summary: sanitizeHtmlField(markdownToHtml(item.summary)),
  }));
}

function markdownActivities(activities: NonNullable<Patch['activities']>) {
  return {
    involvements: sanitizeHtmlField(markdownToHtml(activities.involvements)),
    achievements: sanitizeHtmlField(markdownToHtml(activities.achievements)),
  };
}

export async function updateResume(
  input: z.infer<typeof updateResumeInputSchema>
): Promise<{ id: string; url: string }> {
  const current = await getResumeRemote(input.id);
  const { patch } = input;

  // Only patch-supplied sections get Markdown->HTML converted; sections carried
  // over from `current` are already HTML and must not be run through the
  // converter again.
  const merged: Record<string, unknown> = { ...(current as Record<string, unknown>) };
  if (patch.basics) merged.basics = markdownBasics(patch.basics);
  if (patch.skills) merged.skills = patch.skills;
  if (patch.work) merged.work = markdownItems(patch.work);
  if (patch.education) merged.education = patch.education;
  if (patch.volunteer) merged.volunteer = markdownItems(patch.volunteer);
  if (patch.awards) merged.awards = markdownItems(patch.awards);
  if (patch.activities) merged.activities = markdownActivities(patch.activities);
  if (patch.__metadata !== undefined) merged.__metadata = patch.__metadata;

  // Even a "patch" must still produce a structurally valid whole resume.
  const validated = parseResumeInput(merged);
  const { id } = await updateResumeRemote(input.id, input.code, validated);
  return { id, url: builderUrl(id) };
}
