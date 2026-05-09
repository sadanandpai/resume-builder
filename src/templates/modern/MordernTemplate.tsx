import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { VolunteerSection } from './components/Volunteer';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';
import { AwardSection } from './components/Awards';
import { useContext } from 'react';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';

export default function MordernTemplate() {
  const resumeData = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={resumeData.basics.summary}>
            <SummarySection summary={resumeData.basics.summary} />
          </SectionValidator>
        );
      case 'work':
        return (
          <SectionValidator value={resumeData.work}>
            <WorkSection experience={resumeData.work} />
          </SectionValidator>
        );
      case 'awards':
        return (
          <SectionValidator value={resumeData.awards}>
            <AwardSection awardsReceived={resumeData.awards} />
          </SectionValidator>
        );
      case 'objective':
        return (
          <SectionValidator value={resumeData.basics.objective}>
            <Objective objective={resumeData.basics.objective} />
          </SectionValidator>
        );
      case 'languages':
        return (
          <SectionValidator value={resumeData.skills.languages}>
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          </SectionValidator>
        );
      case 'technologies':
        return (
          <SectionValidator value={resumeData.skills.technologies}>
            <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          </SectionValidator>
        );
      case 'frameworks_libs':
        return (
          <SectionValidator value={resumeData.skills.frameworks}>
            <SkillsSection
              title="Frameworks & Libraries"
              list={resumeData.skills.frameworks.concat(resumeData.skills.libraries)}
            />
          </SectionValidator>
        );
      case 'tools':
        return (
          <SectionValidator value={resumeData.skills.tools}>
            <SkillsSection title="Tools" list={resumeData.skills.tools} />
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={resumeData.education}>
            <EducationSection education={resumeData.education} />
          </SectionValidator>
        );
      case 'volunteer':
        return (
          <SectionValidator value={resumeData.volunteer}>
            <VolunteerSection volunteer={resumeData.volunteer} />
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-2">
      <BasicIntro
        name={resumeData.basics.name}
        label={resumeData.basics.label}
        url={resumeData.basics.url}
        email={resumeData.basics.email}
        city={resumeData.basics.location.city}
        phone={resumeData.basics.phone}
        image={resumeData.basics.image}
        profiles={resumeData.basics.profiles}
      />
      <div className="flex">
        <SortableRegion regionId="left" items={regions.left} className="basis-[60%] p-3">
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderSection(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
        <SortableRegion regionId="right" items={regions.right} className="basis-[40%] p-3">
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderSection(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </div>
    </div>
  );
}
