import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { AwardsSection } from '@/templates/components/awards';
import { StandardEducation } from '@/templates/components/education';
import { StackedExperience } from '@/templates/components/experience';
import { InlineProfile } from '@/templates/components/profile';
import { ChipSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';
import { VolunteerSection } from '@/templates/components/volunteer';
import { EditScrollSection } from '@/templates/designs/integration/EditScrollSection';

export default function ModernTemplate() {
  const secondaryPercent = useResumeStyleStore((state) => state.settings.secondaryColumnPercent);
  const data = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const resumePalette = useResumePalette();
  const basics = data.basics;
  const renderSection = (id: string) => {
    switch (id) {
      case 'summary':
        return <TextSection html={basics.summary} />;
      case 'work':
        return (
          <EditScrollSection source="work">
            <StackedExperience items={data.work} />
          </EditScrollSection>
        );
      case 'awards':
        return (
          <EditScrollSection source="awards">
            <AwardsSection items={data.awards} />
          </EditScrollSection>
        );
      case 'objective':
        return <TextSection html={basics.objective} title="Objective" />;
      case 'languages':
        return (
          <EditScrollSection source="skills">
            <ChipSkills items={data.skills.languages} title="Languages" />
          </EditScrollSection>
        );
      case 'technologies':
        return (
          <EditScrollSection source="skills">
            <ChipSkills items={data.skills.technologies} title="Technologies" />
          </EditScrollSection>
        );
      case 'frameworks_libs':
        return (
          <EditScrollSection source="skills">
            <ChipSkills
              items={data.skills.frameworks.concat(data.skills.libraries)}
              title="Frameworks & Libraries"
            />
          </EditScrollSection>
        );
      case 'tools':
        return (
          <EditScrollSection source="skills">
            <ChipSkills items={data.skills.tools} title="Tools" />
          </EditScrollSection>
        );
      case 'education':
        return (
          <EditScrollSection source="education">
            <StandardEducation items={data.education} />
          </EditScrollSection>
        );
      case 'volunteer':
        return (
          <EditScrollSection source="volunteer">
            <VolunteerSection items={data.volunteer} />
          </EditScrollSection>
        );
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="stacked">
      <div style={{ ...pageStyle(resumePalette), padding: padding(16) }}>
        <InlineProfile basics={basics} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('minmax(0, 3fr) minmax(0, 2fr)', false, secondaryPercent),
            gap: spacing('column', 24),
          }}
        >
          <TemplateRegion regionId="left" items={regions.left} renderSection={renderSection} />
          <TemplateRegion regionId="right" items={regions.right} renderSection={renderSection} />
        </div>
      </div>
    </ResumePresentation>
  );
}
