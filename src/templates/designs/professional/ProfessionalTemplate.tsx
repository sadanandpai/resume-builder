import { EditableResumeSection } from '@/helpers/common/components/EditableResumeSection';
import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { AchievementsSection } from '@/templates/components/awards';
import { StandardEducation } from '@/templates/components/education';
import { TimelineExperience } from '@/templates/components/experience';
import { ExperienceProfile } from '@/templates/components/profile';
import { ProjectsSection } from '@/templates/components/projects';
import { BarSkills, ChipSkills } from '@/templates/components/skills';
import { ProfileSummarySection, TextSection } from '@/templates/components/text';

export default function ProfessionalTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'work':
        return <TimelineExperience items={data.work} title="Work Experience" />;
      case 'involvement':
        return (
          <ProjectsSection
            html={data.activities.involvements}
            title="Key Projects / Involvements"
          />
        );
      case 'achievements':
        return (
          <AchievementsSection
            html={data.activities.achievements}
            title="Certificates and Awards"
          />
        );
      case 'summary':
        return <ProfileSummarySection html={basics.summary} image={basics.image} />;
      case 'objective':
        return <TextSection html={basics.objective} title="Career Objective" />;
      case 'tech_expertise':
        return (
          <BarSkills
            items={data.skills.languages.concat(data.skills.frameworks)}
            title="Technical expertise"
          />
        );
      case 'skills_exposure':
        return (
          <ChipSkills
            items={data.skills.technologies.concat(data.skills.libraries, data.skills.databases)}
            title="Skills / Exposure"
          />
        );
      case 'methodology':
        return <ChipSkills items={data.skills.practices} title="Practices" />;
      case 'tools':
        return <ChipSkills items={data.skills.tools} title="Tools" />;
      case 'education':
        return <StandardEducation items={data.education} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="boxed">
      <div
        style={{
          ...pageStyle(resumePalette),
          padding: padding('40px 25px'),
          display: 'grid',
          gridTemplateColumns: columns('minmax(0, 2fr) minmax(0, 1fr)', false, secondaryPercent),
          gap: spacing('column', 14),
        }}
      >
        <div style={{ minWidth: 0 }}>
          <EditableResumeSection id="basics">
            <ExperienceProfile basics={basics} />
          </EditableResumeSection>
          <TemplateRegion regionId="left" items={regions.left} renderSection={renderSection} />
        </div>
        <TemplateRegion regionId="right" items={regions.right} renderSection={renderSection} />
      </div>
    </ResumePresentation>
  );
}
