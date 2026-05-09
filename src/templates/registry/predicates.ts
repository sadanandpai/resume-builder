/** Shared “has content” checks for resume sections (aligned with SectionValidator usage). */
export const hasLen = (v: unknown) =>
  !!(v && (typeof v === 'string' ? v.length : (v as any[]).length));

export const basicsSummary = (r: any) => hasLen(r.basics?.summary);
export const basicsObjective = (r: any) => hasLen(r.basics?.objective);
export const work = (r: any) => hasLen(r.work);
export const awards = (r: any) => hasLen(r.awards);
export const education = (r: any) => hasLen(r.education);
export const volunteer = (r: any) => hasLen(r.volunteer);
export const involvement = (r: any) => hasLen(r.activities?.involvements);
export const achievements = (r: any) => hasLen(r.activities?.achievements);
export const languages = (r: any) => hasLen(r.skills?.languages);
export const technologies = (r: any) => hasLen(r.skills?.technologies);
export const tools = (r: any) => hasLen(r.skills?.tools);
export const practices = (r: any) => hasLen(r.skills?.practices);

export const skillsLangFrameworks = (r: any) =>
  hasLen(r.skills?.languages?.concat(r.skills?.frameworks));

export const frameworksLibs = (r: any) => hasLen(r.skills?.frameworks?.concat(r.skills?.libraries));

export const techExpertise = (r: any) => hasLen(r.skills?.languages?.concat(r.skills?.frameworks));

export const skillsExposure = (r: any) =>
  hasLen(r.skills?.technologies?.concat(r.skills?.libraries, r.skills?.databases));

export const skillsMerged = (r: any) =>
  hasLen(r.skills?.languages?.concat(r.skills?.frameworks, r.skills?.tools));

export const stackToolsDatabases = (r: any) => hasLen(r.skills?.tools?.concat(r.skills?.databases));
