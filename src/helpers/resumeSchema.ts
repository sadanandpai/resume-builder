import { z } from 'zod';
import {
  normalizeImportedResume,
  RESUME_SHAPE,
  type Resume,
} from '@/modules/builder/nav-bar/normalizeImportedResume';
import {
  normalizeResumeMetadata,
  type ResumeMetadata,
} from '@/modules/builder/nav-bar/resumeMetadata';

export type { Resume };

const profileSchema = z.object({
  network: z.string().default(''),
  username: z.string().default(''),
  url: z.string().default(''),
});

const skillItemSchema = z.object({
  name: z.string().default(''),
  level: z.number().min(0).max(100).default(0),
});

const dateField = z
  .union([z.string(), z.null()])
  .default(null)
  .describe('Date as YYYY-MM-DD, or null for "present"/ongoing.');

const workItemSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  position: z.string().default(''),
  url: z.string().default(''),
  startDate: dateField,
  endDate: dateField,
  years: z.string().default(''),
  summary: z.string().default('').describe('Markdown. Rendered as rich text.'),
  highlights: z.array(z.string()).default([]).describe('Plain text bullet points, not Markdown.'),
  isWorkingHere: z.boolean().default(false),
});

const educationItemSchema = z.object({
  id: z.string().default(''),
  institution: z.string().default(''),
  url: z.string().default(''),
  studyType: z.string().default(''),
  area: z.string().default(''),
  startDate: dateField,
  endDate: dateField,
  score: z.string().default(''),
  courses: z.array(z.string()).default([]).describe('Plain text, not Markdown.'),
  isStudyingHere: z.boolean().default(false),
});

const volunteerItemSchema = z.object({
  id: z.string().default(''),
  organization: z.string().default(''),
  position: z.string().default(''),
  url: z.string().default(''),
  startDate: dateField,
  endDate: dateField,
  summary: z.string().default('').describe('Markdown. Rendered as rich text.'),
  highlights: z.array(z.string()).default([]).describe('Plain text bullet points, not Markdown.'),
  isVolunteeringNow: z.boolean().default(false),
});

const awardItemSchema = z.object({
  id: z.string().default(''),
  title: z.string().default(''),
  awarder: z.string().default(''),
  date: dateField,
  summary: z.string().default('').describe('Markdown. Rendered as rich text.'),
});

export const basicsSchema = z.object({
  name: z.string().min(1, 'basics.name is required.'),
  label: z.string().default(''),
  image: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
  url: z.string().default(''),
  summary: z.string().default('').describe('Markdown. Rendered as rich text.'),
  location: z
    .object({
      address: z.string().default(''),
      postalCode: z.string().default(''),
      city: z.string().default(''),
      countryCode: z.string().default(''),
      region: z.string().default(''),
    })
    .default({ address: '', postalCode: '', city: '', countryCode: '', region: '' }),
  relExp: z.string().default(''),
  totalExp: z.string().default(''),
  objective: z.string().default('').describe('Markdown. Rendered as rich text.'),
  profiles: z.array(profileSchema).default([]),
});

// Bare (default-less) building blocks, exported so a "patch" schema (partial
// update -- see mcp-server/lib/tools/updateResume.ts) can wrap them in plain
// `.optional()` instead of `.partial()`. In zod v4, `.partial()`/`.optional()`
// do NOT stop a field's own `.default(...)` from firing when the field is
// omitted -- the default still applies -- so a schema built from
// already-defaulted fields can't distinguish "omitted" from "explicitly
// empty" after parsing. These bare versions have no such default to misfire.
export const skillsObjectSchema = z.object({
  languages: z.array(skillItemSchema).default([]),
  frameworks: z.array(skillItemSchema).default([]),
  libraries: z.array(skillItemSchema).default([]),
  databases: z.array(skillItemSchema).default([]),
  technologies: z.array(skillItemSchema).default([]),
  practices: z.array(skillItemSchema).default([]),
  tools: z.array(skillItemSchema).default([]),
});

export const activitiesObjectSchema = z.object({
  involvements: z.string().default('').describe('Markdown. Rendered as rich text.'),
  achievements: z.string().default('').describe('Markdown. Rendered as rich text.'),
});

export const workArraySchema = z.array(workItemSchema);
export const educationArraySchema = z.array(educationItemSchema);
export const volunteerArraySchema = z.array(volunteerItemSchema);
export const awardsArraySchema = z.array(awardItemSchema);

const skillsSchema = skillsObjectSchema.default({
  languages: [],
  frameworks: [],
  libraries: [],
  databases: [],
  technologies: [],
  practices: [],
  tools: [],
});

const activitiesSchema = activitiesObjectSchema.default({ involvements: '', achievements: '' });

// The AI-facing, defaulted/loose schema. Mirrors RESUME_SHAPE field-by-field.
// Only basics.name has no sensible default; everything else fills in empty.
export const ResumeInputSchema = z.object({
  basics: basicsSchema,
  skills: skillsSchema,
  work: workArraySchema.default([]),
  education: educationArraySchema.default([]),
  volunteer: volunteerArraySchema.default([]),
  awards: awardsArraySchema.default([]),
  activities: activitiesSchema,
  // Template/colours/layout/titles. Validated separately by normalizeResumeMetadata
  // (see resumeMetadata.ts) -- left untyped here since its shape depends on the
  // selected template's own title keys.
  __metadata: z.unknown().optional(),
});

export type ResumeInput = z.infer<typeof ResumeInputSchema>;

// Sanity check: keep this schema's sections in sync with the normalizer it feeds into.
const RESUME_SHAPE_KEYS = Object.keys(RESUME_SHAPE);
export function assertResumeShapeParity(): void {
  const schemaKeys = Object.keys(ResumeInputSchema.shape).filter((key) => key !== '__metadata');
  const missing = RESUME_SHAPE_KEYS.filter((key) => !schemaKeys.includes(key));
  const extra = schemaKeys.filter((key) => !RESUME_SHAPE_KEYS.includes(key));
  if (missing.length || extra.length) {
    throw new Error(
      `ResumeInputSchema is out of sync with RESUME_SHAPE (missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}).`
    );
  }
}

export type ParsedResumeInput = Resume & { __metadata?: ResumeMetadata };

// Validates and defaults AI-supplied JSON, then runs it through the same
// normalizer the app's own file-import path uses, so persisted shape stays
// identical regardless of where the data came from.
export function parseResumeInput(data: unknown): ParsedResumeInput {
  const input = ResumeInputSchema.parse(data);
  const resume = normalizeImportedResume(input);
  const metadata = normalizeResumeMetadata(input.__metadata);
  return metadata ? { ...resume, __metadata: metadata } : resume;
}

// For reading an already-saved resume (e.g. an MCP get_resume call), not for
// validating AI-supplied input. Skips ResumeInputSchema's basics.name
// requirement -- that's a write-time constraint, not something a read of an
// existing, already-saved document should enforce.
export function normalizeStoredResume(data: unknown): ParsedResumeInput {
  const resume = normalizeImportedResume(data);
  const metadata = normalizeResumeMetadata((data as Record<string, unknown> | null)?.__metadata);
  return metadata ? { ...resume, __metadata: metadata } : resume;
}
