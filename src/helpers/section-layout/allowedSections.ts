/* eslint-disable @typescript-eslint/no-explicit-any */
/** Mirrors each template's SectionValidator "has content" checks so layout ids stay in sync. */

export function getAllowedSectionIdsForTemplate(templateId: string, resumeData: any): Set<string> {
  const basics = resumeData.basics;
  const skills = resumeData.skills;
  const allowedSectionIds = new Set<string>();

  const hasLen = (v: unknown) => !!(v && (typeof v === 'string' ? v.length : (v as any[]).length));

  switch (templateId) {
    case 'modern': {
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.awards)) allowedSectionIds.add('awards');
      if (hasLen(basics.objective)) allowedSectionIds.add('objective');
      if (hasLen(skills.languages)) allowedSectionIds.add('languages');
      if (hasLen(skills.technologies)) allowedSectionIds.add('technologies');
      if (hasLen(skills.frameworks.concat(skills.libraries)))
        allowedSectionIds.add('frameworks_libs');
      if (hasLen(skills.tools)) allowedSectionIds.add('tools');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(resumeData.volunteer)) allowedSectionIds.add('volunteer');
      break;
    }
    case 'professional': {
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.activities?.involvements)) allowedSectionIds.add('involvement');
      if (hasLen(resumeData.activities?.achievements)) allowedSectionIds.add('achievements');
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(basics.objective)) allowedSectionIds.add('objective');
      if (hasLen(skills.languages.concat(skills.frameworks)))
        allowedSectionIds.add('tech_expertise');
      if (hasLen(skills.technologies.concat(skills.libraries, skills.databases)))
        allowedSectionIds.add('skills_exposure');
      if (hasLen(skills.practices)) allowedSectionIds.add('methodology');
      if (hasLen(skills.tools)) allowedSectionIds.add('tools');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      break;
    }
    case 'classic': {
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      break;
    }
    case 'sidebar-left': {
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.activities?.achievements)) allowedSectionIds.add('awards');
      break;
    }
    case 'sidebar-right': {
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.activities?.involvements)) allowedSectionIds.add('projects');
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      break;
    }
    case 'header-band': {
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      if (hasLen(skills.tools)) allowedSectionIds.add('tools');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      break;
    }
    case 'creative': {
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      break;
    }
    case 'inspired': {
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      break;
    }
    case 'versatile': {
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks, skills.tools)))
        allowedSectionIds.add('skills_merged');
      if (hasLen(resumeData.awards)) allowedSectionIds.add('awards');
      break;
    }
    case 'straightforward': {
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks, skills.tools)))
        allowedSectionIds.add('skills_merged');
      if (hasLen(resumeData.awards)) allowedSectionIds.add('awards');
      if (hasLen(basics.summary)) allowedSectionIds.add('summary');
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.activities?.involvements)) allowedSectionIds.add('involvements');
      break;
    }
    case 'accessible': {
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) allowedSectionIds.add('skills');
      break;
    }
    case 'plain': {
      if (hasLen(resumeData.work)) allowedSectionIds.add('work');
      if (hasLen(resumeData.education)) allowedSectionIds.add('education');
      if (hasLen(resumeData.awards)) allowedSectionIds.add('awards');
      break;
    }
    default:
      break;
  }
  return allowedSectionIds;
}
