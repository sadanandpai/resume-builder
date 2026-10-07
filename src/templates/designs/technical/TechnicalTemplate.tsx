import { columns, padding, spacing } from '@/helpers/resume-style/styles';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useContext } from 'react';
import { useSectionLayoutRuntime } from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import { pageStyle } from '@/templates/components/primitives/layoutPrimitives';
import { ResumePresentation, useResumePalette } from '@/templates/components/theme';
import { TemplateRegion } from '@/templates/designs/integration/TemplateRegion';
import { TechnicalEducation } from '@/templates/components/education';
import { TechnicalExperience } from '@/templates/components/experience';
import { TechnicalProfile } from '@/templates/components/profile';
import { ProjectsSection } from '@/templates/components/projects';
import { BarSkills, ChipSkills } from '@/templates/components/skills';
import { TextSection } from '@/templates/components/text';

export default function TechnicalTemplate() {
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
        return <TechnicalExperience items={data.work} />;
      case 'projects':
        return <ProjectsSection html={data.activities?.involvements} />;
      case 'languages':
        return <BarSkills items={data.skills.languages} title="Languages" />;
      case 'frameworks_libs':
        return (
          <ChipSkills
            items={data.skills.frameworks.concat(data.skills.libraries)}
            title="Frameworks"
          />
        );
      case 'stack':
        return (
          <ChipSkills
            items={data.skills.tools.concat(data.skills.databases)}
            title="Stack / Tools"
          />
        );
      case 'education':
        return <TechnicalEducation items={data.education} />;
      default:
        return null;
    }
  };
  return (
    <ResumePresentation value="technical">
      <div style={{ ...pageStyle(resumePalette), padding: padding('34px 40px') }}>
        <TechnicalProfile basics={basics} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns('minmax(0, 1fr) 38%', false, secondaryPercent),
            gap: spacing('column', 22),
            marginTop: 16,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <TemplateRegion regionId="main" items={regions.main} renderSection={renderSection} />
          </div>
          <aside style={{ minWidth: 0 }}>
            <TemplateRegion
              regionId="sidebar"
              items={regions.sidebar}
              renderSection={renderSection}
            />
          </aside>
        </div>
      </div>
    </ResumePresentation>
  );
}
