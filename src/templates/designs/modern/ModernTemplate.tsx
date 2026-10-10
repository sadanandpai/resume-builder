import { useTemplateTitles } from '@/stores/useSectionTitleStore';
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
import { ModernProfile } from '@/templates/components/profile';
import { ProjectsSection } from '@/templates/components/projects';
import { ChipSkills } from '@/templates/components/skills';
import { ProfileSummarySection, TextSection } from '@/templates/components/text';

export default function ModernTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const titles = useTemplateTitles('modern');
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'work':
        return (
          <TimelineExperience
            entrySpacing={20}
            summarySpacing={6}
            companyWeight={500}
            markerColor="primary"
            items={data.work}
            title={titles.work}
          />
        );
      case 'involvement':
        return <ProjectsSection html={data.activities.involvements} title={titles.involvement} />;
      case 'achievements':
        return (
          <AchievementsSection html={data.activities.achievements} title={titles.achievements} />
        );
      case 'summary':
        return (
          <ProfileSummarySection
            title={titles.summary}
            indentParagraphs
            html={basics.summary}
            image={basics.image}
          />
        );
      case 'objective':
        return <TextSection html={basics.objective} title={titles.objective} />;
      case 'tech_expertise':
        return (
          <ChipSkills
            chipVariant="neutral"
            items={data.skills.languages}
            title={titles.tech_expertise}
          />
        );
      case 'frameworks':
        return (
          <ChipSkills
            chipVariant="neutral"
            items={data.skills.frameworks}
            title={titles.frameworks}
          />
        );
      case 'skills_exposure':
        return (
          <ChipSkills
            chipVariant="neutral"
            items={data.skills.technologies.concat(data.skills.libraries, data.skills.databases)}
            title={titles.skills_exposure}
          />
        );
      case 'tools':
        return <ChipSkills chipVariant="neutral" items={data.skills.tools} title={titles.tools} />;
      case 'methodology':
        return (
          <ChipSkills
            chipVariant="neutral"
            items={data.skills.practices}
            title={titles.methodology}
          />
        );
      case 'education':
        return <StandardEducation title={titles.education} items={data.education} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="ruled">
      <div
        style={{
          ...pageStyle(resumePalette),
          padding: padding('40px 25px'),
          display: 'grid',
          gridTemplateColumns: columns('minmax(0, 2fr) minmax(0, 1fr)', false, secondaryPercent),
          columnGap: spacing('column', 22),
        }}
      >
        <div style={{ minWidth: 0, gridColumn: '1 / -1' }}>
          <EditableResumeSection id="basics">
            <ModernProfile basics={basics} />
          </EditableResumeSection>
        </div>
        <div style={{ minWidth: 0 }}>
          <TemplateRegion regionId="left" items={regions.left} renderSection={renderSection} />
        </div>
        <TemplateRegion regionId="right" items={regions.right} renderSection={renderSection} />
      </div>
    </ResumePresentation>
  );
}
