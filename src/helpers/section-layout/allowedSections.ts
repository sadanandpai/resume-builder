/* eslint-disable @typescript-eslint/no-explicit-any */
/** Mirrors each template's SectionValidator "has content" checks so layout ids stay in sync. */

export function getAllowedSectionIdsForTemplate(templateId: string, d: any): Set<string> {
  const b = d.basics;
  const skills = d.skills;
  const out = new Set<string>();

  const hasLen = (v: unknown) => !!(v && (typeof v === 'string' ? v.length : (v as any[]).length));

  switch (templateId) {
    case 'modern': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.awards)) out.add('awards');
      if (hasLen(b.objective)) out.add('objective');
      if (hasLen(skills.languages)) out.add('languages');
      if (hasLen(skills.technologies)) out.add('technologies');
      if (hasLen(skills.frameworks.concat(skills.libraries))) out.add('frameworks_libs');
      if (hasLen(skills.tools)) out.add('tools');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(d.volunteer)) out.add('volunteer');
      break;
    }
    case 'professional': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.activities?.involvements)) out.add('involvement');
      if (hasLen(d.activities?.achievements)) out.add('achievements');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(b.objective)) out.add('objective');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('tech_expertise');
      if (hasLen(skills.technologies.concat(skills.libraries, skills.databases)))
        out.add('skills_exposure');
      if (hasLen(skills.practices)) out.add('methodology');
      if (hasLen(skills.tools)) out.add('tools');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'classic':
    case 'minimal':
    case 'timeline':
    case 'executive': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'sidebar-left': {
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.activities?.achievements)) out.add('awards');
      break;
    }
    case 'sidebar-right': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.activities?.involvements)) out.add('projects');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'header-band': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      if (hasLen(skills.tools)) out.add('tools');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'compact': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills_rated');
      if (hasLen(skills.tools)) out.add('tools');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'creative': {
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      break;
    }
    case 'technical': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.activities?.involvements)) out.add('projects');
      if (hasLen(skills.languages)) out.add('languages');
      if (hasLen(skills.frameworks.concat(skills.libraries))) out.add('frameworks_libs');
      if (hasLen(skills.tools.concat(skills.databases))) out.add('stack');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'playful': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      if (hasLen(d.awards)) out.add('awards');
      break;
    }
    case 'artistic': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'inspired': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'versatile': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks, skills.tools)))
        out.add('skills_merged');
      if (hasLen(d.awards)) out.add('awards');
      break;
    }
    case 'straightforward': {
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks, skills.tools)))
        out.add('skills_merged');
      if (hasLen(d.awards)) out.add('awards');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.activities?.involvements)) out.add('involvements');
      break;
    }
    case 'accessible':
    case 'instinctive': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'plain': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(d.awards)) out.add('awards');
      break;
    }
    case 'elegant': {
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills_key');
      if (hasLen(skills.tools)) out.add('tools');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'modernized': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(d.awards)) out.add('awards');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'sleek': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(b.summary)) out.add('summary');
      if (b.email || b.phone || b.location?.city || b.url) out.add('contact_info');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'classy':
    case 'distinguished': {
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    case 'expressive': {
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks, skills.tools)))
        out.add('skills_merged');
      if (hasLen(d.awards)) out.add('awards');
      if (hasLen(d.work)) out.add('work');
      break;
    }
    case 'simple-ats': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      const allSkills = skills.languages
        .concat(skills.frameworks, skills.technologies, skills.tools)
        .map((x: { name: string }) => x.name);
      if (allSkills.length > 0) out.add('skills_grid');
      break;
    }
    case 'corporate': {
      const sk = skills.languages.concat(skills.frameworks, skills.tools);
      if (hasLen(sk)) out.add('skills_merged');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'split-header': {
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills_rated');
      if (hasLen(skills.practices)) out.add('practices');
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      break;
    }
    case 'precision-ats': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      const skillNames = skills.languages
        .concat(skills.frameworks, skills.technologies, skills.tools)
        .map((x: { name: string }) => x.name);
      if (skillNames.length > 0) out.add('skills_line');
      break;
    }
    case 'asymmetric-ats': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      const skillLines = skills.languages.concat(
        skills.frameworks,
        skills.technologies,
        skills.tools,
        skills.practices
      );
      if (hasLen(skillLines)) out.add('skills_list');
      break;
    }
    case 'balanced': {
      if (hasLen(b.summary)) out.add('summary');
      if (hasLen(d.work)) out.add('work');
      if (hasLen(d.education)) out.add('education');
      if (hasLen(skills.languages.concat(skills.frameworks))) out.add('skills');
      break;
    }
    default:
      break;
  }
  return out;
}
