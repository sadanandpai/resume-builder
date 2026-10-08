import type { IBasicDetailsItem } from '@/stores/basic.interface';
import type { IExperienceItem } from '@/stores/experience.interface';
import type { IEducationItem } from '@/stores/education.interface';
import type { IAwardItem } from '@/stores/awards.interface';
import type { IVolunteeringItem } from '@/stores/volunteering.interface';
import type { IActivity } from '@/stores/activity.interface';
import type { ISkillItem } from '@/stores/skill.interface';

type Schema = string | number | boolean | null | Schema[] | { [key: string]: Schema };
const skill = { name: '', level: 0 };
const schema = {
  basics: {
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: { address: '', postalCode: '', city: '', countryCode: '', region: '' },
    relExp: '',
    totalExp: '',
    objective: '',
    profiles: [{ network: '', username: '', url: '' }],
  },
  skills: {
    languages: [skill],
    frameworks: [skill],
    libraries: [skill],
    databases: [skill],
    technologies: [skill],
    practices: [skill],
    tools: [skill],
  },
  work: [
    {
      id: '',
      name: '',
      position: '',
      url: '',
      startDate: null,
      endDate: null,
      years: '',
      summary: '',
      highlights: [''],
      isWorkingHere: false,
    },
  ],
  education: [
    {
      id: '',
      institution: '',
      url: '',
      studyType: '',
      area: '',
      startDate: null,
      endDate: null,
      score: '',
      courses: [''],
      isStudyingHere: false,
    },
  ],
  volunteer: [
    {
      id: '',
      organization: '',
      position: '',
      url: '',
      startDate: null,
      endDate: null,
      summary: '',
      highlights: [''],
      isVolunteeringNow: false,
    },
  ],
  awards: [{ id: '', title: '', awarder: '', date: null, summary: '' }],
  activities: { involvements: '', achievements: '' },
} satisfies Schema;

interface ImportedResume {
  basics: IBasicDetailsItem;
  skills: Record<keyof typeof schema.skills, ISkillItem[]>;
  work: IExperienceItem[];
  education: IEducationItem[];
  volunteer: IVolunteeringItem[];
  awards: IAwardItem[];
  activities: IActivity;
}

function normalize(value: unknown, shape: Schema, path: string): unknown {
  if (Array.isArray(shape)) {
    if (value === undefined) return [];
    if (!Array.isArray(value)) throw new Error(`${path} must be an array.`);
    return value.map((item, index) => {
      if (item === undefined) throw new Error(`${path}[${index}] is missing.`);
      return normalize(item, shape[0], `${path}[${index}]`);
    });
  }
  if (shape !== null && typeof shape === 'object') {
    if (
      value !== undefined &&
      (value === null || typeof value !== 'object' || Array.isArray(value))
    ) {
      throw new Error(`${path} must be an object.`);
    }
    const record = (value ?? {}) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(shape).map(([key, child]) => [
        key,
        normalize(Object.hasOwn(record, key) ? record[key] : undefined, child, `${path}.${key}`),
      ])
    );
  }
  if (value === undefined) return shape;
  if (shape === null) {
    if (value === null || typeof value === 'string') return value;
    throw new Error(`${path} must be a date string or null.`);
  }
  if (typeof value !== typeof shape || (typeof value === 'number' && !Number.isFinite(value))) {
    throw new Error(`${path} must be a ${typeof shape}.`);
  }
  return value;
}

export function normalizeImportedResume(value: unknown): ImportedResume {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    !Object.keys(schema).some((key) => Object.hasOwn(value, key))
  ) {
    throw new Error('Resume JSON must be an object containing resume sections.');
  }
  // Missing fields get empty defaults; unknown fields cannot enter persisted state.
  const resume = normalize(value, schema, 'resume') as ImportedResume;
  for (const section of ['work', 'education', 'volunteer', 'awards'] as const) {
    const ids = new Set<string>();
    for (const item of resume[section]) {
      if (!item.id) item.id = crypto.randomUUID();
      if (ids.has(item.id)) throw new Error(`resume.${section} contains duplicate IDs.`);
      ids.add(item.id);
    }
  }
  return resume;
}
